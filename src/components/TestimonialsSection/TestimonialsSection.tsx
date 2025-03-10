"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Review } from "@/models/review";
import { Room } from "@/models/room";
import { getRooms } from "@/libs/apis";

const TestimonialsSection: FC = () => {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Step 1: Fetch all rooms
	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const rooms = await getRooms();
				setRooms(rooms);
			} catch (error) {
				setError("Failed to fetch rooms.");
				console.error(error);
			}
		};

		fetchRooms();
	}, []);

	// Step 2: Fetch reviews for all rooms
	useEffect(() => {
		if (rooms.length === 0) return;

		const fetchAllReviews = async () => {
			setIsLoading(true);
			setError(null);

			try {
				// Fetch reviews for each room concurrently
				const reviewPromises = rooms.map(async (room) => {
					const { data } = await axios.get<Review[]>(
						`/api/room-reviews/${room._id}`
					);
					return data;
				});

				// Wait for all reviews to be fetched
				const allReviews = await Promise.all(reviewPromises);

				// Flatten the array of arrays into a single array of reviews
				const flattenedReviews = allReviews.flat();
				setReviews(flattenedReviews);
			} catch (error) {
				setError("Failed to fetch reviews.");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllReviews();
	}, [rooms]);

	// Handle loading and error states
	// if (isLoading) {
	// 	return <div className="text-white">Loading reviews...</div>;
	// }

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	// Function to format the date as "MonthName Date, Year"
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Background Image
	const backgroundImageUrl = "/images/cover-image-2.png";

	return (
		<div className="py-10 bg-gray-50 rounded-2xl relative overflow-hidden">
			{/* Background Image with Blur */}
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
			<div className="relative z-20">
				<h1 className="text-3xl sm:text-4xl font-bold text-center mt-6  mb-10 text-white">
					What <span className="text-orange-500">Our Guests Say</span>
				</h1>

				{isLoading && (
					<div className="text-red-200 font-bold text-2xl text-center">
						Loading customer reviews ...
					</div>
				)}

				{/* Swiper Slider */}
				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					spaceBetween={30}
					slidesPerView={1}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					loop={true}
					pagination={{ clickable: true }}
					navigation={true}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 3,
						},
					}}
					className="container"
				>
					{reviews?.map((review) => (
						<SwiperSlide key={review?._id}>
							<div className="dark:bg-gray-800 border mb-8 my-8 mx-16 bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up transition-all duration-300 ease-in-out">
								{/* Testimonial Content */}
								<div className="flex items-center mb-4">
									{/* Guest Image */}
									<div className=" rounded-full overflow-hidden">
										<Image
											src={
												"https://img.freepik.com/premium-vector/user-circle-outline-gradient-style_78370-7034.jpg"
											}
											alt={review.user?.name || "Guest"}
											width={48}
											height={48}
											className="w-full h-full object-cover"
										/>
									</div>
									{/* Guest Name and Date */}
									<div className="ml-4">
										<p className="font-bold text-yellow-200">
											{review.user?.name || "Anonymous"}
										</p>
										<p className="text-sm text-yellow-200">
											{formatDate(review?._createdAt)}
										</p>
									</div>
								</div>

								{/* Review Text */}
								<p className="mb-4 text-white">
									&quot;{review.text}&quot;
								</p>

								{/* Star Rating */}
								<div className="flex items-center">
									{[...Array(5)].map((_, index) => (
										<svg
											key={index}
											className={`w-5 h-5 ${
												index < review.userRating
													? "text-yellow-400"
													: "text-gray-300"
											}`}
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.41 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
										</svg>
									))}
									<span className="ml-2 text-white">
										{review.userRating.toFixed(1)}
									</span>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default TestimonialsSection;
