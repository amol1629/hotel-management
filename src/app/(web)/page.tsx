import AllRoomReviews from "@/components/AllRoomReviews/AllRoomReviews";
import CreateRoomForm from "@/components/CreateRoom/CreateRoom";
import Facilities from "@/components/Facilities/Facilities";
import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import Rating from "@/components/Rating/Rating";
import RoomReview from "@/components/RoomReview/RoomReview";
import RoomTypes from "@/components/RoomTypes/RoomTypes";
<<<<<<< HEAD
import { getFeaturedRooms } from "@/libs/apis";
=======
import { getFeaturedRoom } from "@/libs/apis";
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd

const Home = async () => {
	const featuredRoom = await getFeaturedRooms();

	return (
		<>
			<HeroSection />
<<<<<<< HEAD

			{/* <CreateRoomForm /> */}
			<RoomTypes />

			<Facilities />
			{/* <PageSearch /> */}
			{/* <AllRoomReviews /> */}
			<FeaturedRoom />
=======
			<RoomTypes />
			{/* <PageSearch /> */}
			<AllRoomReviews />
			<FeaturedRoom featuredRoom={featuredRoom} />
>>>>>>> 57a659ebe91566217b6c13a251cbb1b4fec559fd

			<Gallery />
			<NewsLetter />
		</>
	);
};

export default Home;
