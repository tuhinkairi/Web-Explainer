import express from "express";
import dotenv from "dotenv";
import runAgent from "./runner.js";

dotenv.config();

const app = express();
const port = 3000;

// Serve frontend HTML
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/template/index.html");
});

// SSE endpoint for streaming
app.get("/stream", async (req, res) => {
  const userPrompt = req.query.q || "Hello AI!";

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await runAgent(userPrompt);

    for await (const chunk of stream) {
      const text = chunk.text || "";
      if (text) {
        console.log(text)
        res.write(`data: ${text}\n\n`);
      }
    }

    res.write("event: end\ndata: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error(err);
    res.write("event: error\ndata: Failed to stream response\n\n");
    res.end();
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
