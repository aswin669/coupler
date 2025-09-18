import underPressure from '@fastify/under-pressure';
import { FastifyPluginAsync } from 'fastify';
import fastifyMetrics from 'fastify-metrics';
import fp from 'fastify-plugin';

const monitoringPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Memory usage monitoring
  await fastify.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1e9, // 1 GB
    maxRssBytes: 1e9, // 1 GB
    maxEventLoopUtilization: 0.98,
    retryAfter: 50,
    message: 'Under pressure!',
    exposeStatusRoute: {
      routeOpts: {},
      url: '/status',
      routeResponseSchemaOpts: {
        status: { type: 'string' },
        metrics: {
          type: 'object',
          properties: {
            eventLoopDelay: { type: 'number' },
            rssBytes: { type: 'number' },
            heapUsed: { type: 'number' },
            eventLoopUtilized: { type: 'number' },
          },
        },
      },
    },
  });

  // Prometheus metrics
  await fastify.register(fastifyMetrics, {
    endpoint: '/metrics',
  });
});

export default monitoringPlugin;
