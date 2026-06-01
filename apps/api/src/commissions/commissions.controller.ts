import { Controller, Get } from '@nestjs/common';
import { CommissionsService } from './commissions.service';

@Controller('commissions')
export class CommissionsController {
  constructor(private readonly service: CommissionsService) {}

  @Get('health')
  health() {
    return this.service.getHealth();
  }
}
