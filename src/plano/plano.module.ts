import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plano } from './entities/plano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plano])],
})
export class PlanoModule {}
