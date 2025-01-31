import { NextResponse } from "next/server";
import { createRoom } from "@/libs/apis"; // The createRoom function we just created

export async function POST(req: Request) {
	try {
		// Parse request body to extract room data
		const roomData = await req.json();

		// Validate required room data (ensure at least 3 images)
		if (!roomData.name || !roomData.price || !roomData.description) {
			return new NextResponse("Missing required room fields", {
				status: 400,
			});
		}

		// Attempt to create the room using the createRoom function
		const newRoom = await createRoom(roomData);

		// Return success response with the new room data
		return new NextResponse(JSON.stringify({ room: newRoom }), {
			status: 201,
			statusText: "Room Created Successfully",
		});
	} catch (error: any) {
		console.error("Error creating room:", error);
		return new NextResponse(`Error: ${error.message}`, { status: 500 });
	}
}
