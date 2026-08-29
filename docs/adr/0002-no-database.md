# ADR-0002: No database until something needs to persist

- **Status**: Accepted
- **Date**: 2026-08-29

## Context

Supabase was proposed as part of the default stack, matching `priora-matrix`
and the two Supabase projects already on the account. It was rejected: there is
nothing to persist yet.

## Decision

Ship no database, no ORM and no data-layer dependency. No `@supabase/ssr`, no
client singleton, no RLS policies, no connection environment variables.

## Consequences

- Everything renders statically. The build produces no dynamic routes.
- `.env.example` is empty of secrets, so the app runs with no configuration.
- When persistence is genuinely needed, Supabase is the presumed choice — the
  account and credentials already exist — but that is a new ADR, not an
  assumption baked into this one.
- Avoided: auth scaffolding, migration files and RLS policies for tables that
  no feature reads.
