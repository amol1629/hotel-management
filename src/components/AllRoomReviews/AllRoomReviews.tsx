"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Review } from "@/models/review";
import Rating from "../Rating/Rating";
import useSWR from "swr";
import { getRooms } from "@/libs/apis";

const AllRoomReviews: FC = () => {
	const [rooms, setRooms] = useState<any[]>([]); // State to store all rooms data
	const [reviews, setReviews] = useState<any>({}); // State to store reviews per room
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	async function fetchData() {
		return getRooms();
	}

	const { data, isLoading } = useSWR("get/hotelRooms", fetchData);

	console.log("Reivew sdfasd : ", data);
	console.log("roo m : ", rooms);

	// Handle loading and error states
	if (loading) return <p>Loading reviews...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="rooms-container">
			{rooms.length > 0 ? (
				rooms.map((room) => (
					<div key={room._id} className="room-section mb-8">
						<h2 className="text-xl font-semibold mb-4">
							{room.label} Reviews
						</h2>

						{/* Display reviews for each room */}
						<div className="reviews-container">
							{reviews[room._id] &&
							reviews[room._id].length > 0 ? (
								reviews[room._id].map((review: Review) => (
									<div
										className="review-card bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4"
										key={review._id}
									>
										<div className="flex items-center mb-2">
											<p className="font-semibold">
												{review.user.name}
											</p>
											<div className="ml-4 flex items-center text-tertiary-light text-lg">
												<Rating
													rating={review.userRating}
												/>
											</div>
										</div>
										<p className="text-gray-700 dark:text-gray-300">
											{review.text}
										</p>
									</div>
								))
							) : (
								<p>No reviews available for this room.</p>
							)}
						</div>
					</div>
				))
			) : (
				<p>No rooms available.</p>
			)}
		</div>
	);
};

export default AllRoomReviews;
