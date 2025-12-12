import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Imovel } from '../../imovel/entities/imovel.entity';

@Entity('tb_planos')
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  precoarea: string;

  @OneToMany(() => Imovel, (imovel) => imovel.plano)
  imovel: Imovel;
}
