FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build && ls -la /app/dist

RUN echo "Build completed" && ls -la /app

FROM node:23-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "./dist/src/main.js"]
