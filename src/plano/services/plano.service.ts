import { Injectable } from '@nestjs/common';
import { DeleteResult,  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plano } from '../entities/plano.entity';

@Injectable()
export class PlanoService{
    constructor(
        @InjectRepository(Plano)
        private planoRepository: Repository<Plano>,
    ){}

async findAll(): Promise<Plano[]> {
        return await this.planoRepository.find({
            relations: {
                imovel: true
            }
        });
    }


  async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.planoRepository.delete(id);

    }
}