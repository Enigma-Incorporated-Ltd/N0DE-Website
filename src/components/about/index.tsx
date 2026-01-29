import AboutAreaHomeOne from "../homes/home/AboutAreaHomeOne";
import BrandsHomeThree from "../homes/home-3/BrandsHomeThree";
import HowItWorksAreaHomeOne from "../homes/home/HowItWorksAreaHomeOne";
import TextSliderHomeOne from "../homes/home/TextSliderHomeOne";
import InstagramHomeOne from "../homes/home/InstagramHomeOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";
import Breadcrumb from "../../common/Bredcrumb";
import Wrapper from "../../common/Wrapper";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About N0DE — The Ultimate Gaming Network</title>

        <meta
          name="description"
          content="Discover N0DE, our mission, and how we help gamers and streamers enjoy better network performance."
        />

        <link rel="canonical" href="https://n0de.gg/about" />

        <meta
          property="og:title"
          content="About N0DE — The Ultimate Gaming Network"
        />
        <meta
          property="og:description"
          content="Discover N0DE, our mission, and how we help gamers and streamers enjoy better network performance."
        />
        <meta
          property="og:image"
          content="https://n0de.gg/assets/img/nodeWhite.png"
        />
        <meta property="og:image:width" content="2044" />
        <meta property="og:image:height" content="519" />
        <meta property="og:url" content="https://n0de.gg/about" />
        <meta property="og:type" content="website" />
      </Helmet>
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
    </>
  );
};

export default About;
