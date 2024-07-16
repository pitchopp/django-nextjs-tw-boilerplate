FROM node:21.2.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
ARG API_URL=""
ARG ADMIN_URL=""
ARG WEBSITE_URL=""
ARG MEDIA_URL=""
ARG GOOGLE_MAPS_API_KEY=""
ARG ENV=""
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
RUN echo "PRIVATE_API_URL=${API_URL}" >> .env 
RUN echo "NEXT_PUBLIC_API_URL=${API_URL}" >> .env
RUN echo "NEXT_PUBLIC_ADMIN_URL=${ADMIN_URL}" >> .env
RUN echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}" >> .env
RUN echo "NEXT_PUBLIC_WEBSITE_URL=${WEBSITE_URL}" >> .env
RUN echo "NEXT_PUBLIC_MEDIA_URL=${MEDIA_URL}" >> .env
RUN echo "NEXT_PUBLIC_ENV=${ENV}" >> .env
COPY . .

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
