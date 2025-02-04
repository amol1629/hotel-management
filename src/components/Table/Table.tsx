"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Booking } from "@/models/booking";

type Props = {
	bookingDetails: Booking[];
	setRoomId: Dispatch<SetStateAction<string | null>>;
	toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
	const router = useRouter();

	// Background Image (Same as Facilities)
	const backgroundImageUrl = "/images/cover-image-2.png";

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="  rounded-2xl shadow-lg ">
			<table className="relative overflow-x-auto overflow-y-hidden  p-4 w-full text-sm text-center text-white">
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
						width: "100%",
					}}
				></div>

				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

				<thead className="relative z-20 text-xs text-white uppercase ">
					<tr className="text-center ">
						<th className="px-6 py-8">Room Name</th>
						<th className="px-6 py-8">Booking Date</th>
						<th className="px-6 py-8">Unit Price</th>
						<th className="px-6 py-8">Price</th>
						<th className="px-6 py-8">Discount</th>
						<th className="px-6 py-8">Days Booked</th>
						<th className="px-6 py-8">Days Left</th>
						<th className="px-6 py-8"></th>
					</tr>
				</thead>
				<tbody className="relative z-20">
					{bookingDetails.map((booking, index) => (
						<motion.tr
							key={booking._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className=" rounded-2xl  shadow-lg  border-b text-center hover:rounded-2xl hover:bg-white/30 transition-all duration-300"
						>
							<th
								onClick={() =>
									router.push(
										`/rooms/${booking.hotelRoom.slug.current}`
									)
								}
								className="px-6 py-4 font-medium whitespace-nowrap text-orange-400 hover:text-orange-300 cursor-pointer transition-all duration-300"
							>
								{booking.hotelRoom.name}
							</th>
							<td className="px-6 py-4 text-white">
								{formatDate(booking?.checkinDate)}
							</td>
							<td className="px-6 py-4">
								${booking.hotelRoom.price}
							</td>
							<td className="px-6 py-4">${booking.totalPrice}</td>
							<td className="px-6 py-4">{booking.discount}%</td>
							<td className="px-6 py-4">
								{booking.numberOfDays}
							</td>
							<td className="px-6 py-4">0</td>
							<td className="px-6 py-4">
								<button
									onClick={() => {
										setRoomId(booking.hotelRoom._id);
										toggleRatingModal();
									}}
									className="px-8 py-2 rounded-2xl text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300"
								>
									Rate
								</button>
							</td>
						</motion.tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
