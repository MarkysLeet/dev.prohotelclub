-- Создание функции для обновления подписки, выполняемой с правами создателя (bypass RLS)
CREATE OR REPLACE FUNCTION update_user_subscription(user_id UUID, months INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_end TIMESTAMPTZ;
  new_end TIMESTAMPTZ;
BEGIN
  -- Получаем текущую дату окончания подписки
  SELECT subscription_ends_at INTO current_end
  FROM profiles
  WHERE id = user_id;

  -- Определяем базовую дату для прибавления месяцев
  IF current_end IS NOT NULL AND current_end > NOW() THEN
    new_end := current_end;
  ELSE
    new_end := NOW();
  END IF;

  -- Прибавляем указанное количество месяцев
  new_end := new_end + (months || ' months')::INTERVAL;

  -- Обновляем профиль
  UPDATE profiles
  SET has_active_subscription = true,
      subscription_ends_at = new_end
  WHERE id = user_id;
END;
$$;
