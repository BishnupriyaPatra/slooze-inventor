import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
export declare class ProductsResolver {
    private productsService;
    constructor(productsService: ProductsService);
    products(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
        sku: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    product(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
        sku: string;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    productStats(): Promise<{
        totalProducts: number;
        totalValue: number;
        lowStock: number;
        categories: number;
    }>;
    createProduct(input: CreateProductInput): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
        sku: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateProduct(id: number, input: UpdateProductInput): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
        sku: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteProduct(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        quantity: number;
        category: string;
        sku: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
