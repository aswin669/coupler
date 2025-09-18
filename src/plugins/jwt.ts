import jwt, { SignOptions, VerifyOptions } from '@fastify/jwt';
import { JwtPayload } from '@types';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

interface JwtPluginOptions {
  secret: string;
  refreshSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  signOptions?: SignOptions;
  verifyOptions?: VerifyOptions;
}

const jwtPlugin: FastifyPluginAsync<JwtPluginOptions> = fp(
  async (fastify: FastifyInstance, options: JwtPluginOptions) => {
    fastify.register(jwt, {
      secret: options.secret,
      namespace: 'accessToken',
      sign: {
        ...options.signOptions,
        expiresIn: options.accessTokenExpiresIn,
      },
      verify: options.verifyOptions,
    });

    fastify.decorate('generateAccessToken', (payload: JwtPayload) => {
      return fastify.jwt.accessToken.sign(payload);
    });

    fastify.decorate('verifyAccessToken', (token: string) => {
      return fastify.jwt.accessToken.verify<JwtPayload>(token);
    });

    fastify.register(jwt, {
      secret: options.refreshSecret,
      namespace: 'refreshToken',
      sign: {
        expiresIn: options.refreshTokenExpiresIn,
        ...options.signOptions,
      },
      verify: options.verifyOptions,
    });

    fastify.decorate('generateRefreshToken', (payload: JwtPayload) => {
      return fastify.jwt.refreshToken.sign(payload);
    });

    fastify.decorate('verifyRefreshToken', (token: string) => {
      return fastify.jwt.refreshToken.verify<JwtPayload>(token);
    });
  },
);

export default jwtPlugin;
