"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Booking } from "@/models/booking";
import { formatDate } from "@/utils/formatDate";

type Props = {
	bookingDetails: Booking[];
	setRoomId: Dispatch<SetStateAction<string | null>>;
	toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
	const router = useRouter();
	const backgroundImageUrl = "/images/cover-image-2.png";

	

	return (
		<div className="w-full overflow-x-auto  rounded-2xl">
			<div className="relative  shadow-lg">
				<table className="w-full min-w-[900px] text-sm text-center   text-white relative border-collapse">
					{/* Blurred Background */}
					<div
						className="absolute inset-0 z-0"
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
					<div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

					<thead className="relative z-20 text-xs text-white uppercase bg-black/50">
						<tr>
							<th className="px-2 py-3 md:px-4 md:py-6">
								Room Name
							</th>
							<th className="px-2 py-3 md:px-4 md:py-6">
								Booking Date
							</th>
							<th className="px-2 py-3 md:px-4 md:py-6">
								Unit Price
							</th>
							<th className="px-2 py-3 md:px-4 md:py-6">Price</th>
							<th className="px-2 py-3 md:px-4 md:py-6">
								Discount
							</th>
							<th className="px-2 py-3 md:px-4 md:py-6">
								Days Booked
							</th>
							<th className="px-2 py-3 md:px-4 md:py-6">
								Days Left
							</th>
							<th className="px-2 py-3 md:px-4 md:py-6"></th>
						</tr>
					</thead>
					<tbody className="relative z-20">
						{bookingDetails.map((booking, index) => (
							<motion.tr
								key={booking._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="border-b border-white/20 hover:bg-white/10 transition-all duration-300"
							>
								<td
									onClick={() =>
										router.push(
											`/rooms/${booking.hotelRoom.slug.current}`
										)
									}
									className="px-2 py-3 md:px-4 md:py-4 font-medium text-orange-400 hover:text-orange-300 cursor-pointer transition-all duration-300 whitespace-nowrap"
								>
									{booking.hotelRoom.name}
								</td>
								<td className="px-2 py-3 md:px-4 md:py-4 text-white">
									{formatDate(booking?.checkinDate)}
								</td>
								<td className="px-2 py-3 md:px-4 md:py-4">
									${booking.hotelRoom.price}
								</td>
								<td className="px-2 py-3 md:px-4 md:py-4">
									${booking.totalPrice}
								</td>
								<td className="px-2 py-3 md:px-4 md:py-4">
									{booking.discount}%
								</td>
								<td className="px-2 py-3 md:px-4 md:py-4">
									{booking.numberOfDays}
								</td>
								<td className="px-2 py-3 md:px-4 md:py-4">0</td>
								<td className="px-2 py-3 md:px-4 md:py-4">
									<button
										onClick={() => {
											setRoomId(booking.hotelRoom._id);
											toggleRatingModal();
										}}
										className="px-3 py-2 md:px-6 mx-3 md:py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300"
									>
										Rate
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
