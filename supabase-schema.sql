-- Run this in your Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists projects (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  description   text not null,
  long_description text,
  tags          text[] default '{}',
  category      text not null default 'Other',
  github_url    text,
  demo_url      text,
  image_url     text,
  created_at    timestamptz default now()
);

-- RLS: public can read
alter table projects enable row level security;

create policy "Public can read projects"
  on projects for select
  using (true);

-- The service_role key (used by supabaseAdmin) bypasses RLS automatically.
-- No insert/update/delete policy needed for service_role.

-- Storage bucket for project images
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict do nothing;

create policy "Public read project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

-- Seed data (your own projects from the CV)
insert into projects (title, description, long_description, tags, category, github_url) values
(
  'Distributed IoT Network — I2C',
  'Multi-node IoT architecture: Raspberry Pi 5 as master + ESP32 slaves over I2C.',
  'Architecture IoT multi-nœuds : Raspberry Pi 5 (maître) + ESP32 (esclaves) via I2C. Intégration de capteurs (température, humidité) avec centralisation et traitement des données en temps réel.',
  ARRAY['ESP32', 'Raspberry Pi', 'I2C', 'MQTT', 'Python', 'C++'],
  'IoT',
  'https://github.com/HLSnipey'
),
(
  'Smart House IoT',
  'Full home automation system: lighting control, environmental sensors, WiFi dashboard.',
  'Système domotique complet : contrôle d''éclairage, capteurs environnementaux et dashboard accessible via WiFi. Visualisation en temps réel des données du domicile.',
  ARRAY['ESP32', 'WiFi', 'MQTT', 'Dashboard', 'C++'],
  'IoT',
  null
),
(
  'Notiq — Web Application',
  'Note-taking web app built with Supabase and AWS, styled with Tailwind CSS.',
  'Développement d''une application web utilisant Supabase et AWS Web Services, avec une interface conçue en HTML, JavaScript et Tailwind CSS.',
  ARRAY['JavaScript', 'Supabase', 'AWS', 'Tailwind CSS', 'HTML'],
  'Web',
  null
),
(
  'Chaty — Social Network App',
  'Instagram-inspired web app with stories, posts, messaging, and calls.',
  'Application web inspirée d''Instagram intégrant des fonctionnalités telles que les stories, les publications, la messagerie et les appels. Développée en HTML, CSS et JavaScript, avec Supabase pour le backend.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Supabase', 'GitHub'],
  'Web',
  'https://github.com/HLSnipey'
);
