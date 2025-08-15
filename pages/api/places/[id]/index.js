import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    const placeById = await Place.findById(id);
    if (!placeById) {
      response.status(404).json({ status: "Not found" });
      return;
    }
    response.status(200).json(placeById);
  }

  if (request.method === "PUT") {
    const placeUpdate = await Place.findByIdAndUpdate(id, request.body);
    response.status(200).json(placeUpdate);
    return;
  }

  if (request.method === "DELETE") {
    const placeDelete = await Place.findByIdAndRemove(id);
    response.status(200).json(placeDelete);
    return;
  }
}
