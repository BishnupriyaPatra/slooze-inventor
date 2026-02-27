import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getStats(): Promise<{
        totalProducts: number;
        totalValue: number;
        lowStock: number;
        categories: number;
    }>;
    create(input: CreateProductInput): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, input: UpdateProductInput): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
