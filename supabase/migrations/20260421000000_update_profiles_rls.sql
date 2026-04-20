-- Drop the existing restricted policy
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Create a new policy allowing public read access for profiles
CREATE POLICY "Public read access for profiles"
ON profiles FOR SELECT
TO public
USING (true);

-- Ensure users can still only update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO public
USING (auth.uid() = id);

-- Ensure authenticated users can insert their profile
DROP POLICY IF EXISTS "Authenticated users can insert profile" ON profiles;
CREATE POLICY "Authenticated users can insert profile"
ON profiles FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated');
