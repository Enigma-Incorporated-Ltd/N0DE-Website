 
import HeroHomeTwo from "./HeroHomeTwo";
import AboutHomeTwo from "./AboutHomeTwo";
import ServiceHomeTwo from "./ServiceHomeTwo";
import AboutusHomeTwo from "./AboutusHomeTwo";
import TestimonialHomeTwo from "./TestimonialHomeTwo";
import PricingHomeTwo from "./PricingHomeTwo";
import FaqHomeTwo from "./FaqHomeTwo";
import BlogHomeTwo from "./BlogHomeTwo"; 
import HeaderOne from "../../../layouts/headers/HeaderOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import Wrapper from "../../../common/Wrapper";

const HomeTwo = () => {
	return (
    <Wrapper>
		<div className="bg-darkk">
			<HeaderOne />
      <HeroHomeTwo />
      <AboutHomeTwo />
      <ServiceHomeTwo />
      <AboutusHomeTwo />
      <TestimonialHomeTwo />
      <PricingHomeTwo />
      <FaqHomeTwo />
      <BlogHomeTwo />
      {/* <FooterOne style_2={true} /> */}
		</div>    
    </Wrapper>
	);
};

export default HomeTwo;
