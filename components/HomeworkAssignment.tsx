import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const assignments = [
  {
    id: 1,
    title: "Print a Magical Greeting",
    description: 'Write a Python spell (program) that prints "Abracadabra, Python!" to your magic console.',
    solution: 'print("Abracadabra, Python!")',
  },
  {
    id: 2,
    title: "Summon the Sum of Two Numbers",
    description:
      "Create a magical function that takes two numbers and returns their sum. Then, use your spell to add 5 and 3.",
    solution: "def add_numbers(a, b):\n    return a + b\n\nresult = add_numbers(5, 3)\nprint(result)",
  },
  // Add more fun assignments as needed
]

export default function HomeworkAssignment({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  const [currentAssignment, setCurrentAssignment] = useState(0)
  const [userSolution, setUserSolution] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    if (userSolution.trim() === assignments[currentAssignment].solution.trim()) {
      setFeedback("🎉 Magical! Your spell worked perfectly!")
      onProgressUpdate(((currentAssignment + 1) / assignments.length) * 100)
    } else {
      setFeedback("🔮 Almost there! Try tweaking your spell a bit.")
    }
  }

  const handleNext = () => {
    setCurrentAssignment((prev) => (prev + 1) % assignments.length)
    setUserSolution("")
    setFeedback("")
  }

  return (
    <Card className="mt-8 bg-white bg-opacity-75 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Magical Coding Quest</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{assignments[currentAssignment].title}</h3>
          <p className="mt-2">{assignments[currentAssignment].description}</p>
        </div>
        <Textarea
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          placeholder="Write your magical code here..."
          rows={5}
          className="mb-4 bg-white bg-opacity-50"
        />
        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
            Cast Your Spell
          </Button>
          <Button onClick={handleNext} variant="outline" className="bg-purple-500 hover:bg-purple-600 text-white">
            Next Quest
          </Button>
        </div>
        {feedback && <p className="mt-4 font-semibold text-lg animate-bounce">{feedback}</p>}
      </CardContent>
    </Card>
  )
}

