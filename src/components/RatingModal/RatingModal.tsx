import { Dispatch, FC, SetStateAction } from "react";
import { BsStarFill } from "react-icons/bs";

type Props = {
	isOpen: boolean;
	ratingValue: number | null;
	setRatingValue: Dispatch<SetStateAction<number | null>>;
	ratingText: string;
	setRatingText: Dispatch<SetStateAction<string>>;
	reviewSubmitHandler: () => Promise<string | undefined>;
	isSubmittingReview: boolean;
	toggleRatingModal: () => void;
};

const RatingModal: FC<Props> = (props) => {
	const {
		isOpen,
		ratingValue,
		setRatingValue,
		ratingText,
		setRatingText,
		reviewSubmitHandler,
		isSubmittingReview,
		toggleRatingModal,
	} = props;

	const starValues = [1, 2, 3, 4, 5];

	const backgroundImageUrl = "/images/cover-image-2.png";

	return (
		<div
			className={`fixed z-[61] inset-0 flex items-center justify-center transition-opacity duration-300 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}
		>
			{/* Backdrop with Blur */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
				onClick={toggleRatingModal}
			></div>

			{/* Modal Content */}
			<div className="relative w-full max-w-md mx-4 sm:mx-0 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden transition-transform duration-300 transform scale-95 hover:scale-100">
				{/* Blurred Background */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: `url(${backgroundImageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						filter: "blur(8px)",
					}}
				></div>

				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

				{/* Modal Body */}
				<div className="relative z-20 p-6 text-white">
					{/* Title */}
					<h2 className="text-3xl font-bold text-yellow-400 mb-4">
						Rate Your Experience
					</h2>

					{/* Star Rating */}
					<div className="my-6">
						<label className="block text-sm font-medium text-white mb-2">
							Rating
						</label>
						<div className="flex items-center space-x-2">
							{starValues.map((value) => (
								<button
									key={value}
									className={`transition-all duration-200 ${
										ratingValue && ratingValue >= value
											? "text-yellow-400 transform scale-110"
											: "text-gray-300 hover:text-yellow-400"
									}`}
									onClick={() => setRatingValue(value)}
								>
									<BsStarFill className="w-8 h-8" />
								</button>
							))}
						</div>
					</div>

					{/* Review Text */}
					<div className="my-6">
						<label className="block text-sm font-medium text-white mb-2">
							Review Text
						</label>
						<textarea
							value={ratingText}
							onChange={(e) => setRatingText(e.target.value)}
							rows={4}
							className="w-full px-4 py-3 bg-black/30 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
							placeholder="Share your experience..."
						></textarea>
					</div>

					{/* Buttons */}
					<div className="flex justify-end space-x-4">
						<button
							onClick={toggleRatingModal}
							className="px-6 py-2 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-all duration-200"
						>
							Cancel
						</button>
						<button
							onClick={reviewSubmitHandler}
							className="px-6 py-2 bg-yellow-500 text-white rounded-2xl hover:bg-yellow-600 transition-all duration-200"
							disabled={isSubmittingReview}
						>
							{isSubmittingReview ? "Submitting..." : "Submit"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RatingModal;
