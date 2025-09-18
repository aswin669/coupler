import { JWT } from '@fastify/jwt';
import { FastifyRedis } from '@fastify/redis';
import { Dependencies } from '@infrastructure/di';
import { Role } from '@prisma/client';
import { JwtPayload } from '@types';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    jwt: JWT;
    redis: FastifyRedis;
    di: Dependencies;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorize: (roles: Role[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    generateAccessToken: (payload: JwtPayload) => string;
    verifyAccessToken: (token: string) => JwtPayload;
    generateRefreshToken: (payload: JwtPayload) => string;
    verifyRefreshToken: (token: string) => JwtPayload;
  }

  interface FastifyRequest {
    di: Dependencies;
    user: JwtPayload;
  }
}
