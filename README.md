## Run server locally

```bash
pnpm docker:local:up
pnpm i
pnpm start:local
```

## Run dev server

```bash
pnpm docker:local:up
pnpm i
pnpm start:local
```

For production deployments:

1. Use connection pooling:
   - In heavy-load applications, use PgBouncer for connection pooling
   - Configure maxConnections appropriately based on your resources
   - For Kubernetes deployments, consider using a managed PostgreSQL service

2. Database security:
   - Use strong, random passwords stored as secrets
   - Enable SSL connections to database
   - Limit database access to application's security group/network
   - Use least privilege principle for database users

3. High availability:
   - Set up database replication (Primary-Replica)
   - Configure regular automated backups
   - Implement a disaster recovery plan

4. Connection resilience:
   - Implement retry strategies for transient database connection failures
   - Use circuit breakers to fail gracefully when database is unavailable

5. Monitoring:
   - Monitor connection pool usage
   - Set up alerts for slow queries
   - Track transaction durations
   - Monitor disk usage and database growth

6. Performance tuning:
   - Create appropriate indexes based on query patterns
   - Use database-level query caching
   - Consider read replicas for heavy read workloads
   - Regularly run VACUUM to optimize the database

7. Sample connection string with SSL:
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public&sslmode=require"
   \*/
