import { Button } from "@/components/ui/button"
import CharacterSelector from "@/components/character-selector"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1150] to-[#2b1c71]">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">PythonPal</div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              About
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              How It Works
            </Button>
            <Button className="bg-[#00b4b4] hover:bg-[#009999] text-white">Get Started</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Learn Python with Avengers</h1>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Choose your favorite Avenger and embark on an exciting journey to master Python programming!
        </p>

        <CharacterSelector />

        <div className="mt-16 col-4 bg-white/10 rounded-lg p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Select your Avenger guide</li>
            <li>Chat with your AI-powered Avenger mentor</li>
            <li>Follow step-by-step coding instructions</li>
            <li>Practice in the interactive code playground</li>
            <li>Complete homework assignments to level up your skills</li>
          </ol>
          
        </div> 
        <div className="mt-16 bg-white/10 rounded-lg p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white mb-4">Background</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>AI : Geminie</li>
            <li>Frontend : Reactjs and Nextjs </li>
            <li>Backend Python</li>
          </ol>
          
        </div>
      </main>
    </div>
  )
}

