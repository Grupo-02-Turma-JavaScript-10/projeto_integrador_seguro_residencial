import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imovel } from './entities/imovel.entity';
import { ImovelController } from './controllers/imovel.controller';
import { ImovelService } from './services/imovel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imovel])],
  controllers: [ImovelController],
  providers: [ImovelService],
})
export class ImovelModule {}
