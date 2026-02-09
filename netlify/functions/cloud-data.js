import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("linktree_store");
  const blobKey = "app_data";

  try {
    if (req.method === "GET") {
      const data = await store.get(blobKey, { type: "json" });
      return new Response(JSON.stringify(data || {}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST") {
      const body = await req.json();
      await store.setJSON(blobKey, body);
      return new Response(
        JSON.stringify({ message: "Data saved successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response("Method Not Allowed", { status: 405 });
  } catch (error) {
    console.error("Cloud Blob Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
