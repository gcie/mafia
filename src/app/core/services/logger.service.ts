import { DatePipe } from '@angular/common';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ConfigService } from './config.service';

export enum LogLevel {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR,
}

export const LOGGER_PREFIX = new InjectionToken<string>('logger-prefix');

@Injectable({ providedIn: 'root' })
export class Logger {
  constructor(private config: ConfigService, private datePipe: DatePipe, @Optional() @Inject(LOGGER_PREFIX) private prefix: string) {}

  public log(level: LogLevel, ...data: any[]) {
    if (this.config.logging.level <= level) {
      const prefix = this.prefix ? ` ${this.prefix}]` : ']';
      switch (level) {
        case LogLevel.DEBUG:
        case LogLevel.INFO:
          console.log(this.datePipe.transform(new Date(), '[yyyy-MM-dd hh:mm:ss') + prefix, ...data);
          return;
        case LogLevel.WARN:
          console.warn(this.datePipe.transform(new Date(), '[yyyy-MM-dd hh:mm:ss') + prefix, ...data);
          return;
        case LogLevel.ERROR:
          console.error(this.datePipe.transform(new Date(), '[yyyy-MM-dd hh:mm:ss') + prefix, ...data);
          return;
      }
    }
  }

  public debug(...data: any[]) {
    this.log(LogLevel.DEBUG, ...data);
  }

  public info(...data: any[]) {
    this.log(LogLevel.INFO, ...data);
  }

  public warn(...data: any[]) {
    this.log(LogLevel.WARN, ...data);
  }

  public error(...data: any[]) {
    this.log(LogLevel.ERROR, ...data);
  }
}
