"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const characters = [
  { id: "default", name: "Cody the Coder", image: "/placeholder.svg?height=100&width=100" },
  { id: "pirate", name: "Captain Code", image: "/placeholder.svg?height=100&width=100" },
  { id: "astronaut", name: "Astro Programmer", image: "/placeholder.svg?height=100&width=100" },
  { id: "wizard", name: "Merlin the Magical Coder", image: "/placeholder.svg?height=100&width=100" },
]

export default function CharacterSelector({ onSelect }: { onSelect: (character: string) => void }) {
  const [selectedCharacter, setSelectedCharacter] = useState("default")

  const handleSelect = (character: string) => {
    setSelectedCharacter(character)
    onSelect(character)
  }

  return (
    <div className="mb-8 bg-white bg-opacity-75 p-6 rounded-lg backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Choose Your Coding Buddy</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <Button
            key={character.id}
            onClick={() => handleSelect(character.id)}
            variant={selectedCharacter === character.id ? "default" : "outline"}
            className={`flex flex-col items-center p-4 h-auto ${
              selectedCharacter === character.id ? "ring-4 ring-yellow-400" : ""
            }`}
          >
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              width={100}
              height={100}
              className="mb-2 rounded-full"
            />
            <span className="text-center">{character.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

