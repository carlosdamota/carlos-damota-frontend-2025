# GameHouse Frontend Technical Test - Subscription Flow

## Project Overview

This project is a technical test submission for GameHouse's Frontend Engineer position. It implements a mobile-first, responsive subscription flow with four interactive steps:

1. **Connect Your Account** - Email input and validation
2. **Get Verified!** - Email verification code entry
3. **Choose Your Plan** - Monthly/Yearly subscription selection
4. **Congrats!** - Success confirmation page

## 🏗️ Architecture

The project is structured as a monorepo with separate frontend and backend applications:

### Frontend
- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5 with SWC for fast refresh
- **Styling**: Pure CSS (no frameworks) with CSS Modules
- **Package Manager**: PNPM with workspace configuration

### Backend
- **Runtime**: Node.js with vanilla HTTP server
- **API**: RESTful endpoints following the provided specification
- **Storage**: In-memory store for demonstration purposes

## 📁 Project Structure

```
carlos-damota-frontend-2025/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── steps/
│   │   │   └── Step1Email/      # Email input component (initial implementation)
│   │   ├── App.tsx              # Main application component with step navigation
│   │   ├── App.css              # Global styles
│   │   └── main.tsx             # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/                     # Node.js API server
│   ├── server.js                # Complete API implementation
│   └── package.json
├── package.json                 # Root workspace configuration
├── pnpm-workspace.yaml          # PNPM workspace setup
└── eslint.config.js             # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PNPM (v8 or higher)

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the backend server:**
   ```bash
   pnpm dev:backend
   ```
   The API server will run on `http://localhost:8080`

3. **Start the frontend development server:**
   ```bash
   pnpm dev:frontend
   ```
   The React application will run on `http://localhost:5173`

### Development Commands

- `pnpm dev:frontend` - Start frontend development server
- `pnpm dev:backend` - Start backend API server
- `pnpm lint` - Run ESLint for code quality
- `pnpm build` - Build frontend for production

## 🔧 Implementation Status

### ✅ Completed Features

#### Backend API
- **Email Validation Endpoint** (`GET /api/send-email`)
  - Email format validation
  - 6-digit code generation
  - 30-second cooldown mechanism
  - 5-minute code expiration

- **Code Verification Endpoint** (`POST /api/validate-email`)
  - Email and code validation
  - User ID generation upon success
  - Automatic code cleanup after validation

- **Products Endpoint** (`GET /api/products`)
  - Monthly plan: $9.99 USD, 3-day trial
  - Yearly plan: $87.99 USD, 7-day trial

- **Trial Start Endpoint** (`POST /api/start-trial`)
  - User ID validation
  - Trial activation simulation

#### Frontend Foundation
- **Project Setup**
  - React 19.1.0 with TypeScript
  - Vite configuration with SWC
  - ESLint with React-specific rules
  - Prettier for code formatting

- **Application Structure**
  - Step-based navigation system
  - Component architecture for modular development
  - TypeScript interfaces for type safety

### 🚧 In Progress

- **Step 1 Component**: Email input interface (basic structure created)
- **Responsive Design**: Mobile-first approach implementation
- **Step Navigation**: Flow between the four steps

### 📋 Planned Features

#### Core Requirements
- Complete UI implementation for all 4 steps
- Responsive design (portrait/landscape)
- API integration for all endpoints
- Form validation and error handling
- Smooth step transitions

#### Optional Enhancements
- Resend code countdown (30 seconds)
- Confetti animation on success
- Button ripple effects
- EUR currency support

## 🎨 Design Approach

### Mobile-First Responsive Design
- Primary focus on mobile portrait orientation
- Landscape mode adaptations
- CSS Grid/Flexbox for layout
- No external CSS frameworks (as per requirements)

### Code Quality Standards
- TypeScript for type safety
- ESLint with React hooks rules
- Prettier for consistent formatting
- Component-based architecture
- CSS Modules for scoped styling

## 🔌 API Integration

The frontend will integrate with the following backend endpoints:

```typescript
// Email validation
GET /api/send-email?email=user@example.com

// Code verification
POST /api/validate-email
{ "email": "user@example.com", "code": "123456" }

// Get subscription plans
GET /api/products

// Start trial
POST /api/start-trial
{ "user_id": 1234 }
```

## 🧪 Technical Decisions

### Frontend
- **React 19.1.0**: Latest stable version with improved performance
- **Vite + SWC**: Fast development and build times
- **CSS Modules**: Scoped styling without external frameworks
- **TypeScript**: Type safety and better developer experience

### Backend
- **Vanilla Node.js**: Lightweight implementation without external dependencies
- **In-memory storage**: Suitable for demo purposes
- **RESTful design**: Following provided API specification exactly

### Development Setup
- **PNPM Workspaces**: Efficient monorepo management
- **ESLint + Prettier**: Code quality and consistency
- **Separate dev servers**: Independent frontend/backend development

## 🎯 Next Steps

1. Complete Step 1 (Email) component implementation
2. Implement remaining steps (Verification, Plans, Success)
3. Add responsive CSS for all components
4. Integrate frontend with backend APIs
5. Implement error handling and validation
6. Add optional features (animations, countdown, etc.)
7. Final testing and polish

## 📝 Development Notes

This project follows GameHouse's technical test requirements:
- Mobile-first responsive design
- No CSS frameworks allowed
- Clean, performant code
- Proper error handling
- Self-contained and well-documented

The implementation prioritizes code quality, user experience, and maintainability while adhering to modern React development practices.
