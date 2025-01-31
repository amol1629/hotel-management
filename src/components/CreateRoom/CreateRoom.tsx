"use client"; // Indicates that this component is client-side

import React, { useState } from "react";

const CreateRoomForm = () => {
	// Define state variables for the form inputs
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [dimension, setDimension] = useState("");
	const [numberOfBeds, setNumberOfBeds] = useState(1);
	const [isBooked, setIsBooked] = useState(false);
	const [isFeatured, setIsFeatured] = useState(false);
	const [images, setImages] = useState([{ url: "", file: null }]);
	const [coverImage, setCoverImage] = useState({ url: "", file: null });
	const [specialNote, setSpecialNote] = useState("");
	const [amenities, setAmenities] = useState([{ icon: "", amenity: "" }]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const roomData = {
			name,
			description,
			price,
			discount,
			images,
			coverImage,
			type: "suite", // Static room type, change as necessary
			specialNote,
			dimension,
			numberOfBeds,
			offeredAmenities: amenities,
			isBooked,
			isFeatured,
		};

		try {
			const response = await fetch("/api/create-room", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(roomData),
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log("Room created successfully:", responseData);
				alert("Room created successfully!");
			} else {
				const errorData = await response.text();
				setError(`Error: ${errorData}`);
			}
		} catch (error) {
			setError("Failed to create room. Please try again later.");
			console.error("Error creating room:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="create-room-form bg-white">
			<h1>Create a New Room</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block">Room Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="input"
					/>
				</div>

				<div>
					<label className="block">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className="input"
					/>
				</div>

				<div>
					<label className="block">Price</label>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						required
						className="input"
					/>
				</div>

				<div>
					<label className="block">Discount</label>
					<input
						type="number"
						value={discount}
						onChange={(e) => setDiscount(Number(e.target.value))}
						className="input"
					/>
				</div>

				<div>
					<label className="block">Dimension</label>
					<input
						type="text"
						value={dimension}
						onChange={(e) => setDimension(e.target.value)}
						className="input"
					/>
				</div>

				<div>
					<label className="block">Number of Beds</label>
					<input
						type="number"
						value={numberOfBeds}
						onChange={(e) =>
							setNumberOfBeds(Number(e.target.value))
						}
						className="input"
					/>
				</div>

				<div>
					<label className="block">Special Note</label>
					<textarea
						value={specialNote}
						onChange={(e) => setSpecialNote(e.target.value)}
						className="input"
					/>
				</div>

				<div>
					<label className="block">Is Booked?</label>
					<input
						type="checkbox"
						checked={isBooked}
						onChange={(e) => setIsBooked(e.target.checked)}
						className="checkbox"
					/>
				</div>

				<div>
					<label className="block">Is Featured?</label>
					<input
						type="checkbox"
						checked={isFeatured}
						onChange={(e) => setIsFeatured(e.target.checked)}
						className="checkbox"
					/>
				</div>

				<div>
					<label className="block">Amenities</label>
					{amenities.map((amenity, index) => (
						<div key={index} className="flex space-x-2">
							<input
								type="text"
								placeholder="Icon"
								value={amenity.icon}
								onChange={(e) => {
									const updatedAmenities = [...amenities];
									updatedAmenities[index].icon =
										e.target.value;
									setAmenities(updatedAmenities);
								}}
								className="input"
							/>
							<input
								type="text"
								placeholder="Amenity"
								value={amenity.amenity}
								onChange={(e) => {
									const updatedAmenities = [...amenities];
									updatedAmenities[index].amenity =
										e.target.value;
									setAmenities(updatedAmenities);
								}}
								className="input"
							/>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							setAmenities([
								...amenities,
								{ icon: "", amenity: "" },
							])
						}
						className="btn"
					>
						Add Amenity
					</button>
				</div>

				<div>
					<label className="block">Room Images</label>
					{/* Add your image handling here */}
					{/* For simplicity, we use a basic input for image URLs */}
					<input
						type="text"
						placeholder="Image URL"
						value={images[0].url}
						onChange={(e) => {
							const updatedImages = [...images];
							updatedImages[0].url = e.target.value;
							setImages(updatedImages);
						}}
						className="input"
					/>
				</div>

				<div>
					<label className="block">Cover Image URL</label>
					<input
						type="text"
						value={coverImage.url}
						onChange={(e) =>
							setCoverImage({
								...coverImage,
								url: e.target.value,
							})
						}
						className="input"
					/>
				</div>

				{error && <div className="error">{error}</div>}

				<button type="submit" className="btn" disabled={loading}>
					{loading ? "Creating Room..." : "Create Room"}
				</button>
			</form>
		</div>
	);
};

export default CreateRoomForm;
