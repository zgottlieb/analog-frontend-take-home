import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { TIME_WINDOW } from '../types';

function ControlPanel({
  isPaused,
  handleTogglePause,
}: {
  isPaused: boolean;
  handleTogglePause: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-[2rem] mb-4 py-2">
      <div className="font-mono text-sm flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
          onClick={() => handleTogglePause((prev) => !prev)}
        >
          {isPaused ? (
            <>
              <PlayIcon className="h-5 w-5" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <PauseIcon className="h-5 w-5" />
              <span>Pause</span>
            </>
          )}
        </button>
      </div>
      <div className="font-mono text-xs text-white">
        Viewing last {TIME_WINDOW / 1000} second of data
        {isPaused && (
          <span>
            {' '}
            – Current time:{' '}
            {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </span>
        )}
      </div>
    </div>
  );
}

export default ControlPanel;
