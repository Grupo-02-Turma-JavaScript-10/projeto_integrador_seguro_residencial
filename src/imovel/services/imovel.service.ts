import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imovel } from '../entities/imovel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
  ) {}

  async findAll(): Promise<Imovel[]> {
    return await this.imovelRepository.find();
  }

  async findById(id: number): Promise<Imovel> {
    const imovel = await this.imovelRepository.findOne({
      where: {
        id,
      },
    });

    if (!imovel)
      throw new HttpException('Imóvel não encontrado!', HttpStatus.NOT_FOUND);

    return imovel;
  }

  async create(imovel: Imovel): Promise<Imovel> {
    // await this.planoService.findById(imovel.plano.id);
    return await this.imovelRepository.save(imovel);
  }

  async update(imovel: Imovel): Promise<Imovel> {
    await this.findById(imovel.id);
    // await this.planoService.findById(imovel.plano.id);
    return await this.imovelRepository.save(imovel);
  }
}
