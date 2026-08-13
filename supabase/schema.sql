-- =========================================================
-- Lavibel — schéma initial (Module 1 : Fondations)
-- À exécuter dans Supabase : Dashboard > SQL Editor > New query
-- =========================================================

-- Extension nécessaire pour gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- Table : categories
-- ---------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- Table : produits
-- ---------------------------------------------------------
create table if not exists public.produits (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  description_courte text,
  prix numeric(10, 2) not null check (prix >= 0),
  categorie_id uuid references public.categories (id) on delete set null,
  tailles text[] not null default '{}',
  couleurs text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  images text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists produits_categorie_id_idx on public.produits (categorie_id);

-- Met à jour updated_at automatiquement
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists produits_set_updated_at on public.produits;
create trigger produits_set_updated_at
  before update on public.produits
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------
-- Sécurité (RLS)
-- Le site public lit les données avec la clé "anon" (lecture seule).
-- Toutes les écritures (admin) passent par la clé "service_role"
-- côté serveur, qui contourne la RLS — aucune policy d'écriture
-- n'est donc nécessaire pour l'instant.
-- ---------------------------------------------------------
alter table public.categories enable row level security;
alter table public.produits enable row level security;

drop policy if exists "Lecture publique categories" on public.categories;
create policy "Lecture publique categories"
  on public.categories for select
  using (true);

drop policy if exists "Lecture publique produits" on public.produits;
create policy "Lecture publique produits"
  on public.produits for select
  using (true);

-- ---------------------------------------------------------
-- Stockage : bucket "produits" pour les photos
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('produits', 'produits', true)
on conflict (id) do nothing;

drop policy if exists "Lecture publique images produits" on storage.objects;
create policy "Lecture publique images produits"
  on storage.objects for select
  using (bucket_id = 'produits');

-- Les uploads/suppressions se font via la clé service_role (admin),
-- qui contourne également la RLS du storage.

-- ---------------------------------------------------------
-- Données de démonstration (optionnel)
-- ---------------------------------------------------------
insert into public.categories (nom, slug) values
  ('Femme', 'femme'),
  ('Homme', 'homme'),
  ('Accessoires', 'accessoires')
on conflict (slug) do nothing;
