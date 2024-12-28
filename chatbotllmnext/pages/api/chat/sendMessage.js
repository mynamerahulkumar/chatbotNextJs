import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const initialChatMessage={
    role:'sytem',
    content:'Your name is Perceptron and you are helpful,motivational,enthusisatic assistant,you reply to user queries and help them in their queries ,you reply in markdown format'
  }
  const { message } = body;
  if (!message) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const stream = await OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "Your name is Perceptron and you are a helpful, motivational, enthusiastic assistant. You reply to user queries and help them in their queries. You reply in markdown format." }, { role: "user", content: message }],
          stream: true,
        }),
      }
    );
    return new Response(stream);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
