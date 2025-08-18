import dbConnect from "@/lib/dbConnect"; 
import Place from "@/models/Place";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Place.find({});
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const place = await Place.create(req.body);
      res.status(201).json({ success: true, data: place });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
