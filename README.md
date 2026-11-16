# Restaurant Reservation API

A RESTful backend API for creating, viewing, updating, cancelling and deleting restaurant reservations. It is built with Node.js and Express and persists records in a local JSON file. No database is used.

## Features

- Create a reservation with a generated unique ID.
- Retrieve all reservations or one reservation by ID.
- Update reservation details.
- Cancel a reservation while preserving its history.
- Delete a reservation.
- Validate required fields and data types.
- Automatically maintain `createdAt` and `updatedAt`.
- Check table availability for a date and time.
- Persist data in `data/reservations.json`.

## Requirements

- Node.js 18 or latest
- npm
- Postman

## Installation

```Guides:
git clone https://github.com/KennyGee01/G5MiniProject
cd Group_5_mini_project
npm install
```

## Run the application

Development mode (automatically restarts when files change):

```Code:
npm run dev
```

Normal mode:

```Code:
npm start
```

The server runs at `http://127.0.0.1:5000` by default. Set the `PORT` environment variable to use another port.

The restaurant has 10 tables by default. Set `TOTAL_TABLES` to change the capacity, for example `TOTAL_TABLES=15`. On Windows PowerShell, use `$env:TOTAL_TABLES=15` before starting the server.

## Project structure

```text
Group_5_mini_project/
|---  controllers/
|     |__ reservationControllers.js
|---  data/
│     |__ reservations.json
├──   routes/
│     |__ reservationRoutes.js
├──   services/
|     |__fileService.js 
│     |__ reservationService.js
├──   utils/
|     |__helpers.js
├──   .gitignore
|──   app.js
├──   package-lock.json
|──   package.json
|──   README.md
|__   server.js

```

## Reservation fields

| Field           | Type                  | Description |
|---              |---                    |---              |
| id              | string                | Generated UUID |
| name            | string                | Customer's name |
| date            | string                | Reservation date in `YYYY-MM-DD` |
| time            | string                | Time in 24-hour `HH:MM` format |
| guests          | number                | Integer from 1 to 20 |
| status          | string                | `confirmed` or `cancelled` |
| createdAt       | string                | Creation timestamp in ISO 8601 |
| updatedAt       | string                | Last-update timestamp in ISO 8601

## API endpoints

The assignment's path is `/reservations`.

| Method            | Endpoint | Purpose |
|---  |---|---|
| GET | `/reservations` | Get all reservations |
| GET | `/reservations/:id` | Get specific reservation |
| POST | `/reservations` | Create a reservation |
| PUT | `/reservations/:id` | Update an existing reservation fields |
| DELETE | `/reservations/:id` | Delete a reservation |
| GET | `/reservations/availability?date=YYYY-MM-DD&time=HH:MM` | Check available tables |

### Create a reservation

`POST /reservations`

Header: `Content-Type: application/json`

Body:

```json
{
  "name": "Joseph",
    "guests": 10,
    "date": "2026-11-15",
    "time": "19:00",
    "id": 1794668244325,
    "status": "confirmed"
}
```

A successful creation returns `201 Created`, the reservation object, a generated UUID, and an assigned table number.

### Update a reservation

`PUT /reservations/:id`

Send one or more fields to update, for example:

```json
{
  "numberOfGuests": 5
}
```

The API validates supplied fields and updates `updatedAt`. This implementation allows partial updates through PUT for convenience; a strict REST design would use PATCH for partial updates and reserve PUT for full replacement.


### Check availability

`GET /reservations/availability?date=2099-12-15&time=18:30`

The response lists available table numbers and the number remaining. A reservation occupies one table at its exact date and time. This is a simplified availability model for the project, not a full restaurant seating or time-slot scheduling system.

## HTTP status codes

- `200 OK`: Successful retrieval, update, cancellation or deletion.
- `201 Created`: Reservation created.
- `400 Bad Request`: Missing or invalid fields, or malformed JSON.
- `404 Not Found`: Reservation or route does not exist.
- `500 Internal Server Error`: Unexpected server-side error.

## Run tests

```Code:
npm test
```

The tests use Node's built-in test runner and the built-in `fetch` API. They reset the JSON data file before and after running.

## Data storage notes

Reservation records are stored in `data/reservations.json`. The service creates the data directory and file if they do not exist. File modifications are queued within one running Node.js process to reduce overlapping writes. This JSON-file solution is appropriate for the assignment; it is not intended for a multi-process or production deployment.

## Team collaboration

Suggested feature branches:

- `feature/routes`
- `feature/file-storage`
- `feature/validation`
- `feature/testing-readme`

Recommended workflow:

1. Each member clones the public repository.
2. Each member creates and works on their own feature branch.
3. Commit meaningful changes using their own GitHub account.
4. Push the branch and open a Pull Request to `main`.
5. Another member reviews the changes.
6. Merge after review and resolve any conflicts together.
7. Each member should make genuine, identifiable contributions.

Example commands:

```Code:
git checkout main
git pull origin main
git checkout -b feature/your-task

git add .
git commit -m "Describe your contribution"
git push -u origin feature/your-task
```

Then open a Pull Request on GitHub.

## Team members

Update this section with the actual names and GitHub usernames of all four contributors, and briefly describe each person's real contribution.

| Stages  | GitHub username | Contribution |
|---      |---              |---            |
| Stage 1 | Ganiyu          | Project setup, Github Repository and collaboration |
| Stage 2 | Ganiyu, Adeolu & Mubarak | Data structure and function interface |
| Stage 3 | Adeolu & John | File storage implementation |
| Stage 4 | Mubarak & Guttabingi | Reservation Business Logic |
| Stage 5 | Ganiyu & Jacqueline | API Routes Implementation |
| Stage 6 | Ogundana, Bello & Anifowose | Validation Implementation |
| Stage 7 | Adeolu & Ogundana | Individual Endpoint Testing |
| Stage 8 | Jacqueline, Guttabingi & Bello | README/ Documentation |
| Stage 9 | John & Anifowose | Integration and Review |
| Stage10 | All members       |Final Testing and submission|

## Important submission checklist

- Repository visibility is Public.
- Only nine out of 10 members are added as repository collaborators.
- All nine members have made genuine commits/contributions.
- Feature branches and Pull Requests are visible.
- All endpoints have been tested.
- `npm test` passes.
- README contains actual team details.
- No `node_modules` folder is committed.