import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imovel } from './entities/imovel.entity';
import { ImovelController } from './controllers/imovel.controller';
import { ImovelService } from './services/imovel.service';
import { PlanoModule } from '../plano/plano.module';

@Module({
  imports: [TypeOrmModule.forFeature([Imovel]), PlanoModule],
  controllers: [ImovelController],
  providers: [ImovelService],
  exports: [],
})
export class ImovelModule {}
