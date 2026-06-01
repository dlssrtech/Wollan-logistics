import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingsService {
  getHealth() {
    return { module: 'bookings', status: 'ready' as const };
  }
}
