import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imovel } from '../entities/imovel.entity';
import { Repository, DeleteResult } from 'typeorm';
import { PlanoService } from '../../plano/services/plano.service';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
    private planoService: PlanoService,
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
    await this.planoService.findById(imovel.plano.id);

    imovel.valor = await this.calcularValor(imovel);

    return await this.imovelRepository.save(imovel);
  }

  async update(imovel: Imovel): Promise<Imovel> {
    await this.findById(imovel.id);

    await this.planoService.findById(imovel.plano.id);

    return await this.imovelRepository.save(imovel);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.imovelRepository.delete(id);
  }

  async calcularValor(imovel: Imovel): Promise<number> {
    const plano = await this.planoService.findById(imovel.plano.id)
    const valorBase = imovel.areaConstruida * plano.precoArea;
    let valorFinal = imovel.areaConstruida > 200 ? valorBase + (valorBase * 0.15) : valorBase;

    return valorFinal;
    
  }
}
