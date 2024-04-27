import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from './product-status.enum';

@Entity({ schema: 'product', name: 'product' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 1000 })
  content: string;

  @Column('varchar', { length: 10 })
  author: string;

  @Column({ select: false })
  password: number;

  @Column()
  status: ProductStatus;

  @CreateDateColumn()
  creatdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
