"use client"

import { useState } from "react"
import CodeEditor from "@/components/code-editor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MagicalCodePage() {
  const [selectedCharacter, setSelectedCharacter] = useState("iron-man")

  const characters = [
    { id: "iron-man", name: "Iron Man", color: "bg-red-500" },
    { id: "captain-america", name: "Captain America", color: "bg-blue-500" },
    { id: "thor", name: "Thor", color: "bg-yellow-500" },
    { id: "black-widow", name: "Black Widow", color: "bg-gray-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1150] to-[#2b1c71] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Magical Code Adventure</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Choose Your Avenger Guide</h2>
            <div className="grid grid-cols-2 gap-4">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  className={`cursor-pointer transition-all ${selectedCharacter === character.id ? "ring-4 ring-yellow-400" : ""}`}
                  onClick={() => setSelectedCharacter(character.id)}
                >
                  <CardHeader className={`${character.color} h-24`}></CardHeader>
                  <CardContent>
                    <CardTitle>{character.name}</CardTitle>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Magical Code Box</h2>
            <CodeEditor
              initialCode={`# Welcome, young hero! Let's write some magical Python code.
# Try printing a message to start your adventure:

print("Avengers, assemble!")

# Now, let's create a variable with your superhero name:
hero_name = "Iron Coder"
print(f"I am {hero_name}, ready to save the world with code!")
`}
              onRun={async (code) => {
                // In a real implementation, this would send the code to a secure backend
                return new Promise((resolve) => {
                  setTimeout(() => {
                    if (code.includes("print(")) {
                      resolve({
                        output: "Avengers, assemble!\nI am Iron Coder, ready to save the world with code!",
                      })
                    } else {
                      resolve({
                        error: "Oops! Make sure you use the print() function to see your heroic message!",
                      })
                    }
                  }, 1000)
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

