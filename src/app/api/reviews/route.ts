import { getAllRoomReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const allReviews = await getAllRoomReviews();
		return NextResponse.json(allReviews, {
			status: 200,
			statusText: "Successful",
		});
	} catch (error) {
		console.error("Fetching all reviews failed:", error);
		return new NextResponse("Unable to fetch", { status: 400 });
	}
}
