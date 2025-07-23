# Playable Factory Admin Panel

Modern and user-friendly e-commerce management panel. This admin panel is designed to manage categories, users, vendors, and campaigns.

## 🚀 Features

### 📊 Dashboard
- System health and performance metrics
- Recent activities and statistics
- KPI cards and charts

### 👥 User Management
- User list viewing and filtering
- User details and profile management
- User status (active/inactive) control
- Role-based authorization (admin, vendor, customer, moderator)

### 🏪 Vendor Management
- Vendor list and details
- Vendor approval processes
- Vendor performance tracking
- Vendor account status management

### 📂 Category Management
- Category creation and editing
- Category hierarchy
- Category status control
- Bulk category operations

### 📢 Campaign Management
- Campaign creation and editing
- Campaign status tracking
- Campaign performance analysis
- Campaign filtering and search

### 🔐 Security and Authentication
- JWT-based authentication
- Password visibility control
- Session management
- Secure API communication

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.4.2** - React framework
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

### State Management
- **Redux Toolkit** - State management
- **React Redux** - React-Redux integration

### Form and Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form resolver

### HTTP Client
- **Axios** - HTTP requests

### UI/UX
- **Sonner** - Toast notifications
- **NProgress** - Loading indicators
- **Next Themes** - Theme support

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript linting

## 📋 Requirements

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

### 1. Clone the Project
```bash
git clone <repository-url>
cd playable_factory_admin
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key
NEXT_PUBLIC_REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Application
NEXT_PUBLIC_APP_NAME=Playable Factory Admin
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development
NODE_ENV=development
```

### 4. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

The application will run at `http://localhost:3000`.

## 👤 Demo Credentials

### Admin User
```
Email: admin@playablefactory.com
Password: admin123
```

### Test User
```
Email: test@playablefactory.com
Password: test123
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Performs user login.

**Request:**
```json
{
  "email": "admin@playablefactory.com",
  "password": "admin123",
  "rememberMe": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "admin@playablefactory.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "isActive": true
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST /api/auth/register
New user registration.

#### POST /api/auth/forgot-password
Sends password reset email.

#### POST /api/auth/reset-password
Password reset process.

### User Management Endpoints

#### GET /api/admin/users
Gets user list.

**Query Parameters:**
- `page`: Page number
- `limit`: Records per page
- `search`: Search term
- `role`: User role
- `isActive`: Active status

#### GET /api/admin/users/:id
Gets user details.

#### PUT /api/admin/users/:id
Updates user information.

#### DELETE /api/admin/users/:id
Deletes user.

### Vendor Management Endpoints

#### GET /api/admin/vendors
Gets vendor list.

#### GET /api/admin/vendors/:id
Gets vendor details.

#### PUT /api/admin/vendors/:id
Updates vendor information.

#### DELETE /api/admin/vendors/:id
Deletes vendor.

### Category Management Endpoints

#### GET /api/admin/categories
Gets category list.

#### POST /api/admin/categories
Creates new category.

#### PUT /api/admin/categories/:id
Updates category information.

#### DELETE /api/admin/categories/:id
Deletes category.

### Campaign Management Endpoints

#### GET /api/admin/campaigns
Gets campaign list.

#### POST /api/admin/campaigns
Creates new campaign.

#### PUT /api/admin/campaigns/:id
Updates campaign information.

#### DELETE /api/admin/campaigns/:id
Deletes campaign.

### Dashboard Endpoints

#### GET /api/admin/dashboard
Gets dashboard statistics.

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

### Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Docker Compose**
```yaml
version: '3.8'
services:
  admin-panel:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_BASE_URL=${API_BASE_URL}
```

## 🧪 Testing

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
npm run format:check
```

### Build Test
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── campaigns/         # Campaign management
│   ├── categories/        # Category management
│   ├── users/            # User management
│   └── vendors/          # Vendor management
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── campaigns/        # Campaign components
│   ├── categories/       # Category components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   ├── sidebar/          # Sidebar components
│   ├── ui/               # UI components
│   ├── users/            # User components
│   └── vendors/          # Vendor components
├── features/             # Redux slices
├── hooks/                # Custom React hooks
├── lib/                  # Helper libraries
├── services/             # API services
├── store/                # Redux store
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: admin@playablefactory.com
- **Website**: https://playablefactory.com
- **Documentation**: https://docs.playablefactory.com

---

**Note**: This admin panel should only be used by authorized users. Do not ignore security measures and perform regular security updates. 