import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async create(document: CreateProductDto) {
    const product = this.productsRepository.create(document);
    await this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find({
      withDeleted: false,
      select: ['id', 'name', 'price'],
    });
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne(id, {
      withDeleted: false,
      select: ['id', 'name', 'price'],
    });
    if (!product)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    return product;
  }

  async update(id: string, document: UpdateProductDto) {
    await this.productsRepository.update({ id }, document);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.softDelete(id);
  }
}
