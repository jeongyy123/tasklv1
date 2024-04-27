import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductStatus } from './product-status.enum';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: ProductRepository,
  ) {}

  /* 상품 등록 */
  createProduct(
    title: string,
    content: string,
    author: string,
    password: number,
  ) {
    return this.productRepository.insert({
      title,
      content,
      author,
      password,
      status: ProductStatus.FOR_SALE,
    });
  }

  /* 상품 목록 조회 */
  getProduct() {
    return this.productRepository.find({ where: { deletedAt: null } });
  }

  /* 상품 상세 조회 */
  getProductById(id: number) {
    return this.productRepository.findOne({ where: { id, deletedAt: null } });
  }

  /* 상품 정보 수정 */
  async updateProduct(
    id: number,
    title: string,
    content: string,
    author: string,
    password: number,
    status: ProductStatus,
  ) {
    await this.checkProductPassword(id, password);

    return await this.productRepository.update(id, {
      title,
      content,
      author,
      password,
      status,
    });
  }

  /* 상품 삭제 */
  async deleteProduct(id: number, password: number) {
    await this.checkProductPassword(id, password);

    return await this.productRepository.softDelete(id);
  }

  /* 상품 비밀번호 확인 */
  private async checkProductPassword(id: number, password: number) {
    const product = await this.productRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    if (!product) {
      throw new NotFoundException(`해당 id: ${id}의 상품이 존재하지 않습니다.`);
    }

    if (product.password !== password) {
      throw new UnauthorizedException(`해당 상품의 비밀번호가 맞지않습니다.`);
    }
  }
}
