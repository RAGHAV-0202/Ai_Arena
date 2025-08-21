import React from "react";
import Aurora  from "../UI/Components/Aurora.jsx";
import TrueFocus from "../UI/Components/TrueFocus.jsx";
import StarBorder from "../UI/Components/Border.jsx";
import RotatingText from "../UI/Components/RotatingText.jsx";
import Particles from "../UI/Components/Particles.jsx";
import image1 from "../assets/img1.avif"
import image2 from "../assets/img2.avif"
import image3 from "../assets/img3.avif"
import image4 from "../assets/img4.avif"
import image5 from "../assets/img5.avif"


const Navbar = ()=>{
  return(
    <div className="Navbar h-[50px] flex w-full justify-between ">
        <div className="left w-[20%]">
          <TrueFocus 
          sentence="Ai Arena"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
          />
        </div>
        
        <div className="middle w-[50%] flex items-center justify-center ">
        <StarBorder
          as="button"
          className="custom-class"
          color="cyan"
          speed="5s"
        >
          <div className="h-full flex flex-row w-[250px] justify-between items-center py-0 px-[16px] rounded-[99px]">
            <a className="text-[16px] flex items-center justify-center font-normal text-white" href="#Features">Feature</a>    
            <a className="text-[16px] flex items-center justify-center font-normal text-white" href="#Pricing">Pricing</a>
            <a className="text-[16px] flex items-center justify-center font-normal text-white" href="#FAQ">FAQ</a>
          </div>
        </StarBorder>
        </div>
        <div className="right  w-[20%] flex justify-end items-center">
          <a href="/login">
            <StarBorder
              as="button"
              className="custom-class p-[12px] transition-transform duration-300 hover:scale-110"
              color="cyan"
              speed="5s"
            >
              Login
              <i class="fa-solid fa-arrow-right text-white pl-2"></i>
            </StarBorder>
          </a>
        </div>
    </div>
  )
}

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



const Features = ()=>{
  return(
    <div className="bg-red w-full  min-h-screen z-20 bg-amber-500 mt-5 py-4">

      <div className="feature flex flex-col w-full h-[20vh] min-h-[500px] bg-red-500 rounded-3xl overflow-hidden border-[0.5px] border-zinc-400 p-8">
        <div className="icons  w-full h-[80px] flex-row items-center flex">

          <div className={`circles block w-[50px] h-[50px] border-1 border-gray-400 rounded-full overflow-hidden p-2 bg-[#393939] z-[1]`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4593 12.6048C26.759 11.7164 26.8628 10.7737 26.7638 9.8414C26.6648 8.90909 26.3653 8.00924 25.8857 7.2036C24.4253 4.6956 21.4913 3.4044 18.6257 4.0116C17.991 3.30888 17.2147 2.74849 16.3479 2.36731C15.4811 1.98613 14.5434 1.79278 13.5965 1.8C10.6673 1.794 8.06813 3.6552 7.16693 6.4056C6.24059 6.59103 5.36427 6.97132 4.5961 7.52122C3.82793 8.07113 3.18547 8.77809 2.71133 9.5952C1.99466 10.8123 1.68837 12.2276 1.83768 13.6322C1.98699 15.0367 2.58399 16.356 3.54053 17.3952C3.24054 18.2837 3.13637 19.2265 3.23518 20.1591C3.33398 21.0916 3.63342 21.9917 4.11293 22.7976C5.57333 25.3056 8.50733 26.5956 11.3729 25.9896C12.0074 26.6922 12.7835 27.2524 13.6501 27.6334C14.5168 28.0144 15.4543 28.2075 16.4009 28.2C19.3325 28.2072 21.9329 26.3448 22.8341 23.592C23.7611 23.4066 24.638 23.0261 25.4066 22.4758C26.1753 21.9254 26.818 21.2178 27.2921 20.4C28.0074 19.183 28.3127 17.7683 28.163 16.3646C28.0133 14.9608 27.4165 13.6424 26.4605 12.6036L26.4593 12.6048ZM16.4021 26.4744C15.2316 26.4772 14.0967 26.0725 13.1921 25.3296C13.2329 25.308 13.3037 25.2696 13.3505 25.2408L18.6785 22.2048C18.8115 22.1306 18.9222 22.0221 18.999 21.8906C19.0758 21.7591 19.116 21.6095 19.1153 21.4572V14.046L21.3677 15.3288C21.3917 15.3408 21.4073 15.3636 21.4109 15.3888V21.5268C21.4073 24.2556 19.1669 26.4684 16.4021 26.4744ZM5.62973 21.936C5.04248 20.9371 4.8306 19.7615 5.03213 18.6204C5.07053 18.6444 5.14013 18.6864 5.18933 18.714L10.5173 21.75C10.7873 21.906 11.1221 21.906 11.3933 21.75L17.8973 18.0444V20.61C17.8979 20.6232 17.8952 20.6363 17.8895 20.6482C17.8839 20.6601 17.8755 20.6705 17.8649 20.6784L12.4793 23.7456C10.0805 25.1088 7.01693 24.2976 5.63093 21.9336L5.62973 21.936ZM4.22693 10.4592C4.81647 9.4536 5.7401 8.68667 6.83693 8.292L6.83453 8.4732V14.5452C6.83379 14.6977 6.87392 14.8475 6.95074 14.9792C7.02756 15.1109 7.13826 15.2196 7.27133 15.294L13.7753 18.9984L11.5241 20.2824C11.513 20.2895 11.5003 20.2938 11.4871 20.2949C11.4739 20.2959 11.4606 20.2937 11.4485 20.2884L6.06173 17.2176C3.66773 15.8496 2.84693 12.828 4.22573 10.4616L4.22693 10.4592ZM22.7273 14.7072L16.2233 11.0016L18.4745 9.72C18.4856 9.71266 18.4982 9.70817 18.5114 9.70691C18.5246 9.70565 18.5379 9.70768 18.5501 9.7128L23.9369 12.7812C26.3345 14.1492 27.1565 17.1756 25.7717 19.5408C25.1817 20.5458 24.2588 21.3128 23.1629 21.7092V15.456C23.1637 15.3038 23.1237 15.1543 23.0471 15.0228C22.9705 14.8913 22.8601 14.7828 22.7273 14.7084V14.7072ZM24.9677 11.3796C24.9153 11.3477 24.8625 11.3165 24.8093 11.286L19.4813 8.25C19.3483 8.17345 19.1974 8.13317 19.0439 8.13317C18.8904 8.13317 18.7396 8.17345 18.6065 8.25L12.1025 11.9556V9.39C12.102 9.37683 12.1047 9.36373 12.1103 9.35182C12.116 9.3399 12.1244 9.32954 12.1349 9.3216L17.5193 6.2556C19.9193 4.8912 22.9853 5.7036 24.3677 8.0712C24.9521 9.0708 25.1657 10.242 24.9677 11.3796ZM10.8785 15.9516L8.62613 14.67C8.61437 14.6642 8.60425 14.6556 8.5967 14.6449C8.58915 14.6342 8.58441 14.6218 8.58293 14.6088V8.4708C8.58413 5.7384 10.8305 3.5244 13.6001 3.5268C14.7713 3.5268 15.9041 3.9324 16.8053 4.6716C16.7645 4.6932 16.6949 4.7316 16.6481 4.7592L11.3201 7.7952C11.1869 7.86925 11.076 7.97767 10.999 8.10916C10.922 8.24066 10.8816 8.3904 10.8821 8.5428L10.8785 15.9504V15.9516ZM12.1025 13.35L14.9993 11.7L17.8961 13.35V16.65L14.9993 18.3L12.1013 16.65V13.35H12.1025Z" fill="white"></path>
            </svg>
          </div>
          <div className={`circles block w-[50px] h-[50px] border-1 border-gray-400 rounded-full overflow-hidden p-2 bg-[#393939] z-[2] translate-x-[-20px]`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4593 12.6048C26.759 11.7164 26.8628 10.7737 26.7638 9.8414C26.6648 8.90909 26.3653 8.00924 25.8857 7.2036C24.4253 4.6956 21.4913 3.4044 18.6257 4.0116C17.991 3.30888 17.2147 2.74849 16.3479 2.36731C15.4811 1.98613 14.5434 1.79278 13.5965 1.8C10.6673 1.794 8.06813 3.6552 7.16693 6.4056C6.24059 6.59103 5.36427 6.97132 4.5961 7.52122C3.82793 8.07113 3.18547 8.77809 2.71133 9.5952C1.99466 10.8123 1.68837 12.2276 1.83768 13.6322C1.98699 15.0367 2.58399 16.356 3.54053 17.3952C3.24054 18.2837 3.13637 19.2265 3.23518 20.1591C3.33398 21.0916 3.63342 21.9917 4.11293 22.7976C5.57333 25.3056 8.50733 26.5956 11.3729 25.9896C12.0074 26.6922 12.7835 27.2524 13.6501 27.6334C14.5168 28.0144 15.4543 28.2075 16.4009 28.2C19.3325 28.2072 21.9329 26.3448 22.8341 23.592C23.7611 23.4066 24.638 23.0261 25.4066 22.4758C26.1753 21.9254 26.818 21.2178 27.2921 20.4C28.0074 19.183 28.3127 17.7683 28.163 16.3646C28.0133 14.9608 27.4165 13.6424 26.4605 12.6036L26.4593 12.6048ZM16.4021 26.4744C15.2316 26.4772 14.0967 26.0725 13.1921 25.3296C13.2329 25.308 13.3037 25.2696 13.3505 25.2408L18.6785 22.2048C18.8115 22.1306 18.9222 22.0221 18.999 21.8906C19.0758 21.7591 19.116 21.6095 19.1153 21.4572V14.046L21.3677 15.3288C21.3917 15.3408 21.4073 15.3636 21.4109 15.3888V21.5268C21.4073 24.2556 19.1669 26.4684 16.4021 26.4744ZM5.62973 21.936C5.04248 20.9371 4.8306 19.7615 5.03213 18.6204C5.07053 18.6444 5.14013 18.6864 5.18933 18.714L10.5173 21.75C10.7873 21.906 11.1221 21.906 11.3933 21.75L17.8973 18.0444V20.61C17.8979 20.6232 17.8952 20.6363 17.8895 20.6482C17.8839 20.6601 17.8755 20.6705 17.8649 20.6784L12.4793 23.7456C10.0805 25.1088 7.01693 24.2976 5.63093 21.9336L5.62973 21.936ZM4.22693 10.4592C4.81647 9.4536 5.7401 8.68667 6.83693 8.292L6.83453 8.4732V14.5452C6.83379 14.6977 6.87392 14.8475 6.95074 14.9792C7.02756 15.1109 7.13826 15.2196 7.27133 15.294L13.7753 18.9984L11.5241 20.2824C11.513 20.2895 11.5003 20.2938 11.4871 20.2949C11.4739 20.2959 11.4606 20.2937 11.4485 20.2884L6.06173 17.2176C3.66773 15.8496 2.84693 12.828 4.22573 10.4616L4.22693 10.4592ZM22.7273 14.7072L16.2233 11.0016L18.4745 9.72C18.4856 9.71266 18.4982 9.70817 18.5114 9.70691C18.5246 9.70565 18.5379 9.70768 18.5501 9.7128L23.9369 12.7812C26.3345 14.1492 27.1565 17.1756 25.7717 19.5408C25.1817 20.5458 24.2588 21.3128 23.1629 21.7092V15.456C23.1637 15.3038 23.1237 15.1543 23.0471 15.0228C22.9705 14.8913 22.8601 14.7828 22.7273 14.7084V14.7072ZM24.9677 11.3796C24.9153 11.3477 24.8625 11.3165 24.8093 11.286L19.4813 8.25C19.3483 8.17345 19.1974 8.13317 19.0439 8.13317C18.8904 8.13317 18.7396 8.17345 18.6065 8.25L12.1025 11.9556V9.39C12.102 9.37683 12.1047 9.36373 12.1103 9.35182C12.116 9.3399 12.1244 9.32954 12.1349 9.3216L17.5193 6.2556C19.9193 4.8912 22.9853 5.7036 24.3677 8.0712C24.9521 9.0708 25.1657 10.242 24.9677 11.3796ZM10.8785 15.9516L8.62613 14.67C8.61437 14.6642 8.60425 14.6556 8.5967 14.6449C8.58915 14.6342 8.58441 14.6218 8.58293 14.6088V8.4708C8.58413 5.7384 10.8305 3.5244 13.6001 3.5268C14.7713 3.5268 15.9041 3.9324 16.8053 4.6716C16.7645 4.6932 16.6949 4.7316 16.6481 4.7592L11.3201 7.7952C11.1869 7.86925 11.076 7.97767 10.999 8.10916C10.922 8.24066 10.8816 8.3904 10.8821 8.5428L10.8785 15.9504V15.9516ZM12.1025 13.35L14.9993 11.7L17.8961 13.35V16.65L14.9993 18.3L12.1013 16.65V13.35H12.1025Z" fill="white"></path>
            </svg>
          </div>



        </div>
        <div className="content h-full flex flex-row">
          <div className="left w-[50%] flex flex-col bg-green-800 ">

          </div>
          <div className="right flex bg-amber-700 w-[50%]">
            
          </div>
        </div>
      </div>


    </div>
  )
}

function HomePage() {
  return (
    <div className="relative w-screen min-h-screen flex items-center bg-black overflow-hidden flex-col h-[300vh]">
      {/* Aurora background layer */}
      {/* <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div> */}
      
      {/* Particles background layer */}


      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={2}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 text-white text-4xl font-bold p-5 w-full max-w-[1200px]"> 
        <Navbar/>
        <Hero/>
        <Features/>
      </div>
    </div>
  );
}


export default HomePage;
