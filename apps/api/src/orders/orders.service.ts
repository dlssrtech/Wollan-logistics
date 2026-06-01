import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  getHealth() {
    return { module: 'orders', status: 'ready' as const };
  }
}
