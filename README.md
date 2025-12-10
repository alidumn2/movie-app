# 🎬 React Movie App

A responsive movie application built with React JS that allows users to browse popular movies, search for specific titles, and manage a list of favorite movies. This project uses the TMDB (The Movie Database) API for fetching real-time data.

## 🚀 Features

* **Browse Movies:** Displays a list of popular movies on the homepage.
* **Search Functionality:** dynamic search bar to find movies by title.
* **Favorites System:** Add or remove movies from your favorites list.
* **Local Storage:** Favorites are saved to the browser's local storage, so they persist even after refreshing the page.
* **Dynamic Rating:** Visual indicators (Green/Red) for movie ratings.
* **Responsive Design:** Works on desktop and mobile devices.

## 🛠️ Technologies Used

* **React JS** (Hooks: `useState`, `useEffect`)
* **React Router DOM** (for navigation)
* **Axios** (for API requests)
* **TMDB API** (The Movie Database)
* **CSS3** (Custom styling)

## 📂 Project Structure

The project file structure is organized as follows:

```bash
MOVIE-APP
├── node_modules
├── public
└── src
    ├── components
    │   ├── MovieCard.js      # Component for displaying individual movie details
    │   └── Navbar.js         # Navigation bar component
    ├── style
    │   ├── MovieCard.css     # Styles for movie cards
    │   └── Navbar.css        # Styles for the navbar
    ├── App.js                # Main application logic and routing
    ├── App.css               # Global styles
    ├── index.js              # Entry point
    └── ...