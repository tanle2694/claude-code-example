# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. It allows users to describe components in natural language and see them generated and rendered in real-time using a virtual file system.

## Essential Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production bundle
npm test             # Run Vitest test suite
npm run lint         # Run Next.js linting
```

### Database Management
```bash
npm run setup        # Initial setup: install deps, generate Prisma client, run migrations
npm run db:reset     # Reset SQLite database (WARNING: destroys all data)
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma migrate dev # Create and apply new migrations
```

### Testing
```bash
npm test                    # Run all tests
npm test -- --watch        # Run tests in watch mode
npm test -- path/to/test   # Run specific test file
```

## Architecture Overview

### Virtual File System
The application uses an in-memory virtual file system (`src/lib/file-system.ts`) rather than writing files to disk. All file operations (create, read, update, delete) happen in memory and can be serialized for database persistence.

### AI Integration Pattern
- **Provider**: `src/lib/provider.ts` manages AI model access with fallback to mock provider
- **Tools**: AI has access to file management tools in `src/lib/tools/`
- **Prompts**: Component generation prompts in `src/lib/prompts/`
- **API Route**: Chat endpoint at `src/app/api/chat/route.ts` handles streaming responses

### State Management
- **ChatContext**: `src/lib/contexts/chat-context.tsx` - Manages chat messages and AI interactions
- **FileSystemContext**: `src/lib/contexts/file-system-context.tsx` - Manages virtual file system state
- **Server Actions**: `src/actions/` - Next.js server actions for database operations

### Component Structure
- UI components use shadcn/ui library (in `src/components/ui/`)
- Custom components are organized by feature (chat/, editor/, preview/)
- All components are TypeScript with proper type definitions

### Testing Approach
- Tests use Vitest with React Testing Library
- Mock implementations for UI components in `src/components/ui/__mocks__/`
- Test files located in `__tests__` directories alongside source files
- Focus on user interactions and state management testing

## Key Technical Details

### Path Aliases
TypeScript is configured with `@/*` alias pointing to `src/*`. Always use this alias for imports:
```typescript
import { Component } from '@/components/ui/button'  // ✓ Correct
import { Component } from '../../../components/ui/button'  // ✗ Avoid
```

### Tailwind CSS v4
The project uses Tailwind CSS v4 with configuration directly in `src/app/globals.css`. No separate `tailwind.config.js` file exists.

### Database Schema
- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database 
- Prisma with SQLite manages two main models:
  - **User**: Authentication and user management
  - **Project**: Stores generated components with serialized file system

### Environment Variables
Required in `.env`:
- `ANTHROPIC_API_KEY`: For Claude AI integration
- `JWT_SECRET`: For authentication
- `DATABASE_URL`: SQLite connection string (default: `file:./dev.db`)

## Development Workflow

1. **Feature Development**: Create feature branches, implement with tests
2. **Component Generation**: AI tools modify the virtual file system, not actual files
3. **Testing**: Write tests for new features, ensure existing tests pass
4. **Database Changes**: Update Prisma schema, generate migration, apply it

## Important Conventions

- All React components should be functional components with TypeScript
- Use shadcn/ui components where possible for consistency
- Follow existing file organization patterns
- Maintain comprehensive test coverage for new features
- Server components in app directory, client components marked with 'use client'

## Code Style Guidelines

- Use comments sparingly. Only comment complex code