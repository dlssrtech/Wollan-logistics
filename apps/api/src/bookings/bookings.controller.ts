import { Controller, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Get('health')
  health() {
    return this.service.getHealth();
  }
}
