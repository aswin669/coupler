import cookie from '@fastify/cookie';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

type CookieOptions = {
  secret: string;
  hook: 'onRequest' | 'preHandler';
  parseOptions: {
    path: string;
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
  };
};

const cookiePlugin: FastifyPluginAsync<CookieOptions> = fp(async (fastify: FastifyInstance, options: CookieOptions) => {
  fastify.register(cookie, {
    secret: options.secret,
    hook: options.hook,
    parseOptions: {
      ...options.parseOptions,
      sameSite: 'strict',
    },
  });
});

export default cookiePlugin;
