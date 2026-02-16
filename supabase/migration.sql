-- Supabase Migration: Coffee E-Commerce
-- Run this in the Supabase SQL Editor

-- Products table
create table products (
  id bigint generated always as identity primary key,
  title text not null unique,
  description text not null,
  price numeric(10,2) not null,
  slug text not null unique,
  image_url text not null,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Locations table
create table locations (
  id bigint generated always as identity primary key,
  city text,
  country text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Photos table
create table photos (
  id bigint generated always as identity primary key,
  title text,
  description text,
  slug text unique,
  published boolean default true,
  location_id bigint references locations(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Photo images (photos can have multiple images)
create table photo_images (
  id bigint generated always as identity primary key,
  photo_id bigint not null references photos(id) on delete cascade,
  url text not null,
  width integer,
  height integer
);

-- Indexes
create index idx_products_slug on products(slug);
create index idx_photos_slug on photos(slug);
create index idx_photos_location_id on photos(location_id);
create index idx_photo_images_photo_id on photo_images(photo_id);

-- Enable RLS
alter table products enable row level security;
alter table photos enable row level security;
alter table photo_images enable row level security;
alter table locations enable row level security;

-- Public read policies
create policy "Public read access" on products for select using (published = true);
create policy "Public read access" on photos for select using (published = true);
create policy "Public read access" on photo_images for select using (true);
create policy "Public read access" on locations for select using (true);

-- Photo likes table (anonymous, fingerprint-based)
create table photo_likes (
  id bigint generated always as identity primary key,
  photo_id bigint not null references photos(id) on delete cascade,
  fingerprint text not null,
  created_at timestamptz default now(),
  unique(photo_id, fingerprint)
);

-- Photo comments table (requires login, admin-approved)
create table photo_comments (
  id bigint generated always as identity primary key,
  photo_id bigint not null references photos(id) on delete cascade,
  user_email text not null,
  user_name text not null,
  body text not null,
  approved boolean default false,
  created_at timestamptz default now()
);

create index idx_photo_likes_photo_id on photo_likes(photo_id);
create index idx_photo_comments_photo_id on photo_comments(photo_id);

alter table photo_likes enable row level security;
alter table photo_comments enable row level security;

create policy "Public read access" on photo_likes for select using (true);
create policy "Public read approved comments" on photo_comments for select using (approved = true);
