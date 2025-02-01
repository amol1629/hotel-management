"use client";

import Link from "next/link";
import { useContext, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import ThemeContext from "@/context/themeContext";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa"; // Import the 'x' icon

const Header = () => {
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);
	const { data: session } = useSession();
	const router = useRouter();

	const [roomTypeFilter, setRoomTypeFilter] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	const handleRoomTypeChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			setRoomTypeFilter(event.target.value);
		},
		[]
	);

	const handleSearchQueryChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(event.target.value);
		},
		[]
	);

	const handleFilterClick = useCallback(() => {
		router.push(
			`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`
		);
		setSearchQuery("");
		setRoomTypeFilter("All");
	}, [roomTypeFilter, searchQuery, router]);

	const toggleTheme = useCallback(() => {
		const newTheme = !darkTheme;
		setDarkTheme(newTheme);
		localStorage.setItem("hotel-theme", newTheme.toString());
	}, [darkTheme, setDarkTheme]);

	const userImage = session?.user?.image ? (
<<<<<<< HEAD
		<div className="w-10 h-10 rounded-full overflow-hidden border-2 hover:border-orange-400">
=======
		<div className="w-10 h-10 rounded-full overflow-hidden">
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
			<Tooltip title={session.user.name} placement="top">
				<Image
					src={session.user.image}
					alt={session.user.name!}
					width={40}
					height={40}
<<<<<<< HEAD
					className="scale-animation img "
=======
					className="scale-animation img"
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
				/>
			</Tooltip>
		</div>
	) : (
		<FaUserCircle className="cursor-pointer" />
	);

	// Function to clear the search input
	const clearSearch = () => {
		setSearchQuery("");
	};

	return (
<<<<<<< HEAD
		<header className="dark:sticky dark:top-0 dark:z-40  dark:bg-black dark:border dark:rounded-lg border-b border-b-white dark:border-white py-4 shadow-lg px-4 mx-auto text-xl flex flex-col md:flex-row items-center justify-between gap-4">
=======
		<header className="dark:bg-black dark:border dark:rounded-lg border-b border-b-white dark:border-white py-4 shadow-lg px-4 mx-auto text-xl flex flex-col md:flex-row items-center justify-between gap-4">
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
			<div className="flex items-center w-full md:w-auto">
				<Link href="/">
					<Image
						alt="gallery"
						className="rounded-full  "
						src="https://images.dtravel.com/profile/81d6cbfb-68d6-4ecc-90a3-7202e81a0d5a/9508a74e-a476-44f6-8aef-b2c437f6fa3f/logo/838"
						width={260}
						height={140}
					/>
				</Link>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
				<div className="text-sm w-full md:w-auto border border-white text-white bg-transparent rounded-xl px-2">
					<select
						value={roomTypeFilter}
						onChange={handleRoomTypeChange}
						className="bg-transparent w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
					>
						<option
							className="bg-white text-black rounded-xl"
							value="All"
						>
							All
						</option>
						<option
							className="bg-white text-black rounded-xl"
							value="Basic"
						>
							Basic
						</option>
						<option
							className="bg-white text-black rounded-xl"
							value="Luxury"
						>
							Luxury
						</option>
						<option
							className="bg-white text-black rounded-xl"
							value="Suite"
						>
							Suite
						</option>
					</select>
				</div>

				<div className="flex w-full md:w-auto border border-white text-white bg-transparent rounded-xl px-2 relative">
					<input
						type="text"
						placeholder="Search rooms here..."
						className="w-full px-4 py-2 rounded-lg bg-transparent dark:bg-black focus:outline-none text-sm placeholder:text-white dark:placeholder:text-white"
						value={searchQuery}
						onChange={handleSearchQueryChange}
					/>
					{searchQuery && (
						<button
							className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl text-red-500 hover:text-red-300 transition-all"
							onClick={clearSearch}
						>
							<FaTimes /> {/* Clear button (x icon) */}
						</button>
					)}
				</div>

				<Tooltip title="Search" placement="top">
					<button
						className="text-white text-4xl"
						type="button"
						onClick={handleFilterClick}
					>
						<CiSearch />
					</button>
				</Tooltip>
			</div>

			<ul className="flex items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
				{["Home", "Rooms", "Contact"].map((link) => (
					<li
						key={link}
						className="text-white hover:underline hover:-translate-y-2 duration-500 transition-all"
					>
<<<<<<< HEAD
						{/* For the Home link, update it to go to root */}
						<Link
							href={
								link === "Home" ? "/" : `/${link.toLowerCase()}`
							}
						>
							{link}
						</Link>
=======
						<Link href={`/${link.toLowerCase()}`}>{link}</Link>
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
					</li>
				))}

				<li className="flex items-center">
					<Link
						href={
							session?.user
								? `/users/${session.user.id}`
								: "/auth"
						}
					>
						{session?.user ? (
							userImage
						) : (
<<<<<<< HEAD
							<FaUserCircle className="text-white  border-2 border-white cursor-pointer" />
=======
							<FaUserCircle className="cursor-pointer" />
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd
						)}
					</Link>
				</li>

				<li className="ml-2">
					<Tooltip
						title={
							darkTheme
								? "Switch to Light Theme"
								: "Switch to Dark Theme"
						}
						placement="top"
					>
						<button
							onClick={toggleTheme}
							className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${
								darkTheme ? "bg-gray-700" : "bg-gray-300"
							}`}
						>
							<div
								className={`mt-[-8px] absolute w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
									darkTheme
										? "translate-x-6"
										: "translate-x-0"
								}`}
							/>
						</button>
					</Tooltip>
				</li>
			</ul>
		</header>
	);
};

export default Header;
