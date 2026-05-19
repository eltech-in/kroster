# BNI Krypton Deployment Guide (Hostinger VPS)

This guide provides step-by-step instructions for deploying the BNI Krypton Premium E-Roster Platform to a Hostinger VPS.

## Prerequisites

- Hostinger VPS (Ubuntu 22.04/24.04 recommended)
- SSH access
- Domain name pointing to the VPS IP (e.g., `krypton.bni-nagpur.in`)

## 1. Initial VPS Setup

Update system packages and install necessary software:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl git nginx certbot python3-certbot-nginx -y
```

## 2. Install Node.js & PM2

Install Node.js (v20+ recommended) and PM2 globally:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

## 3. Install MariaDB (MySQL)

```bash
sudo apt install mariadb-server -y
sudo mysql_secure_installation
```

Log into MySQL and create the database:

```sql
CREATE DATABASE kroster CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Set up your user credentials as needed
```

## 4. Setup Project

Clone your repository or upload your files to `/var/www/kroster`:

```bash
sudo mkdir -p /var/www/kroster
sudo chown -R $USER:$USER /var/www/kroster
cd /var/www/kroster

# Install dependencies
npm install
```

## 5. Environment Variables

Create a `.env` file in `/var/www/kroster`:

```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/kroster"

# Database (for Prisma v7 adapter)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=PASSWORD
DB_NAME=kroster

# NextAuth
AUTH_SECRET="generate-a-secure-secret"
AUTH_URL="https://krypton.bni-nagpur.in"

# App URL
NEXT_PUBLIC_APP_URL="https://krypton.bni-nagpur.in"

# SMTP Settings
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="your-email@gmail.com"
```

## 6. Build the Application

Run the Prisma migrations and build the Next.js app:

```bash
npx prisma generate
npx prisma migrate deploy

# Seed database if necessary
# npm run seed

npm run build
```

## 7. Start with PM2

Start the application using the included PM2 ecosystem file:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*Run the command outputted by `pm2 startup` to ensure PM2 runs on system boot.*

## 8. Configure NGINX & SSL

Copy the included NGINX configuration:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/kroster
sudo ln -s /etc/nginx/sites-available/kroster /etc/nginx/sites-enabled/

# Test NGINX config
sudo nginx -t

# Restart NGINX
sudo systemctl restart nginx
```

Obtain an SSL certificate using Certbot:

```bash
sudo certbot --nginx -d krypton.bni-nagpur.in
```

## 9. File Uploads Directory

Ensure the uploads directory is writable:

```bash
mkdir -p /var/www/kroster/public/uploads
sudo chown -R www-data:www-data /var/www/kroster/public/uploads
sudo chmod -R 755 /var/www/kroster/public/uploads
```

Your application should now be fully deployed and accessible via HTTPS!
