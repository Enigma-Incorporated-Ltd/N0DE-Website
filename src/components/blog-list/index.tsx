 
import Breadcrumb from "../../common/Bredcrumb";
import Wrapper from "../../common/Wrapper";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import BlogListArea from "./BlogListArea";

 
const BlogList = () => {
  return (
    <Wrapper>
    <div className="bg-dark">
      <HeaderOne />
      <Breadcrumb title="Blog List" subtitle="Blog List" />
      <BlogListArea />
      <FooterOne />
    </div>
    </Wrapper>
  );
};

export default BlogList;