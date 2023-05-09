# Book-Resources

## Setup the project 
clone the repo run the following commands in the root directory of the project: 

```
npm install
npm start
```

## Setup the Environment Variables

```
PORT = Port number
DATABASE_URI = Database url
SALT_ROUNDS = 10

JWT_SECRET_KEY = Secret Key
```

## Folder Structure

```
server\
 |--index.js        # App entry point
 |--config\         # Configuration related files
 |--controllers\    # Route Controller (Logics of api's)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models
 |--routes\         # Routes
```

## Api Endpoints

API docs : https://documenter.getpostman.com/view/26635070/2s93eZxBW3

List of available routes:

**User routes**:\
`POST /user/register` - register\
`POST /user/login` - login\

**Book routes**:\
`POST /books/create` - create a Book\
`GET /books` - get all Books\
`GET /books/id/:id` - get Book By Id\
`GET /books/name/:name` - get Book By name\
`PATCH /books/update/:id` - update Book\
`DELETE /books/delete/:id` - delete Book