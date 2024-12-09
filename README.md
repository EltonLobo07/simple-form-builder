This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The deployed version of the project can be found [here](https://simple-form-builder-five.vercel.app/).

## Getting Started

To start the development server:

1. Install the dependencies (Example using npm: `npm install`)
2. Execute the development script as shown below
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important points

- The web application cannot function if JavaScript is disabled.
- The application is incomplete. These features are not supported:
  - Form preview
  - Reordering the questions while using the form builder
  - publishing a form
- These are the features that were added to the application (I thought they were too important to exclude):
  - Delete added questions
  - Delete an added option of a single-select question type

## How would I have implement the missing features?

- Form preview

  Since the previews are shareable and the application does not have auth, these are the approaches I would have explored:

  1. Convert the form builder's state to a query param (like the top answer [here](https://stackoverflow.com/questions/15872658/standardized-way-to-serialize-json-to-query-string)). This might not be ideal, but there are online code playgrounds that do something very similar ([example](https://www.typescriptlang.org/play)). The only limitation would be the size of the URL exceeding the browser's safe limit.
  2. The form builder's state is stored inside local storage so that the data is not deleted when refreshing the page or closing the browser tab. I can use this to my advantage. Navigate to the `/preview` route and use the current state of the local storage to build the form preview. But this will not allow us to create shareable previews (previews that work for all users).

- Reordering the questions while using the form builder

  I initially thought of using a single select component with numbers. The selected number would represent the question's position in the list. But the requirement was to implement it as drag-and-drop. I honestly don't have much experience implementing drag-and-drop. I would have explored if it was possible using plain JS or would have used a library like [dndkit](https://dndkit.com/).

- Publishing a form

  This feature is very similar to the `Preview form` feature. The only difference is the source of the form builder's state. Since the form has to be publicly accessible (any user should be able to fill out the form), I would have to store the details in a global database. I would have created an API that would turn a valid form builder's state into a unique string. The unique string will be the dynamic segment of the public URL (Example: `<APP_LINK>/published/[UNIQUE_STRING]`).
