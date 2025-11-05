import contentstack from "@contentstack/delivery-sdk";
import { NextResponse } from "next/server"
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const content_type_uid = searchParams.get("content_type_uid")
  const pageUrl = searchParams.get("url")
  const live_preview = searchParams.get("live_preview")
  const preview_timestamp = searchParams.get("preview_timestamp")

  // Use custom endpoints if provided, otherwise fall back to region-based endpoints
  // For internal testing purposes at Contentstack we look for a custom region/hostnames in the env vars, you do not have to do this.
  let hostname: string;
  if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST && process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY) {
    hostname = live_preview
      ? process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST
      : process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY;
  } else {
    const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string);
    const endpoints = getContentstackEndpoints(region, true);
    hostname = (live_preview ? endpoints.preview : endpoints.contentDelivery) as string;
  }

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