import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Helper function to convert messages to the format expected by each provider
function formatMessagesForProvider(messages, provider) {
  // Filter out only user and AI messages (exclude system messages if any)
  const relevantMessages = messages.filter(msg => 
    msg.role === 'user' || msg.role === 'assistant' || msg.role === 'model'
  );

  if (provider === 'gemini') {
    // Gemini uses 'user' and 'model' roles
    return relevantMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content }]
    }));
  } else {
    // Groq (ChatGPT/Llama) uses 'user' and 'assistant' roles
    return relevantMessages.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : msg.role,
      content: msg.content
    }));
  }
}

const models = [
  "gemini-2.5-flash",
  // "gemini-2.5-pro",
  "gemini-2.0-flash",
  // "gemini-1.5-flash",
  // "gemini-1.5-pro"
];

function getRandomModel() {
  const index = Math.floor(Math.random() * models.length);
  return models[index];
}

async function GenerateGemini(prompt, conversationHistory = []) {
  console.log("initiating Gemini");
  
  try {
    const model = genAI.getGenerativeModel({ model: getRandomModel()  });
    console.log(model.model)
    
    if (conversationHistory.length === 0) {
      // Simple generation without history
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } else {
      // Chat with history
      const history = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: history
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    }
    
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Sorry, I encountered an error generating a response.";
  }
}

async function GenerateChatGPT(prompt, conversationHistory = []) {
  console.log("initiating ChatGPT via Groq");
  
  try {
    // Build conversation history for ChatGPT
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.content
      })),
      { role: "user", content: prompt }
    ];

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "openai/gpt-oss-20b", // Current production model
      max_tokens: 1024,
      temperature: 0.7,
    });
    
    const result = completion.choices[0]?.message?.content || "";
    console.log("ChatGPT result:", result);
    return result;
    
  } catch (error) {
    console.error("ChatGPT generation error:", error);
    return "Sorry, I encountered an error generating a response.";
  }
}

async function GenerateLlama8b(prompt, conversationHistory = []) {
  console.log("initiating Llama via Groq");
  
  try {
    // Build conversation history for Llama
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.content
      })),
      { role: "user", content: prompt }
    ];

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant",
      max_tokens: 1024,
      temperature: 0.7,
    });
    
    const result = completion.choices[0]?.message?.content || "";
    console.log("Llama result:", result);
    return result;
    
  } catch (error) {
    console.error("Llama generation error:", error);
    return "Sorry, I encountered an error generating a response.";
  }
}

export { GenerateChatGPT, GenerateLlama8b, GenerateGemini }