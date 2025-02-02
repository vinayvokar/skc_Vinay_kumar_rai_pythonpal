"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import CodeEditor from "@/components/code-editor"

const characters = {
  "iron-man": { name: "Iron Man", image: "/iron.jpeg?height=150&width=150" },
  "Spiderman": { name: "Spiderman", image: "/spider.png?height=150&width=150" },
  "Black-widow": { name: "Black Widow", image: "/black.png?height=150&width=150" },
  thor: { name: "Thor", image: "/thor.png?height=150&width=150" },
}

export default function LearnPage() {
  const params = useParams()
  const characterId = params.character as string
  const character = characters[characterId as keyof typeof characters]

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  //const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Let's start by printing 'Hello, World!' using Python.",
    "Great! Now let's create a variable to store your name.",
    "Excellent! Let's use an if statement to check if your name is an Avenger.",
    "Amazing work! Finally, let's create a simple function to calculate your Avenger power level.",
  ]

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input }
      setMessages([...messages, userMessage])
      setInput("")

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            model: "openai", // or "gemini" depending on your preference
          }),
        })

        if (response.ok) {
          const reader = response.body?.getReader()
          const decoder = new TextDecoder()

          let aiResponse = ""
          while (true) {
            const { done, value } = await reader!.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            aiResponse += chunk

            // Update the messages state with the streaming response
            setMessages((prev) => [
              ...prev.filter((msg) => msg.role !== "assistant"),
              { role: "assistant", content: aiResponse },
            ])
          }
        } else {
          console.error('Failed to fetch AI response')
        }
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  useEffect(() => {
    // Initial AI message
    setMessages([
      { role: "assistant", content: `Hi there! I'm ${character.name}. Ready to learn some Python? ${steps[0]}` },
    ])
  }, [character.name])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1150] to-[#2b1c71] py-12">
      <div className="container mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <CardTitle>Learning Python with {character.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg p-2 max-w-[80%] ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Step-by-Step Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index} className={index <= currentStep ? "text-white" : "text-gray-500"}>
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Homework: Practice Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Now it's your turn! Use the code editor below to practice what you've learned.</p>
            <CodeEditor
              initialCode={`# Your homework: Create a function that prints a personalized Avenger greeting
# Example: "Greetings, young hero! I'm Iron Man, and together we'll master Python!"

def avenger_greeting(your_name):
    # Your code here
    pass

# Call your function with your name
avenger_greeting("Your Name")
`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
