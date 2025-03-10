"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

import { Room } from "@/models/room";
import LoadingSpinner from "@/app/(web)/loading";

type Props = {
	room: Room;
};

const RoomCard: FC<Props> = ({ room }) => {
	const { coverImage, name, price, type, description, slug, isBooked } = room;
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleNavigation = () => {
		setIsLoading(true);
		router.push(`/rooms/${slug.current}`);
	};

	// Show spinner when loading
	if (isLoading)
		return (
			<div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-50">
				<LoadingSpinner />
			</div>
		);

	return (
		<div className="rounded-2xl w-full md:w-80 lg:w-96 mb-10 mx-auto md:mx-0 overflow-hidden border-2 border-white hover:border-orange-400 transform transition-all hover:scale-105 hover:shadow-xl p-2">
			<div className="h-60 overflow-hidden relative">
				<Image
					src={coverImage.url}
					alt={name}
					width={500}
					height={500}
					className="img scale-animation transition-all duration-500 rounded-2xl"
				/>
			</div>

			<div className="p-4 bg-black bg-opacity-40 backdrop-blur-lg text-white rounded-xl">
				<div className="flex justify-between text-xl font-semibold">
					<p>{name}</p>
					<p className="font-bold text-green-500">$ {price}</p>
				</div>

				<p className="pt-2 text-xs text-orange-400">
					{type.toUpperCase()} Room
				</p>

				<Tooltip title={description} placement="top">
					<p className="pt-3 pb-6">{description.slice(0, 100)}...</p>
				</Tooltip>

				<button
					onClick={handleNavigation}
					disabled={isLoading}
					className={`bg-orange-600 hover:bg-orange-700 inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500 ${
						isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{isLoading
						? "LOADING..."
						: isBooked
						? "BOOKED"
						: "BOOK NOW"}
				</button>
			</div>
		</div>
	);
};

export default RoomCard;
