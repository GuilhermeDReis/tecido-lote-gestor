
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Cliente {
  id?: string;
  nome: string;
  codigo: string;
  observacao?: string;
  user_id?: string;
  user_name?: string;
  created_at?: string;
  updated_at?: string;
}

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (error) {
        throw error;
      }

      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const salvarCliente = async (cliente: Omit<Cliente, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'user_name'>) => {
    try {
      setLoading(true);
      
      if (!user || !profile) {
        throw new Error('Usuário não autenticado');
      }

      const clienteData = {
        ...cliente,
        user_id: user.id,
        user_name: profile.name
      };

      const { data, error } = await supabase
        .from('clientes')
        .insert([clienteData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setClientes(prev => [...prev, data].sort((a, b) => a.nome.localeCompare(b.nome)));
      toast({
        title: "Sucesso!",
        description: "Cliente cadastrado com sucesso",
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao salvar cliente:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o cliente",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const atualizarCliente = async (id: string, cliente: Partial<Cliente>) => {
    try {
      setLoading(true);
      
      if (!user || !profile) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('clientes')
        .update(cliente)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setClientes(prev => 
        prev.map(c => c.id === id ? data : c).sort((a, b) => a.nome.localeCompare(b.nome))
      );
      
      toast({
        title: "Sucesso!",
        description: "Cliente atualizado com sucesso",
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao atualizar cliente:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível atualizar o cliente",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const excluirCliente = async (id: string) => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setClientes(prev => prev.filter(c => c.id !== id));
      
      toast({
        title: "Sucesso!",
        description: "Cliente excluído com sucesso",
      });
    } catch (error: any) {
      console.error('Erro ao excluir cliente:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o cliente",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const buscarClientes = async (termo: string): Promise<Cliente[]> => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .or(`nome.ilike.%${termo}%, codigo.ilike.%${termo}%`)
        .order('nome', { ascending: true })
        .limit(10);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }
  };

  useEffect(() => {
    if (user) {
      carregarClientes();
    }
  }, [user]);

  return {
    clientes,
    loading,
    salvarCliente,
    atualizarCliente,
    excluirCliente,
    buscarClientes,
    carregarClientes
  };
};
