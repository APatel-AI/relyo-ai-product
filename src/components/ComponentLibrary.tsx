import React, { useState } from 'react';
import { Button } from './Button';
import { Input, Textarea } from './Input';
import { Chip } from './Chip';
import { Modal } from './Modal';
import { EmptyState } from './EmptyState';
import { DatePicker } from './DatePicker';
import { Calendar, Heart, Plus, X } from 'lucide-react';

interface ComponentLibraryProps {
  onBack: () => void;
}

export function ComponentLibrary({ onBack }: ComponentLibraryProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div>
            <h1 className="mb-2 text-gray-900">Component Library</h1>
            <p className="text-gray-600">Relyo Design System Components</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Buttons */}
          <Section title="Buttons" description="Primary, secondary, and ghost button variants">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">Primary Small</Button>
              <Button variant="primary" size="md">Primary Medium</Button>
              <Button variant="primary" size="lg">Primary Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="ghost" size="md">Ghost</Button>
              <Button variant="primary" size="md" disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="md">
                <Plus className="w-4 h-4" />
                With Icon
              </Button>
              <Button variant="secondary" size="md">
                <Calendar className="w-4 h-4" />
                Calendar
              </Button>
            </div>
          </Section>

          {/* Inputs */}
          <Section title="Input Fields" description="Text inputs and text areas">
            <div className="max-w-md space-y-4">
              <Input
                label="Text Input"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="With Error"
                placeholder="Enter text..."
                error="This field is required"
              />
              <Textarea
                label="Textarea"
                placeholder="Enter longer text..."
                rows={4}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
          </Section>

          {/* Chips */}
          <Section title="Chips" description="Tag and filter components">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Chip label="Default" />
                <Chip label="Active" active />
                <Chip label="With Remove" onRemove={() => {}} />
                <Chip label="Clickable" onClick={() => {}} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip label="Health Event" variant="health" />
                <Chip label="Appointment" variant="appointment" />
                <Chip label="Reminder" variant="reminder" />
              </div>
            </div>
          </Section>

          {/* Date Picker */}
          <Section title="Date Picker" description="Calendar date selection">
            <div className="max-w-md">
              <DatePicker
                label="Select a date"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </Section>

          {/* Modal */}
          <Section title="Modal" description="Dialog and popup windows">
            <Button onClick={() => setShowModal(true)}>
              Open Modal
            </Button>
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Example Modal"
              size="md"
            >
              <div className="space-y-4">
                <p>This is an example modal dialog with clean, minimal styling.</p>
                <Input
                  label="Example Input"
                  placeholder="Type something..."
                />
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setShowModal(false)} variant="ghost" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={() => setShowModal(false)} variant="primary" className="flex-1">
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </Section>

          {/* Empty States */}
          <Section title="Empty States" description="Placeholder screens for empty data">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <EmptyState
                icon={Heart}
                title="No items yet"
                description="Start adding items to see them appear here"
                actionLabel="Add First Item"
                onAction={() => {}}
              />
            </div>
          </Section>

          {/* Cards */}
          <Section title="Cards" description="Content containers with various styles">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="mb-2 text-gray-900">Basic Card</h3>
                <p className="text-gray-600">A simple card with white background</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="mb-2 text-blue-900">Health Card</h3>
                <p className="text-gray-600">Styled for health-related content</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <h3 className="mb-2 text-yellow-900">Appointment Card</h3>
                <p className="text-gray-600">Styled for appointments</p>
              </div>
            </div>
          </Section>

          {/* Typography */}
          <Section title="Typography" description="Text styles and hierarchy">
            <div className="space-y-4">
              <div>
                <h1>Heading 1</h1>
                <p className="text-gray-500">2rem, 600 weight, -0.02em tracking</p>
              </div>
              <div>
                <h2>Heading 2</h2>
                <p className="text-gray-500">1.5rem, 600 weight, -0.01em tracking</p>
              </div>
              <div>
                <h3>Heading 3</h3>
                <p className="text-gray-500">1.125rem, 600 weight</p>
              </div>
              <div>
                <p>Body text - The quick brown fox jumps over the lazy dog. This is the default paragraph style used throughout the application.</p>
              </div>
            </div>
          </Section>

          {/* Colors */}
          <Section title="Color Palette" description="Soft, calm color system">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ColorSwatch color="bg-gray-900" label="Primary" textColor="text-white" />
              <ColorSwatch color="bg-gray-100" label="Secondary" />
              <ColorSwatch color="bg-blue-50" label="Health" />
              <ColorSwatch color="bg-yellow-50" label="Appointment" />
              <ColorSwatch color="bg-purple-50" label="Reminder" />
              <ColorSwatch color="bg-green-50" label="Success" />
              <ColorSwatch color="bg-red-50" label="Error" />
              <ColorSwatch color="bg-white border border-gray-200" label="White" />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="mb-2 text-gray-900">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ColorSwatch({ 
  color, 
  label, 
  textColor = 'text-gray-900' 
}: { 
  color: string; 
  label: string;
  textColor?: string;
}) {
  return (
    <div>
      <div className={`${color} h-20 rounded-xl mb-2`} />
      <p className={`${textColor}`}>{label}</p>
    </div>
  );
}
