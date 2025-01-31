import ClientComponent from "./ClientComponent";
import { heading1, section2 } from "./ServerComponent";

const HeroSection = () => {
	const backgroundImageUrl = "/images/cover-image.png";

	return (
		<div
			className="relative flex items-center justify-center overflow-hidden"
			style={{
				height: "100vh",
			}}
		>
			{/* Blurred Background Image */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					// filter: "blur(1px)", // Adjust the blur intensity
					transform: "scale(1.1)", // Scale up to avoid white edges
				}}
			></div>

			{/* Optional Overlay */}
			{/* <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div> */}

			{/* Content */}
			<div className="relative z-20">
				<ClientComponent section2={section2} heading1={heading1} />
			</div>
		</div>
	);
};

export default HeroSection;
