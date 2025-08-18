import dbConnect from "@/lib/dbConnect"; 
import Place from "@/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find({});
      response.status(200).json(places);
    } catch (error) {
      response.status(500).json({ success: false, error: error.message });
    }
  } else if (request.method === "POST") {
    try {
      const place = await Place.create(request.body);
      response.status(201).json({ success: true, data: place });
    } catch (error) {
      response.status(400).json({ success: false, error: error.message });
    }
  } else {
    response.status(405).json({ success: false, message: "Method not allowed" });
  }
}
