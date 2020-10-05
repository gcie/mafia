# Mafia

Aplikacja do wspomagania pracy prowadzącego mafii. Zanim nas ktokolwiek pozwie do sądu to zaznaczę, że chodzi o taką grę towarzyską w której ludzie siedzą w kółku i krzyczą na siebie.

# Development

## Wymagania wstępne:

- git
- node v12.18.4 lub wyższa
- npm v6.12.1 lub wyższa
- ionic v6.11.0 lub wyższa (instalujemy za pomocą komendy `npm install -g @ionic/cli`)
- firebase v8.11.2 lub wyższa (na razie tylko do zarządzania konfiguracją, można skipnąć - jeśli jednak chcesz mieć, to można zainstalować za pomocą komendy `npm install -g firebase-tools`)
- Android Studio najnowsze

Dodatkowo polecam korzystanie z edytora VSCode z dodatkami:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (to + prettier = automatyczne formatowanie kodu <3)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [Firebase](https://marketplace.visualstudio.com/items?itemName=toba.vsfire)
- [Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme) (ładny wygląd + ikonki!)

## Instrukcja

1. Klonujemy repo za pomocą `git clone https://github.com/tao24/mafia.git` do jakiegoś folderu.
2. Wchodzimy doń i wykonujemy komendę `npm install`.
3. Wykonujemy komendę `ionic serve` i wtedy nasza aplikacja będzie hostowana na localhoście na porcie 8100. Otworzy się sama.
4. Możemy teraz spokojnie edytować kodzik, i zmiany się aplikują na żywo. Czasem jak się zmienia coś w plikach `*.module.ts` to może się serwer wychrzanić i trzeba go zrestartować, wtedy przyda się `Ctrl+C`.

### Android deployment

Z instalowaniem aplikacji na urządzeniu z Androidem jest nieco więcej zachodu. Wtedy potrzebujemy Android Studio i albo podłączone urządzenie z Androidem z włączonym debugowaniem USB ([tutorial jak to zrobić](https://developer.android.com/studio/debug/dev-options)), albo wirtualnego Androida (AVD Manager). Z doświadczenia powiem, że z tym pierwszym jest mniej zachodu i nie zasłania ekranu. To drugie ma swoje plusy, ale proces instalacji jest dość długi. Jak już mamy jedno z dwóch, to:

1. W folderze głównym wykonujemy komendę `ionic cap sync android`
2. Za pierwszym razem otwieramy Android Studio za pomocą `ionic cap open android` i czekamy, aż się skończy build
3. Wybieramy na pasku u góry nasze podłączone urządzenie lub wirtualkę
4. Klikamy przycisk `Run 'app'`

Za kolejnymi razami wystarczy tylko wykonać pierwszą komendę i wcisnąćw Android Studio `Apply Changes and Restart Activity`.

# Autorzy

- **Grzegorz Ciesielski** (tao24.k@gmail.com)
- **Dariusz Ciesielski** (daron0407@gmail.com)
