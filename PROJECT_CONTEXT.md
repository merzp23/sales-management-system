# PROJECT_CONTEXT.md

## Project Type

Laravel MVC + Inertia + React + TypeScript demo application.

This is an MVP assignment demo, not a production system.
Prioritize a working main flow, correct data relationships, simple but polished UI, Docker-based setup, and clear code.

## Main Goal

Build a simple sales management system with this hierarchy:

```text
Sale → Agency → Track Record
```

The app must allow the user to:

1. Create a Sale
2. Create an Agency assigned to a Sale
3. Create a Track Record assigned to an Agency
4. View basic dashboard statistics

## Strict MVP Scope

Build only the features required for the core demo.

Do not add authentication, authorization, roles, advanced CRUD, complex reporting, notifications, file uploads, API tokens, queues, or unnecessary abstractions.

## Core Entities

```text
Sale 1 ────< Agency 1 ────< TrackRecord
```

## Database Naming Rules

Use clear English database names only.

Rules:

```text
- Use snake_case for database fields
- Store status values in English
- Do not store Vietnamese labels in the database
- Vietnamese or friendly labels may be handled only in the UI if needed
- Prefer specific field names over vague names
```

## Database Tables

### sales

Fields:

```text
id
name
email
phone_number
status
created_at
updated_at
```

Status values stored in database:

```text
active
inactive
```

UI labels:

```text
Active
Inactive
```

### agencies

Fields:

```text
id
sale_id
name
address
region
created_at
updated_at
```

Notes:

```text
region replaces area
sale_id links the agency to one sale
```

### track_records

Fields:

```text
id
agency_id
title
estimated_revenue
status
note
created_at
updated_at
```

Notes:

```text
title represents the customer name, order name, or sales opportunity name
estimated_revenue represents expected/potential revenue
agency_id links the track record to one agency
```

Status values stored in database:

```text
new
contacted
potential
closed
lost
```

UI labels:

```text
New
Contacted
Potential
Closed
Lost
```

## Model Relationships

### Sale

```text
Sale has many Agencies
```

### Agency

```text
Agency belongs to Sale
Agency has many TrackRecords
```

### TrackRecord

```text
TrackRecord belongs to Agency
```

## Routes

Use simple web routes only.

```text
GET  /                         → DashboardController@index

GET  /sales                    → SaleController@index
GET  /sales/create             → SaleController@create
POST /sales                    → SaleController@store

GET  /agencies                 → AgencyController@index
GET  /agencies/create          → AgencyController@create
POST /agencies                 → AgencyController@store

GET  /track-records            → TrackRecordController@index
GET  /track-records/create     → TrackRecordController@create
POST /track-records            → TrackRecordController@store
```

Do not create edit, update, show, or delete routes unless explicitly requested later.

## Controllers

### DashboardController

Methods:

```text
index
```

Responsibilities:

```text
- Count active Sales
- Count Agencies
- Count Track Records
- Count Track Records grouped by status
- Return Dashboard/Index Inertia page
```

### SaleController

Methods:

```text
index
create
store
```

Responsibilities:

```text
- List Sales
- Show create Sale form
- Validate and store Sale
```

### AgencyController

Methods:

```text
index
create
store
```

Responsibilities:

```text
- List Agencies with related Sale
- Show create Agency form
- Provide Sales list for dropdown
- Validate and store Agency with sale_id
```

### TrackRecordController

Methods:

```text
index
create
store
```

Responsibilities:

```text
- List Track Records with related Agency and Sale
- Show create Track Record form
- Provide Agencies list for dropdown
- Validate and store Track Record with agency_id
```

## Inertia React TypeScript Pages

Create only these pages:

```text
resources/js/Pages/Dashboard/Index.tsx

resources/js/Pages/Sales/Index.tsx
resources/js/Pages/Sales/Create.tsx

resources/js/Pages/Agencies/Index.tsx
resources/js/Pages/Agencies/Create.tsx

resources/js/Pages/TrackRecords/Index.tsx
resources/js/Pages/TrackRecords/Create.tsx
```

Do not use Vue files.
Do not use `.jsx` files.
This project uses Inertia with React and TypeScript.

## Shared React Components

Keep components simple and reusable.

```text
resources/js/Layouts/AppLayout.tsx

resources/js/Components/NavLink.tsx
resources/js/Components/PageHeader.tsx
resources/js/Components/StatCard.tsx
resources/js/Components/DataTable.tsx
resources/js/Components/FormInput.tsx
resources/js/Components/FormSelect.tsx
resources/js/Components/FormTextarea.tsx
resources/js/Components/StatusBadge.tsx
resources/js/Components/SubmitButton.tsx
```

Only create a shared component when it is used in more than one place or clearly simplifies the page.
If the installed starter kit already uses lowercase folders such as `resources/js/pages`, follow the existing project convention instead of creating duplicate `Pages` folders.

## UI Direction

The UI should be simple, clean, and slightly decorated.

Use basic decoration to make the demo look presentable:

```text
- Card-based layout
- Clear spacing
- Soft borders
- Light shadows
- Rounded corners
- Status badges
- Dashboard stat cards
- Simple empty states
- Clear primary buttons
- Consistent page headers
```

Do not spend time on complex animations, custom design systems, or advanced charts.

A simple TailwindCSS-based UI is enough.

## Dashboard Data Needed

```text
Total active Sales
- Count sales where status = "active"

Total Agencies
- Count all agencies

Total Track Records
- Count all track_records

Track Records by status
- Group track_records by status
- Count each status
```

Expected Track Record statuses:

```text
new
contacted
potential
closed
lost
```

## Validation Rules

Keep validation basic.

### Sale

```text
name: required
email: nullable, valid email
phone_number: nullable
status: required, allowed values only: active, inactive
```

### Agency

```text
name: required
address: nullable
region: nullable
sale_id: required, must exist in sales table
```

### Track Record

```text
title: required
estimated_revenue: nullable numeric
status: required, allowed values only: new, contacted, potential, closed, lost
note: nullable
agency_id: required, must exist in agencies table
```

## Sample Data

Add sample data generation for demo purposes.

Use seeders or factories to generate:

```text
- Several Sales
- Several Agencies linked to Sales
- Several Track Records linked to Agencies
- Mixed Sale statuses
- Mixed Track Record statuses
- Mixed regions
- Mixed estimated revenue values
```

The sample data should make the dashboard meaningful immediately after setup.

Keep sample data realistic but simple.

## Docker Setup

Add a simple Docker setup so the project can run consistently.

Required files:

```text
Dockerfile
docker-compose.yml
```

The Docker setup should support:

```text
- Laravel app container
- Database container
- Running migrations
- Running seeders
- Starting the app locally
- Running npm install
- Running Vite dev server
- Building frontend assets
```

Use a simple database suitable for the demo, such as MySQL or PostgreSQL.

Avoid overly complex Docker configuration.

Prefer a simple setup where the app container can run Composer, Artisan, npm, and Vite.
## README.md Requirements

README.md must include:

```text
- Project overview
- Tech stack
- Docker setup instructions
- How to start the project with Docker
- How to run migrations
- How to run seeders
- How to access the app locally
- Features completed
- Features not completed
```

## Implementation Order

Follow this order strictly:

```text
1. Create Docker setup:
   - Dockerfile
   - docker-compose.yml
   - database service
   - app service

2. Install/configure Laravel + Inertia + React + TypeScript.

3. Create migrations:
   - sales
   - agencies
   - track_records

4. Create models and relationships:
   - Sale
   - Agency
   - TrackRecord

5. Create factories/seeders for demo data.

6. Build Sale flow:
   - list Sales
   - create Sale
   - store Sale

7. Build Agency flow:
   - list Agencies with Sale name
   - create Agency
   - assign Agency to Sale

8. Build Track Record flow:
   - list Track Records with Agency name
   - create Track Record
   - assign Track Record to Agency

9. Build Dashboard:
   - active Sales count
   - Agency count
   - Track Record count
   - Track Records by status

10. Add simple validation and form error display.

11. Polish UI:
   - layout
   - navigation
   - cards
   - badges
   - spacing
   - simple visual decoration

12. Write README.md.
```

## Required Screens

```text
Dashboard
Sales list
Create Sale
Agencies list
Create Agency
Track Records list
Create Track Record
```

Each list page should show the most important fields only.

Each create page should have:

```text
- Page title
- Simple form
- Validation error display
- Submit button
- Back/list navigation
```

## Out of Scope

Do not implement:

```text
Authentication
Authorization
User roles
Edit/update/delete
Soft deletes
Advanced filtering
Advanced search
Export/import
Notifications
Email
File upload
REST API
Complex service layer
Repository pattern
Multi-tenant logic
Payment/order system
Customer management module
Production deployment automation
Complex dashboard analytics
Complex charts
```

## Coding Style Guidance

Use straightforward Laravel conventions.

Prefer:

```text
- Simple controllers
- Eloquent relationships
- Inertia render responses
- React TypeScript pages
- Basic request validation
- Clear variable names
- Simple TailwindCSS styling
- Minimal reusable components
- Factories/seeders for demo data
```

Avoid:

```text
- Over-abstracting
- Premature optimization
- Complex architecture
- Unused components
- Extra packages unless necessary
- Features outside the approved MVP
- Vietnamese status values stored in the database
- Vue files
- JSX files
```

## Success Criteria

The demo is successful if:

```text
- Docker setup works
- User can create a Sale
- User can create an Agency linked to a Sale
- User can create a Track Record linked to an Agency
- Dashboard shows correct basic statistics
- Demo seed data is available
- Data relationships are correct
- Status values are stored in English
- Database fields are clear and standardized
- UI is simple but presentable
- App runs without blocking errors
- README.md is clear
```
