import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imovel } from '../entities/imovel.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
  ) {}

  async findAll(): Promise<Imovel[]> {
    return await this.imovelRepository.find({
      relations: {
        plano: true,
      },
    });
  }

  async findById(id: number): Promise<Imovel> {
    const imovel = await this.imovelRepository.findOne({
      where: {
        id,
      },
      relations: {
        plano: true,
      },
    });

    if (!imovel)
      throw new HttpException('Imóvel não encontrado!', HttpStatus.NOT_FOUND);

    return imovel;
  }

  async create(imovel: Imovel): Promise<Imovel> {
    return await this.imovelRepository.save(imovel);
  }

  async update(imovel: Imovel): Promise<Imovel> {
    await this.findById(imovel.id);
    return await this.imovelRepository.save(imovel);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.imovelRepository.delete(id);
  }
}
