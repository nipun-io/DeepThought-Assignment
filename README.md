# Event Management API

A RESTful API for managing events, built with Node.js, Express, and MongoDB (Native Driver).

## Features

- **CRUD Operations**: Create, Read, Update, and Delete events.
- **File Uploads**: Support for uploading event images.
- **Pagination**: Efficiently fetch latest events with pagination.
- **No-Schema Design**: Flexible data model using MongoDB native driver.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Atlas connection string or local instance)

## Installation

1.  **Clone the repository** (or extract the project files):

    ```bash
    cd Assignment-DeepThought
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root directory.
2.  Add the following environment variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/DTAssignment?retryWrites=true&w=majority
    ```

    > **Note**: Replace `<username>`, `<password>`, and the cluster URL with your actual MongoDB credentials.
    > You can use this link for test purposes only   
    > `MONGODB_URI=mongodb+srv://nipunjain892:NIPUN.1a@cluster0.otrjppe.mongodb.net/DTAssignment?retryWrites=true&w=majority `

## Running the Server

- **Start normally**:

  ```bash
  npm start
  ```

- **Start in development mode** (with nodemon):
  ```bash
  npm run dev
  ```

The server will start on `http://localhost:3000`.

## API Endpoints

| Method   | Endpoint                                        | Description                                                  |
| :------- | :---------------------------------------------- | :----------------------------------------------------------- |
| `GET`    | `/api/v3/app/events?id=:id`                     | Get a specific event by ID                                   |
| `GET`    | `/api/v3/app/events?type=latest&limit=5&page=1` | Get latest events (paginated)                                |
| `POST`   | `/api/v3/app/events`                            | Create a new event (Form-data: `name`, `files[image]`, etc.) |
| `PUT`    | `/api/v3/app/events/:id`                        | Update an event (Form-data)                                  |
| `DELETE` | `/api/v3/app/events/:id`                        | Delete an event                                              |

## Project Structure

```
├── controllers/      # Request handlers (Single Responsibility)
│   └── events/       # Event-related controllers
├── routes/           # API route definitions
├── uploads/          # Directory for uploaded images
├── db.js             # Database connection logic
├── index.js          # Application entry point
└── .env              # Environment variables (not committed)
```
