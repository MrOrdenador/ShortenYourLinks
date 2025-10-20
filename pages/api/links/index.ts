import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/supabase/supabaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { uuid, link } = req.body;

    if (!uuid || !link) {
      return res.status(400).json({ error: "Missing uuid or link" });
    }

    const { data, error } = await supabaseServer
      .from("uuids")
      .insert([{ uuid, link }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ data });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
