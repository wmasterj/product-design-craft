# ADR-0004: A `[locale]` route segment, before there is anything to translate

- **Status**: Accepted
- **Date**: 2026-09-06

## Context

The product this repo will hold is not decided yet. The one use the owner named
was "translations", without yet knowing whether that means localising this
app's own UI, translating user content as the product, or reviewing design copy
across languages.

Those three imply very different stacks. But they share one structural need,
and it is the only decision in the current scaffold that is expensive to
reverse: the App Router has no built-in i18n routing (that was a Pages Router
config), so locale lives in the URL as a route segment. Adding it to one page
is a directory move. Adding it to a dozen routes, their tests and their E2E
specs is not.

## Decision

Add the structure and nothing else.

- All routes live under `src/app/[locale]/`. The root layout moved there and
  sets `<html lang>` from the segment.
- `generateStaticParams` prerenders every supported locale; an unknown locale
  is a 404 via `notFound()`.
- `src/proxy.ts` redirects locale-less paths to a negotiated locale.
- `src/lib/i18n.ts` holds the supported locales, the default, and a
  dependency-free `Accept-Language` matcher.

Supported locales are `en` and `nl`. `nl` is a placeholder proving the plural
case works — it renders identical English copy today.

Explicitly **not** decided: no i18n library, no message catalogue, no
translation file format, no LLM, no database. Those follow from which shape
"translations" turns out to mean, and ADR-0002 still holds.

## Consequences

- Every future route inherits a locale for free.
- The copy on the page is still hardcoded English. Extracting it into a
  catalogue is the next step whenever a second language becomes real, and that
  choice is unconstrained by this ADR.
- `src/proxy.ts` uses Next 16's `proxy` convention, not the deprecated
  `middleware` file name.
- If translations turn out to be irrelevant, the cost of undoing this is one
  directory move — the same cost as adding it now.
