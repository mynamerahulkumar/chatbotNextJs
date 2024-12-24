import { OpenAIEdgeStream } from "openai-edge-stream";
export const config = {
    runtime:'edge',
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('message openaicall-start', req);

    const { message } = await req.json();
    console.log('message openaicall-', message);

    const stream = await OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "content-type": 'application/json',
          Authorization: `Bearer ${process.env.OPEN_API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ content: message, role: 'user' }],
          stream: true
        }),
      }
    );
    console.log('message openaicall-end', stream);

    return new Response(stream);
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}