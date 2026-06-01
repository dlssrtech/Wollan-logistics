import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  getHealth() {
    return { module: 'ai', status: 'ready' as const };
  }
}
