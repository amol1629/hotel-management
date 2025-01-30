import ClientComponent from "./ClientComponent";

import { heading1, section2 } from "./ServerComponent";

const HeroSection = () => {
	return (
		<div className="bg-[#fff9fd] dark:bg-transparent  shadow my-8">
			<ClientComponent section2={section2} heading1={heading1} />
		</div>
	);
};

export default HeroSection;
