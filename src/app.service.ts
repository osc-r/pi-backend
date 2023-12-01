import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';

@Injectable()
export class AppService {
  getVersion(): string {
    return `V ${packageJson.version}`;
  }
}
