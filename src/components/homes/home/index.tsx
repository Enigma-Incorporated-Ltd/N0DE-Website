import HeroArea from "./HeroArea";
import AboutAreaHomeOne from "./AboutAreaHomeOne";
import TextSliderHomeOne from "./TextSliderHomeOne";
import HelpAreaHomeOne from "./HelpAreaHomeOne";
import InfoAreaHomeOne from "./InfoAreaHomeOne";
import AppAreaHomeOne from "./AppAreaHomeOne";
import VideoAreaHomeOne from "./VideoAreaHomeOne";
import PricingAreaHomeOne from "./PricingAreaHomeOne";
import FaqHomeOne from "./FaqHomeOne";
import BlogHomeOne from "./BlogHomeOne";
import InstagramHomeOne from "./InstagramHomeOne";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import Wrapper from "../../../common/Wrapper";
import DownloadAreaHomeOne from "./DownloadAreaHomeOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import SecurityHomeOne from "./SecurityHomeOne";
// import { lazy } from "react";
// import { Suspense } from "react";

// const VideoAreaHomeOne = lazy(() => import("./VideoAreaHomeOne"));

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
        <SecurityHomeOne />
        <BlogHomeOne />
        <InstagramHomeOne />
        <FooterOne />
      </div>
    </Wrapper>
  );
};

export default HomeOne;
