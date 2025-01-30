"use client";

import { FC } from "react";

import CountUpNumber from "../CountUpNumber/CountUpNumber";
import { HeroSection } from "./ServerComponent";

type Props = {
	heading1: React.ReactNode;
	section2: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
	const { heading1, section2 } = props;

	return (
		<section className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 gap-12 container mx-auto ">
			<div className="py-10 w-full">
				<div>
					<HeroSection />

					<div className="mt-8 border border-pink-200 rounded-lg py-6 px-6 dark:bg-transparent max-w-6xl mx-auto">
						<div className="mb-6 text-md md:text-lg font-medium text-center lg:text-left">
							Experience unparalleled comfort and luxury at
							StayHub, where we offer a variety of accommodations
							to suit your needs:
						</div>

						{/* Responsive Rooms Section */}
						<div className="flex flex-wrap justify-center lg:justify-between gap-6">
							{/* Basic Room */}
							<div className="flex flex-col items-center justify-center rounded-full border-2 border-pink-300 dark:border-gray-700 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 p-4 bg-[#fde6ee] dark:bg-transparent">
								<div>
									<CountUpNumber
										duration={5000}
										endValue={50}
									/>
								</div>
								<p className="text-sm md:text-lg text-center mt-2">
									Basic Room
								</p>
							</div>

							{/* Luxury Room */}
							<div className="flex flex-col items-center justify-center rounded-full border-2 border-pink-300 dark:border-gray-700 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 p-4  bg-[#fde6ee] dark:bg-transparent">
								<div>
									<CountUpNumber
										duration={5000}
										endValue={120}
									/>
								</div>
								<p className="text-sm md:text-lg text-center mt-2">
									Luxury Room
								</p>
							</div>

							{/* Suite */}
							<div className="flex flex-col items-center justify-center rounded-full border-2 border-pink-300 dark:border-gray-700 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 p-4  bg-[#fde6ee] dark:bg-transparent">
								<div>
									<CountUpNumber
										duration={5000}
										endValue={60}
									/>
								</div>
								<p className="text-sm md:text-lg text-center mt-2">
									Suite
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-auto">{section2}</div>
		</section>
	);
};

export default ClientComponent;
