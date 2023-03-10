# :wave: Welcome to REST API Posts With MongoDB and Cloudinary

> _:open_file_folder: This repository contains the source code of **[Post-Mongo-Cloudinary-API](https://github.com/matcastaneda/posts-mongo-cloudinary-api)**. :open_file_folder:_

The API uses `MongoDB` to store the post data and `Express` as the framework to build it. In addition, it uses `Cloudinary` as the image storage and processing service for posts.

The API provides a pagination functionality for posts, allowing users to request a specific page of results and `limit` the number of results displayed per `page` ([Query Params](https://en.wikipedia.org/wiki/Query_string)).

>	:globe_with_meridians: Example: http://localhost:3001/api/post?page=1&limit=2

The API has different endpoints that allow users to perform CRUD operations on posts, including creating new posts, updating existing posts, deleting posts, and retrieving individual posts or a paginated list of all posts.

### :rocket: You can...

- :pushpin: Get all posts :zap: `GET /api/post`
  <details><summary>View query response without query params</summary>
  <p>

  ```js
  GET http://localhost:3001/api/post
  ```

  ```js
  Status: 200 Ok
  ```

  ```json
  {
    "posts": [
      {
        "id": "640759f2f29dfc82e5464ec9",
        "title": "Title 1",
        "content": "Content 1",
        "image": {
          "public_id": "posts/g6vaiq2ooevbd8rj8z9t",
          "secure_url": "https://res.cloudinary.com/matcastaneda/image/upload/v1678221895/posts/riwqcxfvfonhadkfi5rh.jpg"
        },
        "createdAt": "2023-03-07T15:36:18.202Z",
        "updatedAt": "2023-03-07T15:36:18.202Z"
      },
      {
        "id": "64075a77f5f2b7b9ca52c135",
        "title": "Title 2",
        "content": "Content 2",
        "createdAt": "2023-03-07T15:36:18.202Z",
        "updatedAt": "2023-03-07T15:36:18.202Z"
      }
    ],
    "totalDocs": 2,
    "totalPages": 1,
    "currentPage": 1,
    "itemsPerPage": 2,
    "hasNextPage": false,
    "hasPrevPage": false
  }
  ```

  </p>
  </details>
  <details><summary>View query response with <strong>page</strong> and <strong>limit</strong> query params</summary>
  <p>
  
  | PARAM   | DEFAULT VALUE |
  | ------- | ------------- |
  | page    | 1             |
  | limit   | 10            |

  ```js
  GET http://localhost:3001/api/post?page=1&limit=1
  ```

  ```js
  Status: 200 Ok
  ```

  ```json
  {
    "posts": [
      {
        "id": "640759f2f29dfc82e5464ec9",
        "title": "Title 1",
        "content": "Content 1",
        "image": {
          "public_id": "posts/g6vaiq2ooevbd8rj8z9t",
          "secure_url": "https://res.cloudinary.com/matcastaneda/image/upload/v1678221895/posts/riwqcxfvfonhadkfi5rh.jpg"
        },
        "createdAt": "2023-03-07T15:36:18.202Z",
        "updatedAt": "2023-03-07T15:36:18.202Z"
      }
    ],
    "totalDocs": 2,
    "totalPages": 2,
    "currentPage": 1,
    "itemsPerPage": 1,
    "hasNextPage": true,
    "hasPrevPage": false
  }
  ```

  </p>
  </details>

- :pushpin: Get a specific post :zap: `GET /api/post/:id`
  <details><summary>View query response</summary>
  <p>

  ```js
  GET http://localhost:3001/api/post/640759f2f29dfc82e5464ec9
  ```

  ```js
  Status: 200 Ok
  ```

  ```json
  {
    "id": "640759f2f29dfc82e5464ec9",
    "title": "Title 1",
    "content": "Content 1",
    "image": {
      "public_id": "posts/g6vaiq2ooevbd8rj8z9t",
      "secure_url": "https://res.cloudinary.com/matcastaneda/image/upload/v1678221895/posts/riwqcxfvfonhadkfi5rh.jpg"
    },
    "createdAt": "2023-03-07T15:36:18.202Z",
    "updatedAt": "2023-03-07T15:36:18.202Z"
  }
  ```

  </p>
  </details>

- :pushpin: Create a new post :zap: `POST /api/post`
  <details><summary>View query response</summary>
  <p>

  ```js
  POST http://localhost:3001/api/post/
  ```

  | KEY     | VALUE               |
  | ------- | ------------------- |
  | title   | Title 3             |
  | content | Content 3           |
  | image?  | image-reference.png |

  ```js
  Status: 201 Created
  ```

  ```json
  {
    "id": "64075e0f800798f94e6a12f1",
    "title": "Title 3",
    "content": "Content 3",
    "image": {
      "public_id": "posts/g6vaiq2ooevbd8rj8z9t",
      "secure_url": "https://res.cloudinary.com/matcastaneda/image/upload/v1678221895/posts/riwqcxfvfonhadkfi5rh.jpg"
    },
    "createdAt": "2023-03-07T17:30:18.202Z",
    "updatedAt": "2023-03-07T17:30:18.202Z"
  }
  ```

  </p>
  </details>

- :pushpin: Update a post :zap: `PUT /api/post/:id`
  <details><summary>View query response</summary>
  <p>

  ```js
  PUT http://localhost:3001/api/post/64075e0f800798f94e6a12f1
  ```

  | KEY   | VALUE     |
  | ----- | --------- |
  | title | New Title |

  ```js
  Status: 200 Ok
  ```

  ```json
  {
    "id": "64075e0f800798f94e6a12f1",
    "title": "New Title",
    "content": "Content 3",
    "image": {
      "public_id": "posts/g6vaiq2ooevbd8rj8z9t",
      "secure_url": "https://res.cloudinary.com/matcastaneda/image/upload/v1678221895/posts/riwqcxfvfonhadkfi5rh.jpg"
    },
    "createdAt": "2023-03-07T17:30:18.202Z",
    "updatedAt": "2023-03-07T21:26:01.202Z"
  }
  ```

  </p>
  </details>

- :pushpin: Delete a post :zap: `DELETE /api/post/:id`
  <details><summary>View query response</summary>
  <p>

  ```js
  DELETE http://localhost:3001/api/post/64075e0f800798f94e6a12f1
  ```

  ```js
  Status: 204 No Content
  ```

  ```json
  []
  ```

  </p>
  </details>

### :package: Technologies Used

- :wrench: [Node.js](https://nodejs.org/en/)
- :wrench: [Express.js](https://expressjs.com/)
- :wrench: [MongoDB](https://www.mongodb.com/)
- :wrench: [Mongoose](https://mongoosejs.com/)
- :wrench: [Cloudinary](https://cloudinary.com/)
- :wrench: [Express-Fileupload](https://www.npmjs.com/package/express-fileupload)
- :wrench: [Dotenv](https://www.npmjs.com/package/dotenv)
- :wrench: [Cors](https://www.npmjs.com/package/cors)

### :memo: References

```typescript
// Post Interface
interface IPost {
  title: string;
  content: string;
  image?: { public_id: string; secure_url: string } | null;
}

// Post Pagination Returned Interface
interface IPostPaginationReturned {
  posts: IPost[];
  totalDocs: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

### :mag: Installation

##### :white_check_mark: Clone this repository

To start clone this repository use the following command:

```bash
git clone https://github.com/matcastaneda/posts-mongo-cloudinary-api.git
```

### :heavy_plus_sign: Local Setup

##### :white_check_mark: Install dependencies

```bash
pnpm install
```

```bash
npm install
```

##### :white_check_mark: Create a `.env` file with your database credentials **(Important Step)**

```bash
# In your .env file

# PORT
PORT=<your_port> # Default: 3001

# CLOUDINARY CONFIGURATION
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# MONGODB URI
MONGO_URI=
```

##### :white_check_mark: Run the server

```bash
npm run dev
```

##### :white_check_mark: Test the API in Insomnia or Postman

```BASH
http://localhost:<your_port>/api/posts
```

---

### :desktop_computer: Author

> :bust_in_silhouette: **Matías Castañeda** :heavy_check_mark: [GitHub](https://github.com/matcastaneda)

### :heart: Show your support

Give a :star: if this project helped you!

---

_This README was designed with :heart: by [Matías Castañeda](https://github.com/matcastaneda)._
