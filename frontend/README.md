# Placement Cell Frontend

This is the frontend for the Placement Cell Management System, designed to work with the [backend API](https://github.com/Syedfawaz07/placement-cell).

## Features

- Student management dashboard
- Company management with job posting capabilities
- Interview scheduling and tracking system
- Admin dashboard with analytics and reporting
- Authentication system with role-based access
- Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Chart.js for data visualization
- React Hot Toast for notifications

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v14 or later)
- npm or yarn package manager

### Setup Instructions

1. Clone the repositories:

```bash
# Clone frontend repository
git clone https://github.com/your-username/placement-cell-frontend.git

# Clone backend repository
git clone https://github.com/Syedfawaz07/placement-cell.git
```

2. Set up the backend:

```bash
cd placement-cell
npm install
# Create a .env file with database configuration
npm run dev
```

3. Set up the frontend:

```bash
cd placement-cell-frontend
npm install
```

4. Create a `.env` file in the frontend root and add:

```
VITE_API_URL=http://localhost:3000/api
```

5. Start the frontend development server:

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Connecting to the Backend

The frontend is configured to communicate with the backend API. Make sure the backend server is running on `http://localhost:3000` or update the `VITE_API_URL` in your `.env` file to match your backend URL.

## Deployment

To build the frontend for production:

```bash
npm run build
```

This will create a `dist` folder with optimized production build that can be deployed to any static hosting service.

## License

MIT