 
import Breadcrumb from "../../common/Bredcrumb";
import Wrapper from "../../common/Wrapper";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import BlogArea from "./BlogArea"; 
 

const Blog = () => {
  return (
    <Wrapper>
    <div className="bg-dark">
      <HeaderOne />
      <Breadcrumb title="Blog Grid" subtitle="Blog Grid" />
      <BlogArea />
      {/* <FooterOne /> */}
    </div>
    </Wrapper>
  );
};

export default Blog;