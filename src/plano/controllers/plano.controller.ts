import { Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { Plano } from '../entities/plano.entity';
import { PlanoService } from '../services/plano.service';



@Controller('/planos')
export class PlanoController {
  constructor(private readonly planoService:PlanoService) { }

@Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Plano[]> {
    return this.planoService.findAll();
  }


  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.planoService.delete(id);
  }
  
}