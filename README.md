# Next.js TypeScript Laravel Breeze Boilerplate

This project is a boilerplate for creating web applications using Next.js 14+ with TypeScript on the frontend and Laravel 11 Breeze on the backend. It provides a solid foundation for building modern, full-stack web applications with a robust authentication system.

## Features

- Next.js 14+ with App Router for the frontend
- TypeScript for type-safe code
- Laravel 11 Breeze for backend authentication
- Tailwind CSS for styling
- Headless UI for accessible UI components
- SWR for data fetching and caching
- Axios for API requests

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16+)
- npm or Yarn
- PHP (v8.1+)
- Composer
- Laravel (v11+)

## Getting Started

To get this project up and running, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/franio1999PL/nextjs-breeze-typescript.git
   cd nextjs-breeze-typescript
   ```

2. Install frontend dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up the Laravel backend:
   - Follow the Laravel Breeze installation instructions in a separate repository
   - Configure your `.env` file with the necessary database and API settings

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app directory containing routes and components
- `/components` - Reusable React components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and configurations
- `/public` - Static files

## Authentication

This boilerplate uses Laravel Breeze for authentication. The `useAuth` hook in `/hooks/auth.ts` provides methods for login, registration, and other auth-related functions.

## Customization

Feel free to modify the components and functionality to fit your project needs. The boilerplate is designed to be a starting point, not a constraint.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/your-username/your-repo-name/issues) if you want to contribute.

## License

This project is released under the Unlicense. This means you can use, modify, distribute, and do whatever you want with this code without any restrictions. For more details, see the [UNLICENSE](UNLICENSE) file in this repository.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Laravel](https://laravel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [SWR](https://swr.vercel.app/)