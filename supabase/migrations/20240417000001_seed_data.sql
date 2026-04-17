-- Seed Hotels Data
INSERT INTO public.hotels (id, name, location, tags, description, image_url, link) VALUES
('adalya-bliss', 'ADALYA BLISS', 'Анталья', ARRAY['Ultra All Inclusive', 'Новый отель', 'Для семьи'], 'Новый уровень роскоши на побережье Средиземного моря. Элегантный дизайн, безупречный сервис и гастрономические изыски.', 'https://storage.yandexcloud.net/arina-reels-storage/ADALYA%20BLISS.jfif', '/hotels/adalya-bliss'),
('doubletree-by-hilton-kemer', 'DoubleTree by Hilton Kemer', 'Кемер', ARRAY['Premium', 'Стильный', 'Первая линия'], 'Отель со стильным дизайном и концепцией комфорта, расположенный прямо на берегу моря в Кемере.', 'https://storage.yandexcloud.net/arina-reels-storage/Double%20Tree%20Kemer.jfif', '/hotels/doubletree-by-hilton-kemer'),
('greenwood-suites-resort', 'Greenwood Suites Resort', 'Анталья', ARRAY['Suites', 'Для семьи', 'Бассейны'], 'Курортный отель, предлагающий просторные сьюты и отличную инфраструктуру для семейного отдыха с детьми.', 'https://storage.yandexcloud.net/arina-reels-storage/Greenwood%20Suites%20Resort.jfif', '/hotels/greenwood-suites-resort'),
('adalya-artside-hotel', 'Adalya ArtSide Hotel', 'Сиде', ARRAY['All Inclusive', 'Пляж', 'Архитектура'], 'Отель с уникальной архитектурой, расположенный рядом с песчаным пляжем. Отличный выбор для комфортного отпуска.', 'https://storage.yandexcloud.net/arina-reels-storage/Adalya%20ArtSide%20Hotel.jfif', '/hotels/adalya-artside-hotel'),
('maxx-royal-belek-golf-resort', 'Maxx Royal Belek Golf Resort', 'Белек', ARRAY['Ultra All Inclusive', 'Для семьи', 'Первая линия', 'Гольф'], 'Роскошный курорт с первоклассным сервисом, предлагающий эксклюзивные сьюты и виллы. Идеальное место для семейного отдыха и любителей гольфа.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Maxx+Royal', '/hotels/maxx-royal-belek-golf-resort'),
('regnum-carya', 'Regnum Carya', 'Белек', ARRAY['Ultra All Inclusive', 'Для семьи', 'Премиум', 'Первая линия'], 'Один из самых престижных отелей региона с великолепным белым песчаным пляжем, роскошными номерами и высочайшим уровнем обслуживания.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Regnum+Carya', '/hotels/regnum-carya'),
('nirvana-mediterranean-excellence', 'Nirvana Mediterranean Excellence', 'Кемер', ARRAY['С животными', 'Для семьи', 'Wellness', 'Природа'], 'Уникальный концепт, объединяющий роскошь и природу. Отель расположен в сосновом лесу на берегу кристально чистого моря.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Nirvana+ME', '/hotels/nirvana-mediterranean-excellence'),
('cullinan-belek', 'Cullinan Belek', 'Белек', ARRAY['Премиум', 'Новый отель', 'Golf', 'Ultra All Inclusive'], 'Новый уровень роскоши на побережье Средиземного моря. Элегантный дизайн, безупречный сервис и гастрономические изыски.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Cullinan', '/hotels/cullinan-belek'),
('ng-phaselis-bay', 'NG Phaselis Bay', 'Кемер', ARRAY['Wellness', 'Для семьи', 'Первая линия', 'Премиум'], 'Идеальное сочетание комфорта и уединения в живописной бухте. Панорамные виды на море и горы Торос.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=NG+Phaselis', '/hotels/ng-phaselis-bay'),
('barut-hemera', 'Barut Hemera', 'Сиде', ARRAY['Для семьи', 'Уютный', 'Исторический центр'], 'Легендарное качество сервиса сети Barut. Отель с зеленой территорией и отличным пляжем, расположенный недалеко от античного города Сиде.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Barut+Hemera', '/hotels/barut-hemera'),
('rixos-premium-tekirova', 'Rixos Premium Tekirova', 'Кемер', ARRAY['Для семьи', 'Аквапарк', 'Активный отдых'], 'Огромная зеленая территория у подножия гор. Отель славится масштабными шоу-программами и одним из лучших детских клубов.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Rixos+Tekirova', '/hotels/rixos-premium-tekirova'),
('kempinski-hotel-the-dome', 'Kempinski Hotel The Dome', 'Белек', ARRAY['Тихий отдых', 'Только для взрослых', 'Гольф', 'SPA'], 'Бутик-отель в сельджукском стиле. Предлагает спокойный отдых, великолепный SPA-центр и доступ к лучшим гольф-полям.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Kempinski', '/hotels/kempinski-hotel-the-dome'),
('lujo-hotel', 'Lujo Hotel', 'Бодрум', ARRAY['Арт-отель', 'Премиум', 'Гастрономия', 'Белоснежный песок'], 'Концепция Art & Joy. Уникальная архитектура, три роскошных пляжа с белым песком и рестораны a la carte мирового уровня.', 'https://placehold.co/800x600/F6EEE1/5A6B5D?text=Lujo+Hotel', '/hotels/lujo-hotel')
ON CONFLICT (id) DO NOTHING;

-- Seed Hotel Details Data
INSERT INTO public.hotel_details (slug, name, location, shooting_date, hero_image, stars, distance_to_sea, distance_to_city, google_rating, build_year, meal_plan) VALUES
('adalya-bliss', 'ADALYA BLISS', 'Сиде, Эвренсеки', '06.04.2026', 'https://storage.yandexcloud.net/arina-reels-storage/ADALYA%20BLISS.jfif', 5, 'Первая линия, 50м', '5 км до центра Сиде', 4.8, 2024, 'Ultra All Inclusive')
ON CONFLICT (slug) DO NOTHING;

-- Seed Hotel Sections Data
INSERT INTO public.hotel_sections (id, hotel_slug, title, content, media_count, is_paywalled, order_index) VALUES
('entrance', 'adalya-bliss', 'Входная группа', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3, false, 1),
('rooms', 'adalya-bliss', 'Номера', 'Duis aute irure dolor in reprehenderit in voluptate velit.', 6, false, 2),
('dining', 'adalya-bliss', 'Питание', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', 4, false, 3),
('bars', 'adalya-bliss', 'Бары', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur.', 3, false, 4),
('spa', 'adalya-bliss', 'SPA и спорт', 'Ut enim ad minima veniam, quis nostrum exercitationem.', 4, false, 5),
('pools', 'adalya-bliss', 'Бассейны и отдых', 'At vero eos et accusamus et iusto odio dignissimos.', 5, false, 6),
('beach', 'adalya-bliss', 'Пляжная линия', 'Et harum quidem rerum facilis est et expedita distinctio.', 4, false, 7),
('territory', 'adalya-bliss', 'Территория', 'Temporibus autem quibusdam et aut officiis debitis.', 5, false, 8),
('entertainment', 'adalya-bliss', 'Развлечения', 'Itaque earum rerum hic tenetur a sapiente delectus.', 3, false, 9),
('reviews', 'adalya-bliss', 'Анализ отзывов', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 0, true, 10),
('pros-cons', 'adalya-bliss', 'Плюсы и минусы', 'Pellentesque habitant morbi tristique senectus et netus.', 0, true, 11),
('resume', 'adalya-bliss', 'Моё резюме', 'Donec eu libero sit amet quam egestas semper.', 0, true, 12)
ON CONFLICT (id, hotel_slug) DO NOTHING;
