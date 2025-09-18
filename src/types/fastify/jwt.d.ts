import '@fastify/jwt';
import { JwtPayload } from '@types';

declare module '@fastify/jwt' {
  interface JWT {
    accessToken: JWT;
    refreshToken: JWT;
  }

  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}
