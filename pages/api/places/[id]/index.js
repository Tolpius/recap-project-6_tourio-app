import dbConnect from "@/lib/dbConnect";
import Place from "@/models/Place";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const place = await Place.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!place) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      res.status(200).json({ success: true, data: place });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleted = await Place.findByIdAndDelete(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      res.status(200).json({ success: true, message: "Place deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
