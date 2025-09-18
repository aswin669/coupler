# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:24-alpine AS production

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy prisma schema and client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy compiled JavaScript
COPY --from=builder /app/dist ./dist

# Copy additional files needed for runtime
COPY --from=builder /app/prisma/seed.ts ./prisma/

# Expose API port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s CMD node -e "require('http').request('http://localhost:3000/health', { headers: { 'User-Agent': 'Healthcheck' }}, (r) => { if (r.statusCode !== 200) process.exit(1) }).end()"

# Command to run the application
CMD ["node", "dist/server.js"]