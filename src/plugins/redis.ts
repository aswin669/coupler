import redis from '@fastify/redis';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const redisPlugin: FastifyPluginAsync = fp(async (fastify, _options) => {
  fastify.register(redis, {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD,
    db: Number(process.env.REDIS_DB ?? 0),
  });
});

export default redisPlugin;
