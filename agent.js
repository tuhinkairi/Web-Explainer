import axios from 'axios';
import { JSDOM } from 'jsdom';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

export const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Extracts text from a webpage
export async function fetchWebpageText(url) {
  try {
    const { data } = await axios.get(url, { timeout: 10000 });
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const textContent = Array.from(document.querySelectorAll("h1, h2, h3, p"))
      .map(el => el.textContent?.trim() || "")
      .filter(Boolean)
      .join("\n\n");

    return textContent.slice(0, 6000); // prevent token overflow
  } catch (err) {
    console.error("Error fetching webpage:", err);
    return "Failed to fetch webpage content.";
  }
}

// Tool: Explain a webpage (returns a stream, not a string)
export const tools = {
  explain_webpage: {
    name: "explain_webpage",
    description: "Fetches a webpage and explains it in simple terms. do not repeate the same thing, keep it clear and make it simple",
    execute: async (url) => {
      const content = await fetchWebpageText(url);

      const stream = await client.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Here is a webpage's text:\n\n${content}\n\nPlease summarize this page, do not repeate the same thing, keep it clear and make it simple beginner-friendly terms. respond always in markdown`
              }
            ]
          }
        ]
      });

      return stream; // let server handle streaming
    }
  }
};
