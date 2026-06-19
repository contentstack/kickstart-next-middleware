import contentstack from "@contentstack/delivery-sdk";
import { NextResponse } from "next/server"
import { getContentstackEndpoint, type ContentstackEndpoints } from "@contentstack/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const content_type_uid = searchParams.get("content_type_uid")
  const pageUrl = searchParams.get("url")
  const live_preview = searchParams.get("live_preview")
  const preview_timestamp = searchParams.get("preview_timestamp")

  const endpoints = getContentstackEndpoint(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'NA', '', true) as ContentstackEndpoints;
  const hostname = live_preview
    ? process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || endpoints.preview as string
    : process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || endpoints.contentDelivery as string;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("api_key", process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string);
  headers.append("access_token", process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string);

  if (live_preview) {
    headers.append("live_preview", live_preview as string);
    headers.append("preview_token", process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN as string);
    if (preview_timestamp) {
      headers.append("preview_timestamp", preview_timestamp as string);
    }
  }

  const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string;

  // Create query to find entry by URL
  const query = JSON.stringify({ url: pageUrl });
  const apiUrl = `https://${hostname}/v3/content_types/${content_type_uid}/entries?environment=${environment}&query=${encodeURIComponent(query)}`

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });

  const result = await res.json();
  const { entries } = result
  const entry = entries && entries.length > 0 ? entries[0] : null;

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW) {
    contentstack.Utils.addEditableTags(entry, 'page', true);
  }

  return NextResponse.json(entry)
}