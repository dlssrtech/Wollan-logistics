import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  getHealth() {
    return { module: 'notifications', status: 'ready' as const };
  }
}
