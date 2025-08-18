FROM node:20.16.0

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Copier tout le code
COPY . .

# Compiler le TypeScript
RUN npm run build

# Exposer le port
EXPOSE 4000

# Lancer le serveur Node.js compilé
CMD ["node", "dist/server.js"]
