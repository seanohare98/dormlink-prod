# DormLink

## Installation

- This guide assumes you have a basic competence with a command line tool like Terminal. If you need to learn more, click [here](https://www.davidbaumgold.com/tutorials/command-line/).
- Retrieve `.env` from our WhatsApp or Discord group. I'll frequently update it on those platforms, but prefer to keep it off GitHub since it contains sensitive personal and group data.

##### Project Code

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- Clone the repository to your machine. Run `git clone https://github.com/seanohare98/dormlink.git`.

##### MySQL Database

- Install [MySQL](https://www.mysql.com/downloads/).
- [Create a MySQL user and database called 'dormlink'.](https://dev.mysql.com/doc/mysql-getting-started/en/)
- Fill out the correct user/password/network/database credentials in `.env`.

##### ~~Neo4j Graph Platform~~

- ~~Neo4j integration is still in development.~~
- ~~Don't worry about it for now. I'll help you guys later.~~

##### Node.js Backend

- Install [Node.js](https://nodejs.org/en/download/).
- Run `node --version` and make sure it's `v12.10.0`.
- Run `npm --version` and make sure it's `6.13.1`.
- Charlie reported an issue with `apt-get` installing outdated node and npm packages, so **double-check that your install is up-to-date.**

#### Running DormLink on `localhost`

1. Navigate to the root directory of the project `cd dormlink`.
2. Place `.env` here with all the necessary variables filled in.b
3. Use `npm i` to install dependencies (these are specified in `package.json`).
4. Use `npm run dev` to start the server and webpack build process.
5. Visit this `localhost:8080` URI in your browser to use DormLife.

#### Remember:

- [**_Integrate prettier w/ your code editor_**](https://prettier.io/docs/en/editors.html)
- Have .env file in the root directory!
- Monitor the Webpack and nodemon output and logs if you encounter an issue.

---

## References:

#### Learning resources:

- [The official React docs are very beginner friendly.](https://reactjs.org/docs/getting-started.html)
- [React Router Training](https://reacttraining.com/react-router/web/guides/quick-start).
- [Material UI Docs](https://material-ui.com/) (explains the frontend component APIs and styling methods I've been using on this project).
- [Express.js Docs.](https://expressjs.com/en/starter/installing.html)
- [Webpack Docs](https://webpack.js.org/concepts/) (if you want to understand how I configured the build and transpile process for this project and how we serve our assets).
- [Airbnb Style Guide](https://github.com/airbnb/javascript) (our project eslint extends this style guide because I thought that it would give you guys helpful feedback since you're new to javascript).

#### Research resources:

- [K-Nearest-Neighbor Neo4j Implementation Examples](https://neo4j.com/docs/graph-algorithms/current/labs-algorithms/approximate-nearest-neighbors/)
