# 📦 Slooze Inventory Management System

Full-stack inventory management for the Slooze careers challenge.

## Tech Stack
- **Frontend**: Next.js 14 · TypeScript · Tailwind CSS · Apollo Client
- **Backend**: NestJS · GraphQL · Prisma ORM · PostgreSQL
- **Auth**: JWT · Passport.js · RBAC

## Features & Points
| Feature | Manager | Store Keeper | Points |
|---------|---------|-------------|--------|
| Login | ✅ | ✅ | 5 |
| Dashboard | ✅ | ❌ | 30 |
| View Products | ✅ | ✅ | 10 |
| Add/Edit Products | ✅ | ✅ | 15 |
| Light/Dark Mode | ✅ | ✅ | 15 |
| Role-Based Menu Restriction | ✅ | ✅ | 25 (Bonus) |

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Set DATABASE_URL and JWT_SECRET
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev      # http://localhost:4000/graphql
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev            # http://localhost:3000
```

## Demo Credentials
| Role | Email | Password |
|------|-------|---------|
| Manager | manager@slooze.com | password123 |
| Store Keeper | keeper@slooze.com | password123 |

## Role Access
- **Manager**: Dashboard + all product operations + delete
- **Store Keeper**: View/Add/Edit products only, no Dashboard access

## GraphQL API (localhost:4000/graphql)
- `login(email, password)` → JWT token
- `products` → list all (auth required)
- `productStats` → stats (Manager only)
- `createProduct / updateProduct / deleteProduct` → CRUD
