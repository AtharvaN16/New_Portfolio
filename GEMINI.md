# Project: Atharva Nayak's Portfolio

## Project Overview

This directory contains the source code and related assets for Atharva Nayak's personal portfolio website. The main project is a modern, performant, and accessible website built with Next.js 15, React 19, and TypeScript. The project is well-structured, with a focus on code quality, performance, and accessibility.

The portfolio also includes a directory of "Old portfolio components", which contains a WebGL-based hero section from a previous version of the site. This component has been archived due to performance and maintainability concerns.

## Building and Running

The main project is located in the `portfolio-new` directory. To build and run the project, follow these steps:

1.  **Navigate to the project directory:**
    ```bash
    cd portfolio-new
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    ```bash
    cp .env.example .env.local
    ```
    Edit `.env.local` with the required values.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Development Conventions

The project follows a strict set of development conventions, enforced by ESLint, Prettier, and TypeScript.

*   **Code Style:** The project uses Prettier for automatic code formatting.
*   **Linting:** ESLint is used to enforce code quality and catch potential errors.
*   **Typing:** The project is written in TypeScript and uses strict mode for type safety.
*   **Testing:** The project uses Vitest and Testing Library for unit and integration tests.

## Directory Overview

*   `portfolio-new/`: The main Next.js project directory.
    *   `src/`: The source code for the portfolio website.
    *   `tests/`: Unit and integration tests.
    *   `public/`: Static assets like images and videos.
*   `Old portfolio components/`: Contains a WebGL-based hero section from a previous version of the portfolio.
*   `satoshi/`: Contains the Satoshi font files used in the project.
*   `Documentation/`: Contains project-related documentation.
*   `Swaddle/`: This directory appears to contain a large number of HTML files, possibly scraped from a website. I was unable to access this directory during my analysis.
*   `Icons/`: Contains SVG icons used in the project.

## Key Files

*   `portfolio-new/README.md`: The main README file for the portfolio project, containing detailed information about the project's features, tech stack, and setup instructions.
*   `portfolio-new/package.json`: The `package.json` file, which lists the project's dependencies and scripts.
*   `Old portfolio components/HOMEBLOBS_COMPONENT_DOCUMENTATION.md`: Detailed documentation for the old WebGL-based hero section.
