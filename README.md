# Ai Arena 🧠💬

Ai_Arena is a **multi-modal AI chat platform** that allows users to interact with multiple AI models simultaneously. The project integrates **ChatGPT 4 Turbo, Gemini 2.5 Flash, and Llama 3.1 8b**, providing a rich and parallel conversational experience. Users can create, manage, and delete chats, with all chat histories synced to a backend powered by **Node.js, Express, and MongoDB**.

---

## Features ✨

- **Multi-AI chat:** Send a prompt and get responses from three different AI providers simultaneously.
- **Dynamic chat management:** Create new chats, view recent chats, and delete unwanted chats.
- **Persistent conversation:** All chats are stored in the backend and synced automatically.
- **Responsive design:** Fully responsive sidebar and chat interface for desktop and mobile.
- **Optimistic UI updates:** Immediate feedback when creating or deleting chats.

---

## Tech Stack 🛠️

**Frontend:**
- React.js (with Vite)
- TypeScript
- Tailwind CSS
- GSAP (for smooth animations)
- Axios (API requests)
- React Router (routing)

**Backend:**
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Middleware architecture for clean code

---

## Project Structure 📂
```AI_Arena
|   .gitignore
|   project_structure.txt
|   README.md
|   
+---Backend
|   |   .env
|   |   .gitignore
|   |   package-lock.json
|   |   package.json
|   |   
|   \---src
|       |   app.js
|       |   index.js
|       |   
|       +---controllers
|       |       auth.controllers.js
|       |       chats.controllers.js
|       |       
|       +---db
|       |       connectDB.js
|       |       
|       +---middlewares
|       |       auth.middleware.js
|       |       
|       +---models
|       |       users.models.js
|       |       
|       +---routes
|       |       auth.routes.js
|       |       chat.routes.js
|       |       
|       \---utils
|               apiError.js
|               apiResponse.js
|               asyncHandler.js
|               
\---Frontend
    |   .env
    |   .gitignore
    |   eslint.config.js
    |   index.html
    |   netlify.toml
    |   package-lock.json
    |   package.json
    |   README.md
    |   serve.json
    |   vercel.json
    |   vite.config.js
    |   
    +---public
    |       vite.svg
    |       
    \---src
        |   App.css
        |   App.jsx
        |   baseUrl.js
        |   index.css
        |   main.jsx
        |   react-router-setup.jsx
        |   tailwind.config.js
        |   
        +---assets
        |       img1.avif
        |       img2.avif
        |       img3.avif
        |       img4.avif
        |       img5.avif
        |       react.svg
        |       
        +---components
        |       GPT_Area.jsx
        |       HandlePrompt.js
        |       HomePageFeatures.jsx
        |       HomePageHero.jsx
        |       HomePageNavbar.jsx
        |       LLM_Generations.jsx
        |       PromptPanel.jsx
        |       SideBar.tsx
        |       
        +---pages
        |       Chat.jsx
        |       HomePage.jsx
        |       Login.jsx
        |       RedirectNewChat.jsx
        |       Register.jsx
        |       
        \---UI
            |   .gitkeep
            |   
            \---Components
                    AIButton.tsx
                    Aurora.jsx
                    Border.jsx
                    Dock.jsx
                    DotGrid.jsx
                    FlowingMenu.jsx
                    GooeyNav.jsx
                    OrbBg.jsx
                    Particles.jsx
                    RotatingText.jsx
                    Silk.jsx
                    Speed.jsx
                    SquareBG.jsx
                    TrueFocus.jsx
                    
```

## Installation & Setup ⚡

1. **Clone the repository:**
```bash
git clone https://github.com/<your-username>/Ai_Arena.git
cd Ai_Arena
```

2. **Backend setup:**
```cd Backend
npm install
cp .env.example .env    # Add your environment variables (MongoDB URI, JWT secret)
npm run dev
```

Environment Variables
```
MONGO_URI=<Your MongoDB connection string>

PORT=4000

ACCESS_TOKEN_SECRET=<Your Access Token Secret>
ACCESS_TOKEN_EXPIRY=5d
REFRESH_TOKEN_SECRET=<Your Refresh Token Secret>
REFRESH_TOKEN_EXPIRY=1d
```

3. **Frontend Setup**
``` cd ../Frontend
npm install
npm run dev
```
  Environment variables
  ```
VITE_GROQ_API_KEY=your_new_groq_key_here
VITE_GEMINI_API_KEY=your_new_gemini_key_here
```

4. **Access The page**
``` http://localhost:5173 ```
Open in Your Browser

