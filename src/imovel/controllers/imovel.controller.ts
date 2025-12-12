import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() imovel: Imovel): Promise<Imovel> {
    return this.imovelService.create(imovel);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() imovel: Imovel): Promise<Imovel> {
    return this.imovelService.update(imovel);
  }
}
