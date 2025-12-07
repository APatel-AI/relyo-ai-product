import React, { useState } from 'react';
import { Calendar, Heart, Bell, Users, Plus, ArrowRight, Camera, X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Chip } from './Chip';

interface OnboardingProps {
  onComplete: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  image?: string;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [newMemberImage, setNewMemberImage] = useState<string>('');

  const addFamilyMember = () => {
    if (newMemberName && newMemberRelation) {
      setFamilyMembers([
        ...familyMembers,
        {
          id: Date.now().toString(),
          name: newMemberName,
          relation: newMemberRelation,
          image: newMemberImage
        }
      ]);
      setNewMemberName('');
      setNewMemberRelation('');
      setNewMemberImage('');
    }
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMemberImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewMemberImage('');
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {step === 0 && (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="mb-4 text-gray-900">Welcome to Relyo</h1>
              <p className="text-gray-600 max-w-sm mx-auto">
                Your family&apos;s responsibilities — organized.
              </p>
            </div>
            <div className="space-y-4 text-left bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <FeatureItem 
                icon={Calendar} 
                text="Track appointments and important dates"
              />
              <FeatureItem 
                icon={Heart} 
                text="Log health events and symptoms"
              />
              <FeatureItem 
                icon={Bell} 
                text="Never miss a follow-up or reminder"
              />
            </div>
            <Button onClick={nextStep} variant="primary" size="lg" className="w-full">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-2 text-gray-900">Add Your Family</h2>
              <p className="text-gray-600">
                Who will you be managing responsibilities for?
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="space-y-3 mb-6">
                {familyMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-gray-900">{member.name}</div>
                      <div className="text-gray-500">{member.relation}</div>
                    </div>
                    <button
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {/* Image Upload Section */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {newMemberImage ? (
                      <div className="relative">
                        <img
                          src={newMemberImage}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute -top-1 -right-1 bg-gray-900 text-white rounded-full p-1 hover:bg-gray-800 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                        <Camera className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Add</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <Input
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="Name"
                    />
                    <Input
                      value={newMemberRelation}
                      onChange={(e) => setNewMemberRelation(e.target.value)}
                      placeholder="Relation (e.g., Daughter, Son)"
                    />
                  </div>
                </div>

                <Button 
                  onClick={addFamilyMember} 
                  variant="secondary" 
                  className="w-full"
                  disabled={!newMemberName || !newMemberRelation}
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Button onClick={() => setStep(0)} variant="ghost" className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  variant="primary" 
                  className="flex-1"
                  disabled={familyMembers.length === 0}
                >
                  Continue
                </Button>
              </div>
              <Button 
                onClick={nextStep} 
                variant="ghost" 
                className="w-full text-gray-500"
              >
                Skip for Now
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="mb-2 text-gray-900">How Relyo Works</h2>
              <p className="text-gray-600">
                Three simple tools to stay organized
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <TutorialCard
                icon={Calendar}
                title="Calendar View"
                description="See all appointments, health logs, and reminders in one place. Tap any day to view details."
                color="bg-blue-50"
              />
              <TutorialCard
                icon={Heart}
                title="Health Tracking"
                description="Log symptoms, medications, and health events. Keep everything documented for doctor visits."
                color="bg-yellow-50"
              />
              <TutorialCard
                icon={Bell}
                title="Smart Reminders"
                description="Get AI-powered scripts for making calls and managing appointments with confidence."
                color="bg-purple-50"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="ghost" className="flex-1">
                Back
              </Button>
              <Button onClick={nextStep} variant="primary" className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-2 text-gray-900">Stay Updated</h2>
              <p className="text-gray-600">
                Get notified about upcoming appointments and important reminders
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="mb-3 text-gray-900">Enable Notifications</h3>
              <p className="text-gray-600 mb-6">
                We&apos;ll send you gentle reminders so you never miss what matters
              </p>
              <div className="space-y-3">
                <Button onClick={onComplete} variant="primary" className="w-full">
                  Enable Notifications
                </Button>
                <Button onClick={onComplete} variant="ghost" className="w-full">
                  Skip for Now
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3].map(index => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step 
                  ? 'w-8 bg-gray-900' 
                  : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function TutorialCard({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <h3 className="mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}