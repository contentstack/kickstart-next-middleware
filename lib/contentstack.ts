import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string)
const endpoints = getContentstackEndpoints(region, true)

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false, // Disabling server-side rendering for live preview
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true', // Enabling live preview if specified in environment variables
    mode: "builder", // Setting the mode to "builder" for visual builder
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string, // Setting the API key from environment variables
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string, // Setting the environment from environment variables
    },
    clientUrlParams: {
      // Setting the client URL parameters for live preview
      // for internal testing purposes at Contentstack we look for a custom host in the env vars, you do not have to do this.
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || endpoints && endpoints.application
    },
    editButton: {
      enable: true, // Enabling the edit button for live preview
      exclude: ["outsideLivePreviewPortal"] // Excluding the edit button from the live preview portal
    },
  });
}

export async function getPage(baseUrl: string, url: string, contentTypeUid: string = "page", previewTimestamp?: string) {
  const livePreviewHash = ContentstackLivePreview.hash;
  const apiUrl = new URL('/api/middleware', baseUrl);
  apiUrl.searchParams.set('content_type_uid', contentTypeUid);
  apiUrl.searchParams.set('url', url);

  if (livePreviewHash) {
    apiUrl.searchParams.set('live_preview', livePreviewHash);
  }

  if (previewTimestamp) {
    apiUrl.searchParams.set('preview_timestamp', previewTimestamp);
  }

  const result = await fetch(apiUrl);

  return await result.json();
}