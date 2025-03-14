import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { question } = await request.json();

  if (!question || typeof question !== "string") {
    return NextResponse.json({
      success: false,
      error: "Invalid or missing 'question' parameter",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a highly experienced senior software engineer with deep expertise in frontend and backend technologies. Provide clear, optimized, and professional answers with best practices, performance considerations, and real-world examples.",
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    const chatReply = data.choices[0].message.content;
    return NextResponse.json({ success: true, data: chatReply });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      data: "Error generating AI response",
    });
  }
}
