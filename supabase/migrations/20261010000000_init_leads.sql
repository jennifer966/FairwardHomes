-- Fairward: lead capture and first-party analytics.
-- Personal lead data is never publicly accessible: RLS is enabled with no
-- policies for anon/authenticated roles, and table privileges are revoked.
-- Only the server (service role key) reads or writes these tables.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  lead_type text not null check (lead_type in ('seller', 'buyer')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'not_a_fit', 'archived')),
  is_test boolean not null default false,

  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email like '%@%'),
  phone text check (phone is null or char_length(phone) <= 32),

  -- Seller fields
  property_address text check (property_address is null or char_length(property_address) <= 200),
  zip text check (zip is null or zip ~ '^\d{5}(-\d{4})?$'),
  estimated_value text check (estimated_value is null or char_length(estimated_value) <= 40),
  selling_status text,
  interest text,

  -- Buyer fields
  preferred_area text check (preferred_area is null or char_length(preferred_area) <= 120),
  purchase_range text,

  timeline text,

  -- Consent (unchecked by default; text snapshotted at time of submission)
  consent_marketing_email boolean not null default false,
  consent_sms boolean not null default false,
  consent_text jsonb not null default '{}'::jsonb,

  -- Attribution
  source text not null default 'landing',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  landing_path text,
  site_mode text not null default 'prelaunch',

  notification_status text not null default 'not_configured'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_type_status_idx on public.leads (lead_type, status);

create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

alter table public.leads enable row level security;
alter table public.leads force row level security;
revoke all on table public.leads from anon, authenticated;

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) <= 60),
  path text,
  props jsonb not null default '{}'::jsonb,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer_host text
);

create index if not exists analytics_events_name_created_idx
  on public.analytics_events (name, created_at desc);

alter table public.analytics_events enable row level security;
alter table public.analytics_events force row level security;
revoke all on table public.analytics_events from anon, authenticated;
