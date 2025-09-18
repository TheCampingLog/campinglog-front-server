FROM node:22-alpine

WORKDIR /app

# standalone 빌드 결과물 복사
COPY .next/standalone ./
COPY .next/static .next/static

# public 폴더 별도 복사
COPY public ./public

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]