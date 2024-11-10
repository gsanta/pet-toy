
# DB
When schema.prisma changed create a migration: npx prisma migrate dev --name <migration_name>

Run migrations: npx prisma migrate deploy
Seed db: npx prisma db seed

# Tests
Run a single feature file: npx cucumber-js 'test/features/pole.feature'
