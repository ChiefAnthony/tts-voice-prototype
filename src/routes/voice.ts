import { Hono } from "hono";
import { ReplicateInput, TTSResponse } from "../types/replicate";
import { createReplicateClient } from "../config/replicate";

const voice = new Hono();

voice.post("/", async (c) => {
  try {
    const body = await c.req.json<ReplicateInput>();

    // Validate input
    if (!body.text) {
      const errorResponse: TTSResponse = { error: "Text is required" };
      return c.json(errorResponse, 400);
    }

    const replicate = createReplicateClient(process.env.REPLICATE_API_TOKEN!);

    const output = await replicate.run(
      "adirik/styletts2:989cb5ea6d2401314eb30685740cb9f6fd1c9001b8940659b406f952837ab5ac",
      {
        input: {
          text: body.text,
          embedding_scale: body.embedding_scale || 1.5
        }
      }
    ) as string[];  // Replicate returns an array with the URL as the first element

    if (!output || !output[0]) {
      const errorResponse: TTSResponse = { error: "No audio URL generated" };
      return c.json(errorResponse, 500);
    }

    const response: TTSResponse = { audioUrl: output[0] };
    return c.json(response, 200);
  } catch (error) {
    console.error('TTS Error:', error);
    const errorResponse: TTSResponse = { error: 'Failed to generate audio' };
    return c.json(errorResponse, 500);
  }
});

export default voice;
