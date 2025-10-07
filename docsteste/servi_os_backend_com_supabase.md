<details>
<summary>Relevant source files</summary>

- [src/integrations/supabase/client.ts](https://github.com/guilhermedreis/tecido-lote-gestor/blob/main/src/integrations/supabase/client.ts)
</details>

# Serviços Backend com Supabase

O sistema "Serviços Backend com Supabase" é uma parte fundamental do projeto *tecido-lote-gestor*, que utiliza o Supabase como sua infraestrutura de banco de dados e gerenciamento de autenticação. Este serviço permite a interação eficiente com os dados de clientes e lotes, facilitando operações de CRUD (criação, leitura, atualização e exclusão) através de uma API de fácil acesso.

## Arquitetura do Supabase

O Supabase é uma plataforma de backend como serviço (BaaS) que fornece uma interface de banco de dados PostgreSQL, autenticação de usuários e funções em tempo real. O código do cliente Supabase é inicializado no arquivo `client.ts`, onde são configuradas as credenciais e a conexão com o banco de dados.

### Inicialização do Cliente Supabase

```typescript
// src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase URL e chave pública
const SUPABASE_URL = "https://mucfueexayxqogwgtmvv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y2Z1ZWV4YXl4cW9nd2d0bXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTY5ODAsImV4cCI6MjA2MzkzMjk4MH0.Pnv470bTkipaosVRJ7btcblqCBT0chhSaN8D40E42Jg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```

Este trecho de código inicializa o cliente Supabase com a URL e a chave pública, permitindo que a aplicação interaja com o banco de dados para realizar operações.

## Fluxo de Dados

O fluxo de dados dentro da aplicação é gerenciado por meio de hooks personalizados que abstraem a lógica de acesso aos dados. Os principais hooks utilizados incluem `useClientes` e `useLotes`, que manipulam a interação com as tabelas correspondentes no banco de dados.

### Hook `useClientes`

Este hook gerencia todas as interações relacionadas aos dados dos clientes.

```typescript
// src/hooks/useClientes.ts

import { supabase } from '@/integrations/supabase/client';

export const useClientes = () => {
  const carregarClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nome', { ascending: true });

    if (error) throw error;
    return data;
  };

  const salvarCliente = async (cliente) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente]);

    if (error) throw error;
    return data;
  };

  return { carregarClientes, salvarCliente };
};
```

### Fluxo de Operações

O fluxo de operações com o Supabase pode ser representado pelo seguinte diagrama de sequência:

```mermaid
sequenceDiagram
  participant Component
  participant useClientes
  participant Supabase

  Component->>+useClientes: carregarClientes()
  useClientes->>+Supabase: select * from clientes
  Supabase-->>-useClientes: data, error
  useClientes->>-Component: data
```

Esse diagrama ilustra como um componente chama o hook `useClientes` para carregar os clientes, que por sua vez faz uma chamada ao Supabase para recuperar os dados.

## Modelagem de Dados

Os dados gerenciados pela aplicação incluem duas entidades principais: "clientes" e "lotes". As tabelas correspondentes no Supabase armazenam as informações necessárias para o funcionamento do sistema.

### Estrutura da Tabela `clientes`

| Campo       | Tipo      | Descrição                      |
|-------------|-----------|-------------------------------|
| `id`        | string    | ID do cliente                 |
| `nome`      | string    | Nome do cliente               |
| `codigo`    | string    | Código do cliente              |
| `observacao`| string    | Observações adicionais         |
| `created_at`| timestamp | Data de criação               |
| `updated_at`| timestamp | Data de atualização           |

### Estrutura da Tabela `lotes`

| Campo          | Tipo      | Descrição                      |
|----------------|-----------|-------------------------------|
| `id`           | string    | ID do lote                    |
| `codigo_lote`  | string    | Código do lote                |
| `cliente_id`   | string    | ID do cliente associado       |
| `created_at`   | timestamp | Data de criação               |
| `updated_at`   | timestamp | Data de atualização           |

## Conclusão

Os "Serviços Backend com Supabase" oferecem uma estrutura robusta para gerenciar a interação com o banco de dados no projeto *tecido-lote-gestor*. Através de hooks personalizados e a utilização do Supabase, a aplicação consegue realizar operações de forma eficiente, mantendo a integridade e a segurança dos dados dos clientes e lotes. A implementação modular e a utilização de uma arquitetura de BaaS permitem escalabilidade e manutenção simplificada.