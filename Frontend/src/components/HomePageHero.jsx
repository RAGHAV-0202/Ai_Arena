import RotatingText from "../UI/Components/RotatingText.jsx";
import StarBorder from "../UI/Components/Border.jsx";


const Hero = ()=>{
  return(
    <div className="hero 0 w-full h-[500px] mt-[90px] p-5 flex flex-row">

      <div className="left w-[50%]  flex flex-col">
        <div className="max-w-fit h-[38px] px-[16px] py-[8px] items-center justify-center bg-[#1D0E07]/40 backdrop-blur-md flex p-3 rounded-[99px] border-[1px] border-red-900">
          <p className="text-[14px] font-light text-white">Built By Raghav</p>
        </div>

        <h4 className="text-[56px] pt-3 font-extrabold">
          World's Most Powerful AIs in <br></br>One{" "}
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
        </h4>
        <p className="text-[14px] text-zinc-400 font-normal leading-normal">
          Stop juggling tabs and subscriptions - AI Arena gives you access to all best-in-class AI models for free. That's better than paying for a  premium AI chat subscription.
        </p>

        <a href="/register" className="mt-10 inline-block">
          <StarBorder
            as="button"
            className="custom-class p-[12px] transition-transform duration-300 hover:scale-110"
            color="cyan"
            speed="5s"
          >
            Get Started Now
            <i className="fa-solid fa-arrow-right text-white pl-2"></i>
          </StarBorder>
        </a>

      


      </div>

      <div className="right w-[50%] h-auto relative overflow-hidden ">
        <div className="p-3 items-center justify-center w-full h-full flex bg-[url('https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2/689b2a19c281b2786a29fbae_div%201.avif')] bg-cover bg-center rounded-2xl">
          
          <video
            className="rounded-2xl"
            src="https://cdn.prod.website-files.com/689597cc2d57ee623f5a24a2%2F689c3850b8428d2531672b1f_hero-transcode.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>        
      </div>
    </div>
  )
}

export default Hero