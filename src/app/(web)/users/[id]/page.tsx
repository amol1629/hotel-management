"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";
import { getUserBookings } from "@/libs/apis";
import { User } from "@/models/user";
import LoadingSpinner from "../../loading";
import { useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import Table from "@/components/Table/Table";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/formatDate";

const UserDetails = () => {
	const backgroundImageUrl = "/images/cover-image-2.png";

	const params = useParams();
	const userId = params?.id as string;

	const [currentNav, setCurrentNav] = useState<"bookings" | "amount">(
		"bookings"
	);
	const [roomId, setRoomId] = useState<string | null>(null);
	const [isRatingVisible, setIsRatingVisible] = useState(false);
	const [isSubmittingReview, setIsSubmittingReview] = useState(false);
	const [ratingValue, setRatingValue] = useState<number | null>(0);
	const [ratingText, setRatingText] = useState("");

	const toggleRatingModal = () => setIsRatingVisible((prev) => !prev);

	const reviewSubmitHandler = async () => {
		if (!ratingText.trim().length || !ratingValue) {
			return toast.error("Please provide a rating text and a rating");
		}
		if (!roomId) return toast.error("Id not provided");

		setIsSubmittingReview(true);
		try {
			await axios.post("/api/users", {
				reviewText: ratingText,
				ratingValue,
				roomId,
			});
			toast.success("Review Submitted");
		} catch (error) {
			toast.error("Review Failed");
		} finally {
			setRatingText("");
			setRatingValue(null);
			setRoomId(null);
			setIsSubmittingReview(false);
			setIsRatingVisible(false);
		}
	};

	const fetchUserBooking = async () => getUserBookings(userId);
	const fetchUserData = async () => {
		const { data } = await axios.get<User>("/api/users");
		return data;
	};

	const { data: userBookings, isLoading } = useSWR(
		"/api/userbooking",
		fetchUserBooking
	);
	const { data: userData, isLoading: loadingUserData } = useSWR(
		"/api/users",
		fetchUserData
	);

	if (loadingUserData || !userData) return <LoadingSpinner />;

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="grid md:grid-cols-12 gap-8">
				<div className="md:col-span-4 lg:col-span-3">
					<div className="border-2 border-yellow-400 bg-white/10 backdrop-blur-md shadow-xl rounded-3xl p-6">
						{/* Blurred Background */}
						<div
							className="absolute inset-0 z-0 rounded-3xl"
							style={{
								backgroundImage: `url(${backgroundImageUrl})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								filter: "blur(6px)",
								width: "100%",
								height: "100%",
							}}
						></div>

						{/* Dark Overlay */}
						<div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-3xl"></div>

						<div className="relative z-20">
							<div className="relative z-20 w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg transition-transform transform hover:scale-105">
								<Image
									src={userData.image}
									alt={userData.name}
									width={128}
									height={128}
									className="rounded-full"
								/>
							</div>
							<h2 className="text-center text-xl text-white font-bold my-4">
								{userData.name}
							</h2>
							<p className="text-center text-sm opacity-75">
								{userData.about ?? ""}
							</p>
							<p className="text-center text-xs text-gray-300 mt-2">
								Joined{" "}
								{formatDate(userData._createdAt.split("T")[0])}
							</p>
							<button
								onClick={() => signOut({ callbackUrl: "/" })}
								className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-3xl flex items-center justify-center transition"
							>
								<FaSignOutAlt className="mr-2" /> Sign Out
							</button>
						</div>
					</div>
				</div>

				<div className="md:col-span-8 lg:col-span-9 bg-white/10 backdrop-blur-md shadow-xl rounded-3xl p-6 relative">
					{/* Blurred Background */}
					<div
						className="absolute inset-0 z-0 rounded-3xl"
						style={{
							backgroundImage: `url(${backgroundImageUrl})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							filter: "blur(6px)",
							width: "100%",
							height: "100%",
						}}
					></div>

					{/* Dark Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-3xl"></div>

					<nav className="relative z-20 flex justify-around py-3 mb-6 border-b border-gray-200">
						<button
							onClick={() => setCurrentNav("bookings")}
							className={`px-4 py-2 rounded-3xl transition ${
								currentNav === "bookings"
									? "bg-purple-600 text-white"
									: "hover:bg-blue-500/40 bg-blue-500/20 text-purple-100"
							}`}
						>
							<BsJournalBookmarkFill className="inline mr-2" />{" "}
							Bookings
						</button>
						<button
							onClick={() => setCurrentNav("amount")}
							className={`px-4 py-2 rounded-3xl transition ${
								currentNav === "amount"
									? "bg-purple-600 text-white"
									: "hover:bg-blue-500/40 bg-blue-500/20 text-purple-100"
							}`}
						>
							<GiMoneyStack className="inline mr-2" /> Amount
							Spent
						</button>
					</nav>

					{currentNav === "bookings" && userBookings && (
						<Table
							bookingDetails={userBookings}
							setRoomId={setRoomId}
							toggleRatingModal={toggleRatingModal}
						/>
					)}
					{currentNav === "amount" && userBookings && (
						<Chart userBookings={userBookings} />
					)}
				</div>
			</div>

			<RatingModal
				isOpen={isRatingVisible}
				ratingValue={ratingValue}
				setRatingValue={setRatingValue}
				ratingText={ratingText}
				setRatingText={setRatingText}
				isSubmittingReview={isSubmittingReview}
				reviewSubmitHandler={reviewSubmitHandler}
				toggleRatingModal={toggleRatingModal}
			/>
			<BackDrop isOpen={isRatingVisible} />
		</div>
	);
};

export default UserDetails;
