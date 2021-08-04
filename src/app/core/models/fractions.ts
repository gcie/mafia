export enum Fraction {
  MAFIA,
  MIASTO,
  MAFIA2,
  SYNDYKAT,
}

export enum FractionConfigurationEnum {
  MIASTO_MAFIA,
  MIASTO_MAFIA_SYNDYKAT,
  MIASTO_MAFIA_MAFIA2,
  MIASTO_MAFIA_MAFIA2_SYNDYKAT,
}

export type FractionData = {
  config: FractionConfigurationEnum;
  display: string;
  disabled: boolean;
  description: string;
};

export const fractionData: FractionData[] = [
  {
    config: FractionConfigurationEnum.MIASTO_MAFIA,
    display: 'Miasto i Mafia',
    disabled: false,
    description:
      'Najprostszy i najpopularniejszy wariant, w którym ścierają się ze sobą 2 frakcje.\n \nZalecany dla początkujących i małych grup.',
  },
  {
    config: FractionConfigurationEnum.MIASTO_MAFIA_SYNDYKAT,
    display: 'Miasto, Mafia i Syndykat',
    disabled: false,
    description:
      'Bardziej złożony od podstawowego wariantu prowadzi do ciekawych i zrównoważonych rozgrywek.\n\nZalecany rozmiar grupy: 15-25 osób.\n<i>Dostępne wkrótce</i>',
  },
  {
    config: FractionConfigurationEnum.MIASTO_MAFIA_MAFIA2,
    display: 'Miasto i 2 Mafie',
    disabled: false,
    description:
      'Dodanie kolejnej mafii zwiększa dynamiczność i nieprzewidywalność rozgrywki.\nZalecany rozmiar grupy: 20-30 osób.\n<i>Dostępne wkrótce</i>',
  },
  {
    config: FractionConfigurationEnum.MIASTO_MAFIA_MAFIA2_SYNDYKAT,
    display: 'Miasto, 2 Mafie i Syndykat',
    disabled: false,
    description:
      'Najbardziej złożony i dynamiczny wariant, umożliwiający sprawną rozgrywkę nawet dla ogromnej grupy.\nZalecany rozmiar grupy: 25-40 osób.\n<i>Dostępne wkrótce</i>',
  },
];

export function getFractionData(config: FractionConfigurationEnum): FractionData {
  return fractionData.find((data) => data.config == config);
}

export function containsFraction(config: FractionConfigurationEnum, fraction: Fraction) {
  switch (fraction) {
    case Fraction.MAFIA:
    case Fraction.MIASTO:
      return !!config;
    case Fraction.SYNDYKAT:
      return config == FractionConfigurationEnum.MIASTO_MAFIA_SYNDYKAT || config == FractionConfigurationEnum.MIASTO_MAFIA_MAFIA2_SYNDYKAT;
    case Fraction.MAFIA2:
      return config == FractionConfigurationEnum.MIASTO_MAFIA_MAFIA2 || config == FractionConfigurationEnum.MIASTO_MAFIA_MAFIA2_SYNDYKAT;
  }
}
