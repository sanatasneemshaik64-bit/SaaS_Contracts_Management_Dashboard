# SaaS Contracts Dashboard

A modern, responsive React application for managing and analyzing contract data with AI-powered insights.

## 🚀 Features

- **Authentication**: Mock login system (use any username with password `test123`)
- **Dashboard**: Clean, modern interface with sidebar navigation
- **Contracts Management**: View, search, filter, and paginate contract data
- **Contract Details**: Detailed view with clauses, AI insights, and evidence
- **File Upload**: Drag & drop file upload simulation with progress tracking
- **Responsive Design**: Optimized for desktop and mobile devices
- **State Management**: Context API for global state management
- **Error Handling**: Comprehensive error states and loading indicators

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel/Netlify

## 📋 Requirements Met

### ✅ Mandatory Tech Stack
- React functional components with hooks only
- Tailwind CSS (no Bootstrap or inline CSS)
- Context API for state management
- Responsive design

### ✅ Screens Implemented
1. **Login Page**: Username/password with mock authentication
2. **Contracts Dashboard**: Table with search, filters, pagination
3. **Contract Detail Page**: Metadata, clauses, AI insights, evidence panel
4. **Upload Modal**: Drag & drop with simulated upload progress

### ✅ Features Implemented
- Mock API consumption with proper error handling
- Loading, empty, and error states
- Search by contract name or parties
- Filters for status (Active, Expired, Renewal Due) and risk levels
- Pagination (10 items per page)
- Smooth navigation and transitions
- Mobile-responsive design

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

### Demo Login
- **Username**: Any username (e.g., "admin", "demo", "test")
- **Password**: `test123`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ContractDetail.tsx
│   ├── ContractsTable.tsx
│   ├── Dashboard.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── LoadingSpinner.tsx
│   ├── LoginPage.tsx
│   ├── PlaceholderPage.tsx
│   ├── ProtectedRoute.tsx
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── UploadModal.tsx
├── contexts/            # React Context providers
│   ├── AuthContext.tsx
│   └── ContractsContext.tsx
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles

public/
├── contracts.json      # Mock contracts data
└── contract-details.json # Mock contract details data
```

## 💾 Mock API Data

The application uses static JSON files to simulate API responses:

- `public/contracts.json`: List of contracts with basic information
- `public/contract-details.json`: Detailed contract information including clauses, insights, and evidence

## 🎨 Design Decisions

### UI/UX Choices
- **Modern Gradient Design**: Used gradients for primary actions and branding
- **Card-Based Layout**: Clean card components for better content organization
- **Consistent Spacing**: 8px spacing system throughout the application
- **Color-Coded Status**: Visual indicators for contract status and risk levels
- **Progressive Disclosure**: Evidence panel with show/hide functionality

### Technical Decisions
- **Context API**: Chosen over Redux for simpler state management needs
- **File Organization**: Modular component structure for maintainability
- **TypeScript**: Full type safety for better development experience
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Error Boundaries**: Comprehensive error handling with user-friendly messages

### State Management
- **AuthContext**: Handles user authentication and session management
- **ContractsContext**: Manages contract data, filtering, search, and pagination
- **Local Storage**: Persists authentication state across browser sessions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (optimized layout for phones)
- **Tablet**: 768px - 1024px (adapted sidebar and table)
- **Desktop**: > 1024px (full-featured layout)

## 🔒 Authentication

Mock authentication system:
- Accepts any username
- Password must be exactly `test123`
- Stores mock JWT in localStorage
- Automatic redirect after successful login
- Protected routes with authentication checks

## ⚡ Performance Optimizations

- **Lazy Loading**: Components loaded on-demand
- **Memoization**: Optimized re-renders with React hooks
- **Virtual Scrolling**: Pagination for large datasets
- **Efficient State Updates**: Minimal re-renders through proper state structure

## 🧪 Testing Considerations

The application is structured for easy testing with:
- Separated business logic in custom hooks
- Mock data for reliable testing scenarios
- Clear component boundaries
- Testable utility functions

## 📈 Future Enhancements

- Real API integration
- Advanced filtering options
- Bulk operations
- Export functionality
- Real-time updates
- Advanced analytics dashboard
- User role management

## 🤝 Contributing

This is a demo application built for evaluation purposes. The code follows React best practices and is ready for production deployment.

---

**Demo**: [Live Demo Link](https://your-deployment-url.com)
**Repository**: [GitHub Repository](https://github.com/your-username/saas-contracts-dashboard)