export function loadConfiguration() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.DATABASE_NAME || 'todos',
      user: process.env.DATABASE_USER || 'todos',
      password: process.env.DATABASE_PASSWORD || 'todos-password',
      synchronize: process.env.DATABASE_SYNCHRONIZE || true,
    },
  };
}
