import { Body, Controller, HttpCode, HttpStatus, Post, Put} from '@nestjs/common';
import { ImovelService} from '../services/imovel.service';
import{Imovel} from '../entities/imovel.entity';

@Controller('/imovel')
export class ImovelController {
 constructor(private readonly imovelService: ImovelService){}






    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() imovel: Imovel): Promise<Imovel>{
      return this.imovelService.create(imovel);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() imovel: Imovel): Promise <Imovel>{
      return this.imovelService.update(imovel); 
    }

    
}
