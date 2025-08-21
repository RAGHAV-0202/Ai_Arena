import { v4 as uuidv4 } from "uuid";
import {Chat} from "../models/users.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";



export const getAllChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.status(200).json(new ApiResponse(200, chats, "Chats fetched successfully"));
});

//   Get a chat by chatId
export const getChatById = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findOne({ chatId, userId: req.user._id });

  if (!chat) throw new apiError(404, "Chat not found");

  res.status(200).json(new ApiResponse(200, chat, "Chat fetched successfully"));
});

//     Create a new chat
export const createChat = asyncHandler(async (req, res) => {
  const chatId = uuidv4();

  const defaultProviders = [
    { id: 0, title: "ChatGPT 4 Turbo", logo: "https://waryhub.com/files/preview/960x960/11752154375agdpvjezbai7exuuwwhmbnkfy9cyqjzlvutbqqeoa8xyl6z28z1hlstnwtld5hhesltmqfxkvm31meksr9lei766fwfc5izp6bno.png", messages: [] },
    { id: 1, title: "Gemini 2.5 Flash", logo: "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png", messages: [] },
    { id: 2, title: "Llama 3.1 8b", logo: "https://cdn.pixabay.com/photo/2021/11/01/15/20/meta-logo-6760788_1280.png", messages: [] }
  ];

  const newChat = await Chat.create({
    chatId,
    userId: req.user._id,
    title: req.body.title || "New Chat",
    providers: defaultProviders
  });

  res.status(201).json(new ApiResponse(201, newChat, "Chat created successfully"));
});

//    Update a chat
export const updateChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { providers, title } = req.body;

  const defaultProviders = [
    { id: 0, title: "ChatGPT 4 Turbo", logo: "https://waryhub.com/files/preview/960x960/11752154375agdpvjezbai7exuuwwhmbnkfy9cyqjzlvutbqqeoa8xyl6z28z1hlstnwtld5hhesltmqfxkvm31meksr9lei766fwfc5izp6bno.png", messages: [] },
    { id: 1, title: "Gemini 2.5 Flash", logo: "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png", messages: [] },
    { id: 2, title: "Llama 3.1 8b", logo: "https://cdn.pixabay.com/photo/2021/11/01/15/20/meta-logo-6760788_1280.png", messages: [] }
  ];

  const updatedChat = await Chat.findOneAndUpdate(
    { chatId, userId: req.user._id },
    { providers: providers || defaultProviders, ...(title && { title }), updatedAt: new Date() },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(200).json(new ApiResponse(200, updatedChat, "Chat updated successfully"));
});

//    Delete a chat
export const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const deletedChat = await Chat.findOneAndDelete({ chatId, userId: req.user._id });

  if (!deletedChat) throw new apiError(404, "Chat not found");

  res.status(200).json(new ApiResponse(200, null, "Chat deleted successfully"));
});