<details>
<summary>Relevant source files</summary>

The following files were used as context to generate this wiki page:

- [README.md](https://github.com/GuilhermeDReis/tecido-lote-gestor/blob/main/README.md)
- [package.json](https://github.com/GuilhermeDReis/tecido-lote-gestor/blob/main/package.json)
</details>

# Getting Started

This wiki page provides a guide for getting started with the *tecido-lote-gestor* application.  It outlines the project setup and installation process based on the provided `README.md` and `package.json` files. This application appears to be focused on managing fabric batches ("tecido-lote"), though specific details about its functionality are limited in the provided documentation.

## Project Setup

This section details the steps to set up the *tecido-lote-gestor* project locally.

### Prerequisites

The project requires Node.js and npm (or yarn) to be installed. Specific version requirements are not explicitly mentioned in the provided documentation.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/GuilhermeDReis/tecido-lote-gestor.git
```

2. Navigate to the project directory:

```bash
cd tecido-lote-gestor
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

After installing the dependencies, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the application in development mode, typically accessible at `http://localhost:3000` or a similar address.

## Project Dependencies

The `package.json` file lists the project's dependencies, which offer insights into the technologies used.  Key dependencies and their purposes are summarized below:

| Dependency              | Description                                                                                          |
| :---------------------- | :--------------------------------------------------------------------------------------------------- |
| `@radix-ui/*`           | Radix UI components for building the user interface.                                               |
| `@supabase/supabase-js` | Supabase client library for interacting with the Supabase backend service.                             |
| `axios`                 | Promise-based HTTP client for making API requests.                                                  |
| `class-variance-authority` | Utility for creating reusable class names based on variants.                                          |
| `cmdk`                  | Command palette UI component.                                                                       |
| `lucide-react`          | Icon library for React.                                                                            |
| `next`                  | Next.js framework for building server-rendered React applications.                                   |
| `react`                 | Core React library.                                                                                 |
| `react-dom`            | React library for rendering components in the browser.                                              |
| `react-hook-form`       | Library for managing forms in React.                                                                |
| `tailwindcss`           | Utility-first CSS framework for styling.                                                             |
| `zustand`               | State management library for React.                                                                  |



## Architecture Overview

Based on the identified technologies, the application likely follows a standard Next.js architecture:

```mermaid
graph TD
    Client[Client (Browser)] --> Next.js[Next.js Server]
    Next.js --> Supabase[Supabase Backend]
    Next.js --> API[External APIs (via axios)]
```

## Getting Started Summary

The *tecido-lote-gestor* project utilizes a modern tech stack including Next.js, Radix UI, and Supabase.  Following the steps outlined above allows for local setup and running of the application.  Further documentation regarding specific features and functionalities would be beneficial for a more complete understanding of the project.
