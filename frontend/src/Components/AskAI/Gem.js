// const { GoogleGenerativeAI } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyAsZ-3M98KKTjffwjc7X0JSgAaCTmzDFWk");

const genAI = new GoogleGenerativeAI("AIzaSyCmvrh05CfW_cbZdqC0pRHUWknOuAIUJwY");

export async function run(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    question + "Give only the names in a comma separated no extra text";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const res = response.text();

  return res;
}
