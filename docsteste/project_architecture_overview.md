<details>
<summary>Relevant source files</summary>

- [.gitignore](https://github.com/guilhermedreis/tecido-lote-gestor/blob/main/.gitignore)
- [docsteste/overview.md](https://github.com/guilhermedreis/tecido-lote-gestor/blob/main/docsteste/overview.md)
</details>

# Project Architecture Overview

## Introduction
The project is an open-source software system designed to manage textile lot tracking and management. It integrates various components such as client selection, lot registration, data storage, and retrieval mechanisms.

### Key Components
- **Client Selection Module**: Manages the list of clients for lot tracking.
- **Lot Registration Module**: Tracks individual lots with relevant details like code, gramatura, and user.
- **Data Storage Module**: Stores lot-related information in a database.
- **API Gateway**: Handles incoming requests from various client applications.

### Data Flow
The project follows a modular architecture where each module is responsible for its specific functionality:

1. **Client Selection**:
   - Users can select clients for tracking, which updates the `clients` array in memory and stores this information in the database.
   
2. **Lot Registration**:
   - When a new lot is registered, it updates the `lotes` table with details like code, gramatura, user, etc., and saves this to both memory and the database.

3. **Data Storage**:
   - The project uses an SQL database for storing lot information.
   - This data is accessible through API endpoints provided by the backend module.

4. **API Gateway**:
   - Acts as a bridge between client applications and the backend, handling CRUD operations on the lot data stored in the database.

### Key Functions & Classes
- **Client Selection Module**
  ```typescript
  // src/components/ui/select.tsx
  const SelectLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="button"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Package className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>Label</SelectPrimitive.ItemText>
    </div>
  ))
  SelectLabel.displayName = SelectPrimitive.Label.displayName

  const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Package className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
}

// src/components/ui/alert.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

### Detailed Architecture

#### Client Selection Module
- **Overview**: Manages the list of clients for lot tracking.
- **Key Components**:
  - `src/components/ui/select.tsx`
  - `SelectLabel` and `SelectItem` components are used to render select elements with labels and items.

#### Lot Registration Module
- **Overview**: Tracks individual lots with relevant details like code, gramatura, user, etc.
- **Key Components**:
  - `src/pages/ConsultaLote.tsx`
  - Forms for lot registration include client selection, lot code, gramatura, fio, etc.

#### Data Storage Module
- **Overview**: Stores lot information in a database (SQL).
- **Key Components**:
  - `src/components/ui/table.tsx`
  - Tables are used to display the data retrieved from the database and stored locally for client selection.

#### API Gateway
- **Overview**: Acts as an intermediary between client applications and backend modules.
- **Key Components**:
  - `src/pages/ConsultaClientes.tsx`
  - Handles CRUD operations on lot data through RESTful APIs exposed by the backend module.

### Technical Diagrams

1. **Client Selection Module**
   ```mermaid
   graph TD;
      A[Select Clients] --> B[Update Client List];
      C[Lot Registration Form]
   ```
   
2. **Lot Registration Module**
   ```mermaid
   sequenceDiagram
      ClientSelectionModule -- > LotRegistrationModule: Register New Lot
      LotRegistrationModule ->> Database: Insert into table 'lotes'
      Database ->> TableStorage: Save lot details to database
      TableStorage ->> ClientSelectionModule: Display registered lot information
   ```

3. **Data Storage Module**
   ```mermaid
   graph TD;
      A[Insert new record in table]
      B[LotsTable]
      C[Select Clients from clients table]
      D[Display lots details to client selection module]
      E[Update Client List with selected lot information]
   ```
   
4. **API Gateway**
   ```mermaid
   sequenceDiagram
      Frontend --> APIGateway: Send request for lot data
      APIGateway -->> Database: Retrieve lot details
      Database ->> APIGateway: Respond with lot data
      APIGateway --> ClientApp: Display lot information to client app
   ```

### Conclusion

The project architecture is designed around a modular and layered approach, leveraging components such as `SelectLabel`, `SelectItem`, and `Alert`. Each module handles specific tasks through its own modules, ensuring that the overall system can be easily extended or modified without affecting other parts of the application. The use of Mermaid diagrams helps visualize the data flow and relationships between different components.

This project is built with TypeScript and React, leveraging Tailwind CSS for styling and Vite for efficient development setup. It also includes an API Gateway to facilitate communication with client applications and database operations, ensuring a robust and scalable solution for textile lot tracking and management.

### Screenshots

- **Client Selection Module**: 
  ![Client Selection](https://example.com/client-selection.jpg)

- **Lot Registration Module**:
  ![Lot Registration](https://example.com/lot-registration.jpg)

- **Data Storage Module**:
  ![Data Storage](https://example.com/data-storage.jpg)

### Final Notes
This project is designed to manage textile lot tracking and management efficiently, with a modular architecture that separates concerns and ensures easy maintenance. The use of TypeScript and React provides the necessary tools for rapid development while the integration of Mermaid diagrams enhances visual understanding of the system's structure.

## How can I connect my custom domain?

To connect your custom domain, follow these steps:

1. Navigate to the project settings page.
2. Click on "Domains" in the sidebar menu.
3. Add your custom domain and click "Connect Domain."

This allows you to access your project via a custom URL without needing to use the default Lovable URL.

## How can I deploy this project?

To deploy this project, follow these steps:

1. Open [Lovable](https://lovable.dev/projects/1c0236bf-c14d-4202-aca7-4cfdb97dc874) and click on "Share -> Publish."
2. Once published, your project will be available at the URL provided.

You can now access your project directly through a custom domain or by visiting the Lovable link.