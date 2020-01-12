# Reservation Feed

Welcome to UpStay! :dancer::dancer:  
this repo contains a boilerplate for your UpStay exercise.

## Project aim

In this project you will create a web service, displaying a live feed of hotel reservations.

You will be provided with a stream of reservations, which you should keep track of in the server and insert it to
the database. After successful insertion, you should broadcast the new reservation to the client using web sockets.
When a user opens the web-app, he should see the live feed of all reservations from the database:

This is how it should look like:

![large](https://res.cloudinary.com/upstay/image/upload/v1578560339/upstay-exercise/lgm.png)

The web app should be fully responsive and from small breakpoint down (`@media (min-width: 576px)`) the layout should be look like this:

![sm](https://res.cloudinary.com/upstay/image/upload/v1578560339/upstay-exercise/smm.png)

## Establishment

1. Unzip the project to your local machine.

2. Create a [Postgres](https://www.postgresql.org/) database using your favorite tools (we recommend [DataGrip IDE](https://www.jetbrains.com/datagrip/)) and execute the [ddl.sql](https://github.com/ancillary-streams/upstay-exercise-instructions/blob/master/ddl.sql) provided in the project to generate your initial database structure.

3. create `.env` file and put there your Database Connection String in the format: `postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]` under `DATABASE_URL` key as shown in [.env.example](https://github.com/ancillary-streams/upstay-exercise-instructions/blob/master/.env.example)

4. You're all set! Start the project using `npm install` and `npm start`. you will see a [web page](http://localhost:9999) opened with a beautiful "Welcome to UpStay" message :hugs:

## Instructions [Back-End]

1. Create a reservation route that returns all the reservations from the database.

2. Use the code provided and attach a callback to new reservation events in the generator stream.

3. Insert new reservations to the database and broadcast them to the client using the socket provided from [socket.io](https://socket.io/) implementation. The broadcast to the client should only occur on successfully insertion!

4. Create a route that returns live exchange rates for currencies using an external public API of your choice.

## Instructions [Front-End]

1. Create the feed page displaying all the reservations from the database on application load, as describe in the preview mocks above. No need for pagination! All the data should be rendered endlessly onto the page.

2. Activate the `filter input by uuid`: on every keystroke the feed should refresh to display **any!** matches to the reservation's uuid. This filter should be dynamic client-side only.

3. Activate the `select box change currency`: on page load and every `onChange` event, all the reservation prices should be converted to the new selected currency (you can assume default value is USD). Use your previously created currencies route to populate the ComboBox and make the conversion by their actual current values from your chosen external API. you should render the page only when all the data is ready.

4. Subscribe your socket.io client to the corresponding event your chose in the server and listen to new reservation events. Add any new reservations to the live feed.

## Notes

-   To make your (and our :upside_down_face:) life easier, we already made a pretty solid code infrastructure for the Server and the Client. Before your begin coding, please take 10-15 minutes to evaluate the existing implementation and make sure you understand the project structure and design architecture.
    If you have any questions before you start you can [reach out to us](mailto:adiel@upstay.tech) any time!

-   Some of the libraries used in
    the project are not opinionative, please use them:

    -   [axios](https://github.com/axios/axios) - HTTP Client for Node & Browser
    -   [pg](https://node-postgres.com/) - Postgres Databse Client
    -   [socket.io](https://socket.io/) - Real Time engine based on web sockets

    If you are not familiar with those technologies please find the time to go through them and understand the basic use API. This is part of the test. Besides those, you may use any other tool you know and love for the job.

-   In the Front-End, we are using a custom `webpack` config that supports all the new javascript goodies implementations.  
     This setup supports:

    -   React & JSX (of course :stuck_out_tongue_closed_eyes:)
    -   hooks
    -   css
    -   scss (sass)
    -   styled-components.

    You can add whatever tool or babel plugin your like if you need extra compile assets (no need to use create-react-app - everything is already working for you!).

    Dev server and hot reload are also in, so you can work on the same url in the client and the server (no need to complicate yourself with proxy for your ajax calls and other annoying stuff from CRA :dizzy_face:).

-   Please use any [UI](https://ant.design/docs/react/introduce) [library](https://react-bootstrap.github.io/) [you](https://material-ui.com/) [want](https://react.semantic-ui.com/) (or [any](https://purecss.io/) [css](https://getbootstrap.com/) [framework](https://foundation.zurb.com/)) to make our project more shiny.

-   We look for clean and organized code. Keep it [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself)!

-   We recommend using [VSCode IDE](https://code.visualstudio.com/) with those extensions:

    -   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    -   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    -   [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

    For better development experience with fully eslint and prettier IDE support

-   Submit your solution by committing & pushing all your code to Github (or your favorite git cloud service) and send us the repo URL.

**Good Luck!**  
We hope you will learn a lot and also have fun :wink::v:
