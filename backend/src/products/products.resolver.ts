import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { ProductStats } from './models/product-stats.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GqlAuthGuard, RolesGuard, Roles } from '../auth/guards';

@Resolver(() => Product)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Query(() => ProductStats)
  @Roles('MANAGER')
  productStats() {
    return this.productsService.getStats();
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.create(input);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Product)
  @Roles('MANAGER')
  deleteProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.delete(id);
  }
}
