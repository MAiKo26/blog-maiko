FROM node:22-alpine AS base

# Stage 1 for Installing Dependencies
FROM base AS deps
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 2 for Building the app
FROM base AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Skip static generation during build
ENV SKIP_BUILD_STATIC_GENERATION=true
RUN pnpm run build

# Stage 3 for running the application
FROM base AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Create .next directory and set permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./  
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Add wait-for script to check for database availability
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

USER nextjs
EXPOSE 3000
ENV PORT=3000

# Modified CMD to wait for database before starting
CMD /wait && node server.js
