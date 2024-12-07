FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set the PORT environment variable before starting the dev server
ENV PORT=8080

# Expose the chosen port
EXPOSE 8080

CMD ["npm", "start"]
