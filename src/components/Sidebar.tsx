import React, { useState } from 'react';
import { 
  Calendar, 
  Heart, 
  Clock, 
  History, 
  Users, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  familyMembers: Array<{ id: string; name: string; image?: string }>;
  selectedMember: string;
  onSelectMember: (memberId: string) => void;
}

export function Sidebar({ 
  currentScreen, 
  onNavigate, 
  familyMembers,
  selectedMember,
  onSelectMember
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Calendar', icon: Calendar },
    { id: 'health', label: 'Health Logs', icon: Heart },
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'timeline', label: 'Timeline', icon: History },
  ];

  const NavContent = () => (
    <>
      {/* Logo/Header */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Relyo</h2>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="px-3 py-6 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Family Members Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="px-3 mb-3 flex items-center justify-between">
            <span className="text-gray-500 uppercase tracking-wide">Family</span>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectMember('all');
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                selectedMember === 'all'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <span>All Family</span>
            </button>
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  onSelectMember(member.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  selectedMember === member.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600">{member.name[0]}</span>
                  </div>
                )}
                <span className="flex-1 text-left truncate">{member.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="w-6 h-6 text-gray-900" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Slide-in */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <NavContent />
      </aside>

      {/* Sidebar - Desktop Fixed */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:w-72 bg-white border-r border-gray-100 z-20">
        <NavContent />
      </aside>
    </>
  );
}
