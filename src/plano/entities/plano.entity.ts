import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Imovel } from '../../imovel/entities/imovel.entity';

@Entity({ name: 'tb_planos' })
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({
    name: 'preco_area',
    type: 'decimal',
    precision: 7,
    scale: 2,
    nullable: false,
  })
  precoArea: number;

  @OneToMany(() => Imovel, (imovel) => imovel.plano)
  imovel: Imovel[];
}
