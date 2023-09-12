# Install Dependencies
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# RUN npm install
RUN npm ci --omit=dev

# # Build app
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
# RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production

RUN addgroup --gid 1001 --system nodejs
RUN adduser --system twilio --uid 1001

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/package.json ./package.json

USER twilio

EXPOSE 3000
CMD [ "node", "index.js" ]
