import { Injectable } from '@nestjs/common';

@Injectable()
export class CommissionsService {
  getHealth() {
    return { module: 'commissions', status: 'ready' as const };
  }
}
