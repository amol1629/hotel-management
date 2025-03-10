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
	const [isSigningOut, setIsSigningOut] = useState(false);

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

	const handleSignOut = async () => {
		setIsSigningOut(true);
		try {
			await signOut({ callbackUrl: "/" });
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<div className="">
			<div
				className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 relative"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* Glassy Overlay for Entire Screen */}
				<div className="absolute inset-0 backdrop-blur-md bg-black/50 z-0" />

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
						<aside className="md:col-span-3">
							<div className="bg-gray-800/50 rounded-3xl p-6 shadow-lg border border-gray-700/50 backdrop-blur-md">
								<div className="relative">
									<div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-purple-600">
										<Image
											src={userData?.image}
											alt={userData?.name}
											width={128}
											height={128}
											className="object-cover w-full h-full"
										/>
									</div>
									<h2 className="text-2xl font-semibold text-center mb-2">
										{userData.name}
									</h2>
									<p className="text-sm text-gray-400 text-center mb-4">
										{userData?.about ?? "No bio provided."}
									</p>
									<p className="text-xs text-gray-500 text-center mb-4">
										Joined:{" "}
										{formatDate(
											userData?._createdAt.split("T")[0]
										)}
									</p>
									<button
										onClick={handleSignOut}
										className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition-colors flex items-center justify-center"
										disabled={isSigningOut}
									>
										{isSigningOut ? (
											"Signing Out"
										) : (
											<>
												<FaSignOutAlt className="inline mr-2" />{" "}
												Sign Out
											</>
										)}
									</button>
								</div>
							</div>
						</aside>

						<main className="md:col-span-9">
							{userBookings && userBookings.length > 0 ? (
								<div className="bg-gray-800/50 rounded-3xl p-6 shadow-lg border border-gray-700/50 backdrop-blur-md">
									<nav className="flex justify-around mb-6 border-b border-gray-700 pb-4">
										<button
											onClick={() =>
												setCurrentNav("bookings")
											}
											className={`px-4 py-2 rounded-full transition-colors ${
												currentNav === "bookings"
													? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-3xl flex items-center justify-center transition-all transform hover:scale-10"
													: "hover:bg-gray-700 text-gray-300"
											}`}
										>
											<BsJournalBookmarkFill className="inline mr-2" />{" "}
											Bookings
										</button>
										<button
											onClick={() =>
												setCurrentNav("amount")
											}
											className={`px-4 py-2 rounded-full transition-colors ${
												currentNav === "amount"
													? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-3xl flex items-center justify-center transition-all transform hover:scale-10"
													: "hover:bg-gray-700 text-gray-300"
											}`}
										>
											<GiMoneyStack className="inline mr-2" />{" "}
											Amount Spent
										</button>
									</nav>

									{currentNav === "bookings" && (
										<Table
											bookingDetails={userBookings}
											setRoomId={setRoomId}
											toggleRatingModal={
												toggleRatingModal
											}
										/>
									)}
									{currentNav === "amount" && (
										<Chart userBookings={userBookings} />
									)}
								</div>
							) : (
								<p className="text-center text-gray-400 mt-8">
									No bookings found.
								</p>
							)}
						</main>
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
		</div>
	);
};

export default UserDetails;
