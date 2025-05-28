
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoteCompleto {
  id: string;
  codigo_lote: string;
  gramatura?: string;
  fio?: string;
  largura?: string;
  cor?: string;
  artigo?: string;
  tecelagem?: string;
  numero_maquina_tear?: string;
  status: string;
  user_name?: string;
  cliente_nome?: string;
  created_at: string;
}

type SortField = keyof LoteCompleto;
type SortDirection = 'asc' | 'desc' | null;

const Acompanhamento = () => {
  const [lotes, setLotes] = useState<LoteCompleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filtros, setFiltros] = useState({
    codigo_lote: '',
    usuario: '',
    data_inicio: '',
    data_fim: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const carregarLotes = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('lotes')
        .select('*')
        .order('created_at', { ascending: false });

      // Aplicar filtros
      if (filtros.codigo_lote) {
        query = query.ilike('codigo_lote', `%${filtros.codigo_lote}%`);
      }
      
      if (filtros.usuario) {
        query = query.ilike('user_name', `%${filtros.usuario}%`);
      }
      
      if (filtros.data_inicio) {
        query = query.gte('created_at', `${filtros.data_inicio}T00:00:00`);
      }
      
      if (filtros.data_fim) {
        query = query.lte('created_at', `${filtros.data_fim}T23:59:59`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      let sortedData = data || [];
      
      // Aplicar ordenação se existir
      if (sortField && sortDirection) {
        sortedData = [...sortedData].sort((a, b) => {
          const aValue = a[sortField];
          const bValue = b[sortField];
          
          if (aValue === null || aValue === undefined) return 1;
          if (bValue === null || bValue === undefined) return -1;
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            const comparison = aValue.localeCompare(bValue);
            return sortDirection === 'asc' ? comparison : -comparison;
          }
          
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      }

      setLotes(sortedData);
    } catch (error) {
      console.error('Erro ao carregar lotes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os lotes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLotes();
  }, [filtros, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Se já está ordenando por este campo, alterna a direção
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      // Novo campo, começa com ascendente
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-4 h-4 text-blue-600" />;
    } else if (sortDirection === 'desc') {
      return <ArrowDown className="w-4 h-4 text-blue-600" />;
    }
    
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  };

  const handleFiltrar = () => {
    carregarLotes();
  };

  const limparFiltros = () => {
    setFiltros({
      codigo_lote: '',
      usuario: '',
      data_inicio: '',
      data_fim: ''
    });
    setSortField(null);
    setSortDirection(null);
  };

  const handleRowClick = (codigo: string) => {
    navigate(`/consulta?codigo=${codigo}`);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Acompanhamento de Lotes
          </h1>
          <p className="text-lg text-gray-600">
            Monitore e filtre todos os lotes cadastrados no sistema
          </p>
        </div>

        {/* Filtros */}
        <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código do Lote</Label>
                <Input
                  id="codigo"
                  placeholder="Digite o código..."
                  value={filtros.codigo_lote}
                  onChange={(e) => setFiltros(prev => ({ ...prev, codigo_lote: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuário</Label>
                <Input
                  id="usuario"
                  placeholder="Nome do usuário..."
                  value={filtros.usuario}
                  onChange={(e) => setFiltros(prev => ({ ...prev, usuario: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-inicio">Data Início</Label>
                <Input
                  id="data-inicio"
                  type="date"
                  value={filtros.data_inicio}
                  onChange={(e) => setFiltros(prev => ({ ...prev, data_inicio: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-fim">Data Fim</Label>
                <Input
                  id="data-fim"
                  type="date"
                  value={filtros.data_fim}
                  onChange={(e) => setFiltros(prev => ({ ...prev, data_fim: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleFiltrar}
                className="flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                <Search className="w-4 h-4" />
                {loading ? 'Filtrando...' : 'Filtrar'}
              </Button>
              <Button 
                onClick={limparFiltros}
                variant="outline"
                className="rounded-xl"
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Lotes */}
        <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Lotes Cadastrados ({lotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('codigo_lote')}
                    >
                      <div className="flex items-center gap-2">
                        Código
                        {getSortIcon('codigo_lote')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('cliente_nome')}
                    >
                      <div className="flex items-center gap-2">
                        Cliente
                        {getSortIcon('cliente_nome')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('gramatura')}
                    >
                      <div className="flex items-center gap-2">
                        Gramatura
                        {getSortIcon('gramatura')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('fio')}
                    >
                      <div className="flex items-center gap-2">
                        Fio
                        {getSortIcon('fio')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('largura')}
                    >
                      <div className="flex items-center gap-2">
                        Largura
                        {getSortIcon('largura')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('cor')}
                    >
                      <div className="flex items-center gap-2">
                        Cor
                        {getSortIcon('cor')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('artigo')}
                    >
                      <div className="flex items-center gap-2">
                        Artigo
                        {getSortIcon('artigo')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('tecelagem')}
                    >
                      <div className="flex items-center gap-2">
                        Tecelagem
                        {getSortIcon('tecelagem')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('numero_maquina_tear')}
                    >
                      <div className="flex items-center gap-2">
                        Máquina
                        {getSortIcon('numero_maquina_tear')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('user_name')}
                    >
                      <div className="flex items-center gap-2">
                        Usuário
                        {getSortIcon('user_name')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hover:bg-gray-50"
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center gap-2">
                        Data Cadastro
                        {getSortIcon('created_at')}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lotes.map((lote) => (
                    <TableRow 
                      key={lote.id}
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => handleRowClick(lote.codigo_lote)}
                    >
                      <TableCell className="font-medium">{lote.codigo_lote}</TableCell>
                      <TableCell>{lote.cliente_nome || '-'}</TableCell>
                      <TableCell>{lote.gramatura || '-'}</TableCell>
                      <TableCell>{lote.fio || '-'}</TableCell>
                      <TableCell>{lote.largura || '-'}</TableCell>
                      <TableCell>{lote.cor || '-'}</TableCell>
                      <TableCell>{lote.artigo || '-'}</TableCell>
                      <TableCell>{lote.tecelagem || '-'}</TableCell>
                      <TableCell>{lote.numero_maquina_tear || '-'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lote.status === 'ativo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {lote.status}
                        </span>
                      </TableCell>
                      <TableCell>{lote.user_name || 'N/A'}</TableCell>
                      <TableCell>{formatarData(lote.created_at)}</TableCell>
                    </TableRow>
                  ))}
                  {lotes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-8 text-gray-500">
                        {loading ? 'Carregando...' : 'Nenhum lote encontrado'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Acompanhamento;
