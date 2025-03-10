"use client";

import { FC } from "react";
import { FaHotel, FaBed, FaUtensils, FaStar } from "react-icons/fa";

const Facilities: FC = () => {
	const backgroundImageUrl = "/images/cover-image-2.png";

	const facilities = [
		{
			icon: <FaHotel className="text-orange-500 text-6xl" />,
			title: "Basic Facilities",
			features: [
				"Reception / Front Desk",
				"Room Services",
				"House Keeping",
				"Wifi & Parking",
			],
		},
		{
			icon: <FaBed className="text-orange-500 text-6xl" />,
			title: "Room Amenities",
			features: [
				"Comfortable Bedding",
				"Bed Room and Pool",
				"TV and AC",
				"Bar",
			],
		},
		{
			icon: <FaUtensils className="text-orange-500 text-6xl" />,
			title: "Dining Options",
			features: [
				"Restaurant Cafe",
				"Bar & Lounge",
				"Cafe & Canteen",
				"Room Service",
			],
		},
		{
			icon: <FaStar className="text-orange-500 text-6xl" />,
			title: "Special Features",
			features: ["Custom Rooms", "Cricket Ground", "Gym"],
		},
	];

	return (
		<section className="relative w-full py-16 px-8 shadow-lg overflow-hidden rounded-2xl my-8">
			{/* Blurred Background */}
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
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

			{/* Content */}
			<div className="relative z-20 max-w-6xl mx-auto text-center text-white">
				<h1 className="text-3xl sm:text-4xl font-bold">
					Our  <span className="text-orange-500">Best Services</span>
				</h1>

				{/* Facilities Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ">
					{facilities.map((facility, index) => (
						<div
							key={index}
							className={`p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-all duration-300 border-2 backdrop-blur-sm bg-opacity-20 dark:bg-transparent
							 hover:scale-105 hover:shadow-lg hover:border-orange-400`}
						>
							<div className="flex justify-center ">
								{facility.icon}
							</div>
							<h3 className=" text-white text-xl font-semibold text-center mt-4  dark:text-white mt-4">
								{facility.title}
							</h3>
							<ul className="mt-8 text-white dark:text-gray-300 text-sm space-y-2">
								{facility.features.map((feature, idx) => (
									<li key={idx}>- {feature}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Facilities;
