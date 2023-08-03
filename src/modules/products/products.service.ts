import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from './entities/product.repository';
import { FinderProductDto } from './dto/finder-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
  }

  async findAll(finderProductDto: FinderProductDto) {
    return this.productRepository.findAll(finderProductDto);
  }

  async findById(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.update(id, updateProductDto);

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async remove(id: string) {
    const product = await this.productRepository.remove(id);

    if (!product) throw new NotFoundException('product not found');

    return 'Successful Deleted!';
  }
}
