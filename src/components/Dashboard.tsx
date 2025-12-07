import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Calendar, DayDetail, CalendarEvent } from './Calendar';
import { Modal } from './Modal';
import { Button } from './Button';
import { Chip } from './Chip';

interface DashboardProps {
  familyMembers: Array<{ id: string; name: string }>;
  events: CalendarEvent[];
  onNavigate: (screen: string) => void;
}

export function Dashboard({ familyMembers, events, onNavigate }: DashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]?.id || 'all');
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDayDetail(true);
  };

  const getSelectedMemberName = () => {
    if (selectedMember === 'all') return 'All Family';
    return familyMembers.find(m => m.id === selectedMember)?.name || 'All Family';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="mb-2 text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Manage your family&apos;s responsibilities</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Family Member Selector */}
            <div className="relative">
              <button
                onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
              >
                <span className="text-gray-900">{getSelectedMemberName()}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showMemberDropdown && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  <button
                    onClick={() => {
                      setSelectedMember('all');
                      setShowMemberDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-xl ${
                      selectedMember === 'all' ? 'bg-gray-50' : ''
                    }`}
                  >
                    All Family
                  </button>
                  {familyMembers.map(member => (
                    <button
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(member.id);
                        setShowMemberDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors last:rounded-b-xl ${
                        selectedMember === member.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      {member.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Add Button */}
            <Button onClick={() => {}} variant="primary">
              <Plus className="w-4 h-4" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Upcoming Appointments"
            value="3"
            color="bg-yellow-50"
            textColor="text-yellow-900"
          />
          <StatCard
            label="Health Logs This Week"
            value="7"
            color="bg-blue-50"
            textColor="text-blue-900"
          />
          <StatCard
            label="Pending Reminders"
            value="2"
            color="bg-purple-50"
            textColor="text-purple-900"
          />
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={setCurrentMonth}
          />
        </div>

        {/* Quick Access */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAccessCard
            title="Health Logs"
            description="View all health events"
            color="bg-blue-50"
            onClick={() => onNavigate('health')}
          />
          <QuickAccessCard
            title="Appointments"
            description="Manage upcoming visits"
            color="bg-yellow-50"
            onClick={() => onNavigate('appointments')}
          />
          <QuickAccessCard
            title="Timeline"
            description="View complete history"
            color="bg-purple-50"
            onClick={() => onNavigate('timeline')}
          />
          <QuickAccessCard
            title="Family"
            description="Manage family members"
            color="bg-gray-50"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Day Detail Modal */}
      <Modal
        isOpen={showDayDetail}
        onClose={() => setShowDayDetail(false)}
        size="lg"
      >
        <DayDetail
          date={selectedDate}
          events={events}
          onClose={() => setShowDayDetail(false)}
          onAddEvent={() => {}}
        />
      </Modal>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  color, 
  textColor 
}: { 
  label: string; 
  value: string; 
  color: string;
  textColor: string;
}) {
  return (
    <div className={`${color} rounded-2xl p-6 border border-gray-100`}>
      <div className={`${textColor} mb-1`}>{value}</div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

function QuickAccessCard({ 
  title, 
  description, 
  color, 
  onClick 
}: { 
  title: string; 
  description: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-2xl p-6 border border-gray-100 text-left hover:shadow-md transition-all`}
    >
      <h3 className="mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}
