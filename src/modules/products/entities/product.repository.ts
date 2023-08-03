import { CreateProductDto } from '../dto/create-product.dto';
import { FinderProductDto } from '../dto/finder-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from './product.entity';

export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductRepository {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findAll(finderProductDto: FinderProductDto): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null>;
  remove(id: string): Promise<Product | null>;
}
