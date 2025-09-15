import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, BarChart3, FileBarChart, Settings, Upload } from 'lucide-react';

interface SidebarProps {
  onUploadClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onUploadClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'contracts', label: 'Contracts', icon: FileText, path: '/dashboard' },
    { id: 'insights', label: 'Insights', icon: BarChart3, path: '/insights' },
    { id: 'reports', label: 'Reports', icon: FileBarChart, path: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">ContractHub</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <button
          onClick={onUploadClick}
          className="w-full mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Contract
        </button>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          ContractHub v1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;