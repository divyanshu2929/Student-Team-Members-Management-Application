# Student Team Members Management Application

A full stack assignment project built with React, Node.js, Express, and MongoDB for managing student team members.

## Features

- Home page with team introduction
- Add Member page with image upload
- View Members page to list all members
- Member Details page to show full profile data
- MongoDB storage with file uploads saved in `server/uploads`

## Project Structure

```text
.
|-- client
|-- server
|-- package.json
`-- README.md
```

## Installation

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Create a `.env` file inside `server`:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/student-team-members
TEAM_NAME=Visionary Coders
```

## How to Run

Start both frontend and backend together:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## API Endpoints

- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get one member by ID
- `POST /api/members` - Add a new member with image upload

## Notes

- Uploaded images are stored in `server/uploads`.
- If you want your actual team name shown in the app, update `TEAM_NAME` in `server/.env`.
- Make the GitHub repository public and name it after your team name before submission.
