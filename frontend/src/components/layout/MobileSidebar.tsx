import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Users, Building2, Briefcase, CalendarDays, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700 font-medium' 
        : 'text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/50" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Placement Cell</h1>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <NavLink to="/dashboard" className={navLinkClass} onClick={onClose}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/students" className={navLinkClass} onClick={onClose}>
            <Users size={20} />
            <span>Students</span>
          </NavLink>

          <NavLink to="/companies" className={navLinkClass} onClick={onClose}>
            <Building2 size={20} />
            <span>Companies</span>
          </NavLink>

          <NavLink to="/jobs" className={navLinkClass} onClick={onClose}>
            <Briefcase size={20} />
            <span>Job Openings</span>
          </NavLink>

          <NavLink to="/interviews" className={navLinkClass} onClick={onClose}>
            <CalendarDays size={20} />
            <span>Interviews</span>
          </NavLink>

          <NavLink to="/settings" className={navLinkClass} onClick={onClose}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;