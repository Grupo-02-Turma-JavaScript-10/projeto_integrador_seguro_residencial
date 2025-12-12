import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Imovel } from '../entities/imovel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanoService } from '../../plano/services/plano.service';

@Injectable()
export class ImovelService {
constructor(
        @InjectRepository(Imovel)
        private readonly imovelRepository: Repository<Imovel>,
        private readonly planoService: PlanoService,
    ) {}
 






    async create(imovel:Imovel):Promise<Imovel>{
        await this.planoService.findById(imovel.plano.id)
       return await this.imovelRepository.save(imovel);
    }
 
    async update(imovel:Imovel):Promise<Imovel>{        
        await this.findById(imovel.id);
        await this.planoService.findById(imovel.plano.id); 
        return await this.imovelRepository.save(imovel);
    }
}

    

