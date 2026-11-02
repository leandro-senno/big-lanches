import { useState, type ImgHTMLAttributes } from "react";
import {
  ArrowRight,
  Bike,
  Clock,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";

import { OrderLink } from "./OrderLink";
import { useOpenStatus } from "./use-open-status";
import { BUSINESS, IMAGES, NAV_LINKS, OPENING_HOURS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Dados da página                                                     */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { emoji: "🍔", title: "Lanches", subtitle: "Suculentos e caprichados" },
  { emoji: "🌭", title: "Hot Dog", subtitle: "Completo e bem servido" },
  { emoji: "🍕", title: "Pizzas", subtitle: "Quentinhas e saborosas" },
  { emoji: "🍟", title: "Porções", subtitle: "Crocantes e douradas" },
  { emoji: "🧃", title: "Sucos", subtitle: "Naturais e geladinhos" },
  { emoji: "🥤", title: "Bebidas", subtitle: "Refris e muito mais" },
];

const BESTSELLERS = [
  {
    title: "Lanches da Casa",
    description: "Hambúrguer suculento, queijo derretido e pão macio.",
    image: IMAGES.burgerFries,
    badge: "Mais pedido",
  },
  {
    title: "Hot Dog",
    description: "Completo, bem recheado e feito na hora.",
    image: IMAGES.hotDog,
  },
  {
    title: "Pizzas",
    description: "Massa no ponto e muito queijo derretido.",
    image: IMAGES.pizza,
  },
  {
    title: "Batata Frita",
    description: "Porção crocante por fora e macia por dentro.",
    image: IMAGES.fries,
  },
];

/* ------------------------------------------------------------------ */
/* Componentes auxiliares                                              */
/* ------------------------------------------------------------------ */

/** Imagem que some com elegância se a URL falhar (fica o fundo em degradê do container). */
function SafeImg({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      {...props}
      alt={alt}
      className={className}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#inicio"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Big Lanches - início"
    >
      <span className="grid size-10 place-items-center rounded-full bg-brand text-xl shadow-[0_0_20px_-4px] shadow-brand/70 sm:size-11">
        🍔
      </span>
      <span className="leading-none">
        <span className="block font-display text-2xl tracking-wide text-white sm:text-[1.7rem]">
          BIG <span className="text-brand">LANCHES</span>
        </span>
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/60">
          Barueri · SP
        </span>
      </span>
    </a>
  );
}

function OpenBadge() {
  const status = useOpenStatus();
  if (!status) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        status.isOpen
          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
          : "border-white/15 bg-white/5 text-white/70",
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          status.isOpen ? "animate-pulse bg-emerald-400" : "bg-white/40",
        )}
      />
      {status.label}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  highlight,
}: {
  kicker: string;
  title: string;
  highlight: string;
}) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <p className="font-script text-xl text-brand sm:text-2xl">{kicker}</p>
      <h2 className="mt-1 flex items-center justify-center gap-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
        <span className="hidden h-0.5 w-10 bg-brand sm:block" aria-hidden />
        {title} <span className="text-brand">{highlight}</span>
        <span className="hidden h-0.5 w-10 bg-brand sm:block" aria-hidden />
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Seções                                                              */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <OrderLink className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold uppercase text-surface transition-transform hover:scale-105 sm:inline-flex">
            Peça online <ShoppingBag className="size-4" />
          </OrderLink>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-white/5 bg-surface px-4 pb-4 md:hidden"
          aria-label="Menu móvel"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 text-base font-semibold text-white/85"
            >
              {link.label}
            </a>
          ))}
          <OrderLink className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand py-3 font-bold uppercase text-surface">
            Fazer pedido <ShoppingBag className="size-4" />
          </OrderLink>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative scroll-mt-20 overflow-hidden">
      {/* brilhos de fundo */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,oklch(0.76_0.17_60/0.28),transparent_55%),radial-gradient(ellipse_at_10%_90%,oklch(0.6_0.2_35/0.18),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-24 sm:px-6 md:grid-cols-2 md:pt-16 md:pb-32">
        <div className="text-center md:text-left">
          <div className="mb-4 flex justify-center md:justify-start">
            <OpenBadge />
          </div>
          <p className="font-script text-2xl text-white sm:text-3xl">Bateu a fome?</p>
          <h1 className="mt-1 leading-[0.85]">
            <span className="block font-script text-5xl text-white sm:text-6xl lg:text-7xl">
              Delicioso
            </span>
            <span className="block font-display text-7xl tracking-wide text-brand sm:text-8xl lg:text-9xl">
              LANCHES
            </span>
          </h1>
          <p className="mt-4 inline-block rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold tracking-[0.25em] text-white sm:text-sm">
            QUENTE • FRESCO • SABOROSO
          </p>
          <p className="mx-auto mt-5 max-w-md text-base text-white/75 sm:text-lg md:mx-0">
            Lanches, hot dogs, pizzas, porções e sucos feitos na hora, no Parque Viana em Barueri.
            Escolha no cardápio online e receba em casa.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <OrderLink className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-extrabold uppercase text-surface shadow-[0_10px_30px_-10px] shadow-brand transition-transform hover:scale-105 sm:w-auto">
              Peça agora <ArrowRight className="size-5" />
            </OrderLink>
            <a
              href="#cardapio"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold uppercase text-white transition-colors hover:border-brand hover:text-brand sm:w-auto"
            >
              Ver destaques
            </a>
          </div>

          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <span className="flex text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <strong className="text-white">{BUSINESS.rating}</strong> no Google ·{" "}
            {BUSINESS.ratingCount} avaliações
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="absolute inset-6 rounded-full bg-brand/30 blur-3xl" aria-hidden />
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand/40 to-surface-2 ring-1 ring-white/10">
            <SafeImg
              src={IMAGES.hero}
              alt="Hambúrguer artesanal com queijo derretido"
              className="size-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 grid size-28 place-items-center rounded-full border-4 border-surface bg-surface-2 text-center shadow-xl ring-2 ring-brand sm:size-32">
            <div>
              <p className="font-display text-3xl leading-none text-brand sm:text-4xl">100%</p>
              <p className="text-[0.65rem] font-bold uppercase leading-tight text-white">
                Feito
                <br />
                na hora
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section
      aria-label="Categorias"
      className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6"
    >
      <div className="grid grid-cols-3 gap-y-2 rounded-2xl bg-white p-3 shadow-2xl sm:p-4 lg:grid-cols-6">
        {CATEGORIES.map((cat, i) => (
          <OrderLink
            key={cat.title}
            className={cn(
              "group flex flex-col items-center rounded-xl px-2 py-3 text-center transition-colors hover:bg-brand/10",
              i > 0 && "lg:border-l lg:border-neutral-200",
            )}
          >
            <span
              className="text-4xl transition-transform group-hover:scale-110 sm:text-5xl"
              aria-hidden
            >
              {cat.emoji}
            </span>
            <span className="mt-2 text-sm font-extrabold uppercase text-neutral-900 sm:text-base">
              {cat.title}
            </span>
            <span className="hidden text-xs text-neutral-500 sm:block">{cat.subtitle}</span>
          </OrderLink>
        ))}
      </div>
    </section>
  );
}

function Bestsellers() {
  return (
    <section id="cardapio" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <SectionTitle kicker="Os favoritos da galera" title="MAIS" highlight="PEDIDOS" />

      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {BESTSELLERS.map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-surface-2 transition-colors hover:border-brand/60"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand/30 to-surface">
              <SafeImg
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.badge && (
                <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-extrabold uppercase text-surface">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="flex items-end justify-between gap-3 p-4">
              <div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/65">{item.description}</p>
              </div>
              <OrderLink
                aria-label={`Pedir ${item.title}`}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-surface transition-transform hover:scale-110"
              >
                <Plus className="size-5" strokeWidth={3} />
              </OrderLink>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <OrderLink className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-8 py-3.5 font-bold uppercase text-brand transition-colors hover:bg-brand hover:text-surface">
          Ver cardápio completo <ArrowRight className="size-5" />
        </OrderLink>
      </div>
    </section>
  );
}

function DeliveryBanner() {
  return (
    <section id="delivery" className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand via-amber-400 to-brand px-6 py-10 sm:px-10 md:py-12">
        <div
          className="pointer-events-none absolute -right-10 -bottom-16 size-64 rounded-full bg-white/15"
          aria-hidden
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="text-center md:text-left">
            <span className="inline-block -rotate-3 rounded-md bg-surface px-3 py-1 font-display text-xl tracking-wide text-white">
              BATEU A FOME?
            </span>
            <p className="mt-3 font-script text-4xl leading-tight text-surface sm:text-5xl">
              A gente leva
              <br />
              até você!
            </p>
          </div>

          <div className="mx-auto grid size-28 place-items-center rounded-full bg-surface text-brand shadow-xl sm:size-32">
            <Bike className="size-14 sm:size-16" strokeWidth={1.75} />
          </div>

          <div className="text-center md:text-right">
            <p className="font-display text-3xl leading-none text-surface sm:text-4xl">PEÇA PELO</p>
            <p className="font-display text-5xl leading-none text-surface sm:text-6xl">
              CARDÁPIO ONLINE
            </p>
            <p className="mt-2 text-sm font-semibold text-surface/80">
              Rápido, fácil e sem complicação.
            </p>
            <OrderLink className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-extrabold uppercase text-white transition-transform hover:scale-105">
              Fazer meu pedido <ArrowRight className="size-5" />
            </OrderLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const status = useOpenStatus();
  const todayIndex = (() => {
    if (typeof window === "undefined" || !status) return -1;
    const weekday = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
    }).format(new Date());
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  })();

  return (
    <section id="sobre" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="font-script text-2xl text-brand">Sobre nós</p>
          <h2 className="mt-1 font-display text-4xl tracking-wide text-white sm:text-5xl">
            SABOR DE BAIRRO, <span className="text-brand">FEITO NA HORA</span>
          </h2>
          <p className="mt-4 text-white/75">
            A Big Lanches é a lanchonete do Parque Viana, em Barueri. Aqui você encontra lanches
            caprichados, hot dogs, pizzas, porções e sucos, preparados na hora para comer no local,
            retirar ou receber em casa.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-surface-2 p-4 text-center">
              <p className="flex items-center justify-center gap-1 font-display text-4xl text-brand">
                {BUSINESS.rating} <Star className="size-5 fill-current" />
              </p>
              <p className="text-xs text-white/60">Nota no Google</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface-2 p-4 text-center">
              <p className="font-display text-4xl text-brand">{BUSINESS.ratingCount}+</p>
              <p className="text-xs text-white/60">Avaliações</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface-2 p-4 text-center">
              <p className="font-display text-4xl text-brand">7</p>
              <p className="text-xs text-white/60">Dias por semana</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface-2 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <Clock className="size-5 text-brand" /> Horário de funcionamento
            </h3>
          </div>
          <div className="mt-3">
            <OpenBadge />
          </div>
          <ul className="mt-5 divide-y divide-white/5">
            {OPENING_HOURS.map((h) => {
              const isToday = h.day === todayIndex;
              return (
                <li
                  key={h.day}
                  className={cn(
                    "flex justify-between py-2.5 text-sm",
                    isToday ? "font-bold text-brand" : "text-white/75",
                  )}
                >
                  <span>
                    {h.label}
                    {isToday && " (hoje)"}
                  </span>
                  <span>
                    {Math.floor(h.open / 60)}h às {Math.floor(h.close / 60)}h
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-20">
      <SectionTitle kicker="Venha nos visitar" title="ONDE" highlight="ESTAMOS" />
      <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-surface-2 md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="font-bold text-white">{BUSINESS.addressShort}</p>
              <p className="text-sm text-white/65">{BUSINESS.city} · CEP 06449-000</p>
            </div>
          </div>
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-3 text-white hover:text-brand"
          >
            <Phone className="size-5 shrink-0 text-brand" />
            <span className="font-bold">{BUSINESS.phoneDisplay}</span>
          </a>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold uppercase text-white transition-colors hover:border-brand hover:text-brand"
            >
              <Navigation className="size-4" /> Como chegar
            </a>
            <OrderLink className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-extrabold uppercase text-surface transition-transform hover:scale-105">
              <ShoppingBag className="size-4" /> Pedir delivery
            </OrderLink>
          </div>
        </div>
        <div className="min-h-64 bg-surface md:min-h-80">
          <iframe
            title="Mapa da Big Lanches"
            src={BUSINESS.mapsEmbedUrl}
            className="size-full min-h-64 border-0 grayscale-[30%] md:min-h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-white/60">
            Lanches, hot dogs, pizzas, porções e sucos feitos na hora em Barueri.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-brand">Links rápidos</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-brand">Contato</h4>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="size-4 text-brand" /> {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" /> {BUSINESS.address}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-brand">Horário</h4>
          <p className="mt-3 text-sm text-white/70">Seg a Sáb · 16h às 23h</p>
          <p className="text-sm text-white/70">Domingo · 17h às 23h</p>
          <OrderLink className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-extrabold uppercase text-surface">
            Peça online <ShoppingBag className="size-4" />
          </OrderLink>
        </div>
      </div>
      <p className="border-t border-white/5 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Big Lanches · Barueri - SP. Todos os direitos reservados.
      </p>
    </footer>
  );
}

/** Barra fixa de pedido no celular, para o botão estar sempre ao alcance do polegar. */
function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-surface/95 p-3 backdrop-blur-md sm:hidden">
      <OrderLink className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-base font-extrabold uppercase text-surface shadow-lg">
        <ShoppingBag className="size-5" /> Fazer pedido
      </OrderLink>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export function BigLanchesLanding() {
  return (
    <div className="min-h-screen bg-surface pb-20 font-body text-white antialiased sm:pb-0">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Bestsellers />
        <DeliveryBanner />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileOrderBar />
    </div>
  );
}
