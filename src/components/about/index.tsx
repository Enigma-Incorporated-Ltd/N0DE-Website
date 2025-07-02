 
import AboutAreaHomeOne from "../homes/home/AboutAreaHomeOne";
import BrandsHomeThree from "../homes/home-3/BrandsHomeThree";
import HowItWorksAreaHomeOne from "../homes/home/HowItWorksAreaHomeOne";
import TextSliderHomeOne from "../homes/home/TextSliderHomeOne";
import InstagramHomeOne from "../homes/home/InstagramHomeOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../../common/Bredcrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import Wrapper from "../../common/Wrapper";

 
const About = () => {
  return (
    <Wrapper>
    <div className="bg-dark">
      <HeaderOne />
      <Breadcrumb title="About" subtitle="About" />
      <AboutAreaHomeOne />
      <BrandsHomeThree />
      <HowItWorksAreaHomeOne style_2={true} />
      <TextSliderHomeOne />
      <InstagramHomeOne />      
      <FooterOne />      
    </div>    
    </Wrapper>
  );
};

export default About;