import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductStats {
  @Field(() => Int)
  totalProducts: number;
  @Field(() => Float)
  totalValue: number;
  @Field(() => Int)
  lowStock: number;
  @Field(() => Int)
  categories: number;
}
