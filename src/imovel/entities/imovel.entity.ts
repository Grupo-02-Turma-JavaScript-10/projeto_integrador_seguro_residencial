import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plano } from '../../plano/entities/plano.entity';

@Entity({ name: 'tb_imoveis' })
export class Imovel {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 8, nullable: false })
  cep: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  bairro: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  rua: string;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  numero: number;

  @IsNotEmpty()
  @Column({ name: 'tipo_imovel', length: 255, nullable: false })
  tipoImovel: string;

  @IsNotEmpty()
  @Column({ name: 'area_construida', type: 'decimal', precision: 10, scale: 2, nullable: false })
  areaConstruida: number;
  
  @Column({type: 'decimal', precision: 7, scale: 2, nullable:true})
  valor: number;

  @ManyToOne(() => Plano, (plano) => plano.imovel, {
    onDelete: 'CASCADE',
  })
  plano: Plano;
}
