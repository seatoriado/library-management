<h1>Library Management README</h1>

<p>
  Frontend NextJS project for management of book records.
</p>

<br />

<!-- Table of Contents -->
# Table of Contents

- [About the Project](#about-the-project)
  * [Tech Stack](#tech-stack)
  * [Features](#features)
  * [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Run Locally](#run-locally)
  * [Building](#building)
- [Endpoints](#endpoints)
  

## About the Project

### Tech Stack

<ul>
  <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
  <li><a href="https://nextjs.org/">Next.js</a></li>
  <li><a href="https://reactjs.org/">React.js</a></li>
  <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
</ul>

### Features

- Book List
  - Displays the list of all books retrieved from the backend API (GET /books).
  - Each book item displays its key details for easier viewing.
  - When user clicks on the book item, they will be redirected to the Book details page.
- Search
  - On the Home page, users are able to to filter books by title or author using the GET /books/search endpoint.
- Book details
  - Show detailed information about a selected book by calling GET /books/{id}.
  - A button is provided to request AI insights for the book.
  - Includes the editing and deleting of the book record.
- AI Insights
  - When the user clicks to get AI insights, call the GET /books/{id}/ai-insights endpoint.
  - This will display the AI-generated tagline or summary below the book details.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BOOKS_API_HOST`
  - Domain of the API endpoint for Book management requests

`BOOKS_API_PATH`
  - Path of the API endpoint for Book management requests

## Getting Started

### Prerequisites

This project uses NPM as package manager. Please make sure that NodeJS along with NPM is installed on your unit.

<a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">How to install NodeJS & NPM </a>

### Run Locally

Clone the project

```bash
  git clone https://github.com/seatoriado/library-management.git
```

Go to the project directory

```bash
  cd library-management
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Building

Build the release files

```bash
  npm run dev
```


## Endpoints

### Book List page

#### URL

```bash
/
```

#### Features

- Book listing
  - Lists key details of the books. This includes the title, author and publishing year.
  - Upon clicking of the entry, user will be redirected to the book details page.
- Search
  - A search bar is provided on the top left of the page.
  - Upon editing of the field, the page will automatically filter out the author or title based on the search term.
- Pagination
  - On the bottom right of the page, the selection of number of items per page and the page navigation are provided.
  - Upon selection of the number of items per page, the page will automatically update its content to align with the selection.
  - The page navigation would only be displayed when the number of entries exceeded the number of items per page.
  - When the navigation button is clicked, the page will automatically update the entries.
- Create new book entry
  - On the top right of the page, a green + sign is added.
  - This will allow the user to navigate to the page for the creation of new book entry;

### Book New page

#### URL

```bash
/books/new
```

#### Features

- Book details form
  - A combination of label and input field would be displayed for allowed details of the book.
- Save button
  - Upon submission, a request will be sent out to validate and update the entry.
  - If the request failed caused by incorrect user input, an error message will be displayed right below the concerned field.
  - If the request failed due to system issue, and error message would be prompted to the user.
  - If the request is successful, the user will be redirected to the details page of the new entry.
- Cancel button
  - When clicked, user will be redirected to the dashboard.

### Book Details page

#### URL

```bash
/books/[id]
```

#### Features

- Book details
  - Lists all available information on the book selected.
- Edit button
  - On the top right of the page, an edit button is provided.
  - This will redirect the user to the Book edit page.
- Delete icon
  - On the top right of the page, an red X icon is provided.
  - This will prompt a confirmation modal to the user for the confirmation of deletion.
  - Upon confirming, a success or error message will appear depending on the result of the request.
  - When the result is successful, the user will be redirected to the Home page after 3 seconds.
- AI Insights button
  - This is provided after all of the book details.
  - When clicked, request will be sent out for the AI response.
  - If the request is successful, the insight would be added to the details list and the button will be hidden.
  - Otherwise, an error alert will be displayed. The button will stay in the page allowing user to retry.

### Book Edit page

#### URL

```bash
/books/[id]/edit
```

#### Features

- Book details form
  - A combination of label and input field would be displayed for allowed details of the book.
  - The details from the previous page would be automatically added to the current field.
- Save button
  - Upon submission, a request will be sent out to validate and update the entry.
  - If the request failed caused by incorrect user input, an error message will be displayed right below the concerned field.
  - If the request failed due to system issue, and error message would be prompted to the user.
  - If the request is successful, the user will be redirected to the details page of the updated entry.
- Cancel button
  - When clicked, user will be redirected to the book entry's details page
