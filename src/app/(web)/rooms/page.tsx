"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
<<<<<<< HEAD
=======

import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/RoomCard/RoomCard";
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd

import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/RoomCard/RoomCard";
const Rooms = () => {
	const [roomTypeFilter, setRoomTypeFilter] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const searchParams = useSearchParams();

	useEffect(() => {
		const searchQuery = searchParams.get("searchQuery");
		const roomType = searchParams.get("roomType");

		if (roomType) setRoomTypeFilter(roomType);
		if (searchQuery) setSearchQuery(searchQuery);
	}, [searchParams]);

	async function fetchData() {
		return getRooms();
	}

	const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);

	if (error) throw new Error("Cannot fetch data");
	if (typeof data === "undefined" && !isLoading)
		throw new Error("Cannot fetch data");

	const filterRooms = (rooms: Room[]) => {
		return rooms.filter((room) => {
<<<<<<< HEAD
=======
			// Apply room type filter
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
			if (
				roomTypeFilter &&
				roomTypeFilter.toLowerCase() !== "all" &&
				room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
			) {
				return false;
			}
<<<<<<< HEAD
			if (
				searchQuery &&
				!room.name.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}
			return true;
		});
	};

	const filteredRooms = filterRooms(data || []);

	return (
		<div className="container mx-auto pt-10 px-4 lg:px-0 w-full bg-black bg-opacity-40 backdrop-blur-lg rounded-xl">
			<div className="text-white px-8">
				<p className="text-lg flex items-center">
					<span className="font-bold italic">
						{searchQuery
							? `Search result for "${searchQuery}" :`
							: "All available rooms :"}
					</span>
					<span className="ml-2 inline-block w-8 h-8 text-center text-white bg-white bg-opacity-30 backdrop-blur-md rounded-full border-2 border-white">
						{filteredRooms.length}
					</span>
					<span className="ml-2">
						{filteredRooms.length > 0
							? `rooms found`
							: `No rooms found.`}
					</span>
				</p>
			</div>

			{filteredRooms.length === 0 && (
				<div className="container mt-10 flex justify-center items-center">
					<div className="bg-black bg-opacity-40 backdrop-blur-lg text-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center border border-white">
						<h2 className="text-2xl font-bold mb-4">
							No Rooms Found
						</h2>
						<p className="mb-6 text-gray-400">
							Sorry, we could not find any rooms that match your
							search.
						</p>
					</div>
				</div>
			)}

			<div className="flex flex-wrap justify-center items-center mt-10 gap-6">
=======

			// Apply search query filter
			if (
				searchQuery &&
				!room.name.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}

			return true;
		});
	};

	const filteredRooms = filterRooms(data || []);

	console.log("Filtered Rooms : ", filteredRooms);
	console.log("Search Data : ", data);

	return (
		<div className="container mx-auto pt-10">
			<div className="text-white">
				<p className="text-lg flex items-center">
					<span className="font-bold italic">
						Search result for &quot;{searchQuery}&quot; :
					</span>
					<span className="ml-2 inline-block w-8 h-8 text-center text-white bg-white bg-opacity-30 backdrop-blur-md rounded-full border-2 border-white">
						{filteredRooms.length}
					</span>
					<span className="ml-2">
						{filteredRooms.length > 0
							? `rooms found`
							: `No rooms found.`}
					</span>
				</p>
			</div>

			{/* Conditionally render "No Rooms Found" card with glassy and smoky effect */}
			{filteredRooms.length === 0 && (
				<div className="mt-10 flex justify-center items-center ">
					<div className="bg-black bg-opacity-40 backdrop-blur-lg text-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center border border-white">
						<h2 className="text-2xl font-bold mb-4">
							No Rooms Found
						</h2>
						<p className="mb-6 text-gray-400">
							Sorry, we could not find any rooms that match your
							search.
						</p>
						{/* <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300">
							Try Another Search
						</button> */}
					</div>
				</div>
			)}

			{/* Render Room Cards */}
			<div className="flex mt-20 justify-between flex-wrap">
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
				{filteredRooms.map((room) => (
					<RoomCard key={room._id} room={room} />
				))}
			</div>
		</div>
	);
};

export default Rooms;


