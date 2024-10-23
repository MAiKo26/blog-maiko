FROM node:20-alpine AS base

# Stage 1 for Dependencies
FROM base AS builder
WORKDIR /app

COPY package*.json package-lock.json* ./

RUN npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build


# Stage 2 for dependencies
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the necessary build files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./  
COPY --from=builder --chown=nextjs:nodejs /app/public ./.next/standalone/public  
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static  

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD node .next/standalone/server.js