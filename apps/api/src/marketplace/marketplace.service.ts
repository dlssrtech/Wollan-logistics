import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceService {
  getHealth() {
    return { module: 'marketplace', status: 'ready' as const };
  }
}
