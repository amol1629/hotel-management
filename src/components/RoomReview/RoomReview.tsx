import axios from "axios";
import { FC } from "react";
import useSWR from "swr";

import { Review } from "@/models/review";
import Rating from "../Rating/Rating";

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
	const fetchRoomReviews = async () => {
		const { data } = await axios.get<Review[]>(
			`/api/room-reviews/${roomId}`
		);
		return data;
	};

	const {
		data: roomReviews,
		error,
		isLoading,
	} = useSWR("/api/room-reviews", fetchRoomReviews);

	if (error) throw new Error("Cannot fetch data");
	if (typeof roomReviews === "undefined" && !isLoading)
		throw new Error("Cannot fetch data");

	return (
		<div>
			{roomReviews?.length == 0 ? (
				<div className="text-sm text-center text-red-200 italic">
					There are no reviews available for this room
				</div>
			) : (
				<div className="flex flex-wrap gap-4">
					{roomReviews &&
						roomReviews?.map((review) => (
							<div
								className="bg-opacity-10 backdrop-blur-lg p-6 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-2xl shadow-lg dark:bg-gray-900"
								key={review?._id}
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
			)}
		</div>
	);
};

export default RoomReview;
