"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const characters = [
  { id: "iron-man", name: "Iron Man", image: "/iron.jpeg?height=150&width=150" },
  { id: "Black-widow", name: "Black Widow", image: "/black.png?height=150&width=150" },
  { id: "Spiderman", name: "Spiderman", image: "/spider.png?height=150&width=150" },
  { id: "thor", name: "Thor", image: "/thor.png?height=150&width=150" },
]

export default function CharacterSelector() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectCharacter = (characterId: string) => {
    setSelectedCharacter(characterId)
  }

  const handleStartLearning = () => {
    if (selectedCharacter) {
      router.push(`/learn/${selectedCharacter}`)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <Card
            key={character.id}
            className={`cursor-pointer transition-all ${selectedCharacter === character.id ? "ring-4 ring-yellow-400" : ""}`}
            onClick={() => handleSelectCharacter(character.id)}
          >
            <CardHeader className="p-4">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                width={150}
                height={150}
                className="rounded-full mx-auto"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center">{character.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          onClick={handleStartLearning}
          disabled={!selectedCharacter}
          className="bg-[#ff8c00] hover:bg-[#ff7c00] text-white text-lg px-8 py-4"
        >
          Start Learning with{" "}
          {selectedCharacter ? characters.find((c) => c.id === selectedCharacter)?.name : "Your Avenger"}
        </Button>
      </div>
    </div>
  )
}

