# Lista przygotowań

Wspólna, współdzielona checklista wydarzenia — zbudowana na podstawie
tabeli z Google Sheets. Aplikacja webowa (Next.js), z jedną wbudowaną bazą
danych (SQLite), bez konieczności logowania się hasłem — dostęp nadaje się
poprzez link z zaproszeniem.

## Funkcje

- **Zaznaczanie rzeczy do zabrania** — checkbox przy każdej pozycji,
  zapisywany natychmiast i widoczny dla wszystkich (odświeżanie co ~4 s).
- **Notatki** — każdy z uprawnieniami do edycji może dopisać własną notatkę
  przy dowolnej pozycji (oryginalna kolumna „Ilość / Uwagi” z arkusza
  została zachowana jako opis w tle).
- **Zapraszanie linkiem** — właściciel generuje link z rolą „może
  edytować” lub „tylko podgląd” i wysyła go dowolnym kanałem (np. WhatsApp,
  SMS). Osoba klikająca link podaje tylko swoje imię — bez rejestracji,
  bez hasła.
- **Uprawnienia** — trzy role:
  - **Właściciel** — pełny dostęp + zarządzanie użytkownikami i linkami,
  - **Edytor** — może zaznaczać pozycje i dodawać notatki,
  - **Podgląd** — widzi listę i notatki, ale nie może niczego zmieniać.
- Wyszukiwarka, pasek postępu, zwijane kategorie — czytelne również na
  telefonie.

Pierwsza osoba, która otworzy aplikację (zanim ktokolwiek inny to zrobi),
automatycznie zostaje właścicielem listy.

## Stos technologiczny

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript + Tailwind CSS
- SQLite (przez `better-sqlite3`) — jeden plik bazy danych, bez
  konieczności stawiania osobnego serwera bazodanowego
- Sesja użytkownika to bezhasłowe, losowe ciasteczko (httpOnly) powiązane
  z rekordem w bazie

## Uruchomienie lokalne (development)

Wymagany Node.js 20+.

```bash
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:3000`. Baza danych zostanie
utworzona automatycznie w `data/app.db` i wypełniona pozycjami z arkusza
przy pierwszym uruchomieniu.

## Szybki test na telefonie (ta sama sieć Wi-Fi)

Najprostszy sposób, żeby sprawdzić aplikację na telefonie, bez wykupywania
hostingu — uruchom ją na komputerze i wejdź z telefonu po adresie IP tego
komputera:

```bash
npm install
npm run build
npm run start
```

Sprawdź lokalny adres IP komputera (`ipconfig` na Windows, `ifconfig` /
`ip addr` na macOS i Linuksie — coś w stylu `192.168.1.15`) i na telefonie
otwórz `http://192.168.1.15:3000`.

Ważne: wchodź z komputera **pod tym samym adresem IP** (nie przez
`localhost`), zanim wygenerujesz linki z zaproszeniem — linki budowane są
na podstawie adresu, spod którego korzystasz z aplikacji, więc link
utworzony na `localhost` nie otworzy się na telefonie.

Uwaga: komputer musi być włączony i w tej samej sieci. Do stałego dostępu
(także spoza domu) skorzystaj z opcji wdrożenia poniżej.

## Wdrożenie (produkcja)

### Opcja 1: Render — wdrożenie z gotowego pliku `render.yaml` (najprostsze)

W katalogu głównym repozytorium leży `render.yaml`, który opisuje całą
usługę: obraz z `webapp/Dockerfile`, region Frankfurt i **trwały dysk
zamontowany pod `/app/data`** (bez niego lista kasowałaby się przy każdym
wdrożeniu). Dzięki temu nie trzeba niczego konfigurować ręcznie:

1. Wejdź na [render.com](https://render.com) i załóż konto przez GitHuba
   („Sign in with GitHub"), autoryzując dostęp do repozytorium
   `Micro_Agro-Strateg`.
2. Kliknij **New +** → **Blueprint**.
3. Wybierz repozytorium `woojtaas/Micro_Agro-Strateg`, gałąź `main`.
4. Render wczyta `render.yaml` i pokaże usługę `micro-agro-checklist` —
   kliknij **Apply**.
5. Poczekaj na zakończenie budowania (pierwsze trwa kilka minut, bo
   kompilowany jest natywny moduł `better-sqlite3`). Gdy status zmieni się
   na **Live**, adres aplikacji pojawi się u góry strony usługi.

Uwaga o kosztach: plan `starter` w `render.yaml` jest płatny (od 7 USD/mies.
plus ok. 0,25 USD za GB dysku). Trwały dysk nie jest dostępny na darmowym
planie Rendera, a darmowe usługi usypiają po 15 minutach — dlatego dla tej
aplikacji darmowy plan Rendera nie jest opcją.

**Zaraz po pierwszym uruchomieniu otwórz adres aplikacji i załóż listę na
siebie** — pierwsza osoba, która wejdzie na stronę, zostaje właścicielem.

### Opcja 2: Docker / docker-compose (samodzielny hosting)

```bash
docker compose up -d --build
```

Aplikacja będzie dostępna na porcie `3000`. Dane (baza SQLite) są
zapisywane w katalogu `./data` na hoście — zrób kopię zapasową tego
katalogu przed aktualizacjami.

Do wystawienia aplikacji na świat wystarczy postawić przed nią odwrotne
proxy (np. Caddy, nginx lub Traefik) z certyfikatem TLS i skierować ruch
na `localhost:3000`, albo wdrożyć na VPS-ie i skorzystać z gotowego
`docker-compose.yml`.

### Opcja 3: dowolny hosting Node.js (Railway, Fly.io, VPS)

1. `npm install && npm run build`
2. `npm run start` (nasłuchuje na porcie z `PORT`, domyślnie 3000)
3. Zamontuj trwały dysk/wolumin pod katalog `data/` — bez tego baza
   danych zniknie przy każdym redeployu.

### Opcja 4: Vercel

Next.js działa natywnie na Vercelu, **ale** środowisko serwerless ma
system plików tylko do odczytu i bez trwałości między requestami — plik
SQLite w `data/` zniknie. Jeśli zależy Ci na Vercelu, trzeba by podmienić
warstwę danych (`src/lib/db.ts`) na zewnętrzną bazę (np. Turso/libSQL,
Postgres). Do prostego, samodzielnego hostingu (Docker/VPS) powyższe
opcje są prostsze i nie wymagają tej zmiany.

## Jak zaprosić kolejne osoby

1. Zaloguj się jako właściciel i kliknij **„Zarządzaj”**.
2. W zakładce **„Linki z zaproszeniem”** wybierz rolę (może edytować /
   tylko podgląd), opcjonalnie dodaj etykietę (np. imię osoby) i kliknij
   **„Utwórz”** — link skopiuje się automatycznie do schowka.
3. Wyślij link odbiorcy. Po wejściu w link i podaniu imienia, osoba
   dołączy do listy z przypisaną rolą.
4. W zakładce **„Użytkownicy”** możesz w każdej chwili zmienić czyjąś rolę
   albo usunąć dostęp. W zakładce **„Linki z zaproszeniem”** możesz
   odwołać link, którego nie chcesz już udostępniać.

## Kopia zapasowa danych

Cała zawartość (zaznaczenia, notatki, użytkownicy, linki) mieści się w
jednym pliku: `data/app.db` (plus pliki `-wal`/`-shm` używane przez SQLite
w trybie WAL). Kopiowanie tego katalogu w trakcie działania aplikacji jest
bezpieczne.

## Struktura projektu

```
src/
  app/                # strony (App Router) i endpointy API
  components/         # komponenty klienckie (checklista, modal zarządzania, formularze)
  lib/
    db.ts              # warstwa danych (SQLite)
    session.ts          # obsługa sesji/ciasteczka i uprawnień
    seed-data.ts         # dane początkowe listy (z arkusza Google Sheets)
    types.ts              # współdzielone typy
```
