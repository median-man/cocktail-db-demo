# cocktail-db-demo

This repo provides an example of an Express app with a Sequelize database.

There are a few routes included in the demonstration with the goal of presenting an N:M relationship using Sequelize.

## Running the Demo

- Clone or download the repo.
- Run `npm install`
- Create a local mysql database named `cocktail_db_demo`.
- Run `npm run seed` to seed the database.
- Run `npm start` to start the server.

## Routes

### GET /cocktails

Renders html with all cocktails. If provided with optional "ingredients" parameter, only cocktails which include every ingredient will be rendered. Example url `/cocktails?ingredients=gin,vermouth` will display only cocktails with a list of ingredients containing gin _AND_ vermouth.

### GET /api/cocktails

Responds with JSON array of cocktails. Uses same query parameter for ingredients from `GET /cocktails`.

## Query Examples

Additional examples of querying the cocktail db may be found in `/examples/query-examples.js`.
