import { PlanoService } from '../services/plano.service';
import { Controller } from '@nestjs/common';

@Controller('/plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}
}
