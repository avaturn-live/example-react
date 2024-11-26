# Avaturn Live Web SDK Example with React

This repository contains an example of using [@avaturn-live/web-sdk](https://www.npmjs.com/package/@avaturn-live/web-sdk) with React.

## Description

The project demonstrates the integration of the Avaturn Live Web SDK in a React application using Next.js. You can use this example as a starting point for working with the SDK and creating interactive applications with avatars.

## Requirements

- Node.js version 14.x or higher
- A package manager (npm, yarn, or pnpm)
- Avaturn Live Web SDK token (refer to the [dashboard](https://dashboard.avaturn.live/token) for obtaining a token)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/avaturn-live/example-react.git
   cd example-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or use another package manager:

   ```bash
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the project root and add the following environment variable:
   ```env
   NEXT_PUBLIC_AVATURN_LIVE_TOKEN=your_aveturn_live_token
   ```
   Replace `your_aveturn_live_token` with your token obtained via the Avaturn Live dashboard.

## Running the Application

Start the development server:

```bash
npm run dev
```

Or use the equivalent command for your package manager:

```bash
yarn dev
# or
pnpm dev
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

## Useful Links

- [Avaturn Live Web SDK Documentation](https://docs.avaturn.live)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

## License

This project is provided under the [MIT License](LICENSE).
