import Breadcrumb from "../../common/Bredcrumb";
import Wrapper from "../../common/Wrapper";
import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";
import BlogArea from "./BlogArea";
import { Helmet } from "react-helmet";
const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog — N0DE News & Guides</title>

        <meta
          name="description"
          content="Read the latest N0DE news, updates, and performance tips."
        />
        <link rel="canonical" href="https://n0de.gg/blog" />

        <meta property="og:title" content="Blog — N0DE News & Guides" />
        <meta
          property="og:description"
          content="Read the latest N0DE news, updates, and performance tips."
        />
        <meta property="og:url" content="https://n0de.gg/blog" />
        <meta
          property="og:image"
          content="https://n0de.gg/assets/img/nodeWhite.png"
        />
        <meta property="og:image:width" content="2044" />
        <meta property="og:image:height" content="519" />

        <meta property="og:type" content="website" />
      </Helmet>
      <Wrapper>
        <div className="bg-dark">
          <HeaderOne />
          <Breadcrumb title="Blog Grid" subtitle="Blog Grid" />
          <BlogArea />
          <FooterOne />
        </div>
      </Wrapper>
    </>
  );
};

export default Blog;
