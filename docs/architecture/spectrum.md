# The reuse spectrum — levels of building on a parent design system

## Why a spectrum, not a flat list

The four implemented patterns (Token Override, Wrapper, Extension, Composition)
are often presented as peers on a ladder of increasing code complexity. That
framing answers *"how much code am I writing?"* — but it obscures the question
that matters most for a design-system decision: **how coupled am I to the
parent system, and how much do I own?**

Those are two different axes, and they don't always move together. This page
reframes the decision space along **two axes** and places the four implemented
patterns alongside three additional patterns that complete the spectrum —
including the low-coupling endpoint that the four alone cannot represent.

## Two axes that matter

- **Coupling to the parent DS** — how much your system depends on the parent's
  runtime, component APIs, and internal structure. *Low* means you could swap
  or remove the parent with bounded effort; *high* means every upstream change
  reaches you.
- **Investment / ownership** — how much code, tooling, and maintenance your
  system carries itself. *Low* means you lean on the parent; *high* means you
  run a substantial system of your own.

A useful mental model: the implemented four patterns all climb toward **more
code *and* more coupling** as you go from Token Override to Composition. A
complete spectrum also needs a direction in which you **reduce coupling** —
consuming only behaviour and replacing presentation, or forking away entirely.
That is what the three additional patterns below add.

## The spectrum

Ordered from lightest reuse to heaviest ownership. Patterns marked **(demoed)**
have a working component in this repo; the others are documented here to
complete the decision space.

| # | Pattern | Coupling | Investment | Demonstrated? |
|---|---------|----------|------------|---------------|
| 1 | **Token Override** | High (runtime) | Very low | ✅ `EhmBadge` |
| 2 | **Token Pipeline** (build-time transformation) | Low (build-time) | Low–medium | documented only |
| 3 | **Headless + Styled Split** | Low (behaviour only) | Medium–high | documented only |
| 4 | **Wrapper / Facade** | High | Low–medium | ✅ `EhmCard` |
| 5 | **Extension** | High | Medium | ✅ `EhmTextField` |
| 6 | **Composition** | High (multiple APIs) | Medium–high | ✅ `EhmSearchBox` |
| 7 | **Adapter / Bridge** | Medium (two systems) | Medium | documented only |
| 8 | **Fork / Vendor** | None (you own it) | High | documented only |

> **A note on "maturity."** It is tempting to read this table as a maturity
> ladder where "further = more mature." That is only half true. Forking (8) is
> high-ownership but is often a *regression* in maturity (you lose upstream
> fixes). The genuinely "mature DS inspired by the parent" endpoint is the
> **Headless + Styled Split** (3): you keep the parent's hard-won behaviour and
> accessibility, but own the presentation layer and owe the parent only a
> behavioural contract.

---

## The implemented patterns (demoed in this repo)

These four are the core of this proof-of-concept. Each has a dedicated page
with implementation, pros/cons, and risks:

1. **Token Override** — [`token-override.md`](./token-override.md) — theme only.
2. **Wrapper / Facade** — [`wrapper.md`](./wrapper.md) — simplified API over one component.
3. **Extension** — [`extension.md`](./extension.md) — add features to one component.
4. **Composition** — [`composition.md`](./composition.md) — orchestrate multiple components.

---

## The additional patterns (documented, not demoed)

These complete the decision space. They are not built as components here
because each would roughly double the scope of the PoC, but a real
decision-maker needs to know they exist and when to reach for them.

### Token Pipeline (build-time transformation)

**One line:** generate design tokens from a source of truth (e.g. W3C DTCG
JSON) and transform them per platform via a tool like Style Dictionary — rather
than hand-overriding individual CSS variables.

- **When to use:** you have many tokens, multiple target platforms (web/iOS/
  Android), or need tokens to flow from design tooling into code without manual
  translation.
- **When NOT to use:** you only need to nudge a handful of colours — a Token
  Override is simpler. (This is why EHMDS demos Token Override, not a pipeline.)
- **Why it differs from Token Override:** Override *changes values*; a Pipeline
  *generates and transforms* them. The two compose — you can override generated
  tokens — but they answer different questions.

### Headless + Styled Split

**One line:** consume only the parent's behaviour (state, keyboard, a11y) via
headless primitives or composables, and supply your own presentation layer
entirely. This is the model behind Radix, Reka UI, React Aria, and shadcn/ui.

- **When to use:** you want a fully bespoke visual identity but don't want to
  re-derive accessible behaviour. This is the natural endpoint for a "mature DS
  *inspired by* the parent" — you owe the parent a behavioural contract, not
  its DOM or CSS.
- **When NOT to use:** the parent doesn't expose a headless layer (FKUI ships
  styled components, not primitives), and building the headless seam yourself is
  a large investment. For FKUI specifically, Token Override + Wrapper get you
  most of the value at far lower cost.
- **Why it matters for this spectrum:** it is the low-coupling, high-control
  endpoint the four implemented patterns cannot represent — they all
  instantiate FKUI at runtime and therefore inherit its coupling.

### Adapter / Bridge

**One line:** translate between two design systems' vocabularies — your
component speaks the EHMDS API, but renders a different parent component
underneath, possibly swapping parents per context.

- **When to use:** migration (old system → new system behind a stable API), or
  coexistence where different product surfaces use different underlying systems.
- **When NOT to use:** you only have one parent and just want to simplify its
  API — that is a Wrapper/Facade, not an Adapter. The distinction: a Wrapper
  *hides* one system; an Adapter *translates between* systems.

### Fork / Vendor

**One line:** copy the parent's source into your repo and own it outright. The
escape hatch when the parent won't accept your patches, is abandoned, or you
need changes impossible through the public API.

- **When to use:** the parent is unmaintained, or you need deep changes that no
  wrapping/extending pattern can reach, and you can commit to maintaining the
  fork.
- **When NOT to use:** you can achieve your goal with any of the above — a fork
  cuts you off from upstream fixes and security updates and should be a last
  resort, not a convenience. (This repo's `comparison.md` decision tree
  references "Build Custom Component" as this off-ramp.)

---

## How to use this as a decision template

1. **State your constraint on each axis.** How much can you afford to couple to
   the parent? How much do you need to own?
2. **Pick the lightest pattern that satisfies both.** Start at the top of the
   table and move down only when a lighter option can't meet the need. The
   [`comparison.md`](./comparison.md) decision tree operationalises this for
   the four implemented patterns.
3. **Expect to mix.** Production systems use several patterns at once — EHMDS
   itself does, by design. The spectrum is a per-component decision, not a
   project-wide one.
4. **Re-evaluate on upgrades.** Coupling is paid back at upgrade time. The
   higher your coupling, the more each FKUI release costs you — budget for it,
   and let that cost inform whether a lower-coupling pattern is worth moving to.

## Further reading

- Nathan Curtis / EightShapes — [Design System Tiers](https://eightshapes.com/articles/design-system-tiers/)
  and [Design System Intermediaries](https://eightshapes.com/articles/design-systems-intermediaries/)
  — the layered-ownership model this spectrum builds on.
- Martin Fowler — [Headless Component](https://martinfowler.com/articles/headless-component.html)
  — the canonical description of the headless + styled split.
- W3C Design Tokens Community Group — [Design Tokens Format Module](https://www.designtokens.org/TR/2025.10/format/)
  and [Style Dictionary](https://styledictionary.com/) — the token-pipeline
  tooling.
- Joel Spolsky — [The Law of Leaky Abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/)
  — why wrappers/adapters over a parent system always leak (see each pattern's
  Risks section).
