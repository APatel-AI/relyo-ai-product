import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { HealthLog } from './components/HealthLog';
import { Appointments } from './components/Appointments';
import { Timeline } from './components/Timeline';
import { AIAssistant } from './components/AIAssistant';
import { CalendarEvent } from './components/Calendar';

type Screen = 'onboarding' | 'dashboard' | 'health' | 'appointments' | 'timeline';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  image?: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Mock family members
  const [familyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Emma', relation: 'Daughter', image: undefined },
    { id: '2', name: 'Lucas', relation: 'Son', image: undefined }
  ]);

  // Mock calendar events
  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      date: new Date(2025, 11, 6),
      type: 'health',
      title: 'Fever check',
      time: '10:30 AM'
    },
    {
      id: '2',
      date: new Date(2025, 11, 10),
      type: 'appointment',
      title: 'Dr. Smith',
      time: '2:30 PM'
    },
    {
      id: '3',
      date: new Date(2025, 11, 10),
      type: 'reminder',
      title: 'Medication',
      time: '8:00 PM'
    },
    {
      id: '4',
      date: new Date(2025, 11, 15),
      type: 'appointment',
      title: 'Dental cleaning',
      time: '10:00 AM'
    },
    {
      id: '5',
      date: new Date(2025, 11, 20),
      type: 'appointment',
      title: 'School meeting',
      time: '3:00 PM'
    },
    {
      id: '6',
      date: new Date(2025, 11, 8),
      type: 'health',
      title: 'Symptom log',
      time: '2:00 PM'
    },
    {
      id: '7',
      date: new Date(2025, 11, 12),
      type: 'reminder',
      title: 'Follow-up call',
      time: '11:00 AM'
    }
  ]);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleCompleteOnboarding} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          familyMembers={familyMembers}
          events={calendarEvents}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === 'health' && (
        <HealthLog
          familyMembers={familyMembers}
          onBack={() => handleNavigate('dashboard')}
        />
      )}

      {currentScreen === 'appointments' && (
        <Appointments
          familyMembers={familyMembers}
          onBack={() => handleNavigate('dashboard')}
        />
      )}

      {currentScreen === 'timeline' && (
        <Timeline
          familyMembers={familyMembers}
          onBack={() => handleNavigate('dashboard')}
        />
      )}

      {hasCompletedOnboarding && <AIAssistant />}
    </div>
  );
}

export default App;