import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plano } from '../entities/plano.entity';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class PlanoService {
  constructor(
    @InjectRepository(Plano)
    private planoRepository: Repository<Plano>,
    private loggerService: LoggerService,
  ) {}

  async findAll(): Promise<Plano[]> {
    return await this.planoRepository.find({
      relations: {
        imovel: true,
      },
    });
  }

  async findById(id: number): Promise<Plano> {
    const plano = await this.planoRepository.findOne({
      where: {
        id,
      },
      relations: {
        imovel: true,
      },
    });

    if (!plano) {
      await this.loggerService.erro(`Plano id ${id} não encontrado`);
      throw new HttpException('Plano não encontrado!', HttpStatus.NOT_FOUND);
    }

    return plano;
  }

  async findAllByNome(nome: string): Promise<Plano[]> {
    return await this.planoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(plano: Plano): Promise<Plano> {
    const salvaPlano = await this.planoRepository.save(plano);

    const stringPlano = JSON.stringify(plano);

    await this.loggerService.log(`NOVO PLANO CRIADO ${stringPlano}`);

    return salvaPlano;
  }

  async update(plano: Plano): Promise<Plano> {
    await this.findById(plano.id);

    const atualizaPlano = await this.planoRepository.save(plano);

    const stringPlano = JSON.stringify(plano);

    await this.loggerService.log(`PLANO ATUALIZADO ${stringPlano}`);

    return atualizaPlano;
  }

  async delete(id: number): Promise<DeleteResult> {
    const plano = await this.findById(id);

    const deletaPlano = await this.planoRepository.delete(id);

    const stringPlano = JSON.stringify(plano);

    await this.loggerService.log(`PLANO APAGADO DO REGISTRO: ${stringPlano}`);

    return deletaPlano;
  }
}
