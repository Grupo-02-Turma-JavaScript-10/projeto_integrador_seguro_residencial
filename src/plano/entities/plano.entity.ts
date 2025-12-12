import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_planos')
export class Plano {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column({type: 'decimal', precision: 3, scale: 2, nullable: false})
    precoarea: string;
}
