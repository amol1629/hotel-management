import AllRoomReviews from "@/components/AllRoomReviews/AllRoomReviews";

import ContactMapSection from "@/components/ContactMapSection/ContactMapSection";
import CreateRoomForm from "@/components/CreateRoom/CreateRoom";
import Facilities from "@/components/Facilities/Facilities";
import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import Rating from "@/components/Rating/Rating";
import RoomReview from "@/components/RoomReview/RoomReview";
import RoomTypes from "@/components/RoomTypes/RoomTypes";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import { getFeaturedRooms } from "@/libs/apis";

const Home = async () => {
	const featuredRoom = await getFeaturedRooms();

	return (
		<>
			<HeroSection />

			{/* <CreateRoomForm /> */}
			<RoomTypes />

			<Facilities />
			{/* <PageSearch /> */}
			{/* <AllRoomReviews /> */}
			<FeaturedRoom />

			<TestimonialsSection />

			{/* <Gallery />
			<NewsLetter /> */}

			<ContactMapSection />

			<Footer />
		</>
	);
};

export default Home;
