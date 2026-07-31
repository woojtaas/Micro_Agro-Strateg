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

## Wdrożenie (produkcja)

### Opcja 1: Docker / docker-compose (polecane, samodzielny hosting)

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

### Opcja 2: dowolny hosting Node.js (Render, Railway, Fly.io, VPS)

1. `npm install && npm run build`
2. `npm run start` (nasłuchuje na porcie z `PORT`, domyślnie 3000)
3. Zamontuj trwały dysk/wolumin pod katalog `data/` — bez tego baza
   danych zniknie przy każdym redeployu.

### Opcja 3: Vercel

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
