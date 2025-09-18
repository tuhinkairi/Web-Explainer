import { client, tools } from "./agent.js";

export default async function runAgent(userInput) {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const match = userInput.match(urlRegex);

  if (match) {
    const url = match[0];
    return await tools.explain_webpage.execute(url);
  }

  // Otherwise, just do normal chat
  const stream = await client.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: userInput + " respond always in markdown" }] }]
  });
  return stream;
}
