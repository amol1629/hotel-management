import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";


export const heading1 = (
	<>
		<h1 className="text-3xl font-bold">
			Welcome, <span className="">John Doe</span>!
		</h1>
		<h2 className="text-2xl font-semibold">Explore Our Exquisite Hotel</h2>
		<p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
			Experience an Exquisite Hotel Immersed in Rich History and Timeless
			Elegance.
		</p>
		<button className="btn-primary">Get Started</button>
	</>
);

export const HeroSection = () => {
	const { data: session } = useSession();

	return (
		<div className="">
			<div className="text-4xl font-bold mb-14">
				Welcome to StayHub,{" "}
				<Tooltip title="Go to profile" placement="top">
					<Link
						href={`/users/${session?.user?.id}`}
						className="text-pink-400 underline"
					>
						{session?.user?.name ?? "Guest"}!
					</Link>
				</Tooltip>
			</div>

			<p className="text-xl font-semibold dark:text-[#ffffffea] mb-14 max-w-lg text-pink-700">
				StayHub – Where Comfort Meets Elegance!
			</p>
			<p className="text-gray-600 italic dark:text-[#ffffffea] mb-14 max-w-4xl">
				&quot; Welcome to StayHub, your perfect escape where luxury and
				comfort blend seamlessly. Whether you are traveling for business
				or leisure, we offer an exquisite stay experience with
				world-class amenities, elegant rooms, and exceptional
				hospitality. Relax, unwind, and make unforgettable memories at
				StayHub! 🌟🏨✨ &quot;
			</p>
			<div className="text-center">
				{/* <button className="btn-primary text-center">Get Started</button> */}
			</div>
		</div>
	);
};

export const section2 = (
	<div className="md:grid hidden gap-8 grid-cols-1">
		<div className="rounded-2xl overflow-hidden ">
			<Image
				src="/images/hotel-logo.webp"
				alt="hero-1"
				width={900}
				height={900}
				className="img scale-animation"
			/>
		</div>

		{/* <div className="grid grid-cols-2 gap-8 h-48">
			<div className="rounded-2xl overflow-hidden">
				<Image
					src="/images/hero-2.jpeg"
					alt="hero-2"
					width={300}
					height={300}
					className="img scale-animation"
				/>
			</div>
			<div className="rounded-2xl overflow-hidden">
				<Image
					src="/images/hotel-logo.webp"
					alt="hero-3"
					width={300}
					height={300}
					className="img scale-animation"
				/>
			</div>
		</div> */}
	</div>
);
