import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async getStats() {
    const products = await this.prisma.product.findMany();
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const lowStock = products.filter((p) => p.quantity < 20).length;
    const categories = [...new Set(products.map((p) => p.category))].length;
    return { totalProducts, totalValue, lowStock, categories };
  }

  create(input: CreateProductInput) {
    return this.prisma.product.create({ data: input });
  }

  update(id: number, input: UpdateProductInput) {
    return this.prisma.product.update({ where: { id }, data: input });
  }

  delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
