create table if not exists public.marketing_leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  source      text not null default 'default',
  created_at  timestamptz not null default now()
);

-- Prevent duplicate signups
create unique index if not exists marketing_leads_email_idx on public.marketing_leads (email);

-- Only the service role can read/write (no anon access to subscriber data)
alter table public.marketing_leads enable row level security;
