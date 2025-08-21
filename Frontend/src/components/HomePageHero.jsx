import RotatingText from "../UI/Components/RotatingText.jsx";
import StarBorder from "../UI/Components/Border.jsx";

const Hero = () => {
  return (
    <div className="hero w-full min-h-[500px] mt-16 sm:mt-20 lg:mt-24 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          
          <div className="max-w-fit h-auto px-4 py-2 items-center justify-center bg-[#1D0E07]/40 backdrop-blur-md flex rounded-full border border-red-900">
            <p className="text-xs sm:text-sm font-light text-white whitespace-nowrap">Built By Raghav</p>
          </div>

         
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
            World's Most Powerful AIs in <br className="hidden sm:block" />
            One{" "}
            <span className="bg-transparent text-white inline-flex items-center">
              <RotatingText
                texts={['Chat', 'Place', 'Account', 'Website!']}
                mainClassName="text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 500 }}
                rotationInterval={3000}
              />
            </span>
          </h1>

          
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-lg">
            Stop juggling tabs and subscriptions - AI Arena gives you access to all best-in-class AI models for free. That's better than paying for a premium AI chat subscription.
          </p>

          
          <div className="mt-8">
            <a href="/register" className="inline-block">
              <StarBorder
                as="button"
                className="custom-class p-3 sm:p-4 transition-transform duration-300 hover:scale-110 text-sm sm:text-base"
                color="cyan"
                speed="5s"
              >
                Get Started Now
                <i className="fa-solid fa-arrow-right text-white pl-2"></i>
              </StarBorder>
            </a>
          </div>
        </div>

        
        <div className="right w-full md:w-1/2 h-[300px] md:h-[470px] relative mx-auto">
          {/* Glowing border */}
          <div className="absolute inset-0 rounded-2xl p-1 pointer-events-none">
            <div
              className="w-full h-full rounded-2xl bg-[url('https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2/689b2a19c281b2786a29fbae_div%201.avif')] bg-cover bg-center filter blur-xl"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>

          {/* Video container */}
          <div className="relative w-full  overflow-hidden rounded-2xl translate-y-[20%]">
            <video
              className="w-full h-full object-cover rounded-2xl"
              src="https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c3850b8428d2531672b1f_hero-transcode.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>


      </div>
    </div>
  );
};

export default Hero;