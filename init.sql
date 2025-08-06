create DATABASE wolf_db;

create table Emojis(
  emoji_id SERIAL PRIMARY KEY,
  emoji CHAR(5) NOT NULL,
  emoji_name VARCHAR(100) NOT NULL
);

create table Users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL UNIQUE,
  dark_theme BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_users_user_name ON Users(LOWER(user_name));

insert into Emojis(emoji, emoji_name) values
    ('😂', 'Лицо со слезами радости'),
    ('😎', 'Улыбающееся лицо в солнцезащитных очках'),
    ('🥺', 'Умоляющее лицо'),
    ('🐱', 'Кошка'),
    ('🦄', 'Единорог'),
    ('🐢', 'Черепаха'),
    ('🍔', 'Гамбургер'),
    ('🍣', 'Суши'),
    ('🍦', 'Мороженое'),
    ('🎮', 'Игровой контроллер'),
    ('🏊', 'Плавание'),
    ('🎨', 'Палитра художника'),
    ('🏖️', 'Пляж с зонтиком'),
    ('🗼', 'Эйфелева башня'),
    ('🇷🇺', 'Флаг России'),
    ('❤️', 'Красное сердце'),
    ('💔', 'Разбитое сердце'),
    ('🎄', 'Новогодняя елка'),
    ('🎃', 'Хэллоуинская тыква'),
    ('📱', 'Смартфон'),
    ('💻', 'Ноутбук'),
    ('📎', 'Скрепка'),
    ('✏️', 'Карандаш');

CREATE TABLE SiteTheme (
  id SERIAL PRIMARY KEY,
  theme VARCHAR(50) NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE INDEX idx_site_theme_theme ON SiteTheme(theme);

CREATE TABLE UserTheme (
  id SERIAL PRIMARY KEY,
  theme_id INTEGER NOT NULL REFERENCES SiteTheme(id) ON DELETE CASCADE,
  owner_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
  device VARCHAR(50)
);

INSERT INTO SiteTheme(theme, description) VALUES
  ('light', 'Светлая тема'),
  ('dark', 'Тёмная тема');
