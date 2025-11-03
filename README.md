# Blog API (Laravel project)

## Requirements

- PHP 8.0 or higher
- MySQL or MariaDB
- Node.js 22 or higher
- Composer 2.8 or higher
- Docker

## Installation

### 1. Install Dependencies

```bash
composer install
```

```bash
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit the .env file to configure your environment variables (database, app key, etc.):

```bash
php artisan key:generate
```

### 3. Database Setup

1. Connect to MySQL server:

```bash
mysql -u root -p
```

2. Create the database:

```bash
CREATE DATABASE blog;
```

3. Run the import command:

```bash
mysql -u root -p blog < dump.sql
```

### 4. Migrate database and seed

```bash
php artisan migrate
```

```bash
php artisan db:seed
```

### 5. Start Project

```bash
php artisan serve
```

```bash
npm run dev
```

```bash
docker run -p 6001:6001 -p 9601:9601 quay.io/soketi/soketi:latest-16-alpine
```

## Testing

### 1. Set test database at .env.testing

### 2. Use command below

```bash
./vendor/bin/pest
```
