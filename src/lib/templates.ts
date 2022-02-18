export interface MarkdownTemplate {
  name: string;
  description: string;
  content: string;
}

export const templates: MarkdownTemplate[] = [
  {
    name: "Getting Started",
    description: "A basic markdown showcase",
    content: `# Welcome to MD Preview

A live markdown previewer with **GitHub Flavored Markdown** support.

## Features

- **Bold**, *italic*, and ~~strikethrough~~ text
- [Links](https://example.com) and images
- Code blocks with syntax highlighting
- Tables and task lists

## Code Example

Inline code: \`const x = 42;\`

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return { greeting: \`Hi \${name}\`, timestamp: Date.now() };
}

greet("World");
\`\`\`

## Blockquote

> "The best way to predict the future is to invent it."
> -- Alan Kay

## Table

| Feature     | Status | Notes           |
| ----------- | ------ | --------------- |
| GFM         | Done   | Full support    |
| Highlighting| Done   | rehype-highlight|
| Toolbar     | Done   | Insert shortcuts|

## Task List

- [x] Write markdown parser
- [x] Add GFM support
- [ ] Add export to PDF
- [ ] Add dark/light theme toggle

---

*Built with Next.js, React Markdown, and Tailwind CSS.*
`,
  },
  {
    name: "API Documentation",
    description: "REST API docs template",
    content: `# API Reference

Base URL: \`https://api.example.com/v1\`

## Authentication

All requests require a Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <your-api-key>
\`\`\`

## Endpoints

### GET /users

Retrieve a list of users.

**Query Parameters:**

| Parameter | Type   | Required | Description          |
| --------- | ------ | -------- | -------------------- |
| page      | number | No       | Page number (def: 1) |
| limit     | number | No       | Items per page (def: 20) |
| search    | string | No       | Filter by name       |

**Response:**

\`\`\`json
{
  "data": [
    {
      "id": "usr_abc123",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20
  }
}
\`\`\`

### POST /users

Create a new user.

**Request Body:**

\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "admin"
}
\`\`\`

**Response:** \`201 Created\`

### Error Codes

| Code | Description          |
| ---- | -------------------- |
| 400  | Bad Request          |
| 401  | Unauthorized         |
| 404  | Not Found            |
| 429  | Rate Limited         |
| 500  | Internal Server Error|
`,
  },
  {
    name: "Project README",
    description: "Standard project readme template",
    content: `# Project Name

Short description of what this project does and who it's for.

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/user/project.git
cd project

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Usage

\`\`\`typescript
import { MyLib } from "my-lib";

const client = new MyLib({ apiKey: "your-key" });
const result = await client.process({ input: "data" });
console.log(result);
\`\`\`

## Configuration

Create a \`.env.local\` file:

\`\`\`env
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your-secret-key
PORT=3000
\`\`\`

## Project Structure

\`\`\`
src/
  app/          # Next.js app router
  components/   # React components
  lib/          # Utility functions
  types/        # TypeScript types
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing\`)
3. Commit changes (\`git commit -m "Add amazing feature"\`)
4. Push to branch (\`git push origin feature/amazing\`)
5. Open a Pull Request

## License

MIT
`,
  },
];
