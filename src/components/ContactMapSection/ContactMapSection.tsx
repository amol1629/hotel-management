import { FC } from "react";
import Image from "next/image";

const ContactMapSection: FC = () => {
	// Background Image and Room Data inside the component
	const backgroundImageUrl = "/images/cover-image-2.png";
	return (
		<div className="py-8 rounded-2xl my-8 relative overflow-hidden">
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					filter: "blur(6px)",
					transform: "scale(1.1)",
				}}
			></div>

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10 "></div>

			<div className="relative z-20">
				<h1 className="text-3xl sm:text-4xl font-bold text-center my-8 text-white">
					Contact <span className="text-orange-500">Us</span>
				</h1>
				{/* <h3 className="text-xl font-bold mb-6 text-white">
							Get in Touch
						</h3> */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-4">
					{/* Contact Form */}
					<div className="my-6  rounded-lg shadow-lg">
						<form className="space-y-4 dark:bg-gray-800 bg-opacity-10 backdrop-blur-lg p-6 rounded-xl">
							<input
								type="text"
								placeholder="Your Name"
								className="w-full p-3 border hover:border-orange-400 rounded-lg bg-white/10 text-white focus:outline-none "
							/>
							<input
								type="email"
								placeholder="Your Email"
								className="w-full p-3 border hover:border-orange-400 rounded-lg bg-white/10 text-white focus:outline-none "
							/>
							<textarea
								placeholder="Your Message"
								rows={5}
								className="w-full p-3 border hover:border-orange-400 rounded-lg bg-white/10 text-white focus:outline-none "
							/>
							<button
								type="submit"
								className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
							>
								Send Message
							</button>
						</form>
					</div>

					{/* Embedded Google Map */}
					<div className="h-96 my-6 rounded-lg overflow-hidden shadow-lg">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32d3a1e8!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633033228937!5m2!1sen!2sau"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactMapSection;
