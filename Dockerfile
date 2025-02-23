ARG NODE_VERSION=18
ARG PORT=3000

# Install Dependencies
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# RUN npm install
RUN npm ci --omit=dev

# Build app
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Production stage
FROM gcr.io/distroless/nodejs18-debian11 AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy application files
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/middleware ./middleware
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/*.js ./
COPY --from=deps /usr/src/app/node_modules ./node_modules

USER nonroot

EXPOSE ${PORT}
CMD ["index.js"]
