 
import Breadcrumb from "../../common/Bredcrumb";
import Wrapper from "../../common/Wrapper";
import HeaderOne from "../../layouts/headers/HeaderOne";
import ServiceDetailsArea from "./ServiceDetailsArea"; 

const ServiceDetails = () => {
	return (
		<Wrapper>
		<div className="bg-dark">
			<HeaderOne />
			<Breadcrumb title="Service Details" subtitle="Service Details" />
			<ServiceDetailsArea />
			{/* <FooterOne /> */}
		</div>		
		</Wrapper>
	);
};

export default ServiceDetails;
