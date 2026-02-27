import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'manager@slooze.com' },
    update: {},
    create: {
      email: 'manager@slooze.com',
      password: hashedPassword,
      name: 'Alex Manager',
      role: Role.MANAGER,
    },
  });

  await prisma.user.upsert({
    where: { email: 'keeper@slooze.com' },
    update: {},
    create: {
      email: 'keeper@slooze.com',
      password: hashedPassword,
      name: 'Sam Keeper',
      role: Role.STORE_KEEPER,
    },
  });

  const products = [
    { name: 'Laptop Pro 15"', description: 'High-performance laptop', price: 1299.99, quantity: 45, category: 'Electronics', sku: 'ELEC-001' },
    { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, quantity: 120, category: 'Electronics', sku: 'ELEC-002' },
    { name: 'Standing Desk', description: 'Adjustable standing desk', price: 599.99, quantity: 20, category: 'Furniture', sku: 'FURN-001' },
    { name: 'USB-C Hub', description: '7-in-1 USB-C hub', price: 49.99, quantity: 80, category: 'Electronics', sku: 'ELEC-003' },
    { name: 'Monitor 27"', description: '4K monitor', price: 449.99, quantity: 35, category: 'Electronics', sku: 'ELEC-004' },
    { name: 'Keyboard Mechanical', description: 'RGB mechanical keyboard', price: 89.99, quantity: 60, category: 'Electronics', sku: 'ELEC-005' },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
