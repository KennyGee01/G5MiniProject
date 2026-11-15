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

- Node.js 18 or later
- npm
- Postman

## Installation

```Guides:
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL
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
│     |__ validation.js
├──   .gitignore
|──   app.js
├──   package-lock.json
|──   package.json
|──   README.md
|__   server.js
```

## Reservation fields

| Field | Type | Description |
|---            |---                    |---              |
| id            | string                | Generated UUID |
| customerName  | string                | Customer's name |
| date          | string                | Reservation date in `YYYY-MM-DD` |
| time          | string                | Time in 24-hour `HH:MM` format |
| numberOfGuests | number               | Integer from 1 to 20 |
| tableNumber   | number                | Table allocated by the API |
| status        | string                | `confirmed` or `cancelled` |
| createdAt     | string                | Creation timestamp in ISO 8601 |
| updatedAt     | string                | Last-update timestamp in ISO 8601

## API endpoints

The assignment's suggested `/resources` path is used for reservations.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/resources` | Get all reservations |
| GET | `/resources/:id` | Get specific reservation |
| POST | `/resources` | Create a reservation |
| PUT | `/resources/:id` | Update an existing reservation fields |
| DELETE | `/resources/:id` | Delete a reservation |
| GET | `/resources/availability?date=YYYY-MM-DD&time=HH:MM` | Check available tables |

### Create a reservation

`POST /resources`

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

`PUT /resources/:id`

Send one or more fields to update, for example:

```json
{
  "numberOfGuests": 5
}
```

The API validates supplied fields and updates `updatedAt`. This implementation allows partial updates through PUT for convenience; a strict REST design would use PATCH for partial updates and reserve PUT for full replacement.


### Check availability

`GET /resources/availability?date=2099-12-15&time=18:30`

The response lists available table numbers and the number remaining. A reservation occupies one table at its exact date and time. This is a simplified availability model for the project, not a full restaurant seating or time-slot scheduling system.

## HTTP status codes

- `200 OK`: Successful retrieval, update, cancellation or deletion.
- `201 Created`: Reservation created.
- `400 Bad Request`: Missing or invalid fields, or malformed JSON.
- `404 Not Found`: Reservation or route does not exist.
- `500 Internal Server Error`: Unexpected server-side error.

## Run tests

```bash
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

| Member | GitHub username | Contribution |
|---|---|---|
| Member 1 | Add username | Routes |
| Member 2 | Add username | File storage |
| Member 3 | Add username | Validation |
| Member 4 | Add username | Testing and README |

## Important submission checklist

- [ ] Repository visibility is Public.
- [ ] only nine out of 10 members are added as repository collaborators.
- [ ] All nine members have made genuine commits/contributions.
- [ ] Feature branches and Pull Requests are visible.
- [ ] All endpoints have been tested.
- [ ] `npm test` passes.
- [ ] README contains actual team details.
- [ ] No `node_modules` folder is committed.