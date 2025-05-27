
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter } from 'lucide-react';
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
  created_at: string;
}

const Acompanhamento = () => {
  const [lotes, setLotes] = useState<LoteCompleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    codigo_lote: '',
    usuario: '',
    data_inicio: '',
    data_fim: ''
  });
  const { toast } = useToast();

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

      setLotes(data || []);
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
  }, []);

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
    setTimeout(() => {
      carregarLotes();
    }, 100);
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
                    <TableHead>Código</TableHead>
                    <TableHead>Gramatura</TableHead>
                    <TableHead>Fio</TableHead>
                    <TableHead>Largura</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead>Artigo</TableHead>
                    <TableHead>Tecelagem</TableHead>
                    <TableHead>Máquina</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Data Cadastro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lotes.map((lote) => (
                    <TableRow key={lote.id}>
                      <TableCell className="font-medium">{lote.codigo_lote}</TableCell>
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
                      <TableCell colSpan={11} className="text-center py-8 text-gray-500">
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
