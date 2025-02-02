"use client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Review } from "@/models/review";
import { Room } from "@/models/room";
import Rating from "../Rating/Rating";
import { getRooms } from "@/libs/apis";

const AllRoomReviews: FC = () => {
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
	if (isLoading) {
		return <div className="text-white">Loading reviews...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold text-white mb-6">All Reviews</h1>
			<div className="flex flex-wrap gap-4">
				{reviews.map((review) => (
					<div
						className="bg-opacity-10 backdrop-blur-lg p-6 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-2xl shadow-lg dark:bg-gray-900"
						key={review._id}
					>
						<div className="font-semibold mb-4 ">
							<p className="text-purple-300">
								{review?.user?.name}
							</p>
						</div>

						<div className="text-white italic text-sm">
							{review?.text}
						</div>

						<div className="mt-4 flex items-center text-tertiary-light text-lg">
							<Rating rating={review?.userRating} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllRoomReviews;