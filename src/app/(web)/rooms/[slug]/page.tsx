"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import { useState } from "react";
import axios from "axios";
import { getRoom } from "@/libs/apis";
import LoadingSpinner from "../../loading";
import toast from "react-hot-toast";
import { getStripe } from "@/libs/stripe";
import RoomReview from "@/components/RoomReview/RoomReview";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Next.js Image component
import Image from "next/image";

// Define the Image type
type Image = {
	url: string; // Adjust this based on your actual data structure
	// Add other properties if needed, e.g., alt, caption, etc.
};

const RoomDetails = () => {
	// Background Image (Same as Facilities)
	const backgroundImageUrl = "/images/cover-image-2.png";

	const router = useRouter();
	const params = useParams();
	const slug = params?.slug as string;

	const [isPaymentPageLoading, setIsPaymentPageLoading] = useState(false);
	const [checkinDate, setCheckinDate] = useState<Date | null>(null);
	const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
	const [adults, setAdults] = useState(1);
	const [noOfChildren, setNoOfChildren] = useState(0);

	const fetchRoom = async () => getRoom(slug);
	const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

	console.log("ISLoading : ", isLoading);

	if (isLoading) return <LoadingSpinner />;

	if (error) throw new Error("Cannot fetch data");
	if (typeof room === "undefined" && !isLoading)
		throw new Error("Cannot fetch data");
	if (!room) return <LoadingSpinner />;

	const calcMinCheckoutDate = () => {
		if (checkinDate) {
			const nextDay = new Date(checkinDate);
			nextDay.setDate(nextDay.getDate() + 1);
			return nextDay;
		}
		return null;
	};

	const handleBookNowClick = async () => {
		if (!checkinDate || !checkoutDate)
			return toast.error("Please provide check-in / check-out date");
		if (checkinDate > checkoutDate)
			return toast.error("Please choose a valid check-in period");

		const numberOfDays = calcNumDays();
		const hotelRoomSlug = room.slug.current;
		const stripe = await getStripe();

		try {
			setIsPaymentPageLoading(true);
			console.log("Loading...");
			const { data: stripeSession } = await axios.post("/api/stripe", {
				checkinDate,
				checkoutDate,
				adults,
				children: noOfChildren,
				numberOfDays,
				hotelRoomSlug,
			});

			if (stripe) {
				const result = await stripe.redirectToCheckout({
					sessionId: stripeSession.id,
				});

				if (result.error) {
					toast.error("Payment failed. Please try again.");
				}
			}
			setIsPaymentPageLoading(false);
		} catch (error: any) {
			setIsPaymentPageLoading(false);

			if (!error.response) {
				toast.error(
					"Network error. Please check your internet connection."
				);
			} else if (error.response.status === 401) {
				toast.error(
					"You need to be signed in to complete this booking. Redirecting to login..."
				);
				router.push("/auth");
			} else if (error.response.status === 403) {
				toast.error("You are not authorized to book this room.");
			} else if (error.response.status === 500) {
				toast.error("Server error. Please try again later.");
			} else {
				toast.error(
					error.response.data || "An unexpected error occurred."
				);
			}
		}
	};

	console.log("ISLoading : ", isLoading);

	// if (isPaymentPageLoading) return <LoadingSpinner />;

	const calcNumDays = () => {
		if (!checkinDate || !checkoutDate) return;
		const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
		const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
		return noOfDays;
	};

	return (
		<div className="relative overflow-hidden rounded-2xl">
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
			<div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

			{/* Image Slider */}
			<div className="relative z-20 w-full h-[400px] md:h-[600px] overflow-hidden">
				{" "}
				{/* Increased height */}
				<Swiper
					navigation={true}
					modules={[Navigation]}
					className="mySwiper"
					style={{ height: "100%" }} // Ensure Swiper takes full height
				>
					{room.images.map((image: Image, index: number) => (
						<SwiperSlide key={index}>
							<div className="w-full h-full flex items-center justify-center">
								{" "}
								{/* Center the image */}
								<div className="relative w-3/4 h-4/5">
									{" "}
									{/* Adjusted height to 80% of the container */}
									<Image
										src={image.url}
										alt={`Room Image ${index + 1}`}
										fill
										className="object-cover rounded-lg" // Ensure the image covers the container
										sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
										priority={index === 0}
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Main Content */}
			<div className="relative z-20 container mx-auto mt-10 px-4">
				<div className="md:grid md:grid-cols-12 gap-16">
					{/* Left Column */}
					<div className="md:col-span-8">
						<div className="animate-fade-in">
							<h2 className="font-bold text-2xl md:text-3xl mb-4 text-orange-100">
								{room.name} ({room.dimension})
							</h2>

							{/* Offered Amenities */}
							<div
								className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 hover:shadow-xl border border-transparent  hover:border hover:border-orange-400 transition-all duration-300 ease-in-out"
								style={{
									background: "rgba(255, 255, 255, 0.1)",
									backdropFilter: "blur(10px)",
								}}
							>
								<h1 className="text-3xl text-gold font-bold mb-6">
									Offered Amenities{" "}
								</h1>
								<div className="flex flex-wrap gap-4">
									{room.offeredAmenities.map((amenity) => (
										<div
											key={amenity._key}
											className="w-40  dark:bg-gray-800  text-center  hover:scale-105 transition-all  backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl  border hover:border-orange-400 duration-300 ease-linear"
										>
											<i
												className={`fa-solid ${amenity?.icon} text-3xl mb-6 text-secondary`}
											></i>
											<p className="text-sm md:text-base text-white">
												{amenity.amenity}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Room Description */}
							<div
								className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 hover:shadow-xl border border-transparent  hover:border hover:border-orange-400 my-8 transition-all duration-300 ease-in-out"
								style={{
									background: "rgba(255, 255, 255, 0.1)",
									backdropFilter: "blur(10px)",
								}}
							>
								<h2 className="text-3xl text-gold font-bold mb-6">
									Description
								</h2>
								<p className="text-white ">
									{room.description}
								</p>
							</div>

							{/* Safety and Hygiene */}
							<div
								className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 hover:shadow-xl border border-transparent  hover:border hover:border-orange-400 my-8 transition-all duration-300 ease-in-out"
								style={{
									background: "rgba(255, 255, 255, 0.1)",
									backdropFilter: "blur(10px)",
								}}
							>
								<h2 className="text-3xl text-gold font-bold mb-6">
									Safety And Hygiene
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{[
										{
											icon: <MdOutlineCleaningServices />,
											text: "Daily Cleaning",
										},
										{
											icon: <LiaFireExtinguisherSolid />,
											text: "Fire Extinguishers",
										},
										{
											icon: <AiOutlineMedicineBox />,
											text: "Disinfections and Sterilizations",
										},
										{
											icon: <GiSmokeBomb />,
											text: "Smoke Detectors",
										},
									].map((item, index) => (
										<div
											key={index}
											className="flex items-center p-4 dark:bg-gray-800  text-center  hover:scale-105 transition-all  backdrop-blur-lg rounded-lg shadow-lg "
										>
											<span className="text-xl mr-2 text-white">
												{item.icon}
											</span>
											<p className="text-sm text-white  md:text-base">
												{item.text}
											</p>
										</div>
									))}
								</div>
							</div>
							<div
								className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-transparent hover:border hover:border-orange-400 my-8 duration-300   ease-in-out"
								style={{
									background: "rgba(255, 255, 255, 0.1)",
									backdropFilter: "blur(10px)",
								}}
							>
								<h2 className="text-3xl text-gold font-bold mb-6">
									Customer Reviews
								</h2>
								<RoomReview roomId={room._id} />
							</div>
						</div>
					</div>

					{/* Right Column - Booking Block */}
					<div className="md:col-span-4">
						<div className="sticky top-10 animate-fade-in">
							<div
								className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-2 hover:border-orange-400 duration-300 ease-in-out"
								style={{
									background: "rgba(255, 255, 255, 0.1)",
									backdropFilter: "blur(10px)",
								}}
							>
								<h2 className="font-bold text-3xl mb-4 text-gold text-center ">
									Book Now
								</h2>
								<div className="space-y-6">
									{/* Booking Form */}
									<div className="">
										<label className="block text-sm font-medium text-white mb-1">
											Check-in Date
										</label>
										<input
											type="date"
											value={
												checkinDate
													?.toISOString()
													.split("T")[0] || ""
											}
											onChange={(e) =>
												setCheckinDate(
													new Date(e.target.value)
												)
											}
											className="w-full py-2 border hover:border-orange-400 rounded-lg bg-white/10 text-white px-4"
										/>
									</div>
									<div className="">
										<label className="block text-sm font-medium text-white mb-1">
											Check-out Date
										</label>
										<input
											type="date"
											value={
												checkoutDate
													?.toISOString()
													.split("T")[0] || ""
											}
											onChange={(e) =>
												setCheckoutDate(
													new Date(e.target.value)
												)
											}
											min={
												calcMinCheckoutDate()
													?.toISOString()
													.split("T")[0]
											}
											className="w-full py-2 border hover:border-orange-400 rounded-lg bg-white/10 text-white px-4"
										/>
									</div>
									<div className="">
										<label className="block text-sm font-medium text-white mb-1">
											Adults
										</label>
										<input
											type="number"
											value={adults}
											onChange={(e) =>
												setAdults(
													Number(e.target.value)
												)
											}
											className="w-full py-2 border hover:border-orange-400 rounded-lg bg-white/10 text-white px-4"
										/>
									</div>
									<div className="">
										<label className="block text-sm font-medium text-white mb-1">
											Children
										</label>
										<input
											type="number"
											value={noOfChildren}
											onChange={(e) =>
												setNoOfChildren(
													Number(e.target.value)
												)
											}
											className="w-full py-2  rounded-lg bg-white/10 text-white outline-none border hover:border-orange-400 px-4"
										/>
									</div>
									<button
										onClick={handleBookNowClick}
										className="w-full bg-green-700 border border-green-300  text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all "
									>
										Book Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isPaymentPageLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};

export default RoomDetails;
