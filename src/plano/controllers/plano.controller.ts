import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Plano } from '../entities/plano.entity';
import { PlanoService } from '../services/plano.service';

@Controller('/planos')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Plano[]> {
    return this.planoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Plano> {
    return this.planoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Plano[]> {
    return this.planoService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() plano: Plano): Promise<Plano> {
    return this.planoService.create(plano);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.planoService.delete(id);
  }
}
