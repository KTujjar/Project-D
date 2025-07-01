# Stage 1: Install deps and build
FROM node:22-alpine AS builder
WORKDIR /app

# Add OpenSSL compatibility
RUN apk add --no-cache openssl


COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]