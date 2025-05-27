
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600" onClick={closeMenu}>
              MalhaStock
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 lg:px-4 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
                    isActive('/') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Início
                </Link>
                <Link
                  to="/cadastro"
                  className={`px-3 py-2 lg:px-4 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
                    isActive('/cadastro') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Cadastrar
                </Link>
                <Link
                  to="/consulta"
                  className={`px-3 py-2 lg:px-4 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
                    isActive('/consulta') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Consultar
                </Link>
                <Link
                  to="/acompanhamento"
                  className={`px-3 py-2 lg:px-4 rounded-xl font-medium transition-all duration-200 text-sm lg:text-base ${
                    isActive('/acompanhamento') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Acompanhamento
                </Link>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{profile?.name || 'Usuário'}</span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-200"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-2">
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100 mb-2">
                  Olá, {profile?.name || 'Usuário'}
                </div>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 mx-2 ${
                    isActive('/') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Início
                </Link>
                <Link
                  to="/cadastro"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 mx-2 ${
                    isActive('/cadastro') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Cadastrar Lote
                </Link>
                <Link
                  to="/consulta"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 mx-2 ${
                    isActive('/consulta') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Consultar Lote
                </Link>
                <Link
                  to="/acompanhamento"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 mx-2 ${
                    isActive('/acompanhamento') 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Acompanhamento
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 mx-2 text-red-600 hover:bg-red-50"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl bg-blue-500 text-white font-medium text-center mx-2"
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
