import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Chip } from './Chip';

export interface CalendarEvent {
  id: string;
  date: Date;
  type: 'health' | 'appointment' | 'reminder';
  title: string;
  time?: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

export function Calendar({ events, selectedDate, onDateSelect, onMonthChange }: CalendarProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-gray-900">{monthName}</h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Day Headers */}
      <div className="hidden sm:grid grid-cols-7 gap-2 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Mobile Day Headers - Abbreviated */}
      <div className="grid sm:hidden grid-cols-7 gap-1 mb-3">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={`${day}-${idx}`} className="text-center py-2 text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Desktop Calendar Grid */}
      <div className="hidden sm:grid grid-cols-7 gap-2">
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const dayEvents = getEventsForDate(date);
          const hasMore = dayEvents.length > 2;

          return (
            <button
              key={day}
              onClick={() => onDateSelect(date)}
              className={`aspect-square p-2 rounded-xl border transition-all hover:shadow-md ${
                isSelected(date)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : isToday(date)
                  ? 'bg-gray-50 border-gray-900'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="h-full flex flex-col">
                <span className={`mb-1 ${isSelected(date) ? 'text-white' : 'text-gray-900'}`}>
                  {day}
                </span>
                <div className="flex-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs px-1.5 py-0.5 rounded truncate ${
                        isSelected(date) ? 'bg-white/20 text-white' : 
                        event.type === 'health' ? 'bg-blue-50 text-blue-900' :
                        event.type === 'appointment' ? 'bg-yellow-50 text-yellow-900' :
                        'bg-purple-50 text-purple-900'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {hasMore && (
                    <div className={`text-xs ${isSelected(date) ? 'text-white/70' : 'text-gray-500'}`}>
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Calendar Grid - Compact View */}
      <div className="grid sm:hidden grid-cols-7 gap-1">
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={day}
              onClick={() => onDateSelect(date)}
              className={`aspect-square p-1 rounded-lg border transition-all relative ${
                isSelected(date)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : isToday(date)
                  ? 'bg-gray-50 border-gray-900'
                  : 'bg-white border-gray-200 active:bg-gray-50'
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <span className={`text-sm ${isSelected(date) ? 'text-white' : 'text-gray-900'}`}>
                  {day}
                </span>
                {hasEvents && (
                  <div className="flex gap-0.5 mt-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className={`w-1 h-1 rounded-full ${
                          isSelected(date) ? 'bg-white' :
                          event.type === 'health' ? 'bg-blue-500' :
                          event.type === 'appointment' ? 'bg-yellow-500' :
                          'bg-purple-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DayDetailProps {
  date: Date;
  events: CalendarEvent[];
  onClose: () => void;
  onAddEvent: () => void;
}

export function DayDetail({ date, events, onClose, onAddEvent }: DayDetailProps) {
  const dayEvents = events.filter(event => 
    event.date.toDateString() === date.toDateString()
  );

  const eventsByType = {
    health: dayEvents.filter(e => e.type === 'health'),
    appointment: dayEvents.filter(e => e.type === 'appointment'),
    reminder: dayEvents.filter(e => e.type === 'reminder')
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-1 text-gray-900">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        <p className="text-gray-500">
          {dayEvents.length} {dayEvents.length === 1 ? 'entry' : 'entries'} for this day
        </p>
      </div>

      <div className="space-y-6">
        <EventSection
          title="Health Logs"
          events={eventsByType.health}
          type="health"
          onAdd={onAddEvent}
        />
        <EventSection
          title="Appointments"
          events={eventsByType.appointment}
          type="appointment"
          onAdd={onAddEvent}
        />
        <EventSection
          title="Reminders"
          events={eventsByType.reminder}
          type="reminder"
          onAdd={onAddEvent}
        />
      </div>
    </div>
  );
}

function EventSection({ 
  title, 
  events, 
  type, 
  onAdd 
}: { 
  title: string; 
  events: CalendarEvent[]; 
  type: 'health' | 'appointment' | 'reminder';
  onAdd: () => void;
}) {
  const colors = {
    health: 'border-blue-200 bg-blue-50',
    appointment: 'border-yellow-200 bg-yellow-50',
    reminder: 'border-purple-200 bg-purple-50'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900">{title}</h3>
        <button
          onClick={onAdd}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-gray-400 py-4">No {title.toLowerCase()} for this day</p>
        ) : (
          events.map(event => (
            <div
              key={event.id}
              className={`p-4 border rounded-xl ${colors[type]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{event.title}</h4>
                  {event.time && <p className="text-gray-600">{event.time}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}