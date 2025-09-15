import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContractsProvider } from './contexts/ContractsContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ContractsTable from './components/ContractsTable';
import ContractDetail from './components/ContractDetail';
import PlaceholderPage from './components/PlaceholderPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useOutletContext } from 'react-router-dom';

interface DashboardContextType {
  onUploadClick: () => void;
}

const ContractsTableWrapper: React.FC = () => {
  const { onUploadClick } = useOutletContext<DashboardContextType>();
  return <ContractsTable onUploadClick={onUploadClick} />;
};

function App() {
  return (
    <AuthProvider>
      <ContractsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<ContractsTableWrapper />} />
              <Route path="insights" element={<PlaceholderPage />} />
              <Route path="reports" element={<PlaceholderPage />} />
              <Route path="settings" element={<PlaceholderPage />} />
            </Route>
            <Route
              path="/contracts/:id"
              element={
                <ProtectedRoute>
                  <ContractDetail />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ContractsProvider>
    </AuthProvider>
  );
}

export default App;