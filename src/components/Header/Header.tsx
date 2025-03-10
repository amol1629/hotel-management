"use client";

import Link from "next/link";
import { useContext, useCallback, useEffect } from "react";
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
import { BsFillPersonFill } from "react-icons/bs";

const Header = () => {
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);
	const { data: session } = useSession();
	const router = useRouter();

	const [roomTypeFilter, setRoomTypeFilter] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => setLoading(true);
		const handleComplete = () => setLoading(false);

		router.events?.on("routeChangeStart", handleStart);
		router.events?.on("routeChangeComplete", handleComplete);
		router.events?.on("routeChangeError", handleComplete);

		return () => {
			router.events?.off("routeChangeStart", handleStart);
			router.events?.off("routeChangeComplete", handleComplete);
			router.events?.off("routeChangeError", handleComplete);
		};
	}, [router]);

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
		<div className="w-10 h-10 rounded-full overflow-hidden border-2 hover:border-orange-400">
			<Tooltip title={session.user.name} placement="top">
				<Image
					src={session.user.image}
					alt={session.user.name!}
					width={40}
					height={40}
					className="scale-animation img "
				/>
			</Tooltip>
		</div>
	) : (
		<FaUserCircle className="cursor-pointer" />
	);

	console.log("User Image : ", session);

	// Function to clear the search input
	const clearSearch = () => {
		setSearchQuery("");
	};

	return (
		<header className="dark:sticky dark:top-0 dark:z-40 dark:bg-black dark:border dark:rounded-lg border-b border-b-white dark:border-white py-4 shadow-lg px-4 mx-auto text-xl flex flex-col md:flex-row items-center justify-between gap-4">
			{loading && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md">
					<div className="w-16 h-16 border-4 border-t-yellow-400 border-transparent rounded-full animate-spin"></div>
				</div>
			)}

			<div className="f">
				<Link
					href="/"
					className="flex items-center w-full md:w-auto gap-4"
				>
					<Image
						alt="gallery"
						className="rounded-full h-16 w-16"
						src="/images/main-logo.jpg"
						width={40}
						height={40}
					/>
					<h1 className="font-bold text-orange-50 text-3xl">
						Zen Oasis
					</h1>
				</Link>
			</div>

			<ul className="flex items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
				{["Home", "Rooms", "Contact"].map((link) => (
					<li
						key={link}
						className="text-white hover:underline hover:-translate-y-2 duration-500 transition-all"
					>
						<Link
							href={
								link === "Home" ? "/" : `/${link.toLowerCase()}`
							}
						>
							{link}
						</Link>
					</li>
				))}

				<li className="flex items-center">
					{session?.user ? (
						// If user is logged in, show the profile dropdown
						<div className="relative flex items-center rounded-full border-2 border-orange-600 p-1 cursor-pointer">
							<Link href={`/users/${session.user.id}`}>
								{session.user.image ? (
									<Tooltip
										title={session.user.name}
										placement="top"
									>
										<Image
											src={session.user.image}
											alt={session.user.name!}
											width={40}
											height={40}
											className="w-10 h-10 rounded-full border-2 hover:border-orange-400 transition"
										/>
									</Tooltip>
								) : (
									<div className="relative">
										<FaUserCircle className="text-white text-3xl absolute opacity-50" />
										<BsFillPersonFill className="text-white text-3xl" />
									</div>
								)}
							</Link>
						</div>
					) : (
						// If no user is logged in, show Login button
						<Link
							href="/auth"
							className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition duration-300"
						>
							Login
						</Link>
					)}
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
