# Movie App

A React-based web application for browsing and discovering movies. This project features a modular component structure with a custom Navbar and Movie Cards to display content effectively.

## ✨ Features

* **Movie Search & Discovery:** Users can search for movies and view results dynamically.
* **Component-Based UI:** Built with reusable components like `MovieCard` for displaying movie details (poster, title, year) and `Navbar` for navigation.
* **Responsive Design:** Styled with custom CSS (`MovieCard.css`, `Navbar.css`) to ensure the app looks good on different screen sizes.
* **API Integration:** Capable of fetching real-time movie data from external APIs.
* **Secure Configuration:** Uses `.env` files to securely manage API keys and sensitive configuration.

## 💻 Technologies Used

* **Frontend:** [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
* **Language:** JavaScript (ES6+).
* **Styling:** CSS3 (Custom stylesheets).
* **State Management:** React Hooks (`useState`, `useEffect`).
* **Package Manager:** npm.
* **Version Control:** Git.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (LTS version recommended)
* npm (Node Package Manager) - usually comes with Node.js

## 🚀 Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/alidumn2/movie-app](https://github.com/alidumn2/movie-app)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd movie-app
    ```

3.  **Install dependencies:**
    This project uses `npm` to manage dependencies listed in `package.json`.
    ```bash
    npm install
    ```

## ⚙️ Environment Configuration

This project requires environment variables to function correctly (e.g., API keys).

1.  **Create the configuration file:**
    The project includes a `.env` file in the root directory. Ensure this file exists in your local setup.

2.  **Edit the variables:**
    Open the `.env` file and populate it with the necessary values.
    * *Note: If this app uses an external API (like OMDb or TMDB), ensure your API key is set here (e.g., `REACT_APP_API_KEY=your_key_here`).*

## 🛠️ Available Scripts

In the project directory, you can run the following commands:

### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## 📂 Project Structure

The project structure is organized as follows:

```text
movie-app/
├── public/              # Static assets (index.html, robots.txt, icons)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── MovieCard.js # Component for displaying individual movie details
│   │   └── Navbar.js    # Navigation bar component
│   ├── style/           # Component-specific styles
│   │   ├── MovieCard.css
│   │   └── Navbar.css
│   ├── App.js           # Main application logic
│   ├── App.css          # Global application styles
│   ├── index.js         # Entry point of the application
│   └── ...
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation