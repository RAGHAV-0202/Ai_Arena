import image1 from "../assets/img1.avif";
import image2 from "../assets/img2.avif";
import image3 from "../assets/img3.avif";
import image4 from "../assets/img4.avif";
import image5 from "../assets/img5.avif";

const Circles = ({ logo, z, translate }) => {
  return (
    <div
      className={`
        circles 
        flex items-center justify-center 
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]
        rounded-full 
        border border-white/20 
        bg-gradient-to-br from-[#2a2a2a]/70 to-[#1a1a1a]/40 
        backdrop-blur-md 
        shadow-[0_4px_15px_rgba(0,0,0,0.4)] 
        transition-all duration-300 ease-in-out 
        hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)]
      `}
      style={{ 
        transform: `translateX(${translate})`, 
        zIndex: z 
      }}
    >
      <img 
        src={logo} 
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
        alt="llm logo" 
      />
    </div>
  );
};

const CircleWithTick = () => {
  return (
    <div className="circles flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-white/20 bg-gradient-to-br from-[#2a2a2a]/70 to-[#1a1a1a]/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out flex-shrink-0">
      <i className="fa-solid fa-check text-white text-xs sm:text-sm"></i>
    </div>
  );
};

const Features = () => {
  const featuresData = [
    {
      image: image3,
      logos: [
        "https://img.icons8.com/ios_filled/512/FFFFFF/chatgpt.png",
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png",
        "https://cdn-icons-png.flaticon.com/512/6033/6033716.png"
      ],
      title: "Compare All AI Models at Once",
      description: "with AI Arena, you get access to multiple top‑tier models, all in one place. Compare their responses side‑by‑side to experience faster, smarter, and most accurate answers.",
      benefits: [
        "Save hours of manual comparison",
        "Customize your AI team instantly",
        "Never miss the most accurate answer again"
      ],
      video: "https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c388a684754bf038d1902_feature1-transcode.mp4"
    },
    {
      image: image2,
      logos: ["https://cdn-icons-png.flaticon.com/512/867/867926.png"],
      title: "Enable or Disable LLM",
      description: "with AI Arena, you can enable or disable LLMs as per your need, Compare their responses side‑by‑side to choose the better one and disable other to save the environment",
      benefits: [
        "Save Environment",
        "Power in your Hand",
        "Save Billing cost"
      ],
      video: "https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c38e5d88c62041f8e95e2_feature4-transcode.mp4"
    },
    {
      image: image4,
      logos: ["https://png.pngtree.com/png-clipart/20250109/original/pngtree-a-logo-of-ai-png-image_20132701.png"],
      title: "Generate Images & Transcribe Audio (coming soon)",
      description: "Bring your creative and content ideas to life instantly with AI-powered image generation and fast, accurate audio transcription — no extra tools needed.",
      benefits: [
        "Generate high-quality images for any purpose.",
        "Get instant, clear transcripts from your recorded audio",
        "Effortlessly edit outputs to meet specific project needs."
      ],
      video: "https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c38d4ba5efda8b7d1b99f_feature3-transcode.mp4"
    }
  ];

  return (
    <section id="Features"  className="w-full min-h-screen mt-8 py-4 flex flex-col gap-6 sm:gap-8">
      {featuresData.map((feature, index) => (
        <div 
          key={index}
          className="feature flex flex-col w-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border-[0.5px] border-zinc-400 p-4 sm:p-6 lg:p-8"   
          style={{
            backgroundImage: `url(${feature.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Icons */}
          <div className="icons w-full h-16 sm:h-20 flex-row items-center flex mb-4">
            {feature.logos.map((logo, logoIndex) => (
              <Circles 
                key={logoIndex}
                logo={logo} 
                z={logoIndex + 1} 
                translate={`${logoIndex * -15}px`} 
              />
            ))}
          </div>

          {/* Content */}
          <div className="content flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-4 lg:space-y-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                {feature.title}
              </h2>
              <p className="text-[#A4A4A4] text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits List */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex flex-row items-start gap-3 sm:gap-4">
                    <CircleWithTick />
                    <p className="text-xs sm:text-sm lg:text-base font-normal leading-relaxed flex-1">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Video */}
            <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-80 xl:h-96 relative">
              <div className="
                w-full h-full 
                lg:translate-x-[5%] lg:translate-y-[10%] xl:translate-x-[10%] xl:translate-y-[20%]
                bg-white/10 border-4 sm:border-6 lg:border-8 border-white/50 
                rounded-2xl sm:rounded-3xl backdrop-blur-2xl 
                shadow-[0_0_20px_rgba(255,255,255,0.5)]
                overflow-hidden
              ">
                <video
                  className="rounded-xl sm:rounded-2xl w-full h-full object-cover transform scale-105"
                  src={feature.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;