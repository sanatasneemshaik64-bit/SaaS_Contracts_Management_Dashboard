import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import UploadModal from './UploadModal';

const Dashboard: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar onUploadClick={() => setShowUploadModal(true)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet context={{ onUploadClick: () => setShowUploadModal(true) }} />
          </div>
        </main>
      </div>

      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
};

export default Dashboard;