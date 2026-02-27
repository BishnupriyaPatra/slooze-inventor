import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => Float)
  price: number;
  @Field(() => Int)
  quantity: number;
  @Field()
  category: string;
  @Field()
  sku: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
