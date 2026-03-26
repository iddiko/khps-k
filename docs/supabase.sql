create extension if not exists "pgcrypto";

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  content text not null,
  status text not null default 'pending',
  reply text not null default '',
  created_at timestamptz not null default now(),
  replied_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "anon read site content" on public.site_content;
create policy "anon read site content"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "service role manage site content" on public.site_content;
create policy "service role manage site content"
on public.site_content
for all
to service_role
using (true)
with check (true);

drop policy if exists "anon insert inquiries" on public.inquiries;
create policy "anon insert inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "service role manage inquiries" on public.inquiries;
create policy "service role manage inquiries"
on public.inquiries
for all
to service_role
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media"
on storage.objects
for select
to public
using (bucket_id = 'media');

drop policy if exists "service role upload media" on storage.objects;
create policy "service role upload media"
on storage.objects
for all
to service_role
using (bucket_id = 'media')
with check (bucket_id = 'media');
