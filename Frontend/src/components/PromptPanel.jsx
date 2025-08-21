const PromptPanel = ({ handlePrompt, textareaRef , loading }) => {
  return (
    <div className="input_area w-full max-w-4xl h-[60px] rounded-2xl border border-zinc-600 bg-[#282A2C] p-3 flex items-center gap-3">
      <div className="flex items-center text-zinc-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
        </svg>
      </div>
      <input
        ref={textareaRef}
        disabled={loading}
        placeholder={loading ? "Processing..." : "Ask Here"}
        className="text-white bg-transparent border-none outline-none font-medium flex-1 text-sm placeholder-zinc-400"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handlePrompt();
          }
        }}
      />
      
      <button 
        onClick={handlePrompt}
        className="text-zinc-400 hover:text-white transition-colors p-1"
      >
        {loading && <i class="fa-solid fa-hourglass-start"></i>}
        {!loading &&
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        }

      </button>
    </div>
  );
};

export default PromptPanel