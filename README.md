# DataON

A full-stack Next.js application for data management with authentication and a modern UI.

## Features

- Authentication with NextAuth and Google OAuth
- Modern UI with Tailwind CSS and Radix UI
- Responsive navigation
- PostgreSQL database with Prisma ORM
- Protected routes
- Product catalogue management
- Distributor management
- Order status tracking

## Prerequisites

- Node.js 18 or later
- pnpm
- PostgreSQL database

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your values:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/dataon"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

4. Set up the database:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - React components
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Database Schema

- User (NextAuth)
- Catalogue (bean, description, price)
- Distributor (name, city)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
