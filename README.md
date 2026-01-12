# GitHub Gadgets Pro

This project provides a set of tools and services for fetching and displaying GitHub user and repository statistics. It uses the GitHub GraphQL and REST APIs to retrieve data and presents it in a visually appealing way.

## Features

-   **User Statistics:** Get detailed statistics for a GitHub user, including top languages, stars, and other metrics.
-   **Repository Statistics:** Get detailed statistics for a GitHub repository.
-   **Customizable Themes:** Choose from a variety of themes to customize the look and feel of the statistics cards.

## Setup

To run this project locally, you will need to create a `.env` file in the root of the project and add your GitHub Personal Access Token to it.

1.  **Create a `.env` file:**

    ```bash
    touch .env
    ```

2.  **Add your GitHub Token to the `.env` file:**

    Your `.env` file should look like this:

    ```
    GITHUB_TOKEN=your_github_personal_access_token
    ```

    Replace `your_github_personal_access_token` with your actual GitHub Personal Access Token. You can create a new token [here](https://github.com/settings/tokens).

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

## Usage

Once the development server is running, you can access the following endpoints:

-   `http://localhost:3000/api?username=<your_github_username>`
-   `http://localhost:3000/api/pin?username=<your_github_username>&repo=<your_repo_name>`
-   `http://localhost:3000/api/top-langs?username=<your_github_username>`

## Error Handling

If you are seeing a "Request failed with status code 401" error, it means that your `GITHUB_TOKEN` is either missing or invalid. Please make sure that you have created a `.env` file and that your token is correct. The `api/index.js` file contains a debug log that prints "Token loaded: YES" or "Token loaded: NO" to the console, which can be used to verify if the token is being loaded correctly.
# github-gadgets-pro
