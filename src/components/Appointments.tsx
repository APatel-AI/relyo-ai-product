import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { Button } from './Button';
import { Input, Textarea } from './Input';
import { Modal } from './Modal';
import { Chip } from './Chip';
import { EmptyState } from './EmptyState';
import { Sidebar } from './Sidebar';

interface Appointment {
  id: string;
  date: Date;
  time: string;
  title: string;
  category: string;
  location: string;
  notes: string;
  familyMember: string;
}

interface AppointmentsProps {
  familyMembers: Array<{ id: string; name: string; image?: string }>;
  onBack: () => void;
}

export function Appointments({ familyMembers, onBack }: AppointmentsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState('all');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: new Date(2025, 11, 10),
      time: '2:30 PM',
      title: 'Dr. Smith - Annual Checkup',
      category: 'Doctor',
      location: 'Main Street Clinic',
      notes: 'Bring vaccination records',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '2',
      date: new Date(2025, 11, 15),
      time: '10:00 AM',
      title: 'Dental Cleaning',
      category: 'Dentist',
      location: 'Bright Smiles Dental',
      notes: 'Regular 6-month cleaning',
      familyMember: familyMembers[1]?.name || familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '3',
      date: new Date(2025, 11, 20),
      time: '3:00 PM',
      title: 'Parent-Teacher Conference',
      category: 'School',
      location: 'Lincoln Elementary',
      notes: 'Discuss progress in math',
      familyMember: familyMembers[0]?.name || 'Family Member'
    }
  ]);

  const [newAppt, setNewAppt] = useState({
    title: '',
    date: '',
    time: '',
    category: 'Doctor',
    location: '',
    notes: '',
    familyMember: familyMembers[0]?.id || ''
  });

  const handleAddAppointment = () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      date: new Date(newAppt.date),
      time: newAppt.time,
      title: newAppt.title,
      category: newAppt.category,
      location: newAppt.location,
      notes: newAppt.notes,
      familyMember: familyMembers.find(m => m.id === newAppt.familyMember)?.name || ''
    };
    setAppointments([...appointments, appointment].sort((a, b) => a.date.getTime() - b.date.getTime()));
    setShowAddModal(false);
    setNewAppt({
      title: '',
      date: '',
      time: '',
      category: 'Doctor',
      location: '',
      notes: '',
      familyMember: familyMembers[0]?.id || ''
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Doctor': return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Dentist': return 'bg-green-50 text-green-900 border-green-200';
      case 'School': return 'bg-purple-50 text-purple-900 border-purple-200';
      default: return 'bg-yellow-50 text-yellow-900 border-yellow-200';
    }
  };

  const upcomingAppointments = appointments.filter(a => a.date >= new Date());
  const pastAppointments = appointments.filter(a => a.date < new Date());

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        currentScreen="appointments"
        onNavigate={onBack}
        familyMembers={familyMembers}
        selectedMember={selectedMember}
        onSelectMember={setSelectedMember}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 mt-16 lg:mt-0">
            <div>
              <h1 className="mb-1 sm:mb-2 text-gray-900">Appointments</h1>
              <p className="text-gray-600">Manage upcoming visits and meetings</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} variant="primary" className="w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Appointment
            </Button>
          </div>

          {/* Mini Calendar Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">This Month</h2>
              <span className="text-gray-500">{upcomingAppointments.length} upcoming</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {upcomingAppointments.slice(0, 5).map(apt => (
                <div
                  key={apt.id}
                  className="flex-shrink-0 w-32 bg-gray-50 rounded-xl p-3"
                >
                  <div className="text-gray-900 mb-1">
                    {apt.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-gray-600 truncate">{apt.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="mb-4 text-gray-900">Upcoming</h2>
            {upcomingAppointments.length === 0 ? (
              <EmptyState
                icon={CalendarIcon}
                title="No upcoming appointments"
                description="Schedule your next appointment to stay organized"
                actionLabel="Add Appointment"
                onAction={() => setShowAddModal(true)}
              />
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h2 className="mb-4 text-gray-900">Past</h2>
              <div className="space-y-4 opacity-60">
                {pastAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Appointment"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Family Member</label>
            <select
              value={newAppt.familyMember}
              onChange={(e) => setNewAppt({ ...newAppt, familyMember: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-10 focus:border-gray-300 transition-all"
            >
              {familyMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Title"
            value={newAppt.title}
            onChange={(e) => setNewAppt({ ...newAppt, title: e.target.value })}
            placeholder="e.g., Dr. Smith - Annual Checkup"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={newAppt.date}
              onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
            />
            <Input
              label="Time"
              type="time"
              value={newAppt.time}
              onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Category</label>
            <div className="flex gap-2 flex-wrap">
              {['Doctor', 'Dentist', 'School', 'Therapy', 'Other'].map(category => (
                <Chip
                  key={category}
                  label={category}
                  active={newAppt.category === category}
                  onClick={() => setNewAppt({ ...newAppt, category })}
                />
              ))}
            </div>
          </div>

          <Input
            label="Location"
            value={newAppt.location}
            onChange={(e) => setNewAppt({ ...newAppt, location: e.target.value })}
            placeholder="e.g., Main Street Clinic"
          />

          <Textarea
            label="Notes"
            value={newAppt.notes}
            onChange={(e) => setNewAppt({ ...newAppt, notes: e.target.value })}
            placeholder="Add any important details or reminders"
            rows={3}
          />

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setShowAddModal(false)} variant="ghost" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleAddAppointment} 
              variant="primary" 
              className="flex-1"
              disabled={!newAppt.title || !newAppt.date || !newAppt.time}
            >
              Add Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function AppointmentCard({ 
  appointment, 
  getCategoryColor 
}: { 
  appointment: Appointment; 
  getCategoryColor: (category: string) => string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="w-16 flex-shrink-0">
          <div className="text-center">
            <div className="text-gray-500 mb-1">
              {appointment.date.toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div className="text-gray-900">
              {appointment.date.getDate()}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-gray-900 mb-1">{appointment.title}</h3>
              <div className="flex items-center gap-2 flex-wrap text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
                <span className="text-gray-300">•</span>
                <span>{appointment.familyMember}</span>
              </div>
            </div>
            <Chip
              label={appointment.category}
              variant="appointment"
            />
          </div>
          <div className="flex items-start gap-2 text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{appointment.location}</span>
          </div>
          {appointment.notes && (
            <p className="text-gray-600 bg-gray-50 rounded-lg p-3 mt-3">
              {appointment.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}