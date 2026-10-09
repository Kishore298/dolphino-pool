import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between md:hidden z-10">
                    <img src="/logo.png" alt="Dolphino" className="h-8 object-contain" />
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-gray-100 rounded-md text-primary"
                    >
                        <FiMenu className="text-2xl" />
                    </button>
                </div>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
