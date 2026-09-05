'use client';

interface DeviceSwitcherProps {
  currentDevice: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export function DeviceSwitcher({ currentDevice, onDeviceChange }: DeviceSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onDeviceChange('desktop')}
        className={p-2 rounded }
        title="Десктоп"
      >
        🖥️
      </button>
      <button
        onClick={() => onDeviceChange('tablet')}
        className={p-2 rounded }
        title="Планшет"
      >
        📱
      </button>
      <button
        onClick={() => onDeviceChange('mobile')}
        className={p-2 rounded }
        title="Мобильный"
      >
        📱
      </button>
    </div>
  );
}
