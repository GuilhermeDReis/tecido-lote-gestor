<details>
<summary>Relevant source files</summary>

The following files were used as context to generate this wiki page:

- [src/integrations/supabase/client.ts](https://github.com/GuilhermeDReis/tecido-lote-gestor/blob/main/src/integrations/supabase/client.ts)
- [src/hooks/useClientes.ts](https://github.com/GuilhermeDReis/tecido-lote-gestor/blob/main/src/hooks/useClientes.ts)
- [src/hooks/useLotes.ts](https://github.com/GuilhermeDReis/tecido-lote-gestor/blob/main/src/hooks/useLotes.ts)
</details>

# Data Management

This document describes the data management system within the "tecido-lote-gestor" application.  It outlines the architecture, key components, and data flow related to managing "clientes" (clients) and "lotes" (batches/lots). The system utilizes Supabase as its backend database and leverages custom React hooks for data interaction.

## Data Interactions

The application interacts with Supabase using custom hooks, abstracting data access logic and providing convenient methods for data manipulation.

### `useClientes` Hook

This hook manages all interactions related to client data.

#### Functionalities

*   **`salvarCliente(cliente: Cliente)`:** Saves a new client to the `clientes` table.
*   **`atualizarCliente(id: string, cliente: Partial<Cliente>)`:** Updates an existing client in the `clientes` table.
*   **`excluirCliente(id: string)`:** Deletes a client from the `clientes` table.
*   **`buscarClientes(termo: string)`:** Searches for clients based on a search term.

#### Example: Saving a New Client

```typescript
// src/hooks/useClientes.ts

const salvarCliente = async (cliente: Cliente) => {
  try {
    // ... (Loading state management)

    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente])
      .select()
      .single();

    if (error) {
      throw error;
    }

    setClientes(prev => [...prev, data].sort((a, b) => a.nome.localeCompare(b.nome)));
      
    // ... (Toast notification)

    return data;
  } catch (error: any) {
    // ... (Error handling and toast notification)
  } finally {
    // ... (Loading state management)
  }
};
```

#### Sequence Diagram: Saving a Client

```mermaid
sequenceDiagram
  participant Component
  participant useClientes
  participant Supabase

  Component->>+useClientes: salvarCliente(cliente)
  useClientes->>+Supabase: insert into clientes (cliente)
  Supabase-->>-useClientes: data, error
  useClientes->>-Component: data
```

### `useLotes` Hook

This hook manages interactions related to batch/lot data.

#### Functionalities

*   **`salvarLote(lote: Lote)`:** Saves a new batch/lot to the `lotes` table.
*   **`buscarLotePorCodigo(codigo: string)`:** Retrieves a batch/lot by its code.
*   **`carregarLotes()`:** Loads all batches/lots.

#### Example: Searching for a Batch/Lot by Code

```typescript
// src/hooks/useLotes.ts

const buscarLotePorCodigo = async (codigo: string): Promise<Lote | null> => {
  try {
    // ... (Loading state management)
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
    // ... (Error handling and toast notification)
    return null;
  } finally {
    // ... (Loading state management)
  }
};
```

#### Sequence Diagram: Searching for a Batch/Lot

```mermaid
sequenceDiagram
    participant Component
    participant useLotes
    participant Supabase

    Component->>+useLotes: buscarLotePorCodigo(codigo)
    useLotes->>+Supabase: select * from lotes where codigo_lote = codigo
    Supabase-->>-useLotes: data, error
    useLotes->>-Component: data / null
```


## Supabase Integration

The application uses the Supabase client library for database interactions.

### Client Initialization

```typescript
// src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase URL and public key
const SUPABASE_URL = "https://mucfueexayxqogwgtmvv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11Y2Z1ZWV4YXl4cW9nd2d0bXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTY5ODAsImV4cCI6MjA2MzkzMjk4MH0.Pnv470bTkipaosVRJ7btcblqCBT0chhSaN8D40E42Jg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```

The `createClient` function initializes the Supabase client with the provided URL and public key.  This client is then used throughout the application for database operations.


## Data Model

The application manages two primary data entities: "clientes" and "lotes."  These are stored in corresponding Supabase tables.  While the exact schema isn't explicitly defined in the provided files, the code suggests the following key fields:

### `clientes` Table

| Field      | Description |
| :--------- | :---------- |
| `id`       | Client ID   |
| `nome`     | Client Name |
|`created_at`| Creation Timestamp|
|`updated_at`| Update Timestamp|

### `lotes` Table

| Field          | Description             |
| :------------- | :---------------------- |
| `id`           | Batch/Lot ID           |
| `codigo_lote` | Batch/Lot Code         |
| `cliente_id`   | Associated Client ID    |
|`created_at`| Creation Timestamp|
|`updated_at`| Update Timestamp|


