
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientes, type Cliente } from '@/hooks/useClientes';

interface ClienteComboboxProps {
  value?: string;
  onValueChange: (clienteId: string, clienteNome: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ClienteCombobox = ({ value, onValueChange, placeholder = "Selecione um cliente...", disabled }: ClienteComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientesSugeridos, setClientesSugeridos] = useState<Cliente[]>([]);
  const { clientes, buscarClientes } = useClientes();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      buscarClientes(searchTerm).then(setClientesSugeridos);
    } else {
      setClientesSugeridos(clientes.slice(0, 10));
    }
  }, [searchTerm, clientes, buscarClientes]);

  const clienteSelecionado = clientes.find(cliente => cliente.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-xl border-gray-200 h-10 sm:h-11 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          disabled={disabled}
        >
          {clienteSelecionado ? clienteSelecionado.nome : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Digite para buscar cliente..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
            <CommandGroup>
              {clientesSugeridos.map((cliente) => (
                <CommandItem
                  key={cliente.id}
                  value={cliente.id}
                  onSelect={(currentValue) => {
                    if (currentValue === value) {
                      onValueChange('', '');
                    } else {
                      onValueChange(cliente.id!, cliente.nome);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === cliente.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{cliente.nome}</span>
                    <span className="text-xs text-gray-500">Código: {cliente.codigo}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ClienteCombobox;
