import { FractionConfigurationEnum } from './fractions';

export type GameConfiguration = {
  fractions: FractionConfigurationEnum;
  auto: boolean;
  miasto?: number;
  mafia?: number;
  mafia2?: number;
  syndykat?: number;
};
