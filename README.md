# Movie Search and Watchlist

A simple React + Vite project for searching through the OMDb API and managing a watchlist.

## Features

- Fetch movies based on user search input
- Display basic movie details and posters
- Add movies to a watchlist for later reference
- Abort ongoing fetch requests if a new search is triggered
- Track watched movies and mark them as watched

## Prerequisites

- Node.js (14+)

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

To enable search functionality, update your API key in the appropriate code location (e.g., .env file or a constant in your code).

## Project Structure

- App.jsx - Main application logic
- components - Reusable components (MovieList, WatchedList, StarRating, etc.)
- public - Static assets

## Liscense

This project is provided under the MIT License. Feel free to use and modify.
