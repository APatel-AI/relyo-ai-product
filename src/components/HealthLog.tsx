import React, { useState } from 'react';
import { Plus, Filter, Heart, Thermometer, Pill, Activity } from 'lucide-react';
import { Button } from './Button';
import { Input, Textarea } from './Input';
import { Modal } from './Modal';
import { Chip } from './Chip';
import { EmptyState } from './EmptyState';
import { Sidebar } from './Sidebar';

interface HealthEvent {
  id: string;
  date: Date;
  time: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  familyMember: string;
}

interface HealthLogProps {
  familyMembers: Array<{ id: string; name: string; image?: string }>;
  onBack: () => void;
}

export function HealthLog({ familyMembers, onBack }: HealthLogProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState('all');
  const [healthEvents, setHealthEvents] = useState<HealthEvent[]>([
    {
      id: '1',
      date: new Date(2025, 11, 5),
      time: '10:30 AM',
      title: 'Fever reported',
      description: 'Temperature: 101.2°F. Started in the morning. Gave acetaminophen.',
      severity: 'medium',
      category: 'Symptom',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '2',
      date: new Date(2025, 11, 4),
      time: '8:00 PM',
      title: 'Medication taken',
      description: 'Amoxicillin 500mg - Day 3 of 10',
      severity: 'low',
      category: 'Medication',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '3',
      date: new Date(2025, 11, 3),
      time: '2:15 PM',
      title: 'Allergic reaction',
      description: 'Mild rash on arms after trying new soap. Applied hydrocortisone cream.',
      severity: 'low',
      category: 'Symptom',
      familyMember: familyMembers[1]?.name || familyMembers[0]?.name || 'Family Member'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    severity: 'low' as 'low' | 'medium' | 'high',
    category: 'Symptom',
    familyMember: familyMembers[0]?.id || ''
  });

  const handleAddEvent = () => {
    const event: HealthEvent = {
      id: Date.now().toString(),
      date: new Date(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      title: newEvent.title,
      description: newEvent.description,
      severity: newEvent.severity,
      category: newEvent.category,
      familyMember: familyMembers.find(m => m.id === newEvent.familyMember)?.name || ''
    };
    setHealthEvents([event, ...healthEvents]);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      description: '',
      severity: 'low',
      category: 'Symptom',
      familyMember: familyMembers[0]?.id || ''
    });
  };

  const filteredEvents = selectedFilter === 'all' 
    ? healthEvents 
    : healthEvents.filter(e => e.familyMember === selectedFilter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 text-red-900 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-900 border-yellow-200';
      default: return 'bg-green-50 text-green-900 border-green-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Medication': return Pill;
      case 'Symptom': return Thermometer;
      case 'Activity': return Activity;
      default: return Heart;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        currentScreen="health"
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
              <h1 className="mb-1 sm:mb-2 text-gray-900">Health Event Log</h1>
              <p className="text-gray-600">Track symptoms, medications, and health observations</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} variant="primary" className="w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <Chip
              label="All Family"
              active={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
            />
            {familyMembers.map(member => (
              <Chip
                key={member.id}
                label={member.name}
                active={selectedFilter === member.name}
                onClick={() => setSelectedFilter(member.name)}
              />
            ))}
          </div>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No health events yet"
              description="Start tracking symptoms, medications, and health observations"
              actionLabel="Add First Event"
              onAction={() => setShowAddModal(true)}
            />
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const CategoryIcon = getCategoryIcon(event.category);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="w-6 h-6 text-blue-900" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-gray-900 mb-1">{event.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-gray-500">
                                {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="text-gray-500">{event.familyMember}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Chip
                              label={event.category}
                              variant="health"
                            />
                            <Chip
                              label={event.severity}
                              variant={
                                event.severity === 'high' ? 'reminder' :
                                event.severity === 'medium' ? 'appointment' : 'health'
                              }
                            />
                          </div>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add Event Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Health Event"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Family Member</label>
            <select
              value={newEvent.familyMember}
              onChange={(e) => setNewEvent({ ...newEvent, familyMember: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-10 focus:border-gray-300 transition-all"
            >
              {familyMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Category</label>
            <div className="flex gap-2">
              {['Symptom', 'Medication', 'Activity', 'Other'].map(category => (
                <Chip
                  key={category}
                  label={category}
                  active={newEvent.category === category}
                  onClick={() => setNewEvent({ ...newEvent, category })}
                />
              ))}
            </div>
          </div>

          <Input
            label="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="e.g., Fever, Medication taken"
          />

          <Textarea
            label="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Add details about symptoms, measurements, medications, etc."
            rows={4}
          />

          <div>
            <label className="block mb-2 text-gray-700">Severity</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map(severity => (
                <Chip
                  key={severity}
                  label={severity.charAt(0).toUpperCase() + severity.slice(1)}
                  active={newEvent.severity === severity}
                  onClick={() => setNewEvent({ ...newEvent, severity })}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setShowAddModal(false)} variant="ghost" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleAddEvent} 
              variant="primary" 
              className="flex-1"
              disabled={!newEvent.title || !newEvent.description}
            >
              Add Event
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}