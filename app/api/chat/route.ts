import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  if (!model || model !== "openai") {
    return new Response("Invalid model specified", { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are PythonPal, a friendly AI tutor designed to help children learn Python programming. Explain concepts in simple terms and provide engaging examples.",
        },
        ...messages,
      ],
    });

    // Create a ReadableStream from the OpenAI response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(content));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return new Response("Failed to fetch from OpenAI", { status: 500 });
  }
}