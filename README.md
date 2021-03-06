## Clone project
## install dependencies
npm install
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

For running the testcases, you can run:
### `npm test`



Assignment:

Responsive layout
The grid should show 3 columns on Desktop screens, 2 on Tablet screens, and 1 on Mobile screens.
The table below the grid should always have the same width as the grid. You're free to decide how to arrange columns inside the table
Use the mobile-first approach for designing the layout.

Search
Use the attached `mock_data.json` as seed data and implement the search logic in-memory.
The input text should be searched for in the fields `title` and `description`.
By default (i.e. for no search term) all posts should match the query.
Support exact match when the query contains a phrase within double quotes (like Google does)

Examples:
Given the following posts:
Post 1 with title: "The Lord of the Rings: The Return of the King".
Post 2 with title: "The Lion King".
Search Term
Post 1 matches?
Post 2 matches?
the king
Yes
Yes
"the king"
Yes
No


Sort
Sort options: title, dateLastEdited

State Management
The Grid content should be paginated matching the search and sort criteria
The Table should contain all the matching records matching the search and sort criteria
UI state should be preserved when the web-page is refreshed
i.e. data loaded on refresh should be as per the value entered in the 'Search' field and the value selected for 'Sort by'. 

Other requirements
Use a component-oriented view library for implementation (Angular 10+ preferred).
Don't use any 3rd-party styling/component framework.
Write meaningful unit tests where appropriate.
Provide a git repo link containing the project files.
We'd like to know your commit habits.
If you're used to rebasing to make the commits history easy to understand, it's ok to do so for this assignment!
Share instructions for running the app and executing the tests so that we can evaluate it without delay.
