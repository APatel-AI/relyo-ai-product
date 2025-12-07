import React, { useState } from 'react';
import { Heart, Calendar, Bell, MessageSquare, Filter } from 'lucide-react';
import { Chip } from './Chip';
import { EmptyState } from './EmptyState';

interface TimelineEntry {
  id: string;
  date: Date;
  time: string;
  type: 'health' | 'appointment' | 'reminder' | 'script';
  title: string;
  description: string;
  familyMember: string;
}

interface TimelineProps {
  familyMembers: Array<{ id: string; name: string }>;
  onBack: () => void;
}

export function Timeline({ familyMembers, onBack }: TimelineProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const [entries] = useState<TimelineEntry[]>([
    {
      id: '1',
      date: new Date(2025, 11, 5),
      time: '10:30 AM',
      type: 'health',
      title: 'Fever reported',
      description: 'Temperature: 101.2°F. Started in the morning. Gave acetaminophen.',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '2',
      date: new Date(2025, 11, 5),
      time: '11:00 AM',
      type: 'script',
      title: 'Doctor call script saved',
      description: 'Script for calling pediatrician about fever symptoms',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '3',
      date: new Date(2025, 11, 4),
      time: '8:00 PM',
      type: 'reminder',
      title: 'Medication reminder',
      description: 'Amoxicillin 500mg taken - Day 3 of 10',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '4',
      date: new Date(2025, 11, 3),
      time: '2:30 PM',
      type: 'appointment',
      title: 'Completed: Dr. Smith - Follow-up',
      description: 'Discussed recovery progress. All looking good. Next checkup in 3 months.',
      familyMember: familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '5',
      date: new Date(2025, 11, 3),
      time: '2:15 PM',
      type: 'health',
      title: 'Allergic reaction',
      description: 'Mild rash on arms after trying new soap. Applied hydrocortisone cream.',
      familyMember: familyMembers[1]?.name || familyMembers[0]?.name || 'Family Member'
    },
    {
      id: '6',
      date: new Date(2025, 11, 2),
      time: '9:00 AM',
      type: 'reminder',
      title: 'School permission form due',
      description: 'Signed and submitted field trip permission form',
      familyMember: familyMembers[0]?.name || 'Family Member'
    }
  ]);

  const filteredEntries = entries.filter(entry => {
    const memberMatch = selectedFilter === 'all' || entry.familyMember === selectedFilter;
    const typeMatch = selectedType === 'all' || entry.type === selectedType;
    return memberMatch && typeMatch;
  });

  const groupedByDate = filteredEntries.reduce((groups, entry) => {
    const dateKey = entry.date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(entry);
    return groups;
  }, {} as Record<string, TimelineEntry[]>);

  const getIcon = (type: string) => {
    switch (type) {
      case 'health': return Heart;
      case 'appointment': return Calendar;
      case 'reminder': return Bell;
      case 'script': return MessageSquare;
      default: return Heart;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'health': return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'appointment': return 'bg-yellow-50 text-yellow-900 border-yellow-200';
      case 'reminder': return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'script': return 'bg-green-50 text-green-900 border-green-200';
      default: return 'bg-gray-50 text-gray-900 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="mb-2 text-gray-900">Timeline</h1>
            <p className="text-gray-600">Complete history of all activities</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Family Member</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Chip
                label="All"
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
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Type</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Chip
                label="All"
                active={selectedType === 'all'}
                onClick={() => setSelectedType('all')}
              />
              <Chip
                label="Health"
                active={selectedType === 'health'}
                onClick={() => setSelectedType('health')}
                variant="health"
              />
              <Chip
                label="Appointments"
                active={selectedType === 'appointment'}
                onClick={() => setSelectedType('appointment')}
                variant="appointment"
              />
              <Chip
                label="Reminders"
                active={selectedType === 'reminder'}
                onClick={() => setSelectedType('reminder')}
                variant="reminder"
              />
              <Chip
                label="AI Scripts"
                active={selectedType === 'script'}
                onClick={() => setSelectedType('script')}
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        {filteredEntries.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No timeline entries"
            description="Your activity history will appear here"
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByDate).map(([date, dateEntries]) => (
              <div key={date}>
                <div className="sticky top-0 bg-gray-50 py-2 mb-4 z-10">
                  <h3 className="text-gray-900">{date}</h3>
                </div>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                  <div className="space-y-6">
                    {dateEntries.map((entry, index) => {
                      const Icon = getIcon(entry.type);
                      const color = getColor(entry.type);
                      return (
                        <div key={entry.id} className="relative flex gap-6">
                          {/* Timeline dot */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full ${color} border-2 flex items-center justify-center z-10`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Content card */}
                          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all -mt-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <h3 className="text-gray-900 mb-1">{entry.title}</h3>
                                <div className="flex items-center gap-2 text-gray-500">
                                  <span>{entry.time}</span>
                                  <span className="text-gray-300">•</span>
                                  <span>{entry.familyMember}</span>
                                </div>
                              </div>
                              <Chip
                                label={entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                                variant={
                                  entry.type === 'health' ? 'health' :
                                  entry.type === 'appointment' ? 'appointment' :
                                  entry.type === 'reminder' ? 'reminder' : 'default'
                                }
                              />
                            </div>
                            <p className="text-gray-600">{entry.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
