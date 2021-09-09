# Energiser Score Tracker

We will be building our first full stack app to keep track of energiser scores. It will be a chance to embed everything we've learned so far and practice breaking down problems into solvable chunks.

**Take time to plan both the front and back end of your app before you start coding.**

## Requirements

- Must use a database for persistent storage
- Must use an REST API server with routes to manage requests and serve responses
- Must use the models pattern to allow easy interaction with the database
- Must have a front end which allows users to at least view the data
- Bonus: Once users can view the data on the front end, try incorporating other request types from the front end (remember your CRUD actions and think about how you could build front end functionality around them)

The rest is up to you!

## Helpful resources

- If you need a review on using fetch from your front end, check out this short [video here](https://drive.google.com/file/d/1HWDkpK11y9wgzPURBx5-QSkQHb4Y-XsO/view?usp=sharing).
- If you want to look more closely at using the second argument of fetch (where you send the method, headers, and body), watch this even shorter [video here](https://drive.google.com/file/d/1tdgoLo-7GxS9vJtPkYfDlShAuftzZctL/view?usp=sharing).
- When sending a request with a body, you'll need a `content-type` header to tell the Express server that you're sending JSON. This way, the `express.json()` middleware can work correctly. Read more about this header in this [article here](https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/), including how to set the right `content-type` header for sending JSON.
