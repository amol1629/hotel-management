"use client"
import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";

const RoomTypes: FC = () => {
	// Background Image and Room Data inside the component
	const backgroundImageUrl = "/images/cover-image-2.png";

	const rooms = [
		{ label: "Basic", value: 50 },
		{ label: "Luxury", value: 120 },
		{ label: "Suite", value: 60 },
	];

	return (
		<div className="relative w-full p-10 my-8 rounded-2xl shadow-lg overflow-hidden">
			{/* Blurred Background */}
			<div
				className="absolute inset-0 z-0"
				style={{
					// backgroundImage: `url(${backgroundImageUrl})`,
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
			<div className="relative z-20 text-center text-white px-6">
				<p className="mb-12 text-lg sm:text-xl font-medium ">
					Experience unparalleled comfort and luxury at StayHub, where
					we offer a variety of accommodations to suit your needs:
				</p>

				{/* Room Types */}
				<div className="grid grid-cols-3 gap-6 sm:gap-8 place-items-center">
					{rooms.map((room, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center rounded-full border border-pink-300 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-3 bg-white bg-opacity-20 backdrop-blur-sm dark:bg-transparent"
						>
							<div className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
								<CountUpNumber
									duration={4000}
									endValue={room.value}
								/>
							</div>
							<p className="text-xs sm:text-sm lg:text-md text-center mt-2 text-white">
								{room.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RoomTypes;
