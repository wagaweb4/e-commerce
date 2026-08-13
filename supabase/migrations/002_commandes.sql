-- =========================================================
-- Lavibel — Module 3 : Panier & tunnel d'achat
-- À exécuter dans Supabase : Dashboard > SQL Editor > New query
-- =========================================================

create table if not exists public.commandes (
  id uuid primary key default gen_random_uuid(),
  nom_client text not null,
  telephone text not null,
  email text,
  adresse text not null,
  ville text not null,
  notes text,
  articles jsonb not null default '[]',
  total numeric(10, 0) not null check (total >= 0),
  statut text not null default 'en_attente'
    check (statut in ('en_attente', 'confirmee', 'expediee', 'livree', 'annulee')),
  created_at timestamptz not null default now()
);

create index if not exists commandes_statut_idx on public.commandes (statut);
create index if not exists commandes_created_at_idx on public.commandes (created_at desc);

-- ---------------------------------------------------------
-- Sécurité (RLS)
-- Les commandes sont créées et lues uniquement via la clé
-- service_role (server actions), jamais depuis le navigateur.
-- Aucune policy publique n'est donc nécessaire.
-- ---------------------------------------------------------
alter table public.commandes enable row level security;
