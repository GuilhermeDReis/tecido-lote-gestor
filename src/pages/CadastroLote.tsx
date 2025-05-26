
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CadastroLote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    codigoLote: '',
    gramatura: '',
    fio: '',
    largura: '',
    cor: '',
    artigo: '',
    tecelagem: '',
    numeroMaquinaTear: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação simples
    if (!formData.codigoLote.trim()) {
      toast({
        title: "Erro",
        description: "Código do lote é obrigatório",
        variant: "destructive"
      });
      return;
    }

    // Salvar no localStorage
    const existingLotes = JSON.parse(localStorage.getItem('lotes') || '{}');
    existingLotes[formData.codigoLote] = {
      ...formData,
      dataCadastro: new Date().toISOString()
    };
    localStorage.setItem('lotes', JSON.stringify(existingLotes));

    toast({
      title: "Sucesso!",
      description: "Lote cadastrado com sucesso",
    });

    // Limpar formulário
    setFormData({
      codigoLote: '',
      gramatura: '',
      fio: '',
      largura: '',
      cor: '',
      artigo: '',
      tecelagem: '',
      numeroMaquinaTear: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastrar Novo Lote</h1>
          <p className="text-gray-600">Preencha as informações do lote de malha</p>
        </div>

        <Card className="shadow-xl border-0 rounded-3xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-gray-800">Informações do Lote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Código do Lote - Campo principal */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-2xl">
              <Label htmlFor="codigoLote" className="text-white font-medium mb-2 block">
                Código do Lote *
              </Label>
              <Input
                id="codigoLote"
                value={formData.codigoLote}
                onChange={(e) => handleInputChange('codigoLote', e.target.value)}
                className="bg-white/90 border-0 rounded-xl h-12 text-lg font-medium"
                placeholder="Digite o código do lote"
              />
            </div>

            {/* Grid com os demais campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gramatura" className="text-gray-700 font-medium">
                  Gramatura
                </Label>
                <Input
                  id="gramatura"
                  value={formData.gramatura}
                  onChange={(e) => handleInputChange('gramatura', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 180g/m²"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fio" className="text-gray-700 font-medium">
                  Fio
                </Label>
                <Input
                  id="fio"
                  value={formData.fio}
                  onChange={(e) => handleInputChange('fio', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Algodão 30/1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="largura" className="text-gray-700 font-medium">
                  Largura
                </Label>
                <Input
                  id="largura"
                  value={formData.largura}
                  onChange={(e) => handleInputChange('largura', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 1,80m"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor" className="text-gray-700 font-medium">
                  Cor
                </Label>
                <Input
                  id="cor"
                  value={formData.cor}
                  onChange={(e) => handleInputChange('cor', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Azul Marinho"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artigo" className="text-gray-700 font-medium">
                  Artigo
                </Label>
                <Input
                  id="artigo"
                  value={formData.artigo}
                  onChange={(e) => handleInputChange('artigo', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Jersey"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tecelagem" className="text-gray-700 font-medium">
                  Tecelagem
                </Label>
                <Input
                  id="tecelagem"
                  value={formData.tecelagem}
                  onChange={(e) => handleInputChange('tecelagem', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Meia malha"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="numeroMaquinaTear" className="text-gray-700 font-medium">
                  Número da Máquina Tear
                </Label>
                <Input
                  id="numeroMaquinaTear"
                  value={formData.numeroMaquinaTear}
                  onChange={(e) => handleInputChange('numeroMaquinaTear', e.target.value)}
                  className="rounded-xl border-gray-200 h-11 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: T001"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleSave}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Salvar Lote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CadastroLote;
