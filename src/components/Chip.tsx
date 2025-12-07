import React from 'react';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  active?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  variant?: 'default' | 'health' | 'appointment' | 'reminder';
}

export function Chip({ label, active, onRemove, onClick, variant = 'default' }: ChipProps) {
  const variants = {
    default: active 
      ? 'bg-gray-900 text-white' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    health: 'bg-blue-50 text-blue-900 border border-blue-200',
    appointment: 'bg-yellow-50 text-yellow-900 border border-yellow-200',
    reminder: 'bg-purple-50 text-purple-900 border border-purple-200'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${variants[variant]} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
