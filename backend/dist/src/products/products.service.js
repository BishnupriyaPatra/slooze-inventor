"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    }
    findOne(id) {
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
    create(input) {
        return this.prisma.product.create({ data: input });
    }
    update(id, input) {
        return this.prisma.product.update({ where: { id }, data: input });
    }
    delete(id) {
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map