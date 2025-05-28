
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Lote {
  id?: string;
  codigo_lote: string;
  gramatura?: string;
  fio?: string;
  largura?: string;
  cor?: string;
  artigo?: string;
  tecelagem?: string;
  numero_maquina_tear?: string;
  status?: string;
  user_id?: string;
  user_name?: string;
  cliente_id?: string;
  cliente_nome?: string;
  created_at?: string;
  updated_at?: string;
}

export const useLotes = () => {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const carregarLotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lotes')
        .select('*')
        .order('created_at', { ascending: false });

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

  const salvarLote = async (lote: Omit<Lote, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'user_name'>) => {
    try {
      setLoading(true);
      
      if (!user || !profile) {
        throw new Error('Usuário não autenticado');
      }

      const loteData = {
        ...lote,
        user_id: user.id,
        user_name: profile.name,
        status: 'ativo'
      };

      const { data, error } = await supabase
        .from('lotes')
        .insert([loteData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setLotes(prev => [data, ...prev]);
      toast({
        title: "Sucesso!",
        description: "Lote cadastrado com sucesso",
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao salvar lote:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o lote",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const buscarLotePorCodigo = async (codigo: string): Promise<Lote | null> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lotes')
        .select('*')
        .eq('codigo_lote', codigo)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar lote:', error);
      toast({
        title: "Erro",
        description: "Não foi possível buscar o lote",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      carregarLotes();
    }
  }, [user]);

  return {
    lotes,
    loading,
    salvarLote,
    buscarLotePorCodigo,
    carregarLotes
  };
};
