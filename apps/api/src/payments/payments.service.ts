import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  getHealth() {
    return { module: 'payments', status: 'ready' as const };
  }
}
