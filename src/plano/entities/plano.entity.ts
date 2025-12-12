/* eslint-disable prettier/prettier */
import { Entity } from 'typeorm';

@Entity('tb_planos')
export class Plano {
    
    id: number;
    nome: string;
    precoarea: string;
}
