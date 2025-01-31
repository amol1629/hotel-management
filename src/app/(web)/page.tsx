import AllRoomReviews from "@/components/AllRoomReviews/AllRoomReviews";
import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import Rating from "@/components/Rating/Rating";
import RoomReview from "@/components/RoomReview/RoomReview";
import RoomTypes from "@/components/RoomTypes/RoomTypes";
import { getFeaturedRoom } from "@/libs/apis";

const Home = async () => {
	const featuredRoom = await getFeaturedRoom();

	return (
		<>
			<HeroSection />
			<RoomTypes />
			{/* <PageSearch /> */}
			<AllRoomReviews />
			<FeaturedRoom featuredRoom={featuredRoom} />

			<Gallery />
			<NewsLetter />
		</>
	);
};

export default Home;
