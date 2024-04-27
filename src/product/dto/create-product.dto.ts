import { IsNumber, IsString } from 'class-validator';
import { ProductStatus } from '../product-status.enum';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsNumber()
  password: number;

  @IsString()
  status: ProductStatus;
}
