import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Calendar, DayDetail, CalendarEvent } from './Calendar';
import { Modal } from './Modal';
import { Button } from './Button';
import { Sidebar } from './Sidebar';

interface DashboardProps {
  familyMembers: Array<{ id: string; name: string; image?: string }>;
  events: CalendarEvent[];
  onNavigate: (screen: string) => void;
}

export function Dashboard({ familyMembers, events, onNavigate }: DashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState('all');
  const [showDayDetail, setShowDayDetail] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDayDetail(true);
  };

  const getSelectedMemberName = () => {
    if (selectedMember === 'all') return 'All Family';
    return familyMembers.find(m => m.id === selectedMember)?.name || 'All Family';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        currentScreen="dashboard"
        onNavigate={onNavigate}
        familyMembers={familyMembers}
        selectedMember={selectedMember}
        onSelectMember={setSelectedMember}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 mt-16 lg:mt-0">
            <div>
              <h1 className="mb-1 sm:mb-2 text-gray-900">Calendar</h1>
              <p className="text-gray-600">Viewing: {getSelectedMemberName()}</p>
            </div>
            <Button onClick={() => {}} variant="primary" className="w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Quick Add
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
            <Calendar
              events={events}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onMonthChange={setCurrentMonth}
            />
          </div>
        </div>
      </main>

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