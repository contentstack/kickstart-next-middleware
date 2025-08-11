import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "EU");
const endpoints = getContentstackEndpoints(region, true)

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: true,
    enable: true,
    mode: "builder",
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },
    clientUrlParams: {
      // Setting the client URL parameters for live preview
      // for internal testing purposes at Contentstack we look for a custom host in the env vars, you do not have to do this.
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || endpoints && endpoints.application

    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"]
    },
  });

}
