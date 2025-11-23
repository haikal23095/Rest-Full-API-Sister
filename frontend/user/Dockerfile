# Gunakan image Nginx yang sangat ringan (Alpine Linux)
FROM nginx:alpine

# Hapus konfigurasi default Nginx agar bersih
RUN rm -rf /usr/share/nginx/html/*

# Copy semua file HTML/CSS/JS/Gambar dari folder project ke dalam folder HTML Nginx
COPY . /usr/share/nginx/html

# Nginx berjalan di port 80 secara internal container
EXPOSE 80

# Jalankan Nginx di foreground agar container tidak mati
CMD ["nginx", "-g", "daemon off;"]