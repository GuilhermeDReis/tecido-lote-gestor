import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLotes } from '@/hooks/useLotes';

const CadastroLote = () => {
  const { salvarLote, loading } = useLotes();
  const [formData, setFormData] = useState({
    codigo_lote: '',
    gramatura: '',
    fio: '',
    largura: '',
    cor: '',
    artigo: '',
    tecelagem: '',
    numero_maquina_tear: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    // Validação simples
    if (!formData.codigo_lote.trim()) {
      return;
    }

    try {
      await salvarLote(formData);
      
      // Limpar formulário
      setFormData({
        codigo_lote: '',
        gramatura: '',
        fio: '',
        largura: '',
        cor: '',
        artigo: '',
        tecelagem: '',
        numero_maquina_tear: ''
      });
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Cadastrar Novo Lote</h1>
          <p className="text-gray-600 text-sm sm:text-base">Preencha as informações do lote de malha</p>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">Informações do Lote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Código do Lote - Campo principal */}
            <div className="bg-blue-500 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <Label htmlFor="codigo_lote" className="text-white font-medium mb-2 block text-sm sm:text-base">
                Código do Lote *
              </Label>
              <Input
                id="codigo_lote"
                value={formData.codigo_lote}
                onChange={(e) => handleInputChange('codigo_lote', e.target.value)}
                className="bg-white/90 border-0 rounded-xl h-11 sm:h-12 text-base sm:text-lg font-medium"
                placeholder="Digite o código do lote"
                disabled={loading}
              />
            </div>

            {/* Grid com os demais campos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="gramatura" className="text-gray-700 font-medium text-sm sm:text-base">
                  Gramatura
                </Label>
                <Input
                  id="gramatura"
                  value={formData.gramatura}
                  onChange={(e) => handleInputChange('gramatura', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: 180g/m²"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fio" className="text-gray-700 font-medium text-sm sm:text-base">
                  Fio
                </Label>
                <Input
                  id="fio"
                  value={formData.fio}
                  onChange={(e) => handleInputChange('fio', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: Algodão 30/1"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="largura" className="text-gray-700 font-medium text-sm sm:text-base">
                  Largura
                </Label>
                <Input
                  id="largura"
                  value={formData.largura}
                  onChange={(e) => handleInputChange('largura', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: 1,80m"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor" className="text-gray-700 font-medium text-sm sm:text-base">
                  Cor
                </Label>
                <Input
                  id="cor"
                  value={formData.cor}
                  onChange={(e) => handleInputChange('cor', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: Azul Marinho"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artigo" className="text-gray-700 font-medium text-sm sm:text-base">
                  Artigo
                </Label>
                <Input
                  id="artigo"
                  value={formData.artigo}
                  onChange={(e) => handleInputChange('artigo', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: Jersey"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tecelagem" className="text-gray-700 font-medium text-sm sm:text-base">
                  Tecelagem
                </Label>
                <Input
                  id="tecelagem"
                  value={formData.tecelagem}
                  onChange={(e) => handleInputChange('tecelagem', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: Meia malha"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="numero_maquina_tear" className="text-gray-700 font-medium text-sm sm:text-base">
                  Número da Máquina Tear
                </Label>
                <Input
                  id="numero_maquina_tear"
                  value={formData.numero_maquina_tear}
                  onChange={(e) => handleInputChange('numero_maquina_tear', e.target.value)}
                  className="rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Ex: T001"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full h-11 sm:h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar Lote'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CadastroLote;
