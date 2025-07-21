 
import PricingAreaHomeOne from '../homes/home/PricingAreaHomeOne';
import TestimonialAreaHomeOne from '../homes/home/TestimonialAreaHomeOne';
import BlogHomeOne from '../homes/home/BlogHomeOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Bredcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import Wrapper from '../../common/Wrapper';

const Pricing = () => {
  return (
    <Wrapper>
    <div className="bg-dark">
      <HeaderOne />
      <Breadcrumb title="Pricing" subtitle="Pricing" />
      <PricingAreaHomeOne />
      <TestimonialAreaHomeOne />
      <BlogHomeOne />
      {/* <FooterOne /> */}
    </div>
    </Wrapper>
  );
};

export default Pricing;