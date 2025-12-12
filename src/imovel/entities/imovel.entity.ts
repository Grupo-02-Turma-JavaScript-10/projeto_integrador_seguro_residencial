import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ length: 255, nullable: false })
  tipoImovel: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  areaConstruida: number;
}
