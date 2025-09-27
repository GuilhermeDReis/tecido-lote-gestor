<details>
<summary>Relevant source files</summary>

- [.gitignore](https://github.com/guilhermedreis/tecido-lote-gestor/blob/main/.gitignore)
- [docsteste/data_management.md](https://github.com/guilhermedreis/tecido-lote-gestor/blob/main/docsteste/data_management.md)
</details>

# Data Flow in tecido-lote-gestor

Data flow within the `tecido-lote-gestor` project is designed to manage various aspects of client and lot data, ensuring efficient handling and retrieval. The system architecture prioritizes flexibility, security, and scalability by leveraging state-of-the-art technologies such as Supabase for database interactions.

## Overview
The core functionalities include:
- Client Management: Handling new clients, updating existing ones, deleting clients, and searching for clients.
- Lot Management: Tracking lot details including client information, gramatura, fio, color, etc., with support for multiple types of lots.
- User Authentication: Implementing secure login/signup processes using Supabase.

## Data Flow Architecture

### Client Handling
1. **Client Creation**
   - When a new client is created, the system inserts the data into the `clients` table via `supabase`.
     ```ts
     await supabase.from('clients').insert([clientData]).select().single();
     ```
   
2. **Client Update**
   - For updating an existing client, the system updates the record in the `clients` table.
     ```ts
     await supabase.from('clients').update(client).eq('id', id).select().single();
     ```

3. **Client Deletion**
   - The system deletes a client from the database using its ID.
     ```ts
     const { error } = await supabase.from('clients').delete().eq('id', id);
     if (error) throw new Error('Error deleting client');
     ```
   
4. **Search for Clients**
   - To search clients by name or code, the system filters the `clientes` table based on provided criteria.
     ```ts
     const { data, error } = await supabase.from('clientes').select('*')
       .or(`nome.ilike.%${termo}%, codigo.ilike.%${termo}%`)
       .order('nome', { ascending: true })
       .limit(10);
     ```

### Lot Management
1. **Lot Creation**
   - When creating a new lot, the system inserts the data into the `lotes` table via Supabase.
     ```ts
     await supabase.from('lots').insert([lotData]).select().single();
     ```
   
2. **Lot Update**
   - For updating an existing lot, the system updates the record in the `lotes` table.
     ```ts
     const { data, error } = await supabase.from('lotes')
       .update(lot)
       .eq('id', id)
       .select()
       .single();
     ```

3. **Lot Deletion**
   - The system deletes a lot from the database using its ID.
     ```ts
     const { error } = await supabase.from('lots').delete().eq('id', id);
     if (error) throw new Error('Error deleting lot');
     ```
   
4. **Search for Lots**
   - To search lots by client name, code, or other criteria, the system filters the `lotes` table based on provided information.
     ```ts
     const { data, error } = await supabase.from('lots').select('*')
       .or(`cliente.nome.ilike.%${termo}%, codigo.ilike.%${termo}%`)
       .order('nome', { ascending: true })
       .limit(10);
     ```

### User Authentication
- The system utilizes Supabase's authentication features to manage user login and profile data.
  ```ts
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw new Error('Error signing in');
  ```

## Key Components

- **Supabase Database:** The backbone of the project, providing real-time access to the database.
- **Supabase Auth:** Securely handles user authentication and profile data.

### Mermaid Diagrams
- **Client CRUD Operations**
  ```mermaid
  graph TD;
    Clients ->>> Clients: Insert | Update | Delete

    Lots ->>> Lots: Insert | Update | Delete
  ```

- **User Authentication Sequence Diagram**
  ```mermaid
  sequenceDiagram
    User ->> Supabase Auth: Sign In
    Supabase Auth -->|OK| Supabase Auth Service:
      - Validates credentials
      - Authenticates user
    Supabase Auth Service -->> Supabase: OK
    Supabase ->> User: Logged in

    Client --> Supabase Auth: Sign Out
    Supabase Auth Service -->> Supabase: Authenticated
  ```

### Tables

- **Client Table Schema**
  ```sql
  CREATE TABLE clients (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      user_id VARCHAR(255),
      user_name VARCHAR(255)
  );
  ```
  
- **Lot Table Schema**
  ```sql
  CREATE TABLE lots (
      id SERIAL PRIMARY KEY,
      cliente_id VARCHAR(255),
      codigo_lote VARCHAR(255) NOT NULL,
      cor VARCHAR(255),
      gramatura VARCHAR(255),
      fio VARCHAR(255)
  );
  ```

## Conclusion

The data flow in `tecido-lote-gestor` is designed to ensure robust client and lot management, leveraging Supabase for database interactions. The system architecture prioritizes security, scalability, and flexibility by handling CRUD operations efficiently and securely through well-structured code examples.

This comprehensive approach guarantees the project remains scalable, secure, and user-friendly, making it a valuable tool in managing clients and lots within a textile enterprise environment.