
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Search, Plus } from 'lucide-react';

const Index = () => {
  const lotes = JSON.parse(localStorage.getItem('lotes') || '{}');
  const totalLotes = Object.keys(lotes).length;

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Gestão de Lotes Baiana
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
            Sistema gerenciador de lotes feito para o baiano
          </p>
          <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Stats Card */}
        <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm mb-8 sm:mb-12">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{totalLotes}</h3>
                <p className="text-gray-600 text-sm sm:text-base">Lotes cadastrados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
                Cadastrar Novo Lote
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Adicione um novo lote de malha ao sistema com todas as informações necessárias como gramatura, fio, cor e muito mais.
              </p>
              <Link to="/cadastro">
                <Button className="w-full h-11 sm:h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
                  Cadastrar Lote
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
                Consultar Lote
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Busque informações detalhadas de qualquer lote cadastrado no sistema usando o código do lote.
              </p>
              <Link to="/consulta">
                <Button className="w-full h-11 sm:h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
                  Consultar Lote
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
