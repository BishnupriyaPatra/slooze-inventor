import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
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
}
