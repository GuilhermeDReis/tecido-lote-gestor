import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useLotes, type Lote } from '@/hooks/useLotes';

const ConsultaLote = () => {
  const { buscarLotePorCodigo, loading } = useLotes();
  const [codigoBusca, setCodigoBusca] = useState('');
  const [loteEncontrado, setLoteEncontrado] = useState<Lote | null>(null);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const handleBuscar = async () => {
    if (!codigoBusca.trim()) {
      return;
    }

    setBuscaRealizada(false);
    const lote = await buscarLotePorCodigo(codigoBusca);
    setLoteEncontrado(lote);
    setBuscaRealizada(true);
  };

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Área de Busca */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Consultar Lote</h1>
          <p className="text-gray-600 text-sm sm:text-base">Digite o código do lote para visualizar suas informações</p>
        </div>

        {/* Área de Busca */}
        <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">Buscar Lote</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Label htmlFor="codigoBusca" className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
                  Código do Lote
                </Label>
                <Input
                  id="codigoBusca"
                  value={codigoBusca}
                  onChange={(e) => setCodigoBusca(e.target.value)}
                  className="rounded-xl border-gray-200 h-11 sm:h-12 text-base sm:text-lg"
                  placeholder="Digite o código do lote"
                  onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
                  disabled={loading}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleBuscar}
                  disabled={loading}
                  className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base disabled:opacity-50"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {loading ? 'Buscando...' : 'Buscar'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados da Busca */}
        {buscaRealizada && (
          <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
                {loteEncontrado ? 'Informações do Lote' : 'Lote não encontrado'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loteEncontrado ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* Código do Lote - Destaque */}
                  <div className="bg-blue-500 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                    <h2 className="text-white font-medium text-base sm:text-lg mb-2">Código do Lote</h2>
                    <p className="text-white text-xl sm:text-2xl font-bold">{loteEncontrado.codigo_lote}</p>
                    {loteEncontrado.created_at && (
                      <p className="text-white/80 text-xs sm:text-sm mt-2">
                        Cadastrado em: {formatarData(loteEncontrado.created_at)}
                      </p>
                    )}
                  </div>

                  {/* Grid com informações */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Gramatura</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.gramatura || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Fio</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.fio || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Largura</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.largura || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Cor</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.cor || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Artigo</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.artigo || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Tecelagem</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.tecelagem || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:col-span-2">
                      <Label className="text-gray-600 text-xs sm:text-sm font-medium">Número da Máquina Tear</Label>
                      <p className="text-gray-900 text-base sm:text-lg font-semibold mt-1">
                        {loteEncontrado.numero_maquina_tear || 'Não informado'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Lote não encontrado</h3>
                  <p className="text-gray-600 text-sm sm:text-base px-4">
                    Não foi encontrado nenhum lote com o código "{codigoBusca}".
                    <br />
                    Verifique se o código está correto e tente novamente.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultaLote;
