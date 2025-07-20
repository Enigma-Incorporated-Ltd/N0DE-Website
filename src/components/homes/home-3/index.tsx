 
import HeroHomeThree from "./HeroHomeThree";
import ServiceHomeThree from "./ServiceHomeThree";
import AboutHomeThree from "./AboutHomeThree";
import BrandsHomeThree from "./BrandsHomeThree";
import WorkProceessHomeThree from "./WorkProceessHomeThree";
import PricingHomeThree from "./PricingHomeThree";
import FaqHomeThree from "./FaqHomeThree";
import BlogHomeThree from "./BlogHomeThree";
import CtaHomeThree from "./CtaHomeThree"; 
import GetInTouchHomeThree from "./GetInTouchHomeThree";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import Wrapper from "../../../common/Wrapper";

const HomeThree = () => {
	return (
    <Wrapper>
		<div className="bg-dark">
			<HeaderOne />
			<HeroHomeThree />
			<ServiceHomeThree />
      <AboutHomeThree />
      <BrandsHomeThree />
      <WorkProceessHomeThree />
      <PricingHomeThree />
      <FaqHomeThree />
      <BlogHomeThree />
      <CtaHomeThree />
      <GetInTouchHomeThree />
      {/* <FooterOne style_2={true} /> */}
		</div>
    
    </Wrapper>
	);
};

export default HomeThree;
