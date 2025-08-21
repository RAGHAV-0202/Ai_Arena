import image1 from "../assets/img1.avif"
import image2 from "../assets/img2.avif"
import image3 from "../assets/img3.avif"
import image4 from "../assets/img4.avif"
import image5 from "../assets/img5.avif"


const Circles = ({ logo, z, translate }) => {
  return (
    <div
      className={`
        circles 
        flex items-center justify-center 
        w-[60px] h-[60px] 
        rounded-full 
        border border-white/20 
        bg-gradient-to-br from-[#2a2a2a]/70 to-[#1a1a1a]/40 
        backdrop-blur-md 
        shadow-[0_4px_15px_rgba(0,0,0,0.4)] 
        transition-all duration-300 ease-in-out 
        hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)]
      `}
      style={{ transform: `translateX(${translate})`, zIndex: z }}
    >
      <img 
        src={logo} 
        className="w-[30px] h-[30px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
        alt="llm logo" 
      />
    </div>
  );
};

const CircleWithTick = () => {
  return (
    <div
      className={`
        circles 
        flex items-center justify-center 
        w-[30px] h-[30px] 
        rounded-full 
        border border-white/20 
        bg-gradient-to-br from-[#2a2a2a]/70 to-[#1a1a1a]/40 
        backdrop-blur-md 
        shadow-[0_4px_15px_rgba(0,0,0,0.4)] 
        transition-all duration-300 ease-in-out 
      `}
    >
      <i class="fa-solid fa-check text-white"></i>
    </div>
  );
};


const Features = ()=>{
  return(
    <div className="bg-red w-full  min-h-screen z-20  mt-5 py-4 flex flex-col gap-8"  >

        <div className="feature flex flex-col w-full h-[20vh] min-h-[500px]  rounded-3xl overflow-hidden border-[0.5px] border-zinc-400 p-8"   style={{backgroundImage: `url(${image3})`,backgroundSize: "cover",backgroundPosition: "center",}}>
                <div className="icons  w-full h-[80px] flex-row items-center flex">
                <Circles logo="https://img.icons8.com/ios_filled/512/FFFFFF/chatgpt.png" z={1} translate="0px" />
                <Circles logo="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" z={2} translate="-20px" />
                <Circles logo="https://cdn-icons-png.flaticon.com/512/6033/6033716.png" z={3} translate="-40px" />
                </div>

                <div className="content h-full flex flex-row">
                <div className="left w-[50%] flex flex-col px-5">
                    <h4 className="py-5">Compare All AI Models at Once</h4>
                    <p className="text-[#A4A4A4] text-[16px] font-normal leading-normal" >with AI Arena, you get access to multiple top‑tier models, all in one place. Compare their responses side‑by‑side to experience faster, smarter, and most accurate answers.</p>

                    <div className="flex gap-3  mt-5 flex-col" >
                    <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Save hours of manual comparison</p>
                    <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Customize your AI team instantly</p>
                    <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Never miss the most accurate answer again</p>
                            
                    </div>

                </div>
                <div
                    className="
                    right flex w-[50%] translate-x-[10%] translate-y-[20%]
                    bg-white/10 border-[8px] border-white/50 
                    rounded-3xl backdrop-blur-2xl 
                    shadow-[0_0_20px_rgba(255,255,255,0.5)]
                    overflow-hidden
                    "
                >
                <video
                    className="rounded-2xl translate-y-[-5%] translate-x-[-0.5%]"
                    src="https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c388a684754bf038d1902_feature1-transcode.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                </div>

                </div>
        </div>

        <div className="feature flex flex-col w-full h-[20vh] min-h-[500px]  rounded-3xl overflow-hidden border-[0.5px] border-zinc-400 p-8"   style={{backgroundImage: `url(${image2})`,backgroundSize: "cover",backgroundPosition: "center",}}>
            <div className="icons  w-full h-[80px] flex-row items-center flex">
            <Circles logo="https://cdn-icons-png.flaticon.com/512/867/867926.png" z={1} translate="0px" />
            </div>

            <div className="content h-full flex flex-row">
            <div className="left w-[50%] flex flex-col px-5">
                <h4 className="py-5">Enable or Disble LLM</h4>
                <p className="text-[#A4A4A4] text-[16px] font-normal leading-normal" >with AI Arena, you can enable or disable LLMs as per your need, Compare their responses side‑by‑side to choose the better one and disable other to save the environment</p>

                <div className="flex gap-3  mt-5 flex-col" >
                <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Save Environment</p>
                <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Power in your Hand</p>
                <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Save Billing cost</p>
                        
                </div>

            </div>
            <div
                className="
                right flex w-[50%] translate-x-[10%] translate-y-[20%]
                bg-white/10 border-[8px] border-white/50 
                rounded-3xl backdrop-blur-2xl 
                shadow-[0_0_20px_rgba(255,255,255,0.5)]
                overflow-hidden
                "
            >
            <video
                className="rounded-2xl translate-y-[-5%] translate-x-[-0.5%]"
                src="https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c38e5d88c62041f8e95e2_feature4-transcode.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            </div>

            </div>
        </div>

        <div className="feature flex flex-col w-full h-[20vh] min-h-[500px]  rounded-3xl overflow-hidden border-[0.5px] border-zinc-400 p-8"   style={{backgroundImage: `url(${image4})`,backgroundSize: "cover",backgroundPosition: "center",}}>
            <div className="icons  w-full h-[80px] flex-row items-center flex">
            <Circles logo="https://png.pngtree.com/png-clipart/20250109/original/pngtree-a-logo-of-ai-png-image_20132701.png" z={1} translate="0px" />
            </div>

            <div className="content h-full flex flex-row">
            <div className="left w-[50%] flex flex-col px-5">
                <h4 className="py-5">Generate Images & Transcribe Audio <br></br> (coming soon)</h4>
                <p className="text-[#A4A4A4] text-[16px] font-normal leading-normal" >Bring your creative and content ideas to life instantly with AI-powered image generation and fast, accurate audio transcription — no extra tools needed.</p>

                <div className="flex gap-3  mt-5 flex-col" >
                <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Generate high-quality images for any purpose.</p>
                <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Get instant, clear transcripts from your recorded audi</p>
                <p className="flex flex-row text-[15px] items-center gap-5 font-normal"><CircleWithTick/> Effortlessly edit outputs to meet specific project needs.</p>
                        
                </div>

            </div>
            <div
                className="
                right flex w-[50%] translate-x-[10%] translate-y-[20%]
                bg-white/10 border-[8px] border-white/50 
                rounded-3xl backdrop-blur-2xl 
                shadow-[0_0_20px_rgba(255,255,255,0.5)]
                overflow-hidden
                "
            >
            <video
                className="rounded-2xl translate-y-[-5%] translate-x-[-0.5%]"
                src="https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c38d4ba5efda8b7d1b99f_feature3-transcode.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            </div>

            </div>
        </div>


    </div>
  )
}

export default Features