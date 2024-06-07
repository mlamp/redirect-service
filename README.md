# Fastify Redirect Service

This is a simple redirect service built with Fastify, Prisma, and TypeScript. It supports registering subdomains and redirecting requests to the specified URLs.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mlamp/redirect-service
   cd redirect-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

The application uses environment variables to configure database connections. Create a `.env` file in the root of the project with the following content:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
API_KEY="your-secret-api-key"
```

### Database Setup

#### Local Development

1. Ensure your PostgreSQL server is running and accessible.
2. Generate the Prisma client and run migrations:
   ```bash
   npm run migrate:dev
   ```

#### Production

1. Ensure your PostgreSQL server is running and accessible.
2. Generate the Prisma client and run migrations:
   ```bash
   npm run migrate:prod
   ```

### Running the Application

#### Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

#### Production

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

### API Endpoints

#### Register Domain

- **URL**: `/v1/register-domain`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer YOUR_API_KEY`
- **Request Body**:
  ```json
  {
    "subdomain": "example",
    "url": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

#### Redirect

- **URL**: `http://example.whale.tg`
- **Method**: `GET`
- **Response**: Redirects to the URL registered for the subdomain.

### Swagger Documentation

Access the Swagger UI for API documentation at:

```
http://localhost:3000/documentation
```

### License

This project is licensed under the MIT License.
