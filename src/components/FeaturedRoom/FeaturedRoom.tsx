"use client";

import { FC, useEffect, useState } from "react";
import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedRooms } from "@/libs/apis";
import Tooltip from "@mui/material/Tooltip";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";

const FeaturedRooms: FC = () => {
	const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null
	);
	const [selectedRoomImages, setSelectedRoomImages] = useState<string[]>([]);

	// Background Image (Same as Facilities)
	const backgroundImageUrl = "/images/cover-image-2.png";

	useEffect(() => {
		async function fetchRooms() {
			const rooms = await getFeaturedRooms();
			setFeaturedRooms(rooms);
		}
		fetchRooms();
	}, []);

	const handleImageClick = (roomImages: string[], index: number) => {
		setSelectedRoomImages(roomImages); // Set the images of the selected room
		setSelectedImageIndex(index); // Set the index of the clicked image
	};

	const closeModal = () => {
		setSelectedImageIndex(null); // Close the modal by resetting the index
	};

	const nextImage = () => {
		if (selectedImageIndex === null || selectedRoomImages.length === 0)
			return;
		setSelectedImageIndex((prevIndex) =>
			prevIndex !== null && prevIndex === selectedRoomImages.length - 1
				? 0
				: prevIndex !== null
				? prevIndex + 1
				: 0
		);
	};

	const prevImage = () => {
		if (selectedImageIndex === null || selectedRoomImages.length === 0)
			return;
		setSelectedImageIndex((prevIndex) =>
			prevIndex !== null && prevIndex === 0
				? selectedRoomImages.length - 1
				: prevIndex !== null
				? prevIndex - 1
				: 0
		);
	};

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
					Our <span className="text-orange-500">Featured Rooms</span>
				</h1>

				{/* Rooms Container with Flexbox */}
				<div className="flex flex-wrap justify-center items-center mt-10 gap-6">
					{featuredRooms.map((room) => (
						<div
							key={room._id}
							className="group perspective w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
						>
							{/* Flip Card Container */}
							<div className="relative w-full h-80 transition-transform duration-700 transform preserve-3d group-hover:rotate-y-180 border-2 rounded-2xl shadow-md hover:border-orange-400">
								{/* Front Side (Room Image) */}
								<div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center place-content-center bg-gray-200 rounded-2xl shadow-md overflow-hidden backface-hidden z-10">
									{room.coverImage?.url ? (
										<Image
											src={room.coverImage.url}
											alt={room.name}
											layout="fill"
											objectFit="cover"
											className="rounded-xl cursor-pointer"
											onClick={() =>
												handleImageClick(
													room.images.map(
														(img) => img.url
													),
													0
												)
											} // Open image slider
										/>
									) : (
										<div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700">
											<p className="text-gray-500 dark:text-gray-300">
												No Image
											</p>
										</div>
									)}
									<div className="absolute bottom-4 left-0 right-0 text-center">
										<p className="bg-orange-500 text-white text-lg font-bold py-2 px-4 rounded-lg inline-block">
											{room.name}
										</p>
									</div>
								</div>

								{/* Back Side (Room Details) with Glassy Background */}
								<div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg rotate-y-180 backface-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
									<p className="text-sm bg-green-600 text-white px-3 py-1 rounded-md">
										$ {room.price}
									</p>
									<h3 className="text-xl font-semibold dark:text-white mt-5">
										{room.name}
									</h3>
									<div className="mt-5 text-white dark:text-gray-200 text-sm space-y-2">
										<Tooltip
											title={room.description}
											placement="top"
										>
											<div>
												{room?.description && (
													<p>
														{room.description.slice(
															0,
															50
														)}
														...
													</p>
												)}
											</div>
										</Tooltip>
									</div>

									{/* Room Images Section */}
									<div className="mt-5 flex justify-center gap-2">
										{room.images
											?.slice(0, 3)
											.map((image, index) => (
												<div
													key={index}
													className="relative w-12 h-12 overflow-hidden rounded-lg"
												>
													{/* Small Image */}
													<Tooltip
														title="Show full image"
														placement="top"
													>
														<Image
															src={image.url}
															alt={`Room Image ${
																index + 1
															}`}
															width={48}
															height={48}
															objectFit="cover"
															className="rounded-lg transition-transform duration-300 transform hover:scale-125 cursor-pointer"
															onClick={
																() =>
																	handleImageClick(
																		room.images.map(
																			(
																				img
																			) =>
																				img.url
																		),
																		index
																	) // Open image slider
															}
														/>
													</Tooltip>
												</div>
											))}
									</div>

									{/* Book Now Button */}
									<div className="mt-5 flex place-content-center justify-center w-full">
										<Link
											href={`/rooms/${room?.slug?.current}`}
											className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
										>
											Book Now
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Modal for Image Slider */}
			{selectedImageIndex !== null && selectedRoomImages.length > 0 && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 ">
					<div className="relative max-w-3xl border-2 rounded-2xl hover:border-orange-400">
						{/* Modal Content */}
						<Image
							src={selectedRoomImages[selectedImageIndex]}
							alt="Room Image"
							width={600}
							height={600}
							objectFit="cover"
							className="rounded-xl"
						/>
						{/* Navigation Buttons */}
						<div>
							<button
								className="absolute top-1/2 left-2 text-white text-4xl font-bold transform -translate-y-1/2 transition-transform duration-300  hover:scale-125 cursor-pointer"
								onClick={prevImage}
							>
								<FaChevronLeft />
								{/* Previous Button */}
							</button>
						</div>
						<div>
							<button
								className="absolute top-1/2 right-2 text-white text-4xl font-bold transform -translate-y-1/2 transition-transform duration-300  hover:scale-125 cursor-pointer"
								onClick={nextImage}
							>
								<FaChevronRight />
								{/* Next Button */}
							</button>
						</div>

						{/* Close Button */}
						<div>
							<button
								className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-transform duration-300 transform hover:scale-125 cursor-pointer"
								onClick={closeModal}
							>
								<ImCross /> {/* Cross button */}
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default FeaturedRooms;
