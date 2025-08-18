FROM node:20.16.0

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code (y compris prisma/schema.prisma)
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Compiler le TypeScript
RUN npm run build

# Exposer le port
EXPOSE 4000

# Lancer l'application
CMD ["node", "dist/server.js"]