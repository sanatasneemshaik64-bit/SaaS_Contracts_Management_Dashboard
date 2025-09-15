import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart3, FileBarChart, Settings, Construction } from 'lucide-react';

const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/insights':
        return {
          title: 'Insights',
          description: 'AI-powered contract analytics and insights',
          icon: BarChart3,
          color: 'from-purple-600 to-indigo-600'
        };
      case '/reports':
        return {
          title: 'Reports',
          description: 'Comprehensive contract reporting and analytics',
          icon: FileBarChart,
          color: 'from-green-600 to-teal-600'
        };
      case '/settings':
        return {
          title: 'Settings',
          description: 'Configure your contract management preferences',
          icon: Settings,
          color: 'from-gray-600 to-slate-600'
        };
      default:
        return {
          title: 'Coming Soon',
          description: 'This feature is under development',
          icon: Construction,
          color: 'from-orange-600 to-red-600'
        };
    }
  };

  const { title, description, icon: Icon, color } = getPageInfo();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md">
        <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            This page is part of the demo and will be available in the full version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;