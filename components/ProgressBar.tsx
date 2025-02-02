interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2 text-white">Your Coding Journey</h3>
      <div className="bg-white bg-opacity-30 rounded-full h-6 overflow-hidden">
        <div className="bg-yellow-400 h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}>
          <div className="h-full w-full bg-gradient-to-r from-yellow-400 to-yellow-300 animate-pulse"></div>
        </div>
      </div>
      <p className="text-center mt-2 text-white font-semibold">{Math.round(progress)}% Complete</p>
    </div>
  )
}

