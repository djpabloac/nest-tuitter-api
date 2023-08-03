import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { FinderProductDto } from '../dto/finder-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../entities/product.repository';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from '../schemas/product.schema';

@Injectable()
export default class ProductMongoRepository implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: ProductModel,
  ) {}

  private mapToProduct(rawProduct: ProductDocument) {
    const product = new Product();

    product.id = rawProduct._id.toString();
    product.name = rawProduct.name;
    product.qta = rawProduct.qta;
    product.createdAt = rawProduct.createdAt;
    product.updatedAt = rawProduct.updatedAt;

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(createProductDto);

    return this.mapToProduct(createdProduct);
  }

  async findAll(finderProductDto: FinderProductDto): Promise<Product[]> {
    const products = await this.productModel
      .find({
        name: {
          $regex: finderProductDto.searchTerm,
          $options: 'i',
        },
      })
      .lean();

    return products.map(this.mapToProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id).lean();

    if (!product) return null;

    return this.mapToProduct(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, {
        $set: {
          name: updateProductDto.name,
          qta: updateProductDto.qta,
        },
      })
      .lean();

    if (!updatedProduct) return null;

    return this.mapToProduct(updatedProduct);
  }

  async remove(id: string): Promise<Product | null> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).lean();

    if (!deletedProduct) return null;

    return this.mapToProduct(deletedProduct);
  }
}
