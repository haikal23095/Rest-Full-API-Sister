# Gunakan base image Node.js yang ringan (Alpine Linux)
FROM node:18-alpine

# Set folder kerja di dalam container
WORKDIR /app

# Copy package.json dulu (untuk memanfaatkan cache Docker)
COPY package.json .

# Install dependencies
RUN npm install

# Copy seluruh sisa source code
COPY . .

# Buka port 3000 (sesuai kodingan index.js)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["node", "index.js"]