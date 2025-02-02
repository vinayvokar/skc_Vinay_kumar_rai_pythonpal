"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Play, RefreshCw } from "lucide-react"

interface CodeEditorProps {
  initialCode?: string
}

export default function CodeEditor({ initialCode = "" }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    setError("")
    setOutput("")

    try {
      const response = await fetch("/api/python-compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const result = await response.json()

      if (result.error) {
        setError(result.error)
      } else {
        setOutput(result.output)
      }
    } catch (e) {
      setError("An error occurred while running your code")
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput("")
    setError("")
  }

  return (
    <Card className="bg-[#1e1e1e] text-white p-4 rounded-lg shadow-xl border-2 border-[#00b4b4]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            size="sm"
            className="bg-[#00b4b4] hover:bg-[#009999] text-white"
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 bg-[#1e1e1e] text-white font-mono p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#00b4b4] rounded"
          placeholder="Write your Python code here..."
        />
      </div>

      {(output || error) && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <div className="font-mono">
            <div className="text-sm text-gray-400 mb-2">Output:</div>
            {error ? (
              <div className="text-red-400 flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            ) : (
              <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

