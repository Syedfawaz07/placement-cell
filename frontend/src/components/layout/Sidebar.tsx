import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, Briefcase, CalendarDays, 
  ChevronDown, ChevronRight, Settings, LogOut, GraduationCap 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isStudentMenuOpen, setIsStudentMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700 font-medium' 
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`;

  const menuItemClass = `flex items-center justify-between gap-3 px-4 py-3 rounded-md 
    transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2 px-2 py-4">
        <GraduationCap size={24} className="text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Placement Cell</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-1">
        <NavLink to="/dashboard" className={navLinkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        {/* Student Section */}
        <div>
          <div 
            className={menuItemClass}
            onClick={() => setIsStudentMenuOpen(!isStudentMenuOpen)}
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>Students</span>
            </div>
            {isStudentMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>

          {isStudentMenuOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/students" className={navLinkClass}>
                <span>All Students</span>
              </NavLink>
              <NavLink to="/students/placed" className={navLinkClass}>
                <span>Placed</span>
              </NavLink>
              <NavLink to="/students/not-placed" className={navLinkClass}>
                <span>Not Placed</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Company Section */}
        <div>
          <div 
            className={menuItemClass}
            onClick={() => setIsCompanyMenuOpen(!isCompanyMenuOpen)}
          >
            <div className="flex items-center gap-3">
              <Building2 size={20} />
              <span>Companies</span>
            </div>
            {isCompanyMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>

          {isCompanyMenuOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/companies" className={navLinkClass}>
                <span>All Companies</span>
              </NavLink>
              <NavLink to="/companies/add" className={navLinkClass}>
                <span>Add Company</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/jobs" className={navLinkClass}>
          <Briefcase size={20} />
          <span>Job Openings</span>
        </NavLink>

        <NavLink to="/interviews" className={navLinkClass}>
          <CalendarDays size={20} />
          <span>Interviews</span>
        </NavLink>

        <NavLink to="/settings" className={navLinkClass}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        <button 
          onClick={logout} 
          className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;