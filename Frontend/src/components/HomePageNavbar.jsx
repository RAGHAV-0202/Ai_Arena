import TrueFocus from "../UI/Components/TrueFocus.jsx";
import StarBorder from "../UI/Components/Border.jsx";


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

export default Navbar