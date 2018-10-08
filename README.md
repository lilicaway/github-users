# GitHubUsers App README

This application displays the list of GitHub users using the [GitHub API](https://developer.github.com/v3/users/#get-all-users)

The app has one module. The **Users** module, where you can see the list of GitHub Users. The list shows User Cards, and at the bottom, you can choose to display more users by clicking the button displayed as "Load More...". This is like that because it is how naturally the API exposes its data.
From there, it is possible to navigate back to the User Details by clicking the button displayed as **User Details**.

The web application is **responsive** implemented by default using react-bootstrap.

## From the design point of view

One part of the application that is worth mentioning is the LoadingIndicator component, that is used to show the delay of getting the data from the API, both in the "Users list" and the "Single user information" pages.
Since the same component is shown in 2 places, its reducer logic needed to differentiate them. For that, besides the usual "type" for the action, I added a "subtype" that indicates whether it corresponds to the LoadingIndicator in "Users list" or in "Single user information" page.

## Limitations

Since this is mostly a demo app, there are some limitations.
"Pagination" is implemented but there is no implementation to reduce the number of users that are being displayed (except for refreshing the page and starting over).

- **Pagination**: is implemented but there is no implementation to reduce the number of users that are being displayed (except for refreshing the page and starting over). Also, the paging state is not stored in the url, so if you refresh the app after you clicked "Load More", only the first page will be shown again.
- **Styling**: [Bootstrap](http://getbootstrap.com/css) and [react-bootstrap](https://react-bootstrap.github.io/components.html) are the only things being used for styling the app. No custom .css file was written, so the application doesn't look perfect everywhere. But is responsive by default.
- **Tests**: there are examples of different types of tests, but not everything is being tested.
- **TypeScript**: some parts in the TypeScript could be improved. There are some parts marked as TODO with some castings where perhaps better typing could help.

## Commands for development

This application was bootstrapped using ["Create React App for TypeScript"](https://github.com/wmonk/create-react-app-typescript)

### Scripts

In order to start the application, in the project directory, you can run in the command console:

`npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test` or `yarn test`

Launches the test runner in the interactive watch mode.

`npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### Details

Once you open the application, the Home shows more information about the features and limitations of the app.
