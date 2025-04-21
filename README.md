# Chat AI Frontend

A modern, responsive frontend application for Chat AI, built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication and authorization
- Real-time chat interface
- System prompt management
- Responsive design
- Admin dashboard

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- React Query

## Project Structure

```
chat-ai-front/
├── src/                # Source code
│   ├── assets/         # Static assets
│   ├── components/     # React components
│   ├── backend/        # API integration
│   ├── lib/            # Third-party libraries
│   ├── store/          # Redux store
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Public assets
├── .env                # Environment variables
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Abula28/chat-ai-front
cd chat-ai-front
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_backend_api_url
```

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

| Variable     | Description     | Required |
| ------------ | --------------- | -------- |
| VITE_API_URL | Backend API URL | Yes      |

## Dependencies

### Main Dependencies

- react: ^19.0.0
- react-dom: ^19.0.0
- @tanstack/react-query: ^5.74.3
- axios: ^1.8.4
- date-fns: ^4.1.0
- framer-motion: ^12.7.3
- react-icons: ^5.5.0
- react-markdown: ^10.1.0
- react-router: ^7.4.1
- react-toastify: ^11.0.5
- zustand: ^5.0.3

### Development Dependencies

- typescript: ~5.7.2
- @types/react: ^19.0.10
- @types/react-dom: ^19.0.4
- vite: ^6.2.0
- @vitejs/plugin-react: ^4.3.4
- tailwindcss: ^3.4.1
- postcss: ^8.4.35
- autoprefixer: ^10.4.17
- eslint: ^9.21.0
- @eslint/js: ^9.21.0
- eslint-plugin-react-hooks: ^5.1.0
- eslint-plugin-react-refresh: ^0.4.19
- prettier: ^3.5.3
- prettier-plugin-tailwindcss: ^0.6.11
- @tanstack/eslint-plugin-query: ^5.73.3
- typescript-eslint: ^8.24.1
- globals: ^15.15.0

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
