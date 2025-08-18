import dbConnect from "@/lib/dbConnect";
import Place from "@/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      response.status(200).json(place);
    } catch (error) {
      response.status(500).json({ success: false, error: error.message });
    }
  } else if (request.method === "PUT") {
    try {
      const place = await Place.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!place) {
        return response
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      response.status(200).json({ success: true, data: place });
    } catch (error) {
      response.status(400).json({ success: false, error: error.message });
    }
  } else if (request.method === "DELETE") {
    try {
      const deleted = await Place.findByIdAndDelete(id);
      if (!deleted) {
        return response
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      response.status(200).json({ success: true, message: "Place deleted" });
    } catch (error) {
      response.status(500).json({ success: false, error: error.message });
    }
  } else {
    response.status(405).json({ success: false, message: "Method not allowed" });
  }
}
