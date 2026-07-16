import React, { useState, useEffect, useMemo } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import {
  Bike,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Waves,
  Mountain,
  Landmark,
  Utensils,
  Flag,
  AlertTriangle,
  X,
  Ship,
  Plane,
  Train,
  PauseCircle,
  Sparkles,
  Star,
  ChefHat,
  Filter,
  Pencil,
  Trash2,
  Copy,
  NotebookPen,
  Check,
  Save,
  ChevronDown,
  Backpack,
  ShieldAlert
} from "https://esm.sh/lucide-react@0.383.0?external=react";
const C = {
  ai900: "#12283F",
  // deep indigo — headers, nav
  ai700: "#1F4468",
  // primary indigo
  ai200: "#C7D6E4",
  // pale indigo — borders
  washi: "#F4EFE3",
  // background, raw cotton/washi
  paper: "#FFFCF6",
  // card surface
  coral: "#E4693C",
  // accent — CTAs, warnings, "today"
  teal: "#4C8C82",
  // secondary accent — done/success
  ink: "#22201B",
  // primary text
  inkSoft: "#6B6558"
  // secondary text
};
const DAYS = [
  {
    id: "2026-09-30",
    label: "30. sep",
    stage: "Norge \u2192 Japan",
    transport: "fly",
    distance: null,
    plan: "Avreise fr\xE5 Noreg.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-01",
    label: "1. okt",
    stage: "Osaka",
    transport: "rest",
    distance: null,
    plan: "Lande, sjekke inn, utforske Dotonbori/Namba.",
    tough: false,
    highlights: [
      { name: "Dotonbori og Namba", note: "Perfekt f\xF8rste kveld \u2014 takoyaki, okonomiyaki, kanalen" },
      { name: "Osaka Castle", note: "09:00\u201317:00, siste inngang ca. 16:30" }
    ]
  },
  {
    id: "2026-10-02",
    label: "2. okt",
    stage: "Osaka",
    transport: "rest",
    distance: null,
    plan: "Utforsk Osaka i eige tempo. Ta det rolig f\xF8r turen.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-03",
    label: "3. okt",
    stage: "Osaka \u2192 Nagoya \u2192 Osaka",
    transport: "tog",
    distance: "Dagstur (Shinkansen)",
    plan: "Dagstur til Nagoya med Shinkansen, ca. 1t40 min kvar veg.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-04",
    label: "4. okt",
    stage: "Osaka",
    transport: "rest",
    distance: null,
    plan: "Siste dag i Osaka f\xF8r sykkelturen. Sjekk v\xEArmelding, pakk sykkelklede.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-05",
    label: "5. okt",
    stage: "Osaka \u2192 Wakayama \u2192 Tokushima",
    transport: "ferje",
    distance: "0 km sykling (fotpassasjer)",
    plan: "Tog til Wakayama, ferje Wakayama\u2013Tokushima utan sykkel. Hent utleigesykkel fr\xE5 Yeti & Ltb ved fergeterminalen i Tokushima.",
    tough: false,
    highlights: [
      { name: "Awa Odori Kaikan", note: "Museum/danseshow, ca. 09:00\u201317:00" },
      { name: "Bizan-fjellet", note: "Utsikt over byen, taubane ca. 09:00\u201321:00" }
    ]
  },
  {
    id: "2026-10-06",
    label: "6. okt",
    stage: "Tokushima \u2192 Shishikui",
    transport: "sykkel",
    distance: "ca. 85 km",
    plan: "Kystetappe s\xF8r langs Route 55.",
    tough: false,
    highlights: [
      { name: "Cape Kamoda", note: "Kystutsikt undervegs" },
      { name: "Ikumi Beach", note: "Ein av dei beste surfestadane p\xE5 Shikoku, fin solnedgang" },
      { name: "Sea Turtle Museum, Hiwasa", note: "Alternativ roleg stopp" }
    ]
  },
  {
    id: "2026-10-07",
    label: "7. okt",
    stage: "Shishikui \u2192 Todoroki-fossane \u2192 Shishikui",
    transport: "sykkel",
    distance: "ca. 60 km t/r",
    plan: "Sykkeltur innover elvedalen p\xE5 Route 193 til Todoroki Kujuku-fossane (ein av Japans 100 beste fossar, hovudfallet 58 m). Snu ved fossane og sykle tilbake til Shishikui for overnatting.",
    tough: true,
    toughNote: "Fjelldal-veg \u2014 sett av god tid. Ikkje fortsett vidare over fjellovergangen mot Naka-cho, den skal vere smal med steinsprangfare.",
    highlights: [
      { name: "Todoroki-fossen (honmeki)", note: "58 m fallh\xF8gd \u2014 Tokushimas h\xF8gste foss" },
      { name: "Todoroki Kujuku-fossane", note: "Rundt 1,5 km gangsti forbi fleire mindre fossar, om du vil g\xE5 litt til fots" }
    ]
  },
  {
    id: "2026-10-08",
    label: "8. okt",
    stage: "Shishikui \u2192 Muroto \u2192 Aki",
    transport: "sykkel",
    distance: "ca. 88 km",
    plan: "Kystveg, Cape Muroto.",
    tough: true,
    toughNote: "Lang dag, ofte vind \u2014 Cape Muroto ligg eksponert",
    highlights: [
      { name: "Cape Muroto", note: "Turens h\xF8gdepunkt \u2014 klipper, fyr, dramatisk kystlandskap" },
      { name: "Muroto Global Geopark Center", note: "Utstilling om geologien i omr\xE5det" },
      { name: "Mikuriya Cave", note: "Naturformasjon og historisk stad ved havet" },
      { name: "Aki Castle Ruins", note: "Kort stopp, roleg omr\xE5de" }
    ]
  },
  {
    id: "2026-10-09",
    label: "9. okt",
    stage: "Aki \u2192 Kochi",
    transport: "sykkel",
    distance: "ca. 45 km",
    plan: "Kort dag inn til Kochi.",
    tough: false,
    highlights: [
      { name: "Kochi Castle", note: "Eit av Japans best bevarte originale slott, ca. 09:00\u201317:00" },
      { name: "Hirome Market", note: "Katsuo no tataki \u2014 beste matoppleving i Kochi" },
      { name: "Katsurahama Beach", note: "Statue av Sakamoto Ryoma" },
      { name: "Sakamoto Ryoma Memorial Museum", note: "" }
    ]
  },
  {
    id: "2026-10-10",
    label: "10. okt",
    stage: "Kochi",
    transport: "rest",
    distance: "0 km",
    plan: "Kviledag i Kochi \u2014 vendepunktet p\xE5 turen. Vask klede, kvile, oppleve byen.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-11",
    label: "11. okt",
    stage: "Kochi \u2192 Aki",
    transport: "sykkel",
    distance: "ca. 45 km",
    plan: "Start p\xE5 returetappen, same kystveg tilbake.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-12",
    label: "12. okt",
    stage: "Aki \u2192 Muroto \u2192 Shishikui",
    transport: "sykkel",
    distance: "ca. 88 km",
    plan: "Cape Muroto igjen, motsett retning.",
    tough: true,
    toughNote: "Lang dag, ofte vind \u2014 same som 8. okt",
    holiday: true,
    holidayNote: "12. oktober 2026 er \u30B9\u30DD\u30FC\u30C4\u306E\u65E5 (Sports Day) \u2014 nasjonal heilagdag i Japan. Overnattingsstader kan vere fullbooka eller dyrare denne helga. Bestill overnatting i god tid.",
    highlights: [{ name: "Cape Muroto", note: "Verdt eit nytt stopp, andre lyset denne gongen" }]
  },
  {
    id: "2026-10-13",
    label: "13. okt",
    stage: "Shishikui \u2192 Tokushima",
    transport: "sykkel",
    distance: "ca. 85 km",
    plan: "Siste sykkeldag. Lever sykkelen hos Yeti & Ltb ved fergeterminalen.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-14",
    label: "14. okt",
    stage: "Tokushima",
    transport: "rest",
    distance: null,
    plan: "Bufferdag / kviledag i Tokushima. Alternativ: dagstur til Naruto-kvervlane.",
    tough: false,
    highlights: [{ name: "Naruto-kvervlane", note: "Alternativ dagstur \u2014 nokre av verdas st\xF8rste tidevasskvervlar" }]
  },
  {
    id: "2026-10-15",
    label: "15. okt",
    stage: "Tokushima",
    transport: "rest",
    distance: null,
    plan: "Ekstra buffer ved d\xE5rleg v\xEAr/forsinkingar.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-16",
    label: "16. okt",
    stage: "Tokushima \u2192 Osaka",
    transport: "ferje",
    distance: null,
    plan: "Retur til Osaka.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-17",
    label: "17. okt",
    stage: "Osaka",
    transport: "rest",
    distance: null,
    plan: "Bufferdag + sightseeing. Sikrar at du er klar f\xF8r fly.",
    tough: false,
    highlights: [
      { name: "Kuromon Market", note: "Matmarknad, ca. 09:00\u201318:00" },
      { name: "Shinsekai + Tsutenkaku", note: "Retro Osaka, mat og kveldsstemning" },
      { name: "Umeda Sky Building", note: "Panoramautsikt, typisk til ca. 22:30" }
    ]
  },
  {
    id: "2026-10-18",
    label: "18. okt",
    stage: "Osaka",
    transport: "rest",
    distance: null,
    plan: "Ekstra buffer ved d\xE5rleg v\xEAr/forsinkingar.",
    tough: false,
    highlights: []
  },
  {
    id: "2026-10-19",
    label: "19. okt",
    stage: "Osaka \u2192 Norge",
    transport: "fly",
    distance: null,
    plan: "Heimreise.",
    tough: false,
    highlights: []
  }
];
const FOOD_ITEMS = [
  {
    id: "tokushima-ramen",
    place: "Tokushima",
    dish: "Tokushima ramen",
    price: "\xA5",
    note: "Kraftig svinekj\xF8t/soyasaus-buljong med r\xE5 egg og svinebuk, ete saman med ris. Finst i kvit-, brun- og gulvariant."
  },
  {
    id: "tokushima-awaodori",
    place: "Tokushima",
    dish: "Awa Odori Dori",
    price: "\xA5\xA5",
    note: "Japans mest produserte merkekylling. Best enkel saltgrilla eller som yakitori."
  },
  {
    id: "tokushima-sudachi",
    place: "Tokushima",
    dish: "Sudachi",
    price: "\xA5",
    note: "Gr\xF8n sitrus \u2014 Tokushima produserer 98 % av all sudachi i Japan. Dukkar opp i alt fr\xE5 ramen til drikke og dessert."
  },
  {
    id: "tokushima-naruto-tai",
    place: "Tokushima/Naruto",
    dish: "Naruto tai (havabbor)",
    price: "\xA5\xA5\xA5",
    note: "Fast, fin fisk fr\xE5 dei sterke straumane i Naruto-sundet. Best som tai meshi (ris kokt med heil fisk)."
  },
  {
    id: "naruto-wakame",
    place: "Naruto",
    dish: "Naruto wakame",
    price: "\xA5",
    note: "Tang/sj\xF8gras dyrka i dei sterke tidevasstraumane ved Naruto \u2014 kjend for fastare, spr\xF8are konsistens enn vanleg wakame."
  },
  {
    id: "kaiyo-migiagari",
    place: "Shishikui/Kaiyo-omr\xE5det",
    dish: "Migiagari-don",
    price: "\xA5\xA5",
    note: "Lokal sk\xE5l-rett fr\xE5 S\xF8r-Tokushima (Anan til Kaiyo) \u2014 fisk, kj\xF8t og gr\xF8nsaker fr\xE5 omr\xE5det. Kvar stad lagar sin eigen variant."
  },
  {
    id: "muroto-fukasomizu",
    place: "Muroto",
    dish: "Kaiyo shinsosui-produkt (djuphavsvatn)",
    price: "\xA5",
    note: "Muroto pumpar opp reint djuphavsvatn fr\xE5 havet utanfor kapet \u2014 brukt i alt fr\xE5 salt til softis og tofu. Sj\xE5 etter det i lokale butikkar."
  },
  {
    id: "kochi-katsuo",
    place: "Kochi",
    dish: "Katsuo no tataki",
    price: "\xA5\xA5",
    note: "Lettsvidd bonito, ofte med hakka kvitlauk og grovt salt. Kochis signaturrett \u2014 pr\xF8v p\xE5 Hirome Market."
  },
  {
    id: "kochi-waraiyaki",
    place: "Kochi",
    dish: "Katsuo no waraiyaki (halmsviing)",
    price: "\xA5\xA5",
    note: "Sj\xF8lve tilverkinga av katsuo no tataki \u2014 bonitofileten sviast raskt over h\xF8ge halmflammer. Eit skodespel i seg sj\xF8lv p\xE5 Hirome Market."
  },
  {
    id: "kochi-sawachi",
    place: "Kochi",
    dish: "Sawachi ryori",
    price: "\xA5\xA5\xA5",
    note: "Store delte fat med sashimi, tataki og andre lokale rettar \u2014 tradisjonell Kochi-festmat, gjerne delt mellom fleire."
  },
  {
    id: "kochi-sake",
    place: "Kochi",
    dish: "Tosa-sake",
    price: "\xA5\xA5",
    note: "Kochi er kjend for t\xF8rr, \xABtanrei karakuchi\xBB-stil sake. Godt f\xF8lgje til katsuo no tataki."
  }
];
const SIGHT_TYPES = {
  natur: { label: "Natur", color: "#4C8C82" },
  kultur: { label: "Kultur", color: "#8B5E9A" },
  mat: { label: "Mat", color: "#E4693C" },
  historie: { label: "Historie", color: "#B08B3F" },
  oppleving: { label: "Oppleving", color: "#3C7CE4" },
  festival: { label: "Festival", color: "#C9A227" }
};
const SIGHTS = [
  {
    id: "s-awaodorikaikan",
    dayId: "2026-10-05",
    place: "Tokushima",
    name: "Awa Odori Kaikan",
    type: "kultur",
    desc: "Museum og danseshow om Tokushimas ber\xF8mte Awa Odori-dans.",
    hours: "Ca. 09:00\u201317:00"
  },
  {
    id: "s-bizan",
    dayId: "2026-10-05",
    place: "Tokushima",
    name: "Bizan-fjellet",
    type: "natur",
    desc: "Utsikt over byen fr\xE5 taubane.",
    hours: "Ca. 09:00\u201321:00"
  },
  {
    id: "s-capekamoda",
    dayId: "2026-10-06",
    place: "Kaiyo-omr\xE5det",
    name: "Cape Kamoda",
    type: "natur",
    desc: "Kystutsikt langs Route 55."
  },
  {
    id: "s-ikumi",
    dayId: "2026-10-06",
    place: "Shishikui",
    name: "Ikumi Beach",
    type: "natur",
    desc: "Ein av dei beste surfestadane p\xE5 Shikoku. Fin solnedgang."
  },
  {
    id: "s-seaturtle",
    dayId: "2026-10-06",
    place: "Hiwasa",
    name: "Sea Turtle Museum",
    type: "oppleving",
    desc: "Roleg alternativt stopp \u2014 fokus p\xE5 lokale havskilpadder."
  },
  {
    id: "s-yakuoji",
    dayId: "2026-10-06",
    place: "Hiwasa",
    name: "Yakuoji-templet (\u85AC\u738B\u5BFA)",
    type: "kultur",
    desc: "Tempel nr. 23 p\xE5 Shikoku 88-tempelruta, midt i Hiwasa. Kjend raud pagode med utsikt over havet \u2014 rett p\xE5 ruta di."
  },
  {
    id: "s-hiwasajo",
    dayId: "2026-10-06",
    place: "Hiwasa",
    name: "Hiwasa-borga (utsiktst\xE5rn)",
    type: "oppleving",
    desc: "Moderne borgforma utsiktst\xE5rn p\xE5 ein haug i Hiwasa, med utsikt over kystbyen og hamna."
  },
  {
    id: "s-todoroki",
    dayId: "2026-10-07",
    place: "Kaiyo",
    name: "Todoroki-fossen (honmeki)",
    type: "natur",
    desc: "58 m fallh\xF8gd \u2014 Tokushimas h\xF8gste foss, eitt av Japans 100 beste fossar."
  },
  {
    id: "s-todorokikujuku",
    dayId: "2026-10-07",
    place: "Kaiyo",
    name: "Todoroki Kujuku-fossane",
    type: "natur",
    desc: "Ca. 1,5 km gangsti forbi fleire mindre fossar oppover dalen."
  },
  {
    id: "s-capemuroto",
    dayId: "2026-10-08",
    place: "Muroto",
    name: "Cape Muroto",
    type: "natur",
    desc: "Turens store h\xF8gdepunkt \u2014 klipper, fyr og dramatisk kystlandskap."
  },
  {
    id: "s-murotolighthouse",
    dayId: "2026-10-08",
    place: "Muroto",
    name: "Muroto-fyret",
    type: "natur",
    desc: "Eitt av Japans \xAB100 utvalde fyr\xBB. St\xE5r heilt ytst p\xE5 kapet, ved sida av Hotsumisakiji-templet."
  },
  {
    id: "s-hotsumisakiji",
    dayId: "2026-10-08",
    place: "Muroto",
    name: "Hotsumisakiji-templet (\u6700\u5FA1\u5D0E\u5BFA)",
    type: "kultur",
    desc: "Tempel nr. 24 p\xE5 88-tempelruta, ligg heilt oppe p\xE5 sj\xF8lve Cape Muroto."
  },
  {
    id: "s-geopark",
    dayId: "2026-10-08",
    place: "Muroto",
    name: "Muroto Global Geopark Center",
    type: "kultur",
    desc: "Utstilling om geologien i omr\xE5det."
  },
  {
    id: "s-mikuriya",
    dayId: "2026-10-08",
    place: "Muroto",
    name: "Mikuriya Cave",
    type: "natur",
    desc: "Naturformasjon og historisk stad ved havet."
  },
  {
    id: "s-haikoaquarium",
    dayId: "2026-10-08",
    place: "Muroto",
    name: "Muroto Haik\u014D-akvariet (nedlagt skule)",
    type: "oppleving",
    desc: "Kvirkete akvarium innreidd i ein nedlagt barneskule \u2014 bassenga st\xE5r i gamle klasserom og symjebasseng."
  },
  {
    id: "s-akicastle",
    dayId: "2026-10-08",
    place: "Aki",
    name: "Aki Castle Ruins",
    type: "historie",
    desc: "Kort stopp, roleg omr\xE5de."
  },
  {
    id: "s-iwasaki",
    dayId: "2026-10-08",
    place: "Aki",
    name: "Iwasaki Yataro sin f\xF8destad",
    type: "historie",
    desc: "Barndomsheimen til grunnleggjaren av Mitsubishi-konsernet, f\xF8dd i Aki."
  },
  {
    id: "s-kochicastle",
    dayId: "2026-10-09",
    place: "Kochi",
    name: "Kochi Castle",
    type: "historie",
    desc: "Eit av Japans best bevarte originale slott.",
    hours: "Ca. 09:00\u201317:00"
  },
  {
    id: "s-hirome",
    dayId: "2026-10-09",
    place: "Kochi",
    name: "Hirome Market",
    type: "mat",
    desc: "Beste matopplevinga i Kochi \u2014 pr\xF8v katsuo no tataki."
  },
  {
    id: "s-katsurahama",
    dayId: "2026-10-09",
    place: "Kochi",
    name: "Katsurahama Beach",
    type: "natur",
    desc: "Strand, havutsikt og statue av Sakamoto Ryoma."
  },
  {
    id: "s-ryoma",
    dayId: "2026-10-09",
    place: "Kochi",
    name: "Sakamoto Ryoma Memorial Museum",
    type: "historie",
    desc: "Historie om ein viktig person i Japans modernisering."
  },
  {
    id: "s-harimayabashi",
    dayId: "2026-10-09",
    place: "Kochi sentrum",
    name: "Harimaya-brua",
    type: "oppleving",
    desc: "Vesle, litt \xABskuffande\xBB kjende landemerket fr\xE5 den tradisjonelle Yosakoi-songen. Kort spasertur fr\xE5 Hirome Market \u2014 kjekt \xE5 ha sett."
  },
  {
    id: "s-chikurinji",
    dayId: "2026-10-10",
    place: "Kochi, Godaisan",
    name: "Chikurinji-templet (\u7AF9\u6797\u5BFA)",
    type: "kultur",
    desc: "Tempel nr. 31 p\xE5 88-tempelruta, oppe p\xE5 Godaisan-\xE5sen med utsiktsplattform over Kochi by."
  },
  {
    id: "s-makino",
    dayId: "2026-10-10",
    place: "Kochi, Godaisan",
    name: "Makino botaniske hage",
    type: "natur",
    desc: "Botanisk hage dedikert til botanikaren Makino Tomitar\u014D, rett ved Chikurinji-templet."
  },
  {
    id: "s-sundaymarket",
    dayId: "2026-10-11",
    place: "Kochi sentrum",
    name: "Sundagsmarknaden (\u65E5\u66DC\u5E02)",
    type: "mat",
    desc: "Ein av Japans eldste og lengste gatemarknader \u2014 over 300 \xE5r gamal, langs Otesuji-gata kvar sundag. 11. okt 2026 er ein sundag og fell p\xE5 avreisedagen din fr\xE5 Kochi \u2014 mogleg \xE5 rekke om du ikkje dreg for tidleg."
  },
  {
    id: "s-hiwasamatsuri",
    dayId: "2026-10-06",
    place: "Hiwasa",
    name: "Hiwasa Hachiman-jinja haustfestival",
    type: "festival",
    desc: "Eitt av dei st\xF8rste haustfestivalane i Tokushima \u2014 trommevogner (\u3061\u3087\u3046\u3055) paraderer til \u014Chama-stranda, med kveldsfyrverkeri. 2026: laurdag 10. og s\xF8ndag 11. oktober. Du syklar gjennom Hiwasa 6. okt (nokre dagar f\xF8r) og er innom att 13. okt (rett etter) \u2014 vurder \xE5 justere ruta litt om du vil oppleve han."
  },
  {
    id: "s-osatomatsuri",
    dayId: "2026-10-12",
    place: "Kaiyo/Shishikui",
    name: "\u014Czato Hachiman-jinja haustfestival",
    type: "festival",
    desc: "Stort haustfestival i Kaiyo-cho med festivalb\xE5tar (\u95A2\u8239) og vogner (\u3060\u3093\u3058\u308A) langs \u014Czato-stranda, pluss fyrverkeri. Offisiell dato 2026: s\xF8ndag 11. oktober \u2014 \xE9in dag f\xF8r du etter planen er attende i Shishikui (12. okt). Vurder \xE5 justere tidsplanen ein dag om du vil rekke han."
  },
  {
    id: "s-naruto",
    dayId: "2026-10-14",
    place: "Naruto",
    name: "Naruto-kvervlane",
    type: "natur",
    desc: "Alternativ dagstur \u2014 nokre av verdas st\xF8rste tidevasskvervlar."
  },
  {
    id: "s-kuromon",
    dayId: "2026-10-17",
    place: "Osaka",
    name: "Kuromon Market",
    type: "mat",
    desc: "Matmarknad.",
    hours: "Ca. 09:00\u201318:00"
  },
  {
    id: "s-shinsekai",
    dayId: "2026-10-17",
    place: "Osaka",
    name: "Shinsekai + Tsutenkaku",
    type: "oppleving",
    desc: "Retro Osaka, mat og kveldsstemning."
  },
  {
    id: "s-umeda",
    dayId: "2026-10-17",
    place: "Osaka",
    name: "Umeda Sky Building",
    type: "oppleving",
    desc: "Panoramautsikt over byen.",
    hours: "Typisk til ca. 22:30"
  }
];
const STATUS_CYCLE = ["skal", "besokt", "favoritt"];
const STATUS_META = {
  skal: { label: "Skal bes\xF8ke", icon: Circle, color: "#6B6558" },
  besokt: { label: "Bes\xF8kt", icon: CheckCircle2, color: "#4C8C82" },
  favoritt: { label: "Favoritt", icon: Star, color: "#E4693C" }
};
const BIKE_INFO_FIELDS = [
  { key: "modell", label: "Modell" },
  { key: "rammestr", label: "Rammest\xF8rrelse" },
  { key: "dekk", label: "Dekkdimensjon" },
  { key: "slange", label: "Slangetype" },
  { key: "ventil", label: "Ventiltype" },
  { key: "serienr", label: "Serienummer" }
];
const NODINFO_FIELDS = [
  { key: "passnr", label: "Passnummer" },
  { key: "forsikringsselskap", label: "Forsikringsselskap" },
  { key: "forsikringsnr", label: "Forsikrings-/policenummer" },
  { key: "blodtype", label: "Blodtype" },
  { key: "allergiar", label: "Allergiar / medisinske forhold" },
  { key: "parorande", label: "P\xE5r\xF8rande \u2014 namn og telefon (heime i Noreg)" }
];
const NODINFO_REFERENCE = [
  { title: "Naudnummer i Japan", lines: ["110 \u2014 Politi", "119 \u2014 Ambulanse / brann"] },
  { title: "Kgl. norsk ambassade, Tokyo", lines: [
    "5-12-2 Minami Azabu, Minato-ku, Tokyo 106-0047",
    "Tlf: +81 (0)3-5422-1200  (fr\xE5 Noreg: +47 23 95 25 00)",
    "Konsul\xE6re saker (pass o.l.): +81 (0)3-6408-8100",
    "E-post: consular.tokyo@mfa.no",
    "Opningstider: man\u2013fre 09:30\u201312:30, 13:30\u201316:30"
  ] },
  { title: "Kgl. norsk honor\xE6rkonsulat, Kobe (n\xE6rmast Kansai/Shikoku)", lines: [
    "c/o DNV, Sannomiya Bldg South 11F, 7-1-15 Goko-dori, Chuo-ku, Kobe 651-0087",
    "Tlf: +81 (0)78-291-1307",
    "Opningstider: man\u2013fre 09:00\u201312:00, 13:00\u201317:00"
  ] }
];
const BIKE_SHOPS = [
  {
    place: "Tokushima (ved fergeterminalen)",
    name: "Yeti & Ltb \u2014 utleigebutikken din",
    phone: "sj\xE5 bookingbekrefting",
    note: "Ring dei f\xF8rst ved sykkelproblem \u2014 dei kjenner sykkelen og kan gje r\xE5d eller bytte."
  },
  {
    place: "Anan/Haneura (ca. 25 km s\xF8r for Tokushima)",
    name: "\u798F\u4F4F\u30B5\u30A4\u30AF\u30EB\u30B7\u30E7\u30C3\u30D7 (Fukuzumi Cycle Shop)",
    phone: "0884-44-2153",
    note: "Open kvar dag 7:00\u201319:00. Siste ordentlege sportssykkelbutikk f\xF8r den lange strekninga s\xF8r."
  },
  {
    place: "Tokushima by",
    name: "\u30B5\u30A4\u30AF\u30EB\u30D9\u30FC\u30B9\u3042\u3055\u3072 \u5FB3\u5CF6\u5E97 (Cycle Base Asahi)",
    phone: "088-602-3822",
    note: "Punktering, dekk, bremser, kjede \u2014 full service."
  },
  {
    place: "Kochi by",
    name: "\u30B8\u30E3\u30A4\u30A2\u30F3\u30C8\u30B9\u30C8\u30A2\u9AD8\u77E5 (Giant Store Kochi)",
    phone: "088-879-2768",
    note: "Sportssykkelspesialist, ved vendepunktet ditt."
  },
  {
    place: "Kochi by",
    name: "\u30B5\u30A4\u30AF\u30EB\u30D9\u30FC\u30B9\u3042\u3055\u3072 \u5357\u5FA1\u5EA7\u5E97",
    phone: "088-880-9515",
    note: "Open til 20:00 kvardagar."
  },
  {
    place: "Kochi by",
    name: "(\u6709)\u7D30\u6728\u5546\u4F1A (Hosogi Shokai)",
    phone: "088-831-6266",
    note: "Lokal sykkelbutikk n\xE6r hamna i Kochi."
  }
];
function mkItems(prefix, labels) {
  return labels.map((label, i) => ({ id: `${prefix}${i + 1}`, label }));
}
const PACKING_CATEGORIES = [
  { id: "dok", name: "Viktige dokument og reisedokument", items: mkItems("dok", [
    "Pass",
    "Kopi av pass (digital + papir)",
    "Flybillettar",
    "Reiseforsikring",
    "Forsikringsnummer og n\xF8dnummer",
    "Bankkort (minst 2 kort om mogleg)",
    "Litt japanske yen kontantar",
    "F\xF8rarkort (om aktuelt)",
    "Internasjonalt f\xF8rarkort (om du skal leige bil)",
    "Kopi av hotellreservasjonar",
    "Sykkelutleigekontrakt/reservasjon",
    "Kontaktinformasjon til sykkelutleige",
    "Adresse til f\xF8rste overnatting i Japan (p\xE5 japansk og engelsk)"
  ]) },
  { id: "mob", name: "Mobil og navigasjon", items: mkItems("mob", [
    "Mobiltelefon",
    "Ladekabel mobil",
    "Hurtiglader",
    "Powerbank (10 000\u201320 000 mAh)",
    "USB-kablar",
    "Adapter til japansk stikkontakt (Type A)",
    "Ekstra minnekort (om kamera)",
    "Offline kart lasta ned",
    "GPX-filer lagra offline"
  ]) },
  { id: "kam", name: "Kamera", items: mkItems("kam", [
    "Kamera",
    "Kamerabatteri",
    "Kameraladar",
    "Ekstra minnekort",
    "Kamerastativ (valfritt)"
  ]) },
  { id: "sel", name: "Sykkelrelatert elektronikk", items: mkItems("sel", [
    "Sykkellys framme",
    "Sykkellys bak",
    "Ekstra batteri/opplading til lys",
    "Sykkelcomputer/GPS (om brukt)",
    "Ladekabel til GPS"
  ]) },
  { id: "syk", name: "Sykkelklede", items: mkItems("syk", [
    "Sykkelshorts med padding (2 stk.)",
    "Sykkeltr\xF8yer (2\u20133 stk.)",
    "Sykkelundert\xF8y (valfritt)",
    "Sykkelsokkar (3\u20135 par)",
    "Sports-BH (om aktuelt)",
    "Sykkelhanskar",
    "Sykkeljakke/vindjakke",
    "Regnjakke for sykling",
    "Regnbukse (anbefalt i Japan i oktober)",
    "Armvarmarar",
    "Beinvarmarar",
    "Buff/hals",
    "Sykkelcaps under hjelm"
  ]) },
  { id: "ove", name: "Vanlege klede \u2014 overdelar", items: mkItems("ove", [
    "T-skjorter (3 stk.)",
    "Langermet genser (1 stk.)",
    "Tynn fleece eller ulltr\xF8ye",
    "Lett jakke"
  ]) },
  { id: "und", name: "Vanlege klede \u2014 underdelar", items: mkItems("und", [
    "Bukse til kveldar (lett/t\xF8rkar raskt)",
    "Shorts/skj\xF8rt (valfritt)",
    "Undert\xF8y (5\u20137 stk.)",
    "Sokkar (5\u20137 par)"
  ]) },
  { id: "kvi", name: "Kviklede", items: mkItems("kvi", [
    "Behagelege klede til hotell",
    "Pysj/kveldsklede"
  ]) },
  { id: "sko", name: "Sko", items: mkItems("sko", [
    "Sykkelsko (om brukt)",
    "Vanlege joggesko/sandalar",
    "T\xF8flar/slippers til hostel og bad",
    "Ekstra skolisser"
  ]) },
  { id: "reg", name: "Regn og v\xEArutstyr", items: mkItems("reg", [
    "Gore-Tex/regnjakke",
    "Regnbukse",
    "Regntrekk til sykkelveske",
    "Regntrekk til sekk",
    "Vanntette pakkeposar",
    "Ziplock-posar til elektronikk",
    "Mikrofiberhandkle",
    "Ekstra t\xF8rre klede i eigen pose"
  ]) },
  { id: "rep", name: "Sykkelutstyr \u2014 reparasjon", items: mkItems("rep", [
    "Multiverkt\xF8y for sykkel",
    "Dekkspakar",
    "Ekstra slangar (2 stk.)",
    "Lappesaker",
    "Mini pumpe",
    "CO\u2082-patronar (valfritt)",
    "Kjedeolje",
    "Liten b\xF8rste/klut",
    "Ekstra kjedel\xE5s",
    "Ekstra bremseklossar (om n\xF8dvendig)",
    "Ekstra girwire (valfritt)"
  ]) },
  { id: "pra", name: "Sykkelutstyr \u2014 praktisk", items: mkItems("pra", [
    "Flaskehaldar",
    "Sykkelflasker (2 stk.)",
    "Sykkelvesker/bagasje",
    "Liten l\xE5s",
    "Refleks",
    "Solbriller med UV-beskyttelse",
    "Sykkelbriller",
    "Hjelm"
  ]) },
  { id: "hyg", name: "Toalettsaker \u2014 hygiene", items: mkItems("hyg", [
    "Tannb\xF8rste",
    "Tannkrem",
    "Deo",
    "Sjampo (liten flaske)",
    "Dusjs\xE5pe",
    "Hudkrem",
    "Leppepomade",
    "H\xE5rb\xF8rste/kam",
    "H\xE5rstrikk",
    "Barberutstyr (om n\xF8dvendig)"
  ]) },
  { id: "apo", name: "Toalettsaker \u2014 reiseapotek", items: mkItems("apo", [
    "Smertestillande",
    "Gnags\xE5rplaster",
    "Vanlege plaster",
    "Desinfeksjon",
    "Sportsteip",
    "Elektrolyttar",
    "Solkrem",
    "Myggmiddel",
    "Personlege medisinar"
  ]) },
  { id: "for", name: "F\xF8rstehjelp for syklist", items: mkItems("for", [
    "Gnags\xE5rplaster (viktig)",
    "Sportsteip",
    "Elastisk bandasje",
    "S\xE5rvask",
    "Pinsett",
    "Saks",
    "Smertestillande",
    "Antibakterielle v\xE5tserviettar"
  ]) },
  { id: "mat", name: "Mat og drikke p\xE5 sykkelen", items: mkItems("mat", [
    "Energibarar",
    "N\xF8tter",
    "Elektrolyttpulver",
    "Lite bestikk",
    "Sammenleggbar kopp (valfritt)",
    "Vassflasker"
  ]) },
  { id: "nyt", name: "Ekstra nyttig i Japan", items: mkItems("nyt", [
    "ICOCA-kort (transportkort)",
    "Google Translate offline japansk",
    "Liten pose til s\xF8ppel",
    "Neseserviettar/v\xE5tserviettar",
    "Liten hengel\xE5s",
    "Klesline (travel clothesline)",
    "Vaskemiddel i sm\xE5 posar/tablettar",
    "\xD8yreproppar",
    "Sovemaske",
    "Liten dagbok/notatbok"
  ]) },
  { id: "dig", name: "Reiseapp og digitale ting", items: mkItems("dig", [
    "Offline kart",
    "GPX-ruter",
    "Hotelladresser p\xE5 japansk",
    "Flyinformasjon",
    "Reiseforsikring lagra offline",
    "Passkopi",
    "Budsjettoversikt",
    "Oversikt over n\xF8dnummer",
    "Japanske frasar"
  ]) },
  { id: "val", name: "Valfrie ting som kan vere verdt vekta", items: mkItems("val", [
    "Kindle/lesebrett",
    "Lite kamera",
    "Badet\xF8y (onsen/bading)",
    "Liten termos",
    "Sovepose-laken (for hostel)",
    "Klespose for skitne klede",
    "Liten t\xF8rrpose for regn"
  ]) }
];
const REPAIR_GUIDE = [
  { problem: "Punktering", fix: "Finn h\xF2let (lytt/kjenn etter luft, eller dypp slangen i vatn). Bruk dekkspakar til \xE5 l\xF8yse dekket av p\xE5 \xE9i side. Set inn ny slange eller lapp, pump til rett trykk (sjekk sida av dekket for PSI-tal)." },
  { problem: "Kjedet hoppar/glepp p\xE5 tannhjula", fix: "Ofte for lite kjedeolje eller slitt kjede. Sm\xF8r med kjedeolje, t\xF8rk av overskot. Vedvarande problem \u2192 be sykkelbutikk sjekke gir/bakskifter." },
  { problem: "Bremsane skrapar eller er svake", fix: "Sjekk at bremseklossane ikkje er slitne og ikkje tek borti felgen skeivt. Skivebremser: sjekk at skiva ikkje er b\xF8ygd. Juster med bremsewire-justeringsskruen om bremsehandtaket g\xE5r for langt inn." },
  { problem: "Skiftar ikkje gir presist", fix: "Kan vere feiljustert bakskiftar (indexing) eller skitten/t\xF8rr girkabel. Enkel justering med skruen p\xE5 bakskiftaren; elles la ein butikk sj\xE5 p\xE5 det." },
  { problem: "Sykkelvesker/bagasje losnar", fix: "Sjekk at festeklips/reim ikkje er slitne. Ha alltid ein ekstra stropp eller tau i vesla som backup." },
  { problem: "Skrangling/laust styre eller seter", fix: "Kjenn etter med handa om noko vaggar. Bruk multiverkt\xF8yet til \xE5 stramme bolt for bolt \u2014 ikkje for hardt." }
];
const PHRASES_SYKKEL = [
  { jp: "\u30D1\u30F3\u30AF\u3057\u307E\u3057\u305F\u3002", no: "Eg har punktert." },
  { jp: "\u81EA\u8EE2\u8ECA\u5C4B[\u3058\u3066\u3093\u3057\u3083\u3084]\u306F\u3069\u3053\u3067\u3059\u304B\uFF1F", no: "Kvar er n\xE6raste sykkelbutikk?" },
  { jp: "\u30D6\u30EC\u30FC\u30AD\u304C\u52B9[\u304D]\u304D\u307E\u305B\u3093\u3002", no: "Bremsane verkar ikkje." },
  { jp: "\u30C1\u30A7\u30FC\u30F3\u304C\u5916[\u306F\u305A]\u308C\u307E\u3057\u305F\u3002", no: "Kjedet har falle av." },
  { jp: "\u4FEE\u7406[\u3057\u3085\u3046\u308A]\u3067\u304D\u307E\u3059\u304B\uFF1F", no: "Kan de reparere dette?" },
  { jp: "\u7A7A\u6C17\u5165[\u304F\u3046\u304D\u3044]\u308C\u3092\u8CB8[\u304B]\u3057\u3066\u3082\u3089\u3048\u307E\u3059\u304B\uFF1F", no: "Kan eg l\xE5ne ei luftpumpe?" },
  { jp: "\u81EA\u8EE2\u8ECA[\u3058\u3066\u3093\u3057\u3083]\u3092\u7F6E[\u304A]\u3051\u307E\u3059\u304B\uFF1F", no: "Har de plass til sykkelen?" },
  { jp: "\u30AE\u30A2\u304C\u5909[\u304B]\u308F\u308A\u307E\u305B\u3093\u3002", no: "Gira skiftar ikkje." },
  { jp: "\u90E8\u54C1[\u3076\u3072\u3093]\u306F\u3042\u308A\u307E\u3059\u304B\uFF1F", no: "Har de denne reservedelen?" },
  { jp: "\u30EC\u30F3\u30BF\u30B5\u30A4\u30AF\u30EB\u3092\u8FD4\u5374[\u3078\u3093\u304D\u3083\u304F]\u3057\u305F\u3044\u3067\u3059\u3002", no: "Eg vil levere tilbake utleigesykkelen." }
];
const PHRASES_HELSE = [
  { jp: "\u52A9[\u305F\u3059]\u3051\u3066\u304F\u3060\u3055\u3044\u3002", no: "Eg treng hjelp!" },
  { jp: "\u6C17\u5206[\u304D\u3076\u3093]\u304C\u60AA[\u308F\u308B]\u3044\u3067\u3059\u3002", no: "Eg kjenner meg uvel." },
  { jp: "\u71B1\u4E2D\u75C7[\u306D\u3063\u3061\u3085\u3046\u3057\u3087\u3046]\u304B\u3082\u3057\u308C\u307E\u305B\u3093\u3002", no: "Eg trur eg har f\xE5tt hetesjokk." },
  { jp: "\u819D[\u3072\u3056]\u304C\u75DB[\u3044\u305F]\u3044\u3067\u3059\u3002", no: "Kneet mitt gjer vondt." },
  { jp: "\u8DB3\u9996[\u3042\u3057\u304F\u3073]\u3092\u637B\u632B[\u306D\u3093\u3056]\u3057\u307E\u3057\u305F\u3002", no: "Eg har vrikka ankelen." },
  { jp: "\u8EE2[\u3053\u308D]\u3073\u307E\u3057\u305F\u3002", no: "Eg fall (av sykkelen)." },
  { jp: "\u75C5\u9662[\u3073\u3087\u3046\u3044\u3093]\u306F\u3069\u3053\u3067\u3059\u304B\uFF1F", no: "Kvar er n\xE6raste sjukehus?" },
  { jp: "\u85AC\u5C40[\u3084\u3063\u304D\u3087\u304F]\u306F\u3069\u3053\u3067\u3059\u304B\uFF1F", no: "Kvar er n\xE6raste apotek?" },
  { jp: "\u6551\u6025\u8ECA[\u304D\u3085\u3046\u304D\u3085\u3046\u3057\u3083]\u3092\u547C[\u3088]\u3093\u3067\u304F\u3060\u3055\u3044\u3002", no: "Ring ein ambulanse." },
  { jp: "\u30A2\u30EC\u30EB\u30AE\u30FC\u304C\u3042\u308A\u307E\u3059\u3002", no: "Eg har allergiar." },
  { jp: "\u6D77\u5916\u65C5\u884C\u4FDD\u967A[\u304B\u3044\u304C\u3044\u308A\u3087\u3053\u3046\u307B\u3051\u3093]\u306B\u5165[\u306F\u3044]\u3063\u3066\u3044\u307E\u3059\u3002", no: "Eg har reiseforsikring." },
  { jp: "\u82F1\u8A9E[\u3048\u3044\u3054]\u3092\u8A71[\u306F\u306A]\u305B\u308B\u4EBA[\u3072\u3068]\u306F\u3044\u307E\u3059\u304B\uFF1F", no: "Er det nokon her som snakkar engelsk?" }
];
const TRANSPORT_ICON = {
  sykkel: Bike,
  ferje: Ship,
  tog: Train,
  fly: Plane,
  rest: PauseCircle
};
const TRANSPORT_OPTIONS = [
  { value: "sykkel", label: "\u{1F6B2} Sykkel" },
  { value: "ferje", label: "\u26F4\uFE0F Ferje" },
  { value: "tog", label: "\u{1F686} Tog" },
  { value: "fly", label: "\u2708\uFE0F Fly" },
  { value: "rest", label: "\u23F8\uFE0F Kvile / ingen transport" }
];
function fmtLongDate(iso) {
  const d = /* @__PURE__ */ new Date(iso + "T00:00:00");
  return d.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" });
}
async function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem("shikoku:" + key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
async function saveJSON(key, value) {
  try {
    localStorage.setItem("shikoku:" + key, JSON.stringify(value));
  } catch {
  }
}
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}
function findDefaultDayIndex() {
  const today = /* @__PURE__ */ new Date();
  const todayIso = today.toISOString().slice(0, 10);
  let idx = DAYS.findIndex((d) => d.id === todayIso);
  if (idx !== -1) return idx;
  idx = DAYS.findIndex((d) => d.id > todayIso);
  return idx === -1 ? 0 : idx;
}
function Stamp({ n, active, done, size = 40 }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${active ? C.coral : done ? C.teal : C.ai200}`,
        color: active ? C.coral : done ? C.teal : C.ai700,
        background: C.paper,
        fontFamily: "'Zilla Slab', serif"
      },
      className: "flex items-center justify-center font-bold shrink-0 text-sm"
    },
    n
  );
}
function DayDetail({ day, index, onPrev, onNext }) {
  const [notes, setNotes] = useState("");
  const [actualKm, setActualKm] = useState("");
  const [ready, setReady] = useState(false);
  const Icon = TRANSPORT_ICON[day.transport] || Bike;
  const isCycling = day.transport.includes("sykkel");
  useEffect(() => {
    let cancelled = false;
    setReady(false);
    (async () => {
      const nt = await loadJSON(`notes-${day.id}`, "");
      const km = await loadJSON(`actualkm-${day.id}`, "");
      if (!cancelled) {
        setNotes(nt);
        setActualKm(km);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [day.id]);
  const commitNotes = (v) => {
    setNotes(v);
    saveJSON(`notes-${day.id}`, v);
  };
  const commitKm = (v) => {
    setActualKm(v);
    saveJSON(`actualkm-${day.id}`, v);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.washi }, className: "min-h-full" }, /* @__PURE__ */ React.createElement("div", { style: { background: C.ai900 }, className: "px-5 pt-6 pb-8 relative overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.ai700, opacity: 0.5 },
      className: "absolute -right-10 -top-10 w-40 h-40 rounded-full"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4 relative" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onPrev,
      disabled: index === 0,
      style: { color: C.washi, opacity: index === 0 ? 0.25 : 0.85 }
    },
    /* @__PURE__ */ React.createElement(ChevronLeft, { size: 22 })
  ), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { color: C.ai200, fontFamily: "'Space Mono', monospace" },
      className: "text-xs tracking-widest uppercase"
    },
    "Dag ",
    index + 1,
    " av ",
    DAYS.length
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { color: C.washi, fontFamily: "'Zilla Slab', serif" },
      className: "text-lg capitalize font-semibold"
    },
    fmtLongDate(day.id)
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onNext,
      disabled: index === DAYS.length - 1,
      style: { color: C.washi, opacity: index === DAYS.length - 1 ? 0.25 : 0.85 }
    },
    /* @__PURE__ */ React.createElement(ChevronRight, { size: 22 })
  )), /* @__PURE__ */ React.createElement("div", { className: "relative flex items-start gap-3" }, /* @__PURE__ */ React.createElement(Stamp, { n: index + 1, active: true, size: 44 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { color: C.washi, fontFamily: "'Zilla Slab', serif" },
      className: "text-2xl font-bold leading-tight"
    },
    day.stage
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mt-1" }, /* @__PURE__ */ React.createElement(Icon, { size: 16, color: C.coral }), /* @__PURE__ */ React.createElement("span", { style: { color: C.ai200 }, className: "text-sm" }, day.distance || "\u2014"))))), /* @__PURE__ */ React.createElement("div", { className: "px-5 -mt-4 pb-10 space-y-4" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-2xl border p-4 shadow-sm"
    },
    /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-sm leading-relaxed" }, day.plan)
  ), day.tough && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#FBE9E1", borderColor: C.coral },
      className: "rounded-2xl border p-4 flex gap-3 items-start"
    },
    /* @__PURE__ */ React.createElement(AlertTriangle, { size: 18, color: C.coral, className: "shrink-0 mt-0.5" }),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: C.coral }, className: "text-sm font-semibold" }, "T\xF8ff etappe"), /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm" }, day.toughNote))
  ), day.holiday && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#FBF3D9", borderColor: "#C9A227" },
      className: "rounded-2xl border p-4 flex gap-3 items-start"
    },
    /* @__PURE__ */ React.createElement(AlertTriangle, { size: 18, color: "#C9A227", className: "shrink-0 mt-0.5" }),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: "#9C7E1A" }, className: "text-sm font-semibold" }, "Nasjonal heilagdag"), /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm" }, day.holidayNote))
  ), day.highlights.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "h3",
    {
      style: { color: C.ai700, fontFamily: "'Zilla Slab', serif" },
      className: "text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-1"
    },
    /* @__PURE__ */ React.createElement(Flag, { size: 14 }),
    " Stopp og attraksjonar"
  ), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, day.highlights.map((h, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-xl border px-3 py-2.5"
    },
    /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm font-semibold" }, h.name),
    h.note && /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs mt-0.5" }, h.note)
  )))), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-2xl border p-4 flex items-center justify-between"
    },
    /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide" }, "Overnatting"), day.accommodation ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm mt-0.5 font-semibold" }, day.accommodation.name), day.accommodation.address && /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs mt-0.5" }, day.accommodation.address)) : /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-sm mt-0.5" }, "Ikkje registrert enno \u2014 legg til i \xABPlan\xBB")),
    /* @__PURE__ */ React.createElement(Sparkles, { size: 16, color: day.accommodation ? C.teal : C.ai200, className: "shrink-0" })
  ), isCycling && ready && /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-2xl border p-4" }, /* @__PURE__ */ React.createElement("label", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide block mb-2" }, "Faktisk distanse (km)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      inputMode: "decimal",
      value: actualKm,
      onChange: (e) => commitKm(e.target.value),
      placeholder: "t.d. 87",
      style: { borderColor: C.ai200, color: C.ink, fontFamily: "'Space Mono', monospace" },
      className: "w-full border rounded-lg px-3 py-2 text-lg bg-transparent outline-none"
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-2xl border p-4" }, /* @__PURE__ */ React.createElement("label", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide block mb-2" }, "Notat / erfaringar"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: notes,
      onChange: (e) => commitNotes(e.target.value),
      placeholder: "Korleis gjekk dagen? Ver, mat, folk du m\xF8tte\u2026",
      rows: 3,
      style: { borderColor: C.ai200, color: C.ink },
      className: "w-full border rounded-lg px-3 py-2 text-sm bg-transparent outline-none resize-none"
    }
  ))));
}
function ItineraryList({ days, onSelect, onEditStage, onEditTransport, onEditAccommodation }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editTransport, setEditTransport] = useState("sykkel");
  const [editAccName, setEditAccName] = useState("");
  const [editAccAddress, setEditAccAddress] = useState("");
  const startEdit = (d) => {
    setEditingId(d.id);
    setEditValue(d.stage);
    setEditTransport(d.transport);
    setEditAccName(d.accommodation?.name || "");
    setEditAccAddress(d.accommodation?.address || "");
  };
  const saveEdit = (d) => {
    const trimmed = editValue.trim();
    if (trimmed) onEditStage(d.id, trimmed);
    onEditTransport(d.id, editTransport);
    const name = editAccName.trim();
    onEditAccommodation(d.id, name ? { name, address: editAccAddress.trim() } : null);
    setEditingId(null);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.washi }, className: "min-h-full px-5 py-6" }, /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { color: C.ai900, fontFamily: "'Zilla Slab', serif" },
      className: "text-2xl font-bold mb-1"
    },
    "Reiseplan"
  ), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm mb-5" }, "30. sep \u2013 19. okt \xB7 20 dagar \xB7 trykk blyanten for \xE5 endre rute/transport/overnatting"), /* @__PURE__ */ React.createElement("div", { style: { borderColor: C.ai200 }, className: "relative border-l-2 pl-5 space-y-4 ml-4" }, days.map((d, i) => {
    const Icon = TRANSPORT_ICON[d.transport] || Bike;
    const isEditing = editingId === d.id;
    return /* @__PURE__ */ React.createElement("div", { key: d.id, className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -left-[29px] top-0", style: { background: C.washi } }, /* @__PURE__ */ React.createElement(Stamp, { n: i + 1, size: 32 })), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: { background: C.paper, borderColor: C.ai200 },
        className: "rounded-xl border px-4 py-3"
      },
      isEditing ? /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs" }, d.label), /* @__PURE__ */ React.createElement(
        "input",
        {
          autoFocus: true,
          type: "text",
          value: editValue,
          onChange: (e) => setEditValue(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") saveEdit(d);
            if (e.key === "Escape") setEditingId(null);
          },
          style: { borderColor: C.ai200, color: C.ink },
          className: "w-full border rounded-lg px-2.5 py-1.5 text-sm bg-transparent outline-none"
        }
      ), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: editTransport,
          onChange: (e) => setEditTransport(e.target.value),
          style: { borderColor: C.ai200, color: C.ink },
          className: "w-full border rounded-lg px-2.5 py-1.5 text-sm bg-transparent outline-none"
        },
        TRANSPORT_OPTIONS.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.value, value: t.value }, t.label))
      ), /* @__PURE__ */ React.createElement("div", { style: { borderColor: C.ai200 }, className: "border-t pt-2 mt-1" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-[11px] font-semibold uppercase mb-1.5" }, "Overnattingsstad"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          value: editAccName,
          onChange: (e) => setEditAccName(e.target.value),
          placeholder: "Namn p\xE5 hotell/hostel",
          style: { borderColor: C.ai200, color: C.ink },
          className: "w-full border rounded-lg px-2.5 py-1.5 text-sm bg-transparent outline-none mb-2"
        }
      ), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          value: editAccAddress,
          onChange: (e) => setEditAccAddress(e.target.value),
          placeholder: "Adresse (valfritt)",
          style: { borderColor: C.ai200, color: C.ink },
          className: "w-full border rounded-lg px-2.5 py-1.5 text-sm bg-transparent outline-none"
        }
      )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => saveEdit(d),
          style: { background: C.teal, color: C.washi },
          className: "flex-1 rounded-lg py-1.5 text-xs font-semibold flex items-center justify-center gap-1"
        },
        /* @__PURE__ */ React.createElement(Check, { size: 13 }),
        " Lagre"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setEditingId(null),
          style: { borderColor: C.ai200, color: C.inkSoft },
          className: "flex-1 rounded-lg py-1.5 text-xs font-semibold border"
        },
        "Avbryt"
      ))) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => onSelect(i), className: "min-w-0 text-left flex-1" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs" }, d.label), /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm font-semibold truncate" }, d.stage), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 mt-1" }, /* @__PURE__ */ React.createElement(Icon, { size: 13, color: C.coral }), /* @__PURE__ */ React.createElement("span", { style: { color: C.inkSoft }, className: "text-xs" }, d.distance || "\u2014"), d.tough && /* @__PURE__ */ React.createElement(AlertTriangle, { size: 12, color: C.coral, className: "ml-1" }), d.holiday && /* @__PURE__ */ React.createElement(Sparkles, { size: 12, color: "#C9A227", className: "ml-1" })), d.accommodation && /* @__PURE__ */ React.createElement("div", { style: { color: C.teal }, className: "text-[11px] mt-1 flex items-center gap-1 truncate" }, /* @__PURE__ */ React.createElement(Sparkles, { size: 11, className: "shrink-0" }), " ", d.accommodation.name)), /* @__PURE__ */ React.createElement("button", { onClick: () => startEdit(d), className: "shrink-0 p-1.5" }, /* @__PURE__ */ React.createElement(Pencil, { size: 15, color: C.ai200 })), /* @__PURE__ */ React.createElement("button", { onClick: () => onSelect(i), className: "shrink-0" }, /* @__PURE__ */ React.createElement(ChevronRight, { size: 18, color: C.ai200 })))
    ));
  })));
}
function TypeBadge({ type }) {
  const meta = SIGHT_TYPES[type];
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { background: meta.color + "22", color: meta.color },
      className: "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
    },
    meta.label
  );
}
function MatSightseeing() {
  const [subTab, setSubTab] = useState("sightseeing");
  const [statusMap, setStatusMap] = useState({});
  const [typeFilter, setTypeFilter] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const map = await loadJSON("sight-status", {});
      setStatusMap(map);
      setLoaded(true);
    })();
  }, []);
  const cycleStatus = (id) => {
    const current = statusMap[id];
    const idx = current ? STATUS_CYCLE.indexOf(current) : -1;
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    const nextMap = { ...statusMap, [id]: next };
    setStatusMap(nextMap);
    saveJSON("sight-status", nextMap);
  };
  const visibleSights = typeFilter ? SIGHTS.filter((s) => s.type === typeFilter) : SIGHTS;
  const visitedCount = SIGHTS.filter((s) => statusMap[s.id] === "besokt").length;
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.washi }, className: "min-h-full px-5 py-6" }, /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { color: C.ai900, fontFamily: "'Zilla Slab', serif" },
      className: "text-2xl font-bold mb-1"
    },
    "Mat & Sightseeing"
  ), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm mb-4" }, subTab === "sightseeing" ? `${visitedCount}/${SIGHTS.length} bes\xF8kt` : `${FOOD_ITEMS.length} rettar \xE5 pr\xF8ve`), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-full border p-1 flex mb-4"
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSubTab("sightseeing"),
        style: {
          background: subTab === "sightseeing" ? C.ai900 : "transparent",
          color: subTab === "sightseeing" ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(Landmark, { size: 14 }),
      " Sightseeing"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSubTab("mat"),
        style: {
          background: subTab === "mat" ? C.ai900 : "transparent",
          color: subTab === "mat" ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(ChefHat, { size: 14 }),
      " Mat"
    )
  ), subTab === "sightseeing" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 overflow-x-auto pb-3 mb-1" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setTypeFilter(null),
      style: {
        background: typeFilter === null ? C.ai700 : C.paper,
        color: typeFilter === null ? C.washi : C.inkSoft,
        borderColor: C.ai200
      },
      className: "text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0"
    },
    "Alle"
  ), Object.entries(SIGHT_TYPES).map(([key, meta]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key,
      onClick: () => setTypeFilter(typeFilter === key ? null : key),
      style: {
        background: typeFilter === key ? meta.color : C.paper,
        color: typeFilter === key ? "#fff" : C.inkSoft,
        borderColor: C.ai200
      },
      className: "text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0"
    },
    meta.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, visibleSights.map((s) => {
    const status = statusMap[s.id] || "skal";
    const meta = STATUS_META[status];
    const StatusIcon = meta.icon;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: s.id,
        style: { background: C.paper, borderColor: C.ai200 },
        className: "rounded-xl border p-3.5 flex items-start gap-3"
      },
      /* @__PURE__ */ React.createElement("button", { onClick: () => cycleStatus(s.id), className: "shrink-0 mt-0.5", disabled: !loaded }, /* @__PURE__ */ React.createElement(StatusIcon, { size: 22, color: meta.color, fill: status === "favoritt" ? meta.color : "none" })),
      /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 flex-wrap mb-1" }, /* @__PURE__ */ React.createElement("span", { style: { color: C.ink }, className: "text-sm font-semibold" }, s.name), /* @__PURE__ */ React.createElement(TypeBadge, { type: s.type })), /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs" }, s.place), /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-xs mt-1 leading-relaxed" }, s.desc), s.hours && /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-[11px] mt-1" }, "\u{1F550} ", s.hours))
    );
  }))) : /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, FOOD_ITEMS.map((f) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: f.id,
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-xl border p-3.5"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { style: { color: C.ink }, className: "text-sm font-semibold" }, f.dish), /* @__PURE__ */ React.createElement("span", { style: { color: C.coral }, className: "text-xs font-bold shrink-0" }, f.price)),
    /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs mb-1.5" }, f.place),
    /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-xs leading-relaxed" }, f.note)
  ))));
}
function Pakking() {
  const [subTab, setSubTab] = useState("pakk");
  const [bikeInfo, setBikeInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const info = await loadJSON("bike-info", {});
      setBikeInfo(info);
      setLoaded(true);
    })();
  }, []);
  const updateField = (key, value) => {
    const next = { ...bikeInfo, [key]: value };
    setBikeInfo(next);
    saveJSON("bike-info", next);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.washi }, className: "min-h-full px-5 py-6" }, /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { color: C.ai900, fontFamily: "'Zilla Slab', serif" },
      className: "text-2xl font-bold mb-1"
    },
    "Pakking"
  ), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm mb-4" }, "Kva du skal ha med, og kva du har f\xE5tt"), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-full border p-1 flex mb-4"
    },
    [["pakk", "Pakkeliste"], ["info", "Sykkelinfo"]].map(([key, label]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key,
        onClick: () => setSubTab(key),
        style: {
          background: subTab === key ? C.ai900 : "transparent",
          color: subTab === key ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold"
      },
      label
    ))
  ), subTab === "info" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#FBE9E1", borderColor: C.coral },
      className: "rounded-xl border p-3 flex gap-2.5 items-start"
    },
    /* @__PURE__ */ React.createElement(AlertTriangle, { size: 16, color: C.coral, className: "shrink-0 mt-0.5" }),
    /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-xs leading-relaxed" }, "Fyll inn desse n\xE5r du hentar sykkelen 5. okt \u2014 d\xE5 har du alt samla om noko skulle skje undervegs.")
  ), loaded && BIKE_INFO_FIELDS.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key, style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-3.5" }, /* @__PURE__ */ React.createElement("label", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide block mb-1.5" }, f.label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: bikeInfo[f.key] || "",
      onChange: (e) => updateField(f.key, e.target.value),
      placeholder: "Ikkje fylt inn enno",
      style: { borderColor: C.ai200, color: C.ink },
      className: "w-full border rounded-lg px-3 py-1.5 text-sm bg-transparent outline-none"
    }
  )))), subTab === "pakk" && /* @__PURE__ */ React.createElement(Pakkeliste, null));
}
function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement(
    "h3",
    {
      style: { color: C.ai700, fontFamily: "'Zilla Slab', serif" },
      className: "text-xs font-bold uppercase tracking-wide"
    },
    title
  ), /* @__PURE__ */ React.createElement(
    ChevronDown,
    {
      size: 15,
      color: C.ai200,
      style: { transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }
    }
  )), open && children);
}
function Beredskap() {
  const [mainTab, setMainTab] = useState("sykkel");
  const [nodInfo, setNodInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const nod = await loadJSON("nod-info", {});
      setNodInfo(nod);
      setLoaded(true);
    })();
  }, []);
  const updateNodField = (key, value) => {
    const next = { ...nodInfo, [key]: value };
    setNodInfo(next);
    saveJSON("nod-info", next);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.washi }, className: "min-h-full px-5 py-6" }, /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { color: C.ai900, fontFamily: "'Zilla Slab', serif" },
      className: "text-2xl font-bold mb-1"
    },
    "Beredskap"
  ), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm mb-4" }, "Om noko g\xE5r gale \u2014 med sykkelen eller med deg"), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-full border p-1 flex mb-4"
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setMainTab("sykkel"),
        style: {
          background: mainTab === "sykkel" ? C.ai900 : "transparent",
          color: mainTab === "sykkel" ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(Bike, { size: 14 }),
      " Sykkel"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setMainTab("helse"),
        style: {
          background: mainTab === "helse" ? C.ai900 : "transparent",
          color: mainTab === "helse" ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(AlertTriangle, { size: 14 }),
      " Helse / naud"
    )
  ), mainTab === "sykkel" ? /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement(CollapsibleSection, { title: "Vanlege problem" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, REPAIR_GUIDE.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-3.5" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm font-semibold mb-1" }, r.problem), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-xs leading-relaxed" }, r.fix))))), /* @__PURE__ */ React.createElement(CollapsibleSection, { title: "Sykkelbutikkar langs ruta" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#FBE9E1", borderColor: C.coral },
      className: "rounded-xl border p-3 flex gap-2.5 items-start mb-2"
    },
    /* @__PURE__ */ React.createElement(AlertTriangle, { size: 16, color: C.coral, className: "shrink-0 mt-0.5" }),
    /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-xs leading-relaxed" }, "Ingen dedikerte sportssykkelbutikkar funne mellom Anan og Kochi by (~150 km, dekker Shishikui/Kaiyo, Muroto og Aki). Ha med fullt reparasjonssett og ring Yeti & Ltb f\xF8rst om noko skjer der.")
  ), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, BIKE_SHOPS.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-3.5" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm font-semibold" }, s.name), /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs mt-0.5" }, s.place), /* @__PURE__ */ React.createElement("div", { style: { color: C.ai700 }, className: "text-xs font-semibold mt-1" }, s.phone), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-xs mt-1 leading-relaxed" }, s.note))))), /* @__PURE__ */ React.createElement(CollapsibleSection, { title: "Frasar \u2014 sykkelproblem" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, PHRASES_SYKKEL.map((p, i) => /* @__PURE__ */ React.createElement(PhraseCard, { key: i, p }))))) : /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement(CollapsibleSection, { title: "Dine opplysningar" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, loaded && NODINFO_FIELDS.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key, style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-3.5" }, /* @__PURE__ */ React.createElement("label", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide block mb-1.5" }, f.label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: nodInfo[f.key] || "",
      onChange: (e) => updateNodField(f.key, e.target.value),
      placeholder: "Ikkje fylt inn enno",
      style: { borderColor: C.ai200, color: C.ink },
      className: "w-full border rounded-lg px-3 py-1.5 text-sm bg-transparent outline-none"
    }
  ))))), /* @__PURE__ */ React.createElement(CollapsibleSection, { title: "Kontaktar i Japan" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, NODINFO_REFERENCE.map((ref, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-3.5" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ink }, className: "text-sm font-semibold mb-1.5" }, ref.title), ref.lines.map((line, j) => /* @__PURE__ */ React.createElement("div", { key: j, style: { color: C.inkSoft }, className: "text-xs leading-relaxed" }, line)))))), /* @__PURE__ */ React.createElement(CollapsibleSection, { title: "Frasar \u2014 helse / naud" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, PHRASES_HELSE.map((p, i) => /* @__PURE__ */ React.createElement(PhraseCard, { key: i, p }))))), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-xs mt-4 text-center" }, "\u56DB\u56FD \xB7 \u3075\u308A\u304C\u306A over kanji, ingen romaji"));
}
function Pakkeliste() {
  const [checked, setChecked] = useState({});
  const [custom, setCustom] = useState({});
  const [overrides, setOverrides] = useState({});
  const [deleted, setDeleted] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [addingTo, setAddingTo] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [drafts, setDrafts] = useState({});
  const [collapsed, setCollapsed] = useState(
    () => Object.fromEntries(PACKING_CATEGORIES.map((c) => [c.id, true]))
  );
  const toggleCollapsed = (catId) => setCollapsed((prev) => ({ ...prev, [catId]: !prev[catId] }));
  useEffect(() => {
    (async () => {
      const c = await loadJSON("packing-checked", {});
      const cu = await loadJSON("packing-custom", {});
      const ov = await loadJSON("packing-overrides", {});
      const del = await loadJSON("packing-deleted", {});
      setChecked(c);
      setCustom(cu);
      setOverrides(ov);
      setDeleted(del);
      setLoaded(true);
    })();
  }, []);
  const toggle = (itemId) => {
    const next = { ...checked, [itemId]: !checked[itemId] };
    setChecked(next);
    saveJSON("packing-checked", next);
  };
  const addItem = (categoryId) => {
    if (!newLabel.trim()) return;
    const item = { id: `custom-${Date.now()}`, label: newLabel.trim() };
    const next = { ...custom, [categoryId]: [...custom[categoryId] || [], item] };
    setCustom(next);
    saveJSON("packing-custom", next);
    setNewLabel("");
    setAddingTo(null);
  };
  const startEdit = () => {
    setDrafts({ ...overrides });
    setEditMode(true);
  };
  const cancelEdit = () => setEditMode(false);
  const commitDraft = (itemId, defaultLabel) => {
    const value = drafts[itemId];
    const next = { ...overrides };
    if (value === void 0 || value === defaultLabel || !value.trim()) delete next[itemId];
    else next[itemId] = value;
    setOverrides(next);
    saveJSON("packing-overrides", next);
  };
  const finishEdit = () => setEditMode(false);
  const deleteItem = (itemId) => {
    const next = { ...deleted, [itemId]: true };
    setDeleted(next);
    saveJSON("packing-deleted", next);
    const nextChecked = { ...checked };
    delete nextChecked[itemId];
    setChecked(nextChecked);
    saveJSON("packing-checked", nextChecked);
  };
  if (!loaded) return /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm text-center py-8" }, "Lastar\u2026");
  const label = (item) => overrides[item.id] || item.label;
  const allCategoryItems = (cat) => [...cat.items, ...custom[cat.id] || []].filter((i) => !deleted[i.id]);
  const totalItems = PACKING_CATEGORIES.reduce((sum, cat) => sum + allCategoryItems(cat).length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const archiveGroups = PACKING_CATEGORIES.map((cat) => ({ cat, items: allCategoryItems(cat).filter((i) => checked[i.id]) })).filter((g) => g.items.length > 0);
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { style: { background: C.ai900 }, className: "rounded-xl p-3.5 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { style: { color: C.washi }, className: "text-sm font-semibold" }, "Pakkeframdrift"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { style: { color: C.coral }, className: "text-sm font-bold" }, totalChecked, " / ", totalItems), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: editMode ? finishEdit : startEdit,
      style: { color: C.washi },
      className: "flex items-center gap-1 text-xs font-semibold"
    },
    editMode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Check, { size: 14 }), " Ferdig") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pencil, { size: 13 }), " Rediger")
  ))), editMode && /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-xs -mt-2" }, "Endre tekst eller slett punkt. Endringar vert lagra automatisk n\xE5r du forl\xE8t eit felt."), !editMode && /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 -mt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCollapsed(Object.fromEntries(PACKING_CATEGORIES.map((c) => [c.id, false]))),
      style: { color: C.ai700 },
      className: "text-xs font-semibold"
    },
    "Opne alle"
  ), /* @__PURE__ */ React.createElement("span", { style: { color: C.ai200 }, className: "text-xs" }, "\xB7"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCollapsed(Object.fromEntries(PACKING_CATEGORIES.map((c) => [c.id, true]))),
      style: { color: C.ai700 },
      className: "text-xs font-semibold"
    },
    "Lukk alle"
  )), PACKING_CATEGORIES.map((cat) => {
    const allItems = allCategoryItems(cat);
    const items = editMode ? allItems : allItems.filter((i) => !checked[i.id]);
    const doneInCat = allItems.filter((i) => checked[i.id]).length;
    const isOpen = editMode || !collapsed[cat.id];
    return /* @__PURE__ */ React.createElement("div", { key: cat.id }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toggleCollapsed(cat.id),
        className: "w-full flex items-center justify-between mb-1.5"
      },
      /* @__PURE__ */ React.createElement(
        "h3",
        {
          style: { color: C.ai700, fontFamily: "'Zilla Slab', serif" },
          className: "text-xs font-bold uppercase tracking-wide"
        },
        cat.name
      ),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 shrink-0" }, /* @__PURE__ */ React.createElement("span", { style: { color: C.inkSoft }, className: "text-[11px]" }, doneInCat, "/", allItems.length), /* @__PURE__ */ React.createElement(
        ChevronDown,
        {
          size: 15,
          color: C.ai200,
          style: { transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }
        }
      ))
    ), isOpen && /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border divide-y" }, items.length === 0 && !editMode && /* @__PURE__ */ React.createElement("div", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("span", { style: { color: C.inkSoft }, className: "text-xs" }, "Alt pakka i denne kategorien \u2713")), items.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, style: { borderColor: C.ai200 }, className: "w-full flex items-center gap-2 px-4 py-2.5" }, editMode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: drafts[item.id] !== void 0 ? drafts[item.id] : label(item),
        onChange: (e) => setDrafts({ ...drafts, [item.id]: e.target.value }),
        onBlur: () => commitDraft(item.id, item.label),
        onKeyDown: (e) => {
          if (e.key === "Enter") e.target.blur();
        },
        style: { borderColor: C.ai200, color: C.ink },
        className: "flex-1 border rounded-lg px-2.5 py-1.5 text-sm bg-transparent outline-none"
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: () => deleteItem(item.id), className: "shrink-0" }, /* @__PURE__ */ React.createElement(Trash2, { size: 15, color: C.coral }))) : /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(item.id), className: "flex-1 flex items-center gap-3 text-left" }, /* @__PURE__ */ React.createElement(Circle, { size: 18, color: C.ai200, className: "shrink-0" }), /* @__PURE__ */ React.createElement("span", { style: { color: C.ink }, className: "text-sm" }, label(item))))), !editMode && (addingTo === cat.id ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 px-3 py-2.5" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        autoFocus: true,
        value: newLabel,
        onChange: (e) => setNewLabel(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") addItem(cat.id);
          if (e.key === "Escape") setAddingTo(null);
        },
        placeholder: "Nytt punkt\u2026",
        style: { borderColor: C.ai200, color: C.ink },
        className: "flex-1 border rounded-lg px-2.5 py-1.5 text-sm bg-transparent outline-none"
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: () => addItem(cat.id), style: { color: C.teal } }, /* @__PURE__ */ React.createElement(Check, { size: 18 })), /* @__PURE__ */ React.createElement("button", { onClick: () => setAddingTo(null), style: { color: C.inkSoft } }, /* @__PURE__ */ React.createElement(X, { size: 18 }))) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setAddingTo(cat.id);
          setNewLabel("");
        },
        style: { color: C.ai700 },
        className: "w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold"
      },
      "+ Legg til i \xAB",
      cat.name,
      "\xBB"
    ))));
  }), !editMode && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "h3",
    {
      style: { color: C.ai700, fontFamily: "'Zilla Slab', serif" },
      className: "text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5"
    },
    "\u{1F4E6} Arkiv \u2014 ferdig pakka"
  ), archiveGroups.length === 0 ? /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-xs" }, "Ingenting pakka enno \u2014 kryss av ting etter kvart som dei kjem i sykkelvesla.") : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, archiveGroups.map(({ cat, items }) => /* @__PURE__ */ React.createElement("div", { key: cat.id }, /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-[11px] font-semibold uppercase mb-1" }, cat.name), /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border divide-y" }, items.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => toggle(item.id),
      style: { borderColor: C.ai200 },
      className: "w-full flex items-center gap-3 px-4 py-2.5 text-left"
    },
    /* @__PURE__ */ React.createElement(CheckCircle2, { size: 18, color: C.teal, className: "shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { style: { color: C.inkSoft, textDecoration: "line-through" }, className: "text-sm" }, label(item))
  ))))))));
}
function RubyText({ text }) {
  const nodes = [];
  const regex = /([\u4E00-\u9FFF]+)\[([^\]]+)\]/g;
  let lastIndex = 0, match, key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(/* @__PURE__ */ React.createElement("span", { key: key++ }, text.slice(lastIndex, match.index)));
    nodes.push(/* @__PURE__ */ React.createElement("ruby", { key: key++ }, match[1], /* @__PURE__ */ React.createElement("rt", { style: { fontSize: "0.5em" } }, match[2])));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(/* @__PURE__ */ React.createElement("span", { key: key++ }, text.slice(lastIndex)));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, nodes);
}
function PhraseCard({ p }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-4" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ink, fontFamily: "'Zilla Slab', serif", lineHeight: 2.1 }, className: "text-xl mb-1.5" }, /* @__PURE__ */ React.createElement(RubyText, { text: p.jp })), /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-sm" }, p.no));
}
function Notat({ days }) {
  const [notatSub, setNotatSub] = useState("dagbok");
  return /* @__PURE__ */ React.createElement("div", { style: { background: C.washi }, className: "min-h-full px-5 py-6" }, /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { color: C.ai900, fontFamily: "'Zilla Slab', serif" },
      className: "text-2xl font-bold mb-1"
    },
    "Notat"
  ), /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm mb-4" }, "Dagbok og eigne notat"), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-full border p-1 flex mb-4"
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setNotatSub("dagbok"),
        style: {
          background: notatSub === "dagbok" ? C.ai900 : "transparent",
          color: notatSub === "dagbok" ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(NotebookPen, { size: 14 }),
      " Dagbok"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setNotatSub("info"),
        style: {
          background: notatSub === "info" ? C.ai900 : "transparent",
          color: notatSub === "info" ? C.washi : C.inkSoft
        },
        className: "flex-1 rounded-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement(Sparkles, { size: 14 }),
      " Nyttig info"
    )
  ), notatSub === "dagbok" ? /* @__PURE__ */ React.createElement(DagbokSummary, { days }) : /* @__PURE__ */ React.createElement(NyttigInfo, null));
}
function DagbokSummary({ days }) {
  const [entries, setEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const notes = await Promise.all(days.map((d) => loadJSON(`notes-${d.id}`, "")));
      const km = await Promise.all(days.map((d) => loadJSON(`actualkm-${d.id}`, "")));
      const withContent = days.map((d, i) => ({ ...d, note: notes[i], km: km[i] })).filter((d) => d.note && d.note.trim() || d.km && String(d.km).trim());
      if (!cancelled) {
        setEntries(withContent);
        setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [days]);
  const buildText = () => {
    return entries.map((e) => {
      const kmLine = e.km ? `Faktisk distanse: ${e.km} km
` : "";
      return `${fmtLongDate(e.id)} \u2014 ${e.stage}
${kmLine}${e.note || ""}`;
    }).join("\n\n---\n\n");
  };
  const handleCopy = async () => {
    const ok = await copyToClipboard(buildText());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  if (!loaded) return /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm text-center py-8" }, "Lastar\u2026");
  if (entries.length === 0) {
    return /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm text-center py-8" }, 'Ingen notat skrivne enno. Etter kvart som du fyller inn "Notat / erfaringar" p\xE5 dagane i "I dag"-fana, samlar dei seg her.');
  }
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleCopy,
      style: { background: copied ? C.teal : C.ai900, color: C.washi },
      className: "w-full rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
    },
    copied ? /* @__PURE__ */ React.createElement(Check, { size: 16 }) : /* @__PURE__ */ React.createElement(Copy, { size: 16 }),
    copied ? "Kopiert!" : `Kopier alle notat (${entries.length} dagar)`
  ), entries.map((e) => /* @__PURE__ */ React.createElement("div", { key: e.id, style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-4" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide capitalize" }, fmtLongDate(e.id)), /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-xs mb-2" }, e.stage), e.km && /* @__PURE__ */ React.createElement("div", { style: { color: C.coral }, className: "text-xs font-semibold mb-1" }, e.km, " km faktisk"), e.note && /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-sm leading-relaxed whitespace-pre-wrap" }, e.note))));
}
function NyttigInfo() {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const saved = await loadJSON("useful-info", []);
      setItems(saved);
      setLoaded(true);
    })();
  }, []);
  const addItem = () => {
    if (!newText.trim()) return;
    const entry = { id: Date.now().toString(), text: newText.trim(), date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) };
    const next = [entry, ...items];
    setItems(next);
    saveJSON("useful-info", next);
    setNewText("");
  };
  const deleteItem = (id) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    saveJSON("useful-info", next);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "rounded-xl border p-3.5 space-y-2.5" }, /* @__PURE__ */ React.createElement("label", { style: { color: C.ai700 }, className: "text-xs font-bold uppercase tracking-wide block" }, "Ny notis"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: newText,
      onChange: (e) => setNewText(e.target.value),
      placeholder: "T.d. 'Konbini ved Kaifu stasjon har vassfylling' eller ei adresse du treng \xE5 hugse",
      rows: 2,
      style: { borderColor: C.ai200, color: C.ink },
      className: "w-full border rounded-lg px-3 py-2 text-sm bg-transparent outline-none resize-none"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addItem,
      style: { background: C.ai900, color: C.washi },
      className: "w-full rounded-lg py-2 text-sm font-semibold"
    },
    "Legg til"
  )), loaded && items.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: C.inkSoft }, className: "text-sm text-center py-4" }, "Ingen notisar enno."), items.map((item) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: item.id,
      style: { background: C.paper, borderColor: C.ai200 },
      className: "rounded-xl border p-3.5 flex items-start justify-between gap-2"
    },
    /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("div", { style: { color: C.inkSoft }, className: "text-[11px] mb-0.5" }, item.date), /* @__PURE__ */ React.createElement("p", { style: { color: C.ink }, className: "text-sm whitespace-pre-wrap" }, item.text)),
    /* @__PURE__ */ React.createElement("button", { onClick: () => deleteItem(item.id), className: "shrink-0 p-1" }, /* @__PURE__ */ React.createElement(Trash2, { size: 16, color: C.coral }))
  )));
}
function App() {
  const [tab, setTab] = useState("dashboard");
  const [dayIndex, setDayIndex] = useState(() => findDefaultDayIndex());
  const [stageOverrides, setStageOverrides] = useState({});
  const [transportOverrides, setTransportOverrides] = useState({});
  const [accommodationOverrides, setAccommodationOverrides] = useState({});
  const [overridesLoaded, setOverridesLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const savedStage = await loadJSON("stage-overrides", {});
      const savedTransport = await loadJSON("transport-overrides", {});
      const savedAccommodation = await loadJSON("accommodation-overrides", {});
      setStageOverrides(savedStage);
      setTransportOverrides(savedTransport);
      setAccommodationOverrides(savedAccommodation);
      setOverridesLoaded(true);
    })();
  }, []);
  const effectiveDays = useMemo(
    () => DAYS.map((d) => ({
      ...d,
      stage: stageOverrides[d.id] || d.stage,
      transport: transportOverrides[d.id] || d.transport,
      accommodation: accommodationOverrides[d.id] || null
    })),
    [stageOverrides, transportOverrides, accommodationOverrides]
  );
  const day = effectiveDays[dayIndex];
  const handleEditStage = (dayId, newStage) => {
    const next = { ...stageOverrides, [dayId]: newStage };
    setStageOverrides(next);
    saveJSON("stage-overrides", next);
  };
  const handleEditTransport = (dayId, newTransport) => {
    const next = { ...transportOverrides, [dayId]: newTransport };
    setTransportOverrides(next);
    saveJSON("transport-overrides", next);
  };
  const handleEditAccommodation = (dayId, accommodation) => {
    const next = { ...accommodationOverrides, [dayId]: accommodation };
    setAccommodationOverrides(next);
    saveJSON("accommodation-overrides", next);
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { fontFamily: "'Work Sans', sans-serif", background: C.washi },
      className: "max-w-md mx-auto min-h-[700px] flex flex-col relative"
    },
    /* @__PURE__ */ React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Work+Sans:wght@400;500;600&family=Space+Mono&display=swap');
      `),
    /* @__PURE__ */ React.createElement("div", { style: { background: C.ai900 }, className: "px-5 py-3 flex items-center justify-between shrink-0" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: { color: C.washi, fontFamily: "'Zilla Slab', serif" },
        className: "text-base font-bold tracking-wide"
      },
      "\u963F\u6CE2\u571F\u4F50\u8857\u9053"
    ), /* @__PURE__ */ React.createElement("div", { style: { color: C.ai200 }, className: "text-[10px] uppercase tracking-widest" }, "Tokushima \u2194 Kochi \xB7 Osaka tur/retur")), /* @__PURE__ */ React.createElement(Mountain, { size: 20, color: C.coral })),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto" }, tab === "dashboard" && overridesLoaded && /* @__PURE__ */ React.createElement(
      DayDetail,
      {
        day,
        index: dayIndex,
        onPrev: () => setDayIndex((i) => Math.max(0, dayIndex - 1)),
        onNext: () => setDayIndex((i) => Math.min(effectiveDays.length - 1, dayIndex + 1))
      }
    ), tab === "itinerary" && overridesLoaded && /* @__PURE__ */ React.createElement(
      ItineraryList,
      {
        days: effectiveDays,
        onEditStage: handleEditStage,
        onEditTransport: handleEditTransport,
        onEditAccommodation: handleEditAccommodation,
        onSelect: (i) => {
          setDayIndex(i);
          setTab("dashboard");
        }
      }
    ), tab === "utforsk" && /* @__PURE__ */ React.createElement(MatSightseeing, null), tab === "pakking" && /* @__PURE__ */ React.createElement(Pakking, null), tab === "beredskap" && /* @__PURE__ */ React.createElement(Beredskap, null), tab === "notat" && /* @__PURE__ */ React.createElement(Notat, { days: effectiveDays })),
    /* @__PURE__ */ React.createElement("div", { style: { background: C.paper, borderColor: C.ai200 }, className: "border-t shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("dashboard"),
        className: "flex-1 flex flex-col items-center gap-1 py-2.5"
      },
      /* @__PURE__ */ React.createElement(Waves, { size: 20, color: tab === "dashboard" ? C.coral : C.inkSoft }),
      /* @__PURE__ */ React.createElement("span", { style: { color: tab === "dashboard" ? C.coral : C.inkSoft }, className: "text-[10px] font-medium" }, "I dag")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("itinerary"),
        className: "flex-1 flex flex-col items-center gap-1 py-2.5"
      },
      /* @__PURE__ */ React.createElement(MapPin, { size: 20, color: tab === "itinerary" ? C.coral : C.inkSoft }),
      /* @__PURE__ */ React.createElement("span", { style: { color: tab === "itinerary" ? C.coral : C.inkSoft }, className: "text-[10px] font-medium" }, "Plan")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("utforsk"),
        className: "flex-1 flex flex-col items-center gap-1 py-2.5"
      },
      /* @__PURE__ */ React.createElement(Utensils, { size: 20, color: tab === "utforsk" ? C.coral : C.inkSoft }),
      /* @__PURE__ */ React.createElement("span", { style: { color: tab === "utforsk" ? C.coral : C.inkSoft }, className: "text-[10px] font-medium" }, "Utforsk")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("pakking"),
        className: "flex-1 flex flex-col items-center gap-1 py-2.5"
      },
      /* @__PURE__ */ React.createElement(Backpack, { size: 20, color: tab === "pakking" ? C.coral : C.inkSoft }),
      /* @__PURE__ */ React.createElement("span", { style: { color: tab === "pakking" ? C.coral : C.inkSoft }, className: "text-[10px] font-medium" }, "Pakking")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("beredskap"),
        className: "flex-1 flex flex-col items-center gap-1 py-2.5"
      },
      /* @__PURE__ */ React.createElement(ShieldAlert, { size: 20, color: tab === "beredskap" ? C.coral : C.inkSoft }),
      /* @__PURE__ */ React.createElement("span", { style: { color: tab === "beredskap" ? C.coral : C.inkSoft }, className: "text-[10px] font-medium" }, "Beredskap")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("notat"),
        className: "flex-1 flex flex-col items-center gap-1 py-2.5"
      },
      /* @__PURE__ */ React.createElement(NotebookPen, { size: 20, color: tab === "notat" ? C.coral : C.inkSoft }),
      /* @__PURE__ */ React.createElement("span", { style: { color: tab === "notat" ? C.coral : C.inkSoft }, className: "text-[10px] font-medium" }, "Notat")
    )))
  );
}
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(/* @__PURE__ */ React.createElement(App, null));
