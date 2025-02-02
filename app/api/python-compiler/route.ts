import { NextResponse } from "next/server"
import { loadPyodide } from "pyodide"

export async function POST(req: Request) {
  const { code } = await req.json()

  try {
    const pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/",
    })

    // Redirect stdout to capture print statements
    pyodide.runPython(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
    `)

    // Run the user's code
    pyodide.runPython(code)

    // Get the captured output
    const output = pyodide.runPython("sys.stdout.getvalue()")

    return NextResponse.json({ output })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).toString() }, { status: 400 })
  }
}

