import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: number;
  @Field()
  email: string;
  @Field()
  name: string;
  @Field()
  role: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;
  @Field(() => UserType)
  user: UserType;
}
