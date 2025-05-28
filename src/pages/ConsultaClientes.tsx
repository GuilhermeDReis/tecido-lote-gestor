
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useClientes, type Cliente } from '@/hooks/useClientes';
import { useNavigate } from 'react-router-dom';

const ConsultaClientes = () => {
  const { clientes, loading, excluirCliente } = useClientes();
  const [filtros, setFiltros] = useState({
    nome: '',
    codigo: ''
  });
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  const aplicarFiltros = () => {
    let resultado = clientes;

    if (filtros.nome) {
      resultado = resultado.filter(cliente => 
        cliente.nome.toLowerCase().includes(filtros.nome.toLowerCase())
      );
    }

    if (filtros.codigo) {
      resultado = resultado.filter(cliente => 
        cliente.codigo.toLowerCase().includes(filtros.codigo.toLowerCase())
      );
    }

    setClientesFiltrados(resultado);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [clientes, filtros]);

  const handleExcluir = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente "${nome}"?`)) {
      await excluirCliente(id);
    }
  };

  const limparFiltros = () => {
    setFiltros({ nome: '', codigo: '' });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Consultar Clientes</h1>
          <p className="text-gray-600 text-sm sm:text-base">Gerencie e consulte todos os clientes cadastrados</p>
        </div>

        {/* Filtros */}
        <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Cliente</Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome..."
                  value={filtros.nome}
                  onChange={(e) => setFiltros(prev => ({ ...prev, nome: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo">Código do Cliente</Label>
                <Input
                  id="codigo"
                  placeholder="Digite o código..."
                  value={filtros.codigo}
                  onChange={(e) => setFiltros(prev => ({ ...prev, codigo: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={aplicarFiltros}
                className="flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                <Search className="w-4 h-4" />
                Filtrar
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

        {/* Botão Novo Cliente */}
        <div className="mb-4">
          <Button 
            onClick={() => navigate('/clientes/cadastro')}
            className="flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Grid de Clientes */}
        <Card className="shadow-xl border-0 rounded-2xl bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Clientes Cadastrados ({clientesFiltrados.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Observação</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Data Cadastro</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientesFiltrados.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell>{cliente.codigo}</TableCell>
                      <TableCell>{cliente.observacao || '-'}</TableCell>
                      <TableCell>{cliente.user_name || 'N/A'}</TableCell>
                      <TableCell>
                        {cliente.created_at ? new Date(cliente.created_at).toLocaleDateString('pt-BR') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleExcluir(cliente.id!, cliente.nome)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {clientesFiltrados.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {loading ? 'Carregando...' : 'Nenhum cliente encontrado'}
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

export default ConsultaClientes;
