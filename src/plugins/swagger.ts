import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

type SwaggerOptions = {
  swaggerHost: string;
  swaggerHostName: string;
};

const swaggerPlugin: FastifyPluginAsync<SwaggerOptions> = fp(
  async (fastify: FastifyInstance, options: SwaggerOptions) => {
    // Register Swagger Generator
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: 'regional data management Backend',
          description: 'API documentation',
          version: '0.0.1',
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
        },
        servers: [
          {
            url: options.swaggerHost,
            description: options.swaggerHostName,
          },
          {
            url: 'https://preview.api.regional_data_management.in',
            description: 'Preview server',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            RefreshTokenCookie: {
              type: 'apiKey',
              in: 'cookie',
              name: 'refreshToken',
            },
          },
        },
        tags: [
          { name: 'auth', description: 'All auth endpoints' },
          // { name: 'nurses', description: 'All endpoints of nurse' },
          // { name: 'admin', description: 'All endpoints of admin' },
        ],
        security: [{ bearerAuth: [] }],
      },
    });

    // Register Swagger UI
    await fastify.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        displayRequestDuration: true,
        deepLinking: false,
        filter: true,
        defaultModelsExpandDepth: 0,
        showExtensions: true,
        persistAuthorization: true,
        syntaxHighlight: {
          activate: true,
          theme: 'tomorrow-night',
        },
        tagsSorter: 'method',
        tryItOutEnabled: true,
        operationsSorter: 'alpha',
      },
      staticCSP: true,
      transformStaticCSP: (header: string) => header,
    });

    fastify.log.info(`Swagger documentation available at /docs`);
  },
);

export default swaggerPlugin;
