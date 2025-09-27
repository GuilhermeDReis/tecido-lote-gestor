# Process Workflows in tecido-lote-gestor

## Introduction:

Process Workflows is a critical module within the tecido-lote-gestor project. This section provides an overview of its purpose, functionality, and how it interacts with other modules to manage various aspects of textile lot management.

### Key Components:

- **Lotes Module**: Manages lot details including codes, gramatura, fio, etc.
- **Clientes Module**: Handles client information such as names, user credentials.
- **Consultas Module**: Provides functionalities for searching and viewing lots by clients or codes.

## Detailed Sections:

### 1. Lotes Management (src/components/lotos/Lotes.tsx)

#### Architecture:
The Lotes module uses a flowchart to illustrate the data flow between different components in managing lot information. 

```
sequenceDiagram
participant LotosService
participant ClientesService
participant SearchService

LotosService->>ClientesService: Retrieve client details
LotosService->>SearchService: Fetch lot by code or name
LotosService-->>client: Get client's lot codes
LotosService-->>search: Find lot based on provided criteria
```

#### Data Flow:
- The `Lotes` component sends a request to the `ClientesService` for client details.
- It then passes this information along with the search criteria to the `SearchService`.
- This service fetches relevant lot data from the database.

### 2. Client Management (src/components/clientes/Clientes.tsx)

#### Architecture:
The Client module uses a class diagram to depict how different classes interact in managing client details.

```
class Cliente {
  id: string
  nome: string
  observacao?: string | null
  created_at: string
}

interface ClienteService {
  findById(id: string): Promise<Cliente>
  findByName(name: string): Promise<Cliente[]>
}
```

#### Key Functions:
- `findById`: Retrieves client details by ID.
- `findByName`: Fetches clients by name or code.

### 3. Search Functionality (src/components/search/Search.tsx)

#### Architecture:
The search functionality uses a flowchart to show the logic for searching lot and client information based on different filters.

```
sequenceDiagram
participant LotosService
participant ClientesService

LotosService->>Search: Find lots by code or name
LotosService-->>search: Search lots with provided parameters
ClientesService->>Search: Find clients by name or code
ClientesService-->>search: Search clients matching the criteria
```

#### Key Functions:
- `findLotsByCodeOrName`: Searches lots based on their codes or names.
- `findClientsByNameOrCode`: Fetches clients with given names or codes.

### 4. Consulta Lote (src/pages/ConsultaLote.tsx)

#### Architecture:
The consulta lote page uses a flowchart to illustrate how it displays lot details and client information for a specific lot code.

```
flowchart TD
node[style=filled fillcolor=lightblue]
A [Cliente] -> B: "Nome do Cliente"
B --> C: "Lote Encontrado"
C --> D: "Informações do Lote"
D --> E: "Status do Lote"

A --> F: "Consulta"
F --> G: "Buscar Lote por Código" 
G --> H: "Buscar Lote por Nome" 
H --> I: "Verificar Existência de Lote"
I -> J: "Seu Lote Não Encontrado"
J --> K: "Lote Encontrado"

B -> L: "Informações do Cliente"
K --> L: "Visualizar Informações do Cliente"

B --> M: "Não Encontrado"
M -> N: "Verificar Existência de Lote" 
N --> O: "Seu Lote Não Encontrado"
O --> P: "Lote Encontrado"

J --> Q: "Excluir Lote"
Q -> R: "Confirmar Exclusão"
R -> S: "Excluir Lote com Sucesso"
S --> T: "Lote Excluído Com Sucesso" 
T -> U: "Não Excluído, Verifique Código"
U --> V: "Verificar Existência de Lote"

B --> W: "Visualizar Informações do Cliente"
W --> X: "Atualizar Cliente"
X --> Y: "Atualização com Sucesso"
Y --> Z: "Cliente Atualizado Com Sucesso" 
Z -> AA: "Não Excluído, Verifique Código"

J --> BB: "Excluir Lote por Código"
BB --> CC: "Confirmar Exclusão"
CC -> DD: "Lote Não Encontrado"
DD --|> EE: "Lote Excluído Com Sucesso" 
EE -> FF: "Lote Excluído com Sucesso" 

J --> GG: "Visualizar Informações do Cliente"
GG --> HH: "Atualizar Cliente"
HH --> II: "Atualização com Sucesso"
II -> JJ: "Cliente Atualizado Com Sucesso" 
JJ -> KK: "Não Excluído, Verifique Código"

B --> LL: "Voltar à Consulta de Lotes"
LL -> MM: "Retornar ao Painel Principal"
```

#### Key Functions:
- `findLotByCodeOrName`: Searches lots by code or name.
- `findClientByNameOrCode`: Fetches clients based on names or codes.

### 5. Cadastro Novo Lote (src/pages/CadastroLote.tsx)

#### Architecture:
The cadastro novo lote page uses a flowchart to show the process of creating new lot entries, including client information and status updates.

```
sequenceDiagram
participant LotosService
participant ClientesService

LotosService->>ClientesService: Send client details for new lot creation
LotesService-->>clientes: Get client's data
LotesService-->>SearchService: Find existing lots by code or name
LotesService-->>lote: Create new lot entry with provided information
```

#### Key Functions:
- `createNewLot`: Generates a new lot record.
- `sendClientDetails`: Sends details to the `ClientesService` for creation.

### 6. Consulta Clientes (src/pages/ConsultaClientes.tsx)

#### Architecture:
The consulta clientes page uses a class diagram to show how client information is queried and displayed in various views.

```
class Cliente {
  id: string
  nome: string
  observacao?: string | null
  created_at: string
}

interface ClientesService {
  findByName(name: string): Promise<Cliente[]>
}
```

#### Key Functions:
- `findClientsByName`: Fetches clients by name or code.
- `displayClientInfo`: Displays client details in different views.

### Technical Diagrams:

1. **Flowchart for Lotos Service**:
   ```
   flowchart TD
   A [Lotes] -> B: "Criar Novo Lote"
   B --> C: "Enviar Clientes" 
   C --> D: "Verificar Exclusão" 
   D --|> E: "Excluir Lote por Código" 
   E --> F: "Confirmar Exclusão" 
   F -> G: "Lote Não Encontrado" 
   G --|> H: "Lote Excluído com Sucesso"
   
   A --> H
   ```

2. **Sequence Diagram for Client Service**:
   ```
   sequenceDiagram
   participant ClienteService
   participant LotesService
   
   ClienteService->>LotesService: Find clients by name or code
   LotesService-->>ClienteService: Get client's details
   ```

### Conclusion:

Process Workflows in tecido-lote-gestor is a key module for managing textile lot information. It includes functionalities for searching, creating new lots, and displaying client information. The detailed sections provide architectural insights and code examples that illustrate how the various components interact to achieve these goals.

This comprehensive overview of Process Workflows within the tecido-lote-gestor project serves as an essential reference for developers aiming to understand and improve upon this critical module.
