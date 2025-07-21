import ServiceHomeThree from "../homes/home-3/ServiceHomeThree";
import AppAreaHomeOne from "../homes/home/AppAreaHomeOne";
import TestimonialAreaHomeOne from "../homes/home/TestimonialAreaHomeOne";
import InstagramHomeOne from "../homes/home/InstagramHomeOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../../common/Bredcrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import Wrapper from "../../common/Wrapper";

const Service = () => {
	return (
		<Wrapper>
			<div className="bg-dark">
				<HeaderOne />
				<Breadcrumb title="Service" subtitle="Service" />
				<ServiceHomeThree />
				<AppAreaHomeOne />
				<TestimonialAreaHomeOne />
				<InstagramHomeOne />
			</div>
		</Wrapper>
	);
};

export default Service;
