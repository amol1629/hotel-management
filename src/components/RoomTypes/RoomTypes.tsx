<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
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
<<<<<<< HEAD
					backgroundImage: `url(${backgroundImageUrl})`,
=======
					// backgroundImage: `url(${backgroundImageUrl})`,
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
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
<<<<<<< HEAD
				<p className="mb-12 text-lg sm:text-xl font-medium">
=======
				<p className="mb-12 text-lg sm:text-xl font-medium ">
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
					Experience unparalleled comfort and luxury at StayHub, where
					we offer a variety of accommodations to suit your needs:
				</p>

<<<<<<< HEAD
				{/* Room Types - Responsive Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 place-items-center w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
					{rooms.map((room, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center rounded-full border-2 border-white hover:border-orange-400 
							min-w-[80px] min-h-[80px] sm:min-w-[100px] sm:min-h-[100px] lg:min-w-[140px] lg:min-h-[140px] 
							p-3 bg-white bg-opacity-20 backdrop-blur-sm dark:bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg"
						>
							<div className="text-orange-400 font-bold text-lg sm:text-xl lg:text-2xl">
=======
				{/* Room Types */}
				<div className="grid grid-cols-3 gap-6 sm:gap-8 place-items-center">
					{rooms.map((room, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center rounded-full border border-pink-300 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-3 bg-white bg-opacity-20 backdrop-blur-sm dark:bg-transparent"
						>
							<div className="text-white text-lg sm:text-xl lg:text-2xl font-bold">
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
								<CountUpNumber
									duration={4000}
									endValue={room.value}
								/>
							</div>
<<<<<<< HEAD
							<div>
								<p className="text-sm font-bold sm:text-md lg:text-lg text-center mt-4 text-white">
									{room.label}
								</p>
							</div>
=======
							<p className="text-xs sm:text-sm lg:text-md text-center mt-2 text-white">
								{room.label}
							</p>
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RoomTypes;
