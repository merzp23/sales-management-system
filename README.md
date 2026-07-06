# Sales Management System

Simple Laravel MVP demo for managing a basic sales hierarchy:

```text
Sale -> Agency -> Track Record
```

The application uses Laravel, Inertia, React, TypeScript, Tailwind CSS, and Laravel Sail.

## Stack

- PHP 8.3+
- Laravel 13
- Laravel Sail
- MySQL 8.4
- Inertia.js
- React 19
- TypeScript
- Tailwind CSS 4

## MVP Scope

This project intentionally stays narrow.

Included:

- Dashboard with basic counts
- Create and list Sales
- Create and list Agencies
- Create and list Track Records
- Relationship-aware forms
- Simple filtering and pagination on list pages

Not included:

- Authentication
- Roles and permissions
- Edit or delete flows
- Advanced search
- Reporting/export
- API layer

## Data Model

```text
Sale 1 -> many Agencies
Agency belongs to Sale

Agency 1 -> many Track Records
TrackRecord belongs to Agency
```

Main tables:

- `sales`
- `agencies`
- `track_records`

## Routes

- `/` dashboard
- `/sales` list sales
- `/sales/create` create sale
- `/agencies` list agencies
- `/agencies/create` create agency
- `/track-records` list track records
- `/track-records/create` create track record

## Filters

Current list-page filters:

- Sales: `status`, keyword search
- Agencies: `sale`, keyword search
- Track Records: `status`, `agency`, keyword search

Filters are preserved across pagination through Inertia query parameters.

## Local Setup

### 1. Install PHP dependencies

```bash
composer install
```

`composer install` must happen before Sail is available, because `./vendor/bin/sail` is installed into `vendor/`.

### 2. Create environment file

```bash
cp .env.example .env
```

### 3. Start Sail

```bash
./vendor/bin/sail up -d
```

### 4. Install frontend dependencies inside Sail

```bash
./vendor/bin/sail npm install
```

### 5. Generate app key

```bash
./vendor/bin/sail artisan key:generate
```

### 6. Run database migrations and seed demo data

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

## Local Ports

This repository is configured to avoid the default Laravel/Vite port conflicts:

- App URL: `http://localhost:8001`
- Laravel HTTP port: `8001`
- Vite dev server: `5174`
- Forwarded MySQL port: `3308`

These values come from `.env.example` and `compose.yaml`.

## Running The Project

### Start containers

```bash
./vendor/bin/sail up -d
```

### Start the Vite dev server

```bash
./vendor/bin/sail npm run dev
```

Then open:

```text
http://localhost:8001
```

### If Vite says the port is already in use

That usually means the dev server is already running in another terminal or container process.

Useful commands:

```bash
./vendor/bin/sail ps
./vendor/bin/sail npm run dev
./vendor/bin/sail down
./vendor/bin/sail up -d
```

You do not need to start a second Vite server if one is already running successfully on port `5174`.

## Common Commands

```bash
./vendor/bin/sail up -d
./vendor/bin/sail down
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail artisan test
./vendor/bin/sail npm run dev
./vendor/bin/sail npm run build
./vendor/bin/sail npm run types:check
./vendor/bin/sail composer test
```

## Seed Data

`DatabaseSeeder` runs `SalesManagementSeeder`, which creates:

- active and inactive Sales
- Agencies attached to Sales
- Track Records attached to Agencies
- a spread of Track Record statuses for dashboard and filter coverage

## Verification

The current project has been verified with:

```bash
./vendor/bin/sail artisan test
./vendor/bin/sail npm run types:check
./vendor/bin/sail npm run build
```

## Project Structure

Main backend files:

- `app/Http/Controllers`
- `app/Http/Requests`
- `app/Models`
- `database/migrations`
- `database/factories`
- `database/seeders`
- `routes/web.php`

Main frontend files:

- `resources/js/pages`
- `resources/js/components`
- `resources/js/layouts`
- `resources/css/app.css`

## Notes

- This is an MVP demo, not a production system.
- The UI is intentionally lightweight and reusable.
- Inertia + React wiring comes from the official Laravel React starter kit, not a custom manual setup.
