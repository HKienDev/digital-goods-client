import { useState, useEffect, useCallback } from 'react';

interface DurationSelectorProps {
  durations: string[];
  onDurationSelect?: (duration: string) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ durations, onDurationSelect }) => {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const handleDurationSelect = useCallback((duration: string): void => {
    setSelectedDuration(duration);
    if (onDurationSelect) {
      onDurationSelect(duration);
    }
  }, [onDurationSelect]);

  useEffect(() => {
    if (durations && durations.length > 0 && !selectedDuration) {
      handleDurationSelect(durations[0]);
    }
  }, [durations, selectedDuration, handleDurationSelect]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-gray-900">Thời hạn</h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {durations.map((duration, index) => (
          <button
            key={`${duration}-${index}`}
            onClick={() => handleDurationSelect(duration)}
            className={`py-3 border rounded-md text-center font-medium transition-colors
              ${selectedDuration === duration 
                ? 'border-red-600 bg-red-50 text-red-600' 
                : 'border-gray-300 hover:border-gray-400 text-gray-900'
              }`}
          >
            {duration}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector; 