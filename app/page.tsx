"use client";

import { ReactLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { pricingLook, type PriceCard } from "./pricing";
import { brandLabel, dotGrid, outlineButton, panel, playUrl, primaryButton } from "./siteLook";

const games = [
  {
    id: "room",
    name: "The Room",
    players: "2–4",
    lead: "The place you stay between games.",
    body: "A shared floor and a window, with everyone in view. You sit here, copy the link, and decide what to play next. The room holds up to four people.",
  },
  {
    id: "tictactoe",
    name: "Tic-tac-toe",
    players: "2",
    lead: "Nine squares. Three in a row.",
    body: "A short game for two. Take a square, block the other player, and finish a line. It is the warm-up when nobody wants to think yet.",
  },
  {
    id: "chess",
    name: "Chess",
    players: "2",
    lead: "The classic board, in 3D.",
    body: "Tap a piece and the legal moves light up. You play a full game of chess across the table, without a second screen for the rules.",
  },
  {
    id: "tiles",
    name: "Letter Tiles",
    players: "2–4",
    lead: "One board. Your rack stays private.",
    body: "Build words on a shared 15 by 15 board. Only you can see the tiles in your hand. The server scores the word, so the table does not have to argue about it.",
  },
  {
    id: "mystery",
    name: "Murder Mystery",
    players: "2",
    lead: "A new case every time you start.",
    body: "Easy is eight leads and no clock. Hard is six leads, a clock, and a suspect who lies. Play together and agree on the killer, or race and take one guess each. First correct answer wins the race.",
  },
] as const;

const steps = [
  {
    title: "Send the link",
    body: "The host opens a room and copies the address. That message is the invite. Nobody makes an account first.",
  },
  {
    title: "Sit down",
    body: "Friends open the same link on their own phones and take a seat. Camera and mic are there if they want them.",
  },
  {
    title: "Pick a game",
    body: "The host chooses what is on the table, including a murder mystery set to easy or hard, together or race. A countdown starts it.",
  },
] as const;

const questions = [
  {
    q: "Do we need accounts?",
    a: "No. The link is the invite. The first person in the room is the host, and everyone else joins from that same address.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes. Friends open the room on their phones. The host copies the link and sends it.",
  },
  {
    q: "How many people?",
    a: "The room holds 2–4. Tic-tac-toe, chess, and Murder Mystery are for two. Letter Tiles is for 2–4.",
  },
  {
    q: "What is hard mode?",
    a: "Easy is eight leads and no clock. Hard is six leads, a clock, and a suspect who lies.",
  },
  {
    q: "Together or race?",
    a: "Together, you agree on the killer. Race, each of you has your own leads and one guess. The first correct answer wins.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function Rise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5 9.5 17 19 7.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard({ card }: { card: PriceCard }) {
  const style = {
    "--plan-color": card.color,
    "--plan-edge": card.edge,
  } as CSSProperties;

  return (
    <article className="flex h-full flex-col rounded-3xl bg-card p-6 ring-2 ring-[var(--plan-color)] sm:p-8" style={style}>
      <p className="font-heading text-3xl tracking-tight" style={{ color: card.color }}>
        {card.name}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{card.tagline}</p>
      <p className="mt-4 font-heading text-4xl leading-none" style={{ color: card.color }}>
        ${card.price}
        {card.price > 0 ? (
          <span className="ml-1 align-baseline font-[inherit] text-base text-muted-foreground">/mo</span>
        ) : null}
      </p>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {card.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <Check color={card.color} />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
      <a
        href={card.href}
        className="mt-6 w-full rounded-full px-5 py-3 text-center text-base font-bold text-white shadow-[0_4px_0_var(--plan-edge)] transition hover:-translate-y-0.5"
        style={{ background: card.color }}
      >
        {card.price === 0 ? "Open a room" : `Choose ${card.name}`}
      </a>
    </article>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: { offset: -88 },
        lerp: 0.1,
        smoothWheel: reduce !== true,
      }}
    >
      <div className={`${dotGrid} text-foreground`}>
        <header className="sticky top-0 z-10 border-b border-border/60 bg-background/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#top" className="min-w-0">
              <p className={brandLabel}>Friends Corner</p>
              <p className="truncate text-sm font-bold">Game night, one link</p>
            </a>
            <div className="flex items-center gap-4 text-sm font-bold sm:gap-6">
              <a href="#product" className="hidden text-muted-foreground transition hover:text-foreground sm:inline">
                Product
              </a>
              <a href="#games" className="hidden text-muted-foreground transition hover:text-foreground sm:inline">
                Games
              </a>
              <a href="#pricing" className="hidden text-muted-foreground transition hover:text-foreground sm:inline">
                Pricing
              </a>
              <a href={playUrl} className={primaryButton}>
                Play
              </a>
            </div>
          </nav>
        </header>

        <main id="top">
          <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-24">
            <Rise>
              <p className={brandLabel}>For a few friends, tonight</p>
              <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
                A room for the night. Then a game.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                The call and the game are usually two apps. Friends Corner is the table: you see each other, and the game is already there.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={playUrl} className={primaryButton}>
                  Open a room
                </a>
                <a href="#pricing" className={outlineButton}>
                  See pricing
                </a>
              </div>
            </Rise>
            <Rise delay={0.12} className="mt-16">
              <div className={`${panel} overflow-hidden p-0`}>
                <div className="flex items-center justify-between border-b border-border px-5 py-3 text-xs text-muted-foreground">
                  <span>Lobby</span>
                  <span>2–4 seats</span>
                </div>
                <div className="grid gap-6 p-6 sm:grid-cols-[1.2fr_1fr] sm:p-8">
                  <div>
                    <p className={brandLabel}>Seats</p>
                    <ul className="mt-4 grid grid-cols-4 gap-2">
                      {[
                        { seat: "A", color: "#5b8cff" },
                        { seat: "B", color: "#f0587f" },
                        { seat: "C", color: "#5b8cff" },
                        { seat: "D", color: "#f0587f" },
                      ].map(({ seat, color }) => (
                        <li
                          key={seat}
                          className="rounded-2xl border border-border bg-muted px-3 py-6 text-center text-sm font-bold"
                          style={{ boxShadow: `inset 0 -3px 0 color-mix(in srgb, ${color} 40%, transparent)` }}
                        >
                          {seat}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      The first person in is the host. Everyone else joins from the same link, with a camera and a mic if they want them.
                    </p>
                  </div>
                  <div>
                    <p className={brandLabel}>On the table</p>
                    <ul className="mt-4 divide-y divide-border text-sm">
                      {games.map((game) => (
                        <li key={game.id} className="flex items-baseline justify-between gap-4 py-3">
                          <span className="font-bold">{game.name}</span>
                          <span className="text-muted-foreground">{game.players}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Rise>
          </section>

          <section id="product" className="border-t border-border/60">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <Rise>
                <p className={brandLabel}>The product</p>
                <h2 className="mt-3 max-w-3xl font-heading text-4xl tracking-tight text-balance sm:text-5xl">
                  Your friends are already together. The game is in another tab.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Friends Corner keeps the faces, the voices, and the board in one room. You do not download a client, and you do not make an account before the night starts.
                </p>
              </Rise>
              <div className="mt-16 grid gap-6 md:grid-cols-3">
                {steps.map((step, index) => (
                  <Rise key={step.title} delay={index * 0.08}>
                    <article className={panel}>
                      <p className="font-heading text-2xl" style={{ color: index % 2 === 0 ? "#5b8cff" : "#f0587f" }}>
                        0{index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                    </article>
                  </Rise>
                ))}
              </div>
            </div>
          </section>

          <section id="games" className="border-t border-border/60">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <Rise>
                <p className={brandLabel}>What you can start</p>
                <h2 className="mt-3 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
                  Five things already on the table.
                </h2>
              </Rise>
              <div className="mt-14 space-y-4">
                {games.map((game) => (
                  <Rise key={game.id}>
                    <article id={game.id} className={`${panel} grid gap-4 md:grid-cols-[180px_1fr_2fr] md:items-start md:gap-8`}>
                      <p className="text-sm text-muted-foreground">{game.players} players</p>
                      <h3 className="font-heading text-2xl tracking-tight">{game.name}</h3>
                      <div>
                        <p className="font-bold">{game.lead}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{game.body}</p>
                      </div>
                    </article>
                  </Rise>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="border-t border-border/60">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <Rise>
                <p className={brandLabel}>Pricing</p>
                <h2 className="mt-3 max-w-xl font-heading text-4xl tracking-tight text-balance sm:text-5xl">
                  Free to sit down. A plan when the host wants more nights.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  Guests on the link do not pay. The host does, once a month, and every game stays on the table.
                </p>
              </Rise>
              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {pricingLook().map((card) => (
                  <Rise key={card.name}>
                    <PlanCard card={card} />
                  </Rise>
                ))}
              </div>
            </div>
          </section>

          <section id="questions" className="border-t border-border/60">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <Rise>
                <p className={brandLabel}>Questions</p>
                <h2 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">Before you send the link.</h2>
              </Rise>
              <dl className="mt-14 space-y-4">
                {questions.map((item) => (
                  <Rise key={item.q}>
                    <div className={`${panel} grid gap-3 md:grid-cols-[1fr_1.4fr] md:gap-12`}>
                      <dt className="text-lg font-bold tracking-tight">{item.q}</dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                    </div>
                  </Rise>
                ))}
              </dl>
            </div>
          </section>

          <section className="border-t border-border/60">
            <div className={`mx-auto max-w-6xl px-6 py-24 ${panel} my-0 rounded-none border-0 ring-0`}>
              <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                <Rise>
                  <h2 className="max-w-xl font-heading text-4xl tracking-tight sm:text-6xl">Send the link. Sit down.</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    The room is at play.friendscorner.app. The host shares it, friends take a seat, and the night picks a game.
                  </p>
                </Rise>
                <a href={playUrl} className={primaryButton}>
                  Open a room
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={brandLabel}>Friends Corner</p>
              <p className="mt-1 font-bold text-foreground">Game night, one link.</p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
              <li>
                <a href="#product" className="hover:text-foreground">
                  Product
                </a>
              </li>
              <li>
                <a href="#games" className="hover:text-foreground">
                  Games
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href={playUrl} className="text-primary hover:text-primary">
                  Play
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}
