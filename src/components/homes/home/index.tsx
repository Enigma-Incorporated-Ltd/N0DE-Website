import HeroArea from "./HeroArea";
import AboutAreaHomeOne from "./AboutAreaHomeOne";
//import HowItWorksAreaHomeOne from "./HowItWorksAreaHomeOne";
import TextSliderHomeOne from "./TextSliderHomeOne";
import HelpAreaHomeOne from "./HelpAreaHomeOne";
import InfoAreaHomeOne from "./InfoAreaHomeOne";
import AppAreaHomeOne from "./AppAreaHomeOne";
//import TestimonialAreaHomeOne from "./TestimonialAreaHomeOne";
import VideoAreaHomeOne from "./VideoAreaHomeOne";
import PricingAreaHomeOne from "./PricingAreaHomeOne";
import FaqHomeOne from "./FaqHomeOne";
import BlogHomeOne from "./BlogHomeOne";
import InstagramHomeOne from "./InstagramHomeOne"; 
import HeaderOne from "../../../layouts/headers/HeaderOne";
import Wrapper from "../../../common/Wrapper";
//TestimonialAreaHomeOne
//HowItWorksAreaHomeOne
import DownloadAreaHomeOne from "./DownloadAreaHomeOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import SecurityHomeOne from "./SecurityHomeOne";

const HomeOne = () => {
	return (
    <Wrapper>
		<div className="bg-dark d-flex flex-column">
			<HeaderOne />
			<HeroArea />
      <AboutAreaHomeOne />
            <VideoAreaHomeOne />
      <TextSliderHomeOne />
      <InfoAreaHomeOne />
      <PricingAreaHomeOne />
      <DownloadAreaHomeOne />
      <HelpAreaHomeOne />
      <AppAreaHomeOne />
      <FaqHomeOne />
      <AboutAreaHomeOne />
      <SecurityHomeOne />
      <BlogHomeOne />
      <InstagramHomeOne />
      <FooterOne />
      {/* <FooterOne /> */}
		</div>
    </Wrapper>
	);
};

export default HomeOne;
