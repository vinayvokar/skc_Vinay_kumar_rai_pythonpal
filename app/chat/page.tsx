"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useChat } from "ai/react"
import CharacterSelector from "@/components/CharacterSelector"
import HomeworkAssignment from "@/components/HomeworkAssignment"
import ProgressBar from "@/components/ProgressBar"
import dynamic from "next/dynamic"
import type React from "react" // Added import for React

// Dynamically import Confetti with SSR disabled
const Confetti = dynamic(() => import("react-confetti"), { ssr: false })

export default function ChatPage() {
  const [apiKey, setApiKey] = useState("")
  const [character, setCharacter] = useState("default")
  const [showHomework, setShowHomework] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }

    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    // Update window size on resize
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    headers: {
      "X-API-Key": apiKey,
    },
  })

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value
    setApiKey(newApiKey)
    localStorage.setItem("openai_api_key", newApiKey)
  }

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress)
    if (newProgress === 100) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-green-400 to-blue-500 min-h-screen">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
      )}
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Chat with PythonPal</h1>

      <div className="mb-4">
        <Input
          type="password"
          placeholder="Enter your OpenAI API Key"
          value={apiKey}
          onChange={handleApiKeyChange}
          className="bg-white bg-opacity-50 placeholder-gray-500"
        />
      </div>

      <CharacterSelector onSelect={setCharacter} />

      <Card className="mb-4 bg-white bg-opacity-75 backdrop-blur-md">
        <CardContent>
          {messages.map((message, i) => (
            <div key={i} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user" ? "bg-blue-100" : "bg-green-100"
                } ${message.role === "assistant" ? "animate-bounce-once" : ""}`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask PythonPal a question..."
          className="bg-white bg-opacity-50 placeholder-gray-500"
        />
        <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black">
          Send
        </Button>
      </form>

      <div className="mt-4">
        <Button onClick={() => setShowHomework(!showHomework)} className="bg-purple-500 hover:bg-purple-600 text-white">
          {showHomework ? "Hide Homework" : "Show Homework"}
        </Button>
      </div>

      {showHomework && <HomeworkAssignment onProgressUpdate={handleProgressUpdate} />}

      <ProgressBar progress={progress} />
    </div>
  )
}

