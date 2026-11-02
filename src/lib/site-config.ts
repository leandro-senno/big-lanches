/**
 * Configuração central da landing page da Big Lanches.
 *
 * Para trocar o link do WhatsMenu, altere apenas WHATSMENU_URL abaixo:
 * todos os botões de pedido da página usam esse valor.
 */
export const WHATSMENU_URL = "https://www.whatsmenu.com.br/hamburgueriabiglanches";

export const BUSINESS = {
  name: "Big Lanches",
  tagline: "Lanchonete em Barueri",
  address: "Estr. dos Pinheiros, 376 - Parque Viana, Barueri - SP, 06449-000",
  addressShort: "Estr. dos Pinheiros, 376 · Parque Viana",
  city: "Barueri - SP",
  phoneDisplay: "(11) 4162-1591",
  phoneHref: "tel:+551141621591",
  rating: "4,6",
  ratingCount: 245,
  mapsUrl: "https://maps.app.goo.gl/Sof6wHAQraBBqGw78",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Big+Lanches+Estr.+dos+Pinheiros+376+Parque+Viana+Barueri&output=embed",
} as const;

/**
 * Horário de funcionamento (fonte: Google Maps).
 * day: 0 = domingo ... 6 = sábado. open/close em minutos desde 00:00.
 */
export const OPENING_HOURS: { day: number; label: string; open: number; close: number }[] = [
  { day: 1, label: "Segunda", open: 16 * 60, close: 23 * 60 },
  { day: 2, label: "Terça", open: 16 * 60, close: 23 * 60 },
  { day: 3, label: "Quarta", open: 16 * 60, close: 23 * 60 },
  { day: 4, label: "Quinta", open: 16 * 60, close: 23 * 60 },
  { day: 5, label: "Sexta", open: 16 * 60, close: 23 * 60 },
  { day: 6, label: "Sábado", open: 16 * 60, close: 23 * 60 },
  { day: 0, label: "Domingo", open: 17 * 60, close: 23 * 60 },
];

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Fotos de uso livre (Unsplash License). Podem ser trocadas por fotos próprias em /public. */
export const IMAGES = {
  hero: unsplash("photo-1553979459-d2229ba7433b", 1000),
  burgerFries: unsplash("photo-1561758033-d89a9ad46330", 700),
  hotDog: unsplash("photo-1613482084286-41f25b486fa2", 700),
  pizza: unsplash("photo-1597715469889-dd75fe4a1765", 700),
  fries: unsplash("photo-1526230427044-d092040d48dc", 700),
  juice: unsplash("photo-1617319683252-027deeba5fd5", 700),
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#delivery", label: "Delivery" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;
