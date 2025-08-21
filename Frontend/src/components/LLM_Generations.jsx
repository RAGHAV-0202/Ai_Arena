import axios from "axios"
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY , dangerouslyAllowBrowser : true});
const ai = new GoogleGenAI({
  apiKey : import.meta.env.VITE_GEMINI_API_KEY
});

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

async function GenerateGemini(prompt, conversationHistory = []) {
  console.log("initiating Gemini");
  
  try {
    // Build conversation history for Gemini
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        content: msg.content
      })),
      { role: 'user', content: prompt }
    ];

    // Format for Gemini's expected structure
    const contents = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const chat = model.startChat({
      history: contents.slice(0, -1), // All messages except the last one
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
    
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
      model: "openai/gpt-oss-20b",
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

export {GenerateChatGPT , GenerateLlama8b , GenerateGemini}