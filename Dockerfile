FROM node:14.17-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --pure-lockfile
COPY frontend .
RUN yarn build

FROM node:16.10-alpine
WORKDIR /app
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --pure-lockfile
COPY backend .

COPY --from=builder /app/build /app/public
CMD ["yarn", "start"]

