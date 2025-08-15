import 'dotenv/config';
import { createClient } from 'redis';

const redisUrl = process.env.DATABASE_REDIS || 'redis://localhost:6379';
export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  console.error('Erreur Redis :', err.message);
});

export const redisReady = (async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connecté à Redis');
  } catch (err) {
    console.error('❌ Échec de connexion Redis :', (err as Error).message);
    throw err;
  }
})();

process.on('SIGINT', async () => {
  await redisClient.quit();
  console.log('👋 Redis fermé proprement');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Erreur non capturée :', (err as Error).message);
});
process.on('unhandledRejection', (reason) => {
  console.error('Promesse non gérée :', reason);
});
