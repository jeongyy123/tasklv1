import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductStatus } from 'src/product/product-status.enum';

export class ProductStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [ProductStatus.FOR_SALE, ProductStatus.SOLD_OUT];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} 올바른 옵션이 아닙니다.`);
    }

    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
