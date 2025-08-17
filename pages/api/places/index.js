import Place from "@/db/models/Place";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    response.status(200).json(places);
    console.log("places: ", places);
    return;
  }

  if (request.method === "POST") {
    await Place.create(request.body);
    response.status(200).json({ status: "Created" });
    return;
  }
}
