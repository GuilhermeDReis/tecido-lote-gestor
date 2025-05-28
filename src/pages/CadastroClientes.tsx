
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useClientes } from '@/hooks/useClientes';

const CadastroClientes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { salvarCliente, atualizarCliente, clientes, loading } = useClientes();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    observacao: ''
  });

  useEffect(() => {
    if (isEditing && clientes.length > 0) {
      const cliente = clientes.find(c => c.id === id);
      if (cliente) {
        setFormData({
          nome: cliente.nome,
          codigo: cliente.codigo,
          observacao: cliente.observacao || ''
        });
      }
    }
  }, [isEditing, id, clientes]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.nome.trim() || !formData.codigo.trim()) {
      return;
    }

    try {
      if (isEditing) {
        await atualizarCliente(id!, formData);
      } else {
        await salvarCliente(formData);
        setFormData({
          nome: '',
          codigo: '',
          observacao: ''
        });
      }
      
      if (isEditing) {
        navigate('/clientes');
      }
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/clientes')}
            variant="outline"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {isEditing ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {isEditing ? 'Atualize as informações do cliente' : 'Preencha as informações do cliente'}
          </p>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-700 font-medium text-sm sm:text-base">
                  Nome do Cliente *
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Digite o nome do cliente"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo" className="text-gray-700 font-medium text-sm sm:text-base">
                  Código do Cliente *
                </Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange('codigo', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Digite o código do cliente"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao" className="text-gray-700 font-medium text-sm sm:text-base">
                Observação
              </Label>
              <Textarea
                id="observacao"
                value={formData.observacao}
                onChange={(e) => handleInputChange('observacao', e.target.value)}
                className="rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-none"
                placeholder="Digite observações sobre o cliente (opcional)"
                rows={4}
                disabled={loading}
              />
            </div>

            <div className="pt-4 sm:pt-6">
              <Button
                onClick={handleSave}
                disabled={loading || !formData.nome.trim() || !formData.codigo.trim()}
                className="w-full h-11 sm:h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base disabled:opacity-50"
              >
                {loading ? 'Salvando...' : (isEditing ? 'Atualizar Cliente' : 'Salvar Cliente')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CadastroClientes;
