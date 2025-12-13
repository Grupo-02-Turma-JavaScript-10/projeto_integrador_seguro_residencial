import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imovel } from '../entities/imovel.entity';
import { Repository, DeleteResult } from 'typeorm';
import { PlanoService } from '../../plano/services/plano.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
    private planoService: PlanoService,
    private loggerService: LoggerService,
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

    if (!imovel) {
      await this.loggerService.erro(`Imóvel id ${id} não encontrado`);

      throw new HttpException('Imóvel não encontrado!', HttpStatus.NOT_FOUND);
    }

    return imovel;
  }

  async create(imovel: Imovel): Promise<Imovel> {
    await this.planoService.findById(imovel.plano.id);

    imovel.valor = await this.calcularValor(imovel);

    const salvaImovel = await this.imovelRepository.save(imovel);

    const stringImovel = JSON.stringify(imovel);

    await this.loggerService.log(`NOVO IMÓVEL CRIADO ${stringImovel}`);

    return salvaImovel;
  }

  async update(imovel: Imovel): Promise<Imovel> {
    await this.findById(imovel.id);

    await this.planoService.findById(imovel.plano.id);

    const atualizaImovel = await this.imovelRepository.save(imovel);

    const stringImovel = JSON.stringify(imovel);

    await this.loggerService.log(`IMÓVEL ATUALIZADO ${stringImovel}`);

    return atualizaImovel;
  }

  async delete(id: number): Promise<DeleteResult> {
    const imovel = await this.findById(id);

    const stringImovel = JSON.stringify(imovel);

    const deletaImovel = await this.imovelRepository.delete(id);

    await this.loggerService.log(`IMÓVEL APAGADO DO REGISTRO ${stringImovel}`);

    return deletaImovel;
  }

  async calcularValor(imovel: Imovel): Promise<number> {
    const plano = await this.planoService.findById(imovel.plano.id);
    const valorBase: number = imovel.areaConstruida * plano.precoArea;
    const valorFinal: number =
      imovel.areaConstruida > 200 ? valorBase + valorBase * 0.15 : valorBase;

    return valorFinal;
  }
}
