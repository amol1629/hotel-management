"use client";

import {
	Chart as ChartJS,
	Tooltip,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

import { Booking } from "@/models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Bar Chart",
		},
	},
};

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
	const labels = userBookings.map((booking) => booking.hotelRoom.name);
	const amountSpent = userBookings.map((booking) => booking.totalPrice);

	return (
		<Bar
			className="relative z-20"
			options={{
				...options,
				scales: {
					x: {
						ticks: { color: "#fff" }, // White X-axis labels
					},
					y: {
						ticks: { color: "#fff" }, // White Y-axis labels
					},
				},
			}}
			data={{
				labels,
				datasets: [
					{
						label: "Amount Spent",
						data: amountSpent,
						borderWidth: 1,
						backgroundColor: "rgba(255, 255, 255, 0.8)", // White bars
						borderColor: "#fff", // White border
					},
				],
			}}
		/>
	);
};

export default Chart;
