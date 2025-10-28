 
import FaqHomeOne from '../homes/home/FaqHomeOne';
import PricingAreaHomeOne from '../homes/home/PricingAreaHomeOne';
import VideoAreaHomeOne from '../homes/home/VideoAreaHomeOne'; 
import BlogHomeOne from '../homes/home/BlogHomeOne';
import Wrapper from '../../common/Wrapper';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Bredcrumb';
import FooterOne from '../../layouts/footers/FooterOne';

const Faq = () => {
  return (
    <Wrapper>
    <div className="bg-dark">
      <HeaderOne />
      <Breadcrumb title="FAQ" subtitle="FAQ" />
      <FaqHomeOne />
      <PricingAreaHomeOne />
      <VideoAreaHomeOne />
      <BlogHomeOne style_2={true} />
      <FooterOne />
    </div>
    </Wrapper>
  );
};

export default Faq;