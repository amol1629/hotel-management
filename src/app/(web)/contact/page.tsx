import { FC } from "react";
import Image from "next/image"; // Import the Image component
import { developers } from "@/data/developers";

interface Developer {
	name: string;
	role: string;
	description: string;
	image: string;
}

const ContactPage: FC = () => {
	// Background Image and Room Data inside the component
	const backgroundImageUrl = "/images/cover-image-2.png";
	return (
		<div className="relative flex items-center justify-center py-12 min-h-[calc(100vh-80px)] overflow-hidden">
			{/* Background Image */}
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
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-2xl"></div>

			{/* Content */}
			<div className="relative z-20 container mx-auto px-4">
				{/* <h1 className="text-4xl font-bold text-center text-white mb-12 animate-fade-in-down">
					Meet Our Developers
				</h1> */}
				<h1 className="text-4xl font-bold text-center text-white mb-12 animate-fade-in-down">
					Meet Our <span className="text-orange-500">Developers</span>
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{developers.map((developer, index) => (
						<div
							key={index}
							className="rounded-2xl shadow-2xl border hover:border-orange-400 overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl animate-fade-in-up duration-300 ease-in-out"
						>
							{/* Circular Image */}
							<div className="flex justify-center my-8">
								<div className="w-72 h-72 rounded-full overflow-hidden border-4 border-orange-400">
									<Image
										src={developer.image}
										alt={developer.name}
										width={120} // Match the width of the container
										height={120} // Match the height of the container
										className="w-full h-full object-center"
										priority // Optional: Preload important images
									/>
								</div>
							</div>

							{/* Developer Details */}
							<div className="p-6 dark:bg-gray-800 bg-opacity-10 backdrop-blur-lg rounded-2xl text-center">
								<h2 className="text-2xl font-bold text-gold">
									{developer.name}
								</h2>
								<p className="text-sm my-2 text-orange-500">
									({developer.role})
								</p>
								<p className="mt-4 text-white">
									{developer.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Contact Information */}
				<div className="mt-12 text-center animate-fade-in-up">
					<p className="text-white text-lg">
						Interested in working with us? Reach out at{" "}
						<a
							href="mailto:contact@example.com"
							className="underline text-orange-300 hover:text-orange-200"
						>
							contact@example.com
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
