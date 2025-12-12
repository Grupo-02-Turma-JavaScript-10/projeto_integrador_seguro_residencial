import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ImovelService } from '../services/imovel.service';
import { Imovel } from '../entities/imovel.entity';

@Controller('/imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Imovel[]> {
    return this.imovelService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Imovel> {
    return this.imovelService.findById(id);
  }
}
