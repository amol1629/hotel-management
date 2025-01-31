import { FC } from "react";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";

import { Room } from "@/models/room";
import Link from "next/link";

type Props = {
	room: Room;
};

const RoomCard: FC<Props> = (props) => {
	const {
		room: { coverImage, name, price, type, description, slug, isBooked },
	} = props;

	return (
		<div className="rounded-2xl w-full md:w-80 lg:w-96 mb-10 mx-auto md:mx-0 overflow-hidden border-2 border-white hover:border-orange-400  transform transition-all hover:scale-105 hover:shadow-xl p-2">
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

				<Link
					href={`/rooms/${slug.current}`}
					className="bg-orange-600 hover:bg-orange-700 inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
				>
					{isBooked ? "BOOKED" : "BOOK NOW"}
				</Link>
			</div>
		</div>
	);
};

export default RoomCard;
