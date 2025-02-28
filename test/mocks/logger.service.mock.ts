import { PinoLogger } from 'nestjs-pino';

export class LoggerServiceMock extends PinoLogger {
  constructor() {
    super({} as any);
  }

  error = jest.fn();
  warn = jest.fn();
  log = jest.fn();
  debug = jest.fn();
  verbose = jest.fn();
}
