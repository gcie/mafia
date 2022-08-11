export function Loggable<T extends new (...args: any[]) => any>(constructor: T): new (...args: any[]) => any & { log: () => void } {
  return class extends constructor {
    constructor(...args: any[]) {
      // console.log('[Loggable] args:', args, constructor.prototype);
      // const logger: Logger = args.find((arg) => arg instanceof Logger);
      // args.map((arg) => {
      //   if (arg instanceof Logger) {
      //     arg;
      //   }
      // });
      super(...args);
      // console.log('[Loggable] logger', logger);
      // const _log = constructor.prototype.logger.log;
      // constructor.prototype.logger.log = (level: LogLevel, ...data: any[]) => {
      //   _log(level, 'hello', ...data);
      // };
      // const _ngOnInit = ((constructor.prototype.ngOnInit || (() => {})) as () => void).bind(this);
      // const _ngOnDestroy = ((constructor.prototype.ngOnDestroy || (() => {})) as () => void).bind(this);
      // constructor.prototype.ngOnInit = () => {
      //   console.log('new on init');
      //   _ngOnInit();
      // };
      // constructor.prototype.ngOnDestroy = () => {
      //   console.log('new on destroy');
      //   _ngOnDestroy();
      // };
    }

    log() {
      console.log('hello');
    }
  };
}
