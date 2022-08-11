import { Fraction } from './fractions';

export interface Role {
  name: string;
  fractions: Fraction[];
  multiple: boolean;
  description?: string;
  night0?: string;
  night?: string;
  daytime?: string;
  other?: string;
}

export class Cattani implements Role {
  name = 'Cattani';
  fractions = [Fraction.MIASTO];
  multiple = false;
  night = 'Budzi się i wybiera jedną osobę. Poznaje jej frakcję.';
}

export class Kurtyzana implements Role {
  name = 'Kurtyzana';
  fractions = [Fraction.MIASTO];
  multiple = false;
  night0 = 'Budzi się i wybiera jedną osobę, która również się budzi. Poznają się, a kurtyzana poznaje funkcję wybranej osoby.';
}

export class Lekarz implements Role {
  name = 'Lekarz';
  fractions = [Fraction.MIASTO];
  multiple = false;
  night = 'Budzi się i wybiera jedną osobę. Jeśli ta osoba została tej nocy wybrana przez mafię, to nie ginie.';
}

export class SzybkiStrzelec implements Role {
  name = 'Szybki strzelec';
  fractions = [Fraction.MIASTO, Fraction.MAFIA];
  multiple = false;
  other =
    'Jeśli bierze udział w pojedynku i padły jakiekolwiek głosy, to wygrywa go. Gdy walczy z drugim szybkim strzelcem, ich efekt niweluje się.';
}

export class Sedzia implements Role {
  name = 'Sędzia';
  fractions = [Fraction.MIASTO];
  multiple = false;
  other = 'W przypadku odmowy pojedynku sędzia decyduje, czy pojedynek ma się odbyć, czy nie.';
}

export class Murzyn implements Role {
  name = 'Murzyn';
  fractions = [Fraction.MIASTO];
  multiple = false;
  night0 = 'Budzi się i wybiera jedną osobę, która zostaje jego Panem. Gdy Pan ma umrzeć śmiercią zwykłą, zamiast Pana ginie murzyn.';
}

export class SklepZBronia implements Role {
  name = 'Sklep z bronią';
  fractions = [Fraction.MIASTO];
  multiple = false;
  other = 'Jeśli zginie w nocy w wyniku strzału mafii, to następnej nocy mafia ma 2 strzały.';
}

export class Zyd implements Role {
  name = 'Żyd';
  fractions = [Fraction.MIASTO];
  multiple = false;
  other = 'Jeśli zostaje sprawdzony, to jest pokazywany jako osoba z mafii.';
}

export class Swir implements Role {
  name = 'Świr';
  fractions = [Fraction.MIASTO];
  multiple = false;
  daytime = 'Raz na grę może wybrać jedną osobę i zabić.';
}

export class Mieszczuch implements Role {
  name = 'Mieszczuch';
  multiple = true;
  fractions = [Fraction.MIASTO];
}

export class SzefMafii implements Role {
  name = 'Szef mafii';
  fractions = [Fraction.MAFIA, Fraction.MAFIA2];
  multiple = false;
  night = 'W trakcie trwania tury mafii ma decydujący głos.';
}

export class Szantazysta implements Role {
  name = 'Szantażyszta';
  fractions = [Fraction.MAFIA];
  multiple = false;
  night0 =
    'Budzi się i wybiera jedną osobę, która również się budzi. Poznają się, a wybrana osoba nie może w ciągu gry dać znać że jest szantażowana ani działać na niekorzyść szantażysty, chyba że skutkowałoby to ujawnieniem szantażu. Gdy zginie szantażysta, najbliższej nocy ginie również osoba szantażowana.';
}

export class Pavulon implements Role {
  name = 'Pavulon';
  fractions = [Fraction.MAFIA];
  multiple = false;
  night = 'Nie budzi się z mafią, ale później budzi się sam i wybiera osobę. Niweluje efekt lekarza na tej osobie.';
}

export class Kokietka implements Role {
  name = 'Kokietka';
  fractions = [Fraction.MAFIA2];
  multiple = false;
  other = 'Jeśli zostaje sprawdzona, to jest pokazywana jako osoba spoza mafii.';
}

export class Terrorysta implements Role {
  name = 'Terrorysta';
  fractions = [Fraction.MAFIA];
  multiple = false;
  other = 'Kiedy zginie, giną również 2 osoby siedzące obok niego.';
}

export class Mafioso implements Role {
  name = 'Mafioso';
  multiple = true;
  fractions = [Fraction.MAFIA, Fraction.MAFIA2];
}

export class Szpieg implements Role {
  name = 'Szpieg';
  fractions = [Fraction.MAFIA2];
  multiple = false;
  night =
    'W trakcie fazy pierwszej mafii również się budzi i może brać udział w głosowaniu. Gdy zginą wszyscy mafiozi z pierwszej mafii, funkcja przestaje działać.';
}

export class CzarnaKurtyzana implements Role {
  name = 'Czarna kurtyzana';
  fractions = [Fraction.MAFIA2];
  multiple = false;
  night0 = 'Budzi się i wybiera jedną osobę, która się nie budzi. Kurtyzana poznaje funkcję wybranej osoby.';
}

export class Fryzjer implements Role {
  name = 'Fryzjer';
  fractions = [Fraction.MAFIA2];
  multiple = false;
  other = 'Jeśli zostaje sprawdzony, to miasto ma możliwość sprawdzenia tego dnia kolejnej osoby.';
}

export class Diler implements Role {
  name = 'Diler';
  fractions = [Fraction.MIASTO, Fraction.SYNDYKAT];
  multiple = false;
  night = 'Wybiera osobę. Wybrana osoba nie może brać udział w rozmowie w ciągu dnia i jej głos nie jest brany pod uwagę w głosowaniach.';
}

export class SzefSyndykatu implements Role {
  name = 'Szef syndykatu';
  fractions = [Fraction.SYNDYKAT];
  multiple = false;
  night0 = 'Budzi się i poznaje wszystkich członków syndykatu. Członkowie syndykatu nie poznają szefa.';
}

export class AniolSmierci implements Role {
  name = 'Anioł śmierci';
  fractions = [Fraction.SYNDYKAT];
  multiple = false;
  night =
    'Budzi się i wybiera osobę, która otrzymuje naznaczenie. Osoba naznaczona po raz drugi ginie (niezależnie od innych okoliczności). Naznaczenia są ujawniane na początku dnia.';
}

export class Kolejarz implements Role {
  name = 'Kolejarz';
  fractions = [Fraction.SYNDYKAT];
  multiple = false;
  daytime = 'Raz na grę może wybrać 2 osoby i pojechać z nimi na wakacje, z których już nie wracają.';
}

export class Barman implements Role {
  name = 'Barman';
  fractions = [Fraction.SYNDYKAT, Fraction.MIASTO];
  multiple = false;
  night = 'Raz na grę może wybrać kierunek i liczbę. Strzał(y) mafii są przesuwane zgodnie z wyborem barmana.';
}

export class Swiety implements Role {
  name = 'Święty';
  fractions = [Fraction.SYNDYKAT, Fraction.MIASTO];
  multiple = false;
  other =
    'Jeśli zginie w wyniku pojedynku lub głosowania na koniec dnia, giną wszyscy który na niego głosowali (niezależnie od innych okoliczności).';
}

export class Czasowstrzymywacz implements Role {
  name = 'Czasowstrzymywacz';
  fractions = [Fraction.SYNDYKAT];
  multiple = false;
  daytime = 'Raz na grę może wstać i ogłosić, że zatrzymuje czas. W tym momencie nastaje noc.';
}

export class Diabolistka implements Role {
  name = 'Diabolistka';
  fractions = [Fraction.SYNDYKAT];
  multiple = false;
  night0 = 'Wybiera osobę. Gdy wybrana osoba ma zginąć w nocy, to zamiast tego staje się członkiem syndykatu.';
}

export class CzlonekSyndykatu implements Role {
  name = 'Członek syndykatu';
  fractions = [Fraction.SYNDYKAT];
  multiple = true;
}

export class RoleSet {
  static readonly roles: Role[] = [
    new Cattani(),
    new Kurtyzana(),
    new Lekarz(),
    new SzybkiStrzelec(),
    new Sedzia(),
    new Murzyn(),
    new SklepZBronia(),
    new Zyd(),
    new Swir(),
    new Mieszczuch(),
    new SzefMafii(),
    new Szantazysta(),
    new Pavulon(),
    new Kokietka(),
    new Terrorysta(),
    new Mafioso(),
    new Szpieg(),
    new CzarnaKurtyzana(),
    new Fryzjer(),
    new Diler(),
    new SzefSyndykatu(),
    new AniolSmierci(),
    new Kolejarz(),
    new Barman(),
    new Swiety(),
    new Czasowstrzymywacz(),
    new Diabolistka(),
    new CzlonekSyndykatu(),
  ];

  get miasto() {
    return this.getFraction(Fraction.MIASTO);
  }

  get mafia() {
    return this.getFraction(Fraction.MAFIA);
  }

  get mafia2() {
    return this.getFraction(Fraction.MAFIA2);
  }

  get syndykat() {
    return this.getFraction(Fraction.SYNDYKAT);
  }

  getFraction(fraction: Fraction) {
    return RoleSet.roles.filter((role) => role.fractions.includes(fraction));
  }
}
