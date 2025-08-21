import { marked } from 'marked';
import DOMPurify from 'dompurify';
import React, { useEffect, useRef } from 'react';

// Configure Marked.js for GFM and better table support
marked.setOptions({
  gfm: true, // Enable GitHub-flavored Markdown
  breaks: true, // Treat newlines as <br> tags
  tables: true, // Explicitly enable tables
});

// Optional: Add GFM heading ID support (if installed)
import 'marked-gfm-heading-id';

const ErrorBoundary = ({ children }) => {
  class Boundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="text-white p-4">
            <h4>Error rendering content</h4>
            <p>{this.state.error?.message || 'Something went wrong.'}</p>
          </div>
        );
      }
      return this.props.children;
    }
  }
  return <Boundary>{children}</Boundary>;
};

const GPTArea = ({ logo, title, messages , id}) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth', // Enable smooth scrolling
      });
    }
  }, [messages]); // Trigger scroll when messages array updates

  // Sanitize and validate message text
  const sanitizeText = (text) => {
    if (text == null) {
      console.warn('Null or undefined text received');
      return '';
    }
    if (Array.isArray(text)) {
      console.warn('Text is an array, joining elements:', text);
      return text.join('').replace(/,\s*$/, '').trim();
    }
    if (typeof text === 'object') {
      console.warn('Text is an object, converting to string:', text);
      return JSON.stringify(text).replace(/,\s*$/, '').trim();
    }
    if (typeof text !== 'string') {
      console.warn('Invalid text type:', typeof text, text);
      return '';
    }
    return text.replace(/,\s*$/, '').trim();
  };

  // Render Markdown to HTML and sanitize
  const renderMarkdown = (text) => {
    const cleanText = sanitizeText(text);
    try {
      const markdownHtml = marked(cleanText); // Convert Markdown to HTML
      return DOMPurify.sanitize(markdownHtml, {
        ALLOWED_TAGS: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'strong',
          'em',
          'del',
          'ul',
          'ol',
          'li',
          'a',
          'img',
          'blockquote',
          'code',
          'pre',
          'table',
          'thead',
          'tbody',
          'tr',
          'th',
          'td',
          'br',
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class'],
      }); // Sanitize with support for tables and images
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return cleanText; // Fallback to plain text on error
    }
  };

  return (
    <div className="GPT-area w-full sm:w-[50%] lg:w-[33%] min-w-screen sm:min-w-[300px] lg:min-w-[450px] h-full flex flex-col border-r border-zinc-600 bg-[#1B1C1D]">
      <div className="title w-full h-[60px] min-h-[60px] bg-[#282A2C] flex items-center px-4 border-b border-zinc-600">
        <img className="w-6 h-6 rounded" src={logo} alt="GPT Logo" />
        <h4 className="text-white pl-3 font-medium text-sm">{title}</h4>
      </div>
      <div
        className="LLM_Content p-4 flex-1 overflow-y-auto"
        ref={contentRef} // Attach ref to scrollable div
      >
        <div className="flex flex-col gap-4">

        {messages.length === 0 && id === 0 && (
        <div className="flex h-[300px] items-center justify-center flex-col ">
            <h1 className="text-white text-3xl p-5 text-center">
            {[
                "What's on the agenda today?",
                "Good to see you",
                "Ready when you are.",
                "Hey there! What’s on your mind?"
            ][Math.floor(Math.random() * 3)]}
            </h1>
            <p className="text-white">
            I am OpenAI's <span className="text-amber-300">ChatGPT 4 Turbo</span>
            </p>
        </div>
        )}

        {messages.length === 0 && id === 1 && (() => {
            // Helper function to generate a random HSL color string
            const getRandomColor = () => {
                const hue = Math.floor(Math.random() * 360);
                return `hsl(${hue}, 90%, 65%)`;
            };

            // Generate two random colors for the gradient
            const color1 = getRandomColor();
            const color2 = getRandomColor();

            const gradientStyle = {
                backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
                WebkitBackgroundClip: 'text', // Necessary for cross-browser compatibility
                backgroundClip: 'text',
                color: 'transparent',
            };

            return (
                <div className="flex h-[300px] items-center justify-center flex-col">
                    <h1 className="text-3xl p-5 text-center font-bold" style={gradientStyle}>
                        Hello, Master
                    </h1>
                    <p className="text-white">
                        I am <span className="font-semibold text-red-200" >Gemini 2.5 Flash</span>
                    </p>
                </div>
            );
        })()}


        {messages.length === 0 && id === 2 && (
        <div className="flex h-[300px] items-center justify-center flex-col ">
            <h1 className="text-white text-3xl p-5 text-center">
                Llama 3
            </h1>
            <p className="text-white">
            Industry Leading <span className="text-blue-300">Open Source</span> LLM
            </p>
        </div>
        )}

          {messages?.map((message, idx) => (
            <ErrorBoundary key={idx}>
              <div className="flex gap-3 items-start">
                <div className="provider-logo flex-shrink-0">
                  <img
                    className="w-6 h-6 rounded"
                    src={message?.provider || ''}
                    alt="provider"
                    onError={(e) => (e.target.src = 'fallback-image.png')}
                  />
                </div>
                <div
                  className="LLM_main_content flex-1 min-w-0 text-white markdown-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(message?.text) }}
                />
              </div>
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GPTArea;