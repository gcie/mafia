import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

export enum LogLevel {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR,
}

@Injectable({ providedIn: 'root' })
export class Logger {
  constructor(private config: ConfigService, private datePipe: DatePipe) {}

  public log(level: LogLevel, ...data: any[]) {
    if (this.config.logging.level <= level) {
      switch (level) {
        case LogLevel.DEBUG:
        case LogLevel.INFO:
          console.log(this.datePipe.transform(new Date(), '[yyyy-MM-dd hh:mm:ss]'), ...data);
          return;
        case LogLevel.WARN:
          console.warn(this.datePipe.transform(new Date(), '[yyyy-MM-dd hh:mm:ss]'), ...data);
          return;
        case LogLevel.ERROR:
          console.error(this.datePipe.transform(new Date(), '[yyyy-MM-dd hh:mm:ss]'), ...data);
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
