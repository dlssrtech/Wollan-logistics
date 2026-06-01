import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getHealth() {
    return { module: 'admin', status: 'ready' as const };
  }
}
