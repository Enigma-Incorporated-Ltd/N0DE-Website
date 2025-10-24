 
import Breadcrumb from "../../common/Bredcrumb";
import Wrapper from "../../common/Wrapper";
import HeaderOne from "../../layouts/headers/HeaderOne";
import BlogDetailsArea from "./BlogDetailsArea";

const BlogDetails = () => {
	return (
		<Wrapper>
		<div className="bg-dark">
			<HeaderOne />
			<Breadcrumb title="Blog Details" subtitle="Blog Details" />
			<BlogDetailsArea />
			{/* <FooterOne /> */}
		</div>
		</Wrapper>
	);
};

export default BlogDetails;
