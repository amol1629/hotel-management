"use client";

import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import ThemeContext from "@/context/themeContext";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);
	const { data: session } = useSession();
	const router = useRouter();

	const [roomTypeFilter, setRoomTypeFilter] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setRoomTypeFilter(event.target.value);
	};

	const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleFilterClick = () => {
		router.push(
			`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`
		);
		setSearchQuery("");
		setRoomTypeFilter("All");
	};

	return (
		<header className="dark:bg-black dark:border dark:rounded-lg dark:border-white bg-pink-50 py-4 mb-10 shadow-lg px-4 mx-auto text-xl flex flex-col md:flex-row items-center justify-between gap-4">
			<div className="flex items-center w-full md:w-auto">
				<Link href="/">
					<Image
						alt="gallery"
						className="rounded-full"
						src="https://images.dtravel.com/profile/81d6cbfb-68d6-4ecc-90a3-7202e81a0d5a/9508a74e-a476-44f6-8aef-b2c437f6fa3f/logo/838"
						width={260}
						height={140}
					/>
				</Link>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
				<div className="text-sm w-full md:w-auto border border-pink-400 bg-transparent rounded-xl px-2">
					{/* <label className="block text-sm font-medium mb-2 text-black">
						Room Type
					</label> */}
					<select
						value={roomTypeFilter}
						onChange={handleRoomTypeChange}
						className="bg-transparent w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
					>
						<option value="All">All</option>
						<option value="Basic">Basic</option>
						<option value="Luxury">Luxury</option>
						<option value="Suite">Suite</option>
					</select>
				</div>

				<div className="flex w-full md:w-auto border border-pink-400 bg-transparent rounded-xl px-2">
					{/* <label className="block text-sm font-medium mb-2 text-black">
						Search
					</label> */}
					<input
						type="search"
						placeholder="Search rooms here..."
						className="w-full px-4 py-2 rounded-lg bg-transparent dark:bg-black focus:outline-none text-sm   placeholder:text-black dark:placeholder:text-white"
						value={searchQuery}
						onChange={handleSearchQueryChange}
					/>
				</div>

				<Tooltip title="Search" placement="top">
					<button
						className="text-pink-400 text-4xl"
						type="button"
						onClick={handleFilterClick}
					>
						<CiSearch />
					</button>
				</Tooltip>
			</div>

			<ul className="flex items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
				<li className="text-pink-600 hover:underline hover:-translate-y-2 duration-500 transition-all">
					<Link href="/">Home</Link>
				</li>
				<li className="text-pink-600 hover:underline hover:-translate-y-2 duration-500 transition-all">
					<Link href="/rooms">Rooms</Link>
				</li>
				<li className="text-pink-600 hover:underline hover:-translate-y-2 duration-500 transition-all">
					<Link href="/">Contact</Link>
				</li>

				<li className="flex items-center">
					{session?.user ? (
						<Link href={`/users/${session?.user?.id}`}>
							{session?.user?.image ? (
								<div className="w-10 h-10 rounded-full overflow-hidden">
									<Tooltip
										title={session?.user?.name}
										placement="top"
									>
										<Image
											src={session?.user?.image}
											alt={session?.user?.name!}
											width={40}
											height={40}
											className="scale-animation img"
										/>
									</Tooltip>
								</div>
							) : (
								<FaUserCircle className="cursor-pointer" />
							)}
						</Link>
					) : (
						<Link href="/auth">
							<FaUserCircle className="cursor-pointer" />
						</Link>
					)}
				</li>
				<li className="ml-2">
					{darkTheme ? (
						<Tooltip title="Dark Theme" placement="top">
							<span>
								<MdOutlineLightMode
									className="cursor-pointer"
									onClick={() => {
										setDarkTheme(false);
										localStorage.removeItem("hotel-theme");
									}}
								/>
							</span>
						</Tooltip>
					) : (
						<Tooltip title="Light Theme" placement="top">
							<span>
								<MdDarkMode
									className="cursor-pointer"
									onClick={() => {
										setDarkTheme(true);
										localStorage.setItem(
											"hotel-theme",
											"true"
										);
									}}
								/>
							</span>
						</Tooltip>
					)}
				</li>
			</ul>
		</header>
	);
};

export default Header;
