import { filter } from 'rxjs/operators';

export const positive = () => filter((x) => !!x);
