export type SeedItem = {
  category: string;
  subcategory: string;
  title: string;
  details: string;
};

export const seedItems: SeedItem[] = [
  // 1. Asortyment — Na ciepło
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Kiełbasa z grilla", details: "" },
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Hot dog", details: "Z kapustą, ogórkiem i cebulką" },
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Zapiekanka", details: "Airfryer / piec do pizzy" },
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Pizza", details: "" },
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Tosty", details: "" },
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Nuggetsy", details: "" },
  { category: "1. Asortyment", subcategory: "Na ciepło", title: "Gofry na patyku", details: "Cynamon, cukier, czekolada, toffi" },
  // 1. Asortyment — Napoje
  { category: "1. Asortyment", subcategory: "Napoje", title: "Kawa latte", details: "" },
  { category: "1. Asortyment", subcategory: "Napoje", title: "Espresso", details: "" },
  { category: "1. Asortyment", subcategory: "Napoje", title: "Herbata", details: "" },
  { category: "1. Asortyment", subcategory: "Napoje", title: "Herbata mrożona", details: "" },
  // 1. Asortyment — Lody / Mrożone
  { category: "1. Asortyment", subcategory: "Lody / Mrożone", title: "Lody na patyku", details: "2 rodzaje" },
  { category: "1. Asortyment", subcategory: "Lody / Mrożone", title: "Rożki", details: "2 rodzaje" },
  { category: "1. Asortyment", subcategory: "Lody / Mrożone", title: "Lody wodne", details: "2 rodzaje" },
  // 1. Asortyment — Przekąski / Suche
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Chipsy, chrupki, prażynki", details: "" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Krakersy, paluszki", details: "" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Lizaki", details: "" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Czekolada", details: "2 rodzaje" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Batony", details: "3 rodzaje" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Wafelki", details: "" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Chleb kukurydziany", details: "" },
  { category: "1. Asortyment", subcategory: "Przekąski / Suche", title: "Zupki chińskie", details: "" },
  // 1. Asortyment — Chłodzone
  { category: "1. Asortyment", subcategory: "Chłodzone", title: "Napoje (Cola, Fanta, Mirinda, Ice Tea, oranżada)", details: "" },
  { category: "1. Asortyment", subcategory: "Chłodzone", title: "Kabanosy", details: "" },
  { category: "1. Asortyment", subcategory: "Chłodzone", title: "Sery i miniserki", details: "" },
  { category: "1. Asortyment", subcategory: "Chłodzone", title: "Jogurty", details: "" },
  { category: "1. Asortyment", subcategory: "Chłodzone", title: "Galaretki owocowe", details: "" },

  // 2. Wyposażenie kuchni — AGD i Urządzenia
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Drukarka Canon", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Laminarka wraz z foliami", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Syfon do bitej śmietany", details: "+ naboje" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Czajnik elektryczny / Spieniaczka do mleka", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Kuchenka gazowa + małe butle gazowe", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Grill turystyczny + Grill gazowy & duża butla", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Lodówka turystyczna (dodatkowa)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Suszarka do warzyw i grzybów", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Pakowarka próżniowa przenośna", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Waga", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Nadziewarka malutka", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Maszyna do popcornu", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Maszyna do waty cukrowej", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Piec do pizzy", details: "2 sztuki" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Lodówka przeszklona", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Ekspres do kawy", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Airfryer", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Gofrownica & dyspenser do ciasta", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Toster", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Kuchenka indukcyjna", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Kostkarka", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "AGD i Urządzenia", title: "Kalkulator drukujący", details: "" },
  // 2. Wyposażenie kuchni — Sosy i Produkty bazowe
  { category: "2. Wyposażenie kuchni", subcategory: "Sosy i Produkty bazowe", title: "Przyprawy i tłuszcze (Sól, pieprz, cukier, masło, masło klarowane)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Sosy i Produkty bazowe", title: "Kawa i herbata (zapas do parzenia)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Sosy i Produkty bazowe", title: "Sosy słone/ostre (Ketchup, majonez, musztarda, 1000 wysp, czosnkowy, BBQ, ostre)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Sosy i Produkty bazowe", title: "Dodatki słodkie (Cynamon, cukier, czekolada, toffi, patyczki/cukier do waty, kukurydza)", details: "" },
  // 2. Wyposażenie kuchni — Naczynia i Akcesoria
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Obrotowa patera plastikowa", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Ranty metalowe", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Formy do ciasta metalowe", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Serwetki papierowe", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Łyżeczki jednorazowe & sztućce (noże, widelce)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Tacki (jednorazowe/papierowe, do hot dogów, gofrów, pizzy, zapiekanek)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Dyspenser do sosów do nalewania", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Pojemniczki na galaretki", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Rękaw do nadziewania", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Kubki na kawę & kubeczki na drinki", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Deska do krojenia & noże kuchenne", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Koszyk do mycia naczyń (płyn, gąbka, ściereczka)", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Folie do pakowarki próżniowej", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Linka zabezpieczająca do lodówki", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Regał do ekspozycji towaru", details: "" },
  { category: "2. Wyposażenie kuchni", subcategory: "Naczynia i Akcesoria", title: "Słoiki & szczypce kuchenne", details: "" },

  // 3. Obozowisko i Osobiste — Namiot i Meble
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Namiot, folia pod namiot, maty", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Śpiwory", details: "4 sztuki" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Materace", details: "4 sztuki" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Poduszki", details: "4 sztuki" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Szafa obozowa & szafka kuchenna", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Stół rozkładany & stół z ławkami", details: "2 sztuki" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Namiot i Meble", title: "Krzesła składane (3 szt.), fotele Decathlon, leżak", details: "" },
  // 3. Obozowisko i Osobiste — Relaks i Zabawa
  { category: "3. Obozowisko i Osobiste", subcategory: "Relaks i Zabawa", title: "Hamak, fotel hamakowy, Lazybug", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Relaks i Zabawa", title: "Mata na plażę", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Relaks i Zabawa", title: "Okularki do pływania & kamizelki ratunkowe SUP", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Relaks i Zabawa", title: "Dmuchańce dla dzieci, bańki mydlane, gry", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Relaks i Zabawa", title: "Zabawki", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Relaks i Zabawa", title: "DadaLaffin", details: "" },
  // 3. Obozowisko i Osobiste — Prąd i Multimedia
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Latarki, czołówka, lampki (2 szt.), lampki żarówki (2 szt.)", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Lampki solarne (kulki) & dodatkowe lampki", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Powerbank & bateria solarna", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Ładowarki i kable (do całego sprzętu)", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Klimatyzacja, wentylator, wiatraczki", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Kilka przedłużaczy", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Prąd i Multimedia", title: "Projektor & Ekran, głośniki JBL (2 szt.), radio/głośnik, Wi-Fi", details: "" },
  // 3. Obozowisko i Osobiste — Higiena i Porządek
  { category: "3. Obozowisko i Osobiste", subcategory: "Higiena i Porządek", title: "Prysznic turystyczny", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Higiena i Porządek", title: "Leki / Apteczka", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Higiena i Porządek", title: "Przybory do szycia", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Higiena i Porządek", title: "Kosz na śmieci & worki na śmieci", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Higiena i Porządek", title: "Zmiotka z miotłą", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Higiena i Porządek", title: "Linka na pranie & haczyki", details: "" },
  // 3. Obozowisko i Osobiste — Ubrania
  { category: "3. Obozowisko i Osobiste", subcategory: "Ubrania", title: "Bielizna do klubu", details: "" },
  // 3. Obozowisko i Osobiste — Transport
  { category: "3. Obozowisko i Osobiste", subcategory: "Transport", title: "Pompka ręczna/nożna & pompka elektryczna", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Transport", title: "Saperka", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Transport", title: "Hulajnoga + linka zabezpieczająca", details: "" },
  { category: "3. Obozowisko i Osobiste", subcategory: "Transport", title: "Rower dla Anki", details: "" },

  // 4. Narzędzia i Elektryka — Elektronarzędzia
  { category: "4. Narzędzia i Elektryka", subcategory: "Elektronarzędzia", title: "Caterpillar", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Elektronarzędzia", title: "Wkrętarka & zakrętarka", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Elektronarzędzia", title: "Piła", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Elektronarzędzia", title: "Dmuchawa Parkside", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Elektronarzędzia", title: "Taker i sztyfciarka Parkside", details: "" },
  // 4. Narzędzia i Elektryka — Narzędzia ręczne
  { category: "4. Narzędzia i Elektryka", subcategory: "Narzędzia ręczne", title: "Zestaw kluczy i śrubokrętów", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Narzędzia ręczne", title: "Taśma miernicza", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Narzędzia ręczne", title: "Nóż (roboczy/monterski)", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Narzędzia ręczne", title: "Obcinacze", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Narzędzia ręczne", title: "Taker ręczny (+ zapas: sztyfty, zszywki)", details: "" },
  // 4. Narzędzia i Elektryka — Naprawy / Elektryka
  { category: "4. Narzędzia i Elektryka", subcategory: "Naprawy / Elektryka", title: "Miernik napięcia", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Naprawy / Elektryka", title: "Lutownica", details: "" },
  { category: "4. Narzędzia i Elektryka", subcategory: "Naprawy / Elektryka", title: "Stary mikser (do naprawy)", details: "" },

  // 5. Organizacja / Opel — Serwis Opla
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Wymiana wycieraczek w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Sprawdzenie zawieszenia w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Wymiana dwóch opon tylnych w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Hamulec ręczny i zacisk tylny lewy w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Wymiana gniazda haka w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Wymiana prawego lusterka w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Pranie tapicerki w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Montaż radia i ekranu w Oplu", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Serwis Opla", title: "Lakierowanie zderzaka przedniego w Oplu", details: "Jeśli zdążę" },
  // 5. Organizacja / Opel — Do kupienia / Zabrania
  { category: "5. Organizacja / Opel", subcategory: "Do kupienia / Zabrania", title: "Lusterko do Opla", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Do kupienia / Zabrania", title: "Wycieraczki do szyb", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Do kupienia / Zabrania", title: "Filtr kabinowy", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Do kupienia / Zabrania", title: "Zapasowe baterie do AirTag", details: "" },
  // 5. Organizacja / Opel — Sprzęt Gaz / Grill
  { category: "5. Organizacja / Opel", subcategory: "Sprzęt Gaz / Grill", title: "Napełnienie nowej, małej butli do grilla", details: "" },
  { category: "5. Organizacja / Opel", subcategory: "Sprzęt Gaz / Grill", title: "Sprawdzenie szczelności i dopasowania przyłączy", details: "" },

  // 6. Opcjonalne — Inne
  { category: "6. Opcjonalne", subcategory: "Inne", title: "Wędzarnia przenośna", details: "" },
];
