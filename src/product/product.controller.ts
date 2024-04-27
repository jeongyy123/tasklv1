import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatusValidationPipe } from 'src/pipes/product-status-validation.pipe';
import { ProductStatus } from './product-status.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /* 상품 등록 */
  @Post()
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(
      data.title,
      data.content,
      data.author,
      data.password,
    );
  }

  /* 상품 목록 조회 */
  @Get()
  getProduct() {
    return this.productService.getProduct();
  }

  /* 상품 상세 조회 */
  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  /* 상품 정보 수정 */
  @Patch('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() data: UpdateProductDto,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
  ) {
    return this.productService.updateProduct(
      id,
      data.title,
      data.content,
      data.author,
      data.password,
      data.status,
    );
  }

  /* 상품 삭제 */
  @Delete('/:id')
  deleteProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productService.deleteProduct(id, data.password);
  }
}
