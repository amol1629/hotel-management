import { FaHotel, FaConciergeBell } from "react-icons/fa";

const LoadingSpinner = () => {
	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center space-y-6 bg-black/40 backdrop-blur-sm text-white animate-fade-in">
			<div className="relative flex items-center justify-center w-28 h-28">
				<div className="absolute w-28 h-28 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
				<div className="absolute w-24 h-24 border-4 border-transparent border-t-yellow-300 rounded-full animate-spin-slow"></div>
				<div className="absolute w-20 h-20 border-4 border-transparent border-t-yellow-200 rounded-full animate-spin-reverse"></div>
				<div className="absolute w-16 h-16 border-4 border-transparent border-t-yellow-100 rounded-full animate-pulse"></div>
				<FaHotel className="absolute text-yellow-400 text-4xl drop-shadow-lg" />
			</div>
			<p className="text-xl font-semibold animate-pulse tracking-wide flex items-center gap-2">
				<FaConciergeBell className="text-yellow-300 text-2xl animate-bounce" />{" "}
				"Reserving your perfect stay... Please wait."
			</p>
			<p className="text-sm text-gray-300 animate-fade-in">
				Luxury, comfort, and unforgettable experiences are just moments
				away.
			</p>
		</div>
	);
};

export default LoadingSpinner;
