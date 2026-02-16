-- Migration: Add photo likes and comments tables

create table photo_likes (
  id bigint generated always as identity primary key,
  photo_id bigint not null references photos(id) on delete cascade,
  fingerprint text not null,
  created_at timestamptz default now(),
  unique(photo_id, fingerprint)
);

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
