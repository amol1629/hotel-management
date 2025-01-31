"use client";

import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
import { HeroSection } from "./ServerComponent";
import Image from "next/image";

type Props = {
	heading1: React.ReactNode;
	section2: React.ReactNode;
};

const ClientComponent: FC<Props> = ({ heading1, section2 }) => {
	const backgroundImageUrl = "/images/cover-image-3.png";

	return (
		<section className="flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-12 w-full max-w-screen-xl mx-auto">
			{/* Hero Section - Bigger */}
			<div className="w-full  flex flex-col items-center text-center">
				<HeroSection />
			</div>

			
		</section>
	);
};

export default ClientComponent;
