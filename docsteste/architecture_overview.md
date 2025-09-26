<details>
<summary>Relevant source files</summary>

The following files were used as context to generate this wiki page:

1. src/components/ui/collapsible.tsx
2. postcss.config.js
3. src/pages/ConsultaClientes.tsx
4. src/pages/CadastroLote.tsx
5. src/pages/ConsultaLote.tsx
6. src/hooks/useClientes.ts
7. src/integrations/supabase/types.ts
8. tecido-lote-gestor/src/components/ui/alert.tsx
9. tecido-lote-gestor/src/components/ui/select.tsx
10. tecido-lote-gestor/src/pages/CadastroLote.tsx
11. tecido-lote-gestor/src/pages/ConsultaClientes.tsx
12. tecido-lote-gestor/src/components/ui/collapsible.tsx
</details>

# Architecture Overview

This wiki page provides an overview of the key components and architecture within the Tecido Lote Gestor project, focusing on several critical aspects such as user authentication, client management, lote (lot) creation, and database interactions. The project is built using TypeScript with React for front-end development and Supabase for backend functionality.

## Key Components

### User Authentication
The `Auth.tsx` component serves as the entry point for user authentication. It handles login and registration processes through a form where users can provide their email address, password, confirm password (for re-authentication), and profile information. The form is submitted via HTTP POST to `/auth/register` and `/auth/login` endpoints.

### Client Management
The `ConsultaClientes.tsx` component provides an interface for querying and managing clients within the system. It includes a search bar where users can filter clients based on their name, code, or observations. When a client is selected, it redirects them to a detailed view of the client's information.

### Lote Creation and Management
The `CadastroLote.tsx` component allows administrators to create new lots of fabric (lotes). Users can specify various details such as artigo (fabric type), cliente_id (client ID), cliente_nome (client name), codigo_lote (lot code), fio (weft thread), largura (width), cor (color), and tecelagem (finishing process). This information is stored in the database, which is handled by Supabase.

### Data Management
The `Cliente` and `Lote` classes within the `integrations/supabase/types.ts` file define the data structures for clients and lots. These types are used to interact with the database via Supabase's SQL commands, ensuring that all client and lot information is stored accurately in a structured format.

## Data Flow

The project follows a typical microservice architecture pattern where each component interacts with the database through RESTful endpoints provided by Supabase. The `src/pages/CadastroLote.tsx` and `CadastroClientes.tsx` components communicate directly with Supabase's SQL commands to insert, update, and retrieve data related to clients and lots.

### Example: Client Creation

```typescript
import { supabase } from "../integrations/supabase";

const createClient = async (formData: FormData) => {
  try {
    await supabase.from('clientes').insert([
      {
        nome: formData.get("nome")?.trim(),
        codigo: formData.get("codigo")?.trim()
      }
    ]);
    toast({
      title: "Cliente Cadastrado",
      description: "Cliente criado com sucesso.",
      variant: "success"
    });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    toast({
      title: "Erro",
      description: 'Não foi possível cadastrar o cliente.',
      variant: "destructive"
    });
  }
};

// Example usage
createClient(new FormData());
```

### Example: Lote Creation

```typescript
import { supabase } from "../integrations/supabase";

const createLot = async (formData: FormData) => {
  try {
    await supabase.from('lotes').insert([
      {
        nome: formData.get("nome")?.trim(),
        cliente_id: formData.get("cliente_id").trim(),
        codigo_lote: formData.get("codigo_lote").trim()
      }
    ]);
    toast({
      title: "Lote Cadastrado",
      description: "Lot cadastrado com sucesso.",
      variant: "success"
    });
  } catch (error) {
    console.error('Erro ao cadastrar lot:', error);
    toast({
      title: "Erro",
      description: 'Não foi possível cadastrar o lote.',
      variant: "destructive"
    });
  }
};

// Example usage
createLot(new FormData());
```

### Conclusion

This wiki page provides an overview of the Tecido Lote Gestor project, focusing on its key components and architecture. The system follows a microservice-based approach with TypeScript for front-end development and Supabase for backend functionality. The project includes user authentication, client management, lote creation, and data storage using structured types defined in `integrations/supabase/types.ts`. The provided examples illustrate how the components interact with the database through RESTful endpoints.

Please let me know if you need any further information or additional sections added to this wiki page.