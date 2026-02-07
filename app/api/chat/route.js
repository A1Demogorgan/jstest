export async function POST(request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    const apiVersion =
      process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview";

    if (!apiKey || !endpoint || !deployment) {
      return new Response(
        JSON.stringify({ error: "Azure OpenAI env vars missing." }),
        { status: 500 }
      );
    }

    const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const systemPrompt = `
You are a concise storytelling assistant. Given a business problem, respond with a short, emotional, futuristic story using the StoryBrand framework:
- A protagonist with a clear goal
- The challenge or stakes
- A plan using emerging technology
- Success and relief at the end
Every story must begin with: "Once upon a time in future,"
First, explain the selected technology in the context of the story before describing actions or outcomes.
Avoid obvious or generic use cases; choose a surprising, innovative application.
Keep it short and sweet, warm in tone, and focused on the business outcome.
`.trim();

    const azureResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        model: deployment,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!azureResponse.ok || !azureResponse.body) {
      const errorText = await azureResponse.text();
      return new Response(
        JSON.stringify({ error: "Azure OpenAI error", details: errorText }),
        { status: azureResponse.status }
      );
    }

    return new Response(azureResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error", details: String(error) }),
      { status: 500 }
    );
  }
}
