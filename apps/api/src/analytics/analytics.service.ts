import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  getHealth() {
    return { module: 'analytics', status: 'ready' as const };
  }
}
