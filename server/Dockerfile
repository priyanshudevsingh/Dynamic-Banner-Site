FROM node:20-alpine
WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]