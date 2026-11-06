import { OpenPanelComponent } from "@openpanel/nextjs";

/**
 * Analytics, and only if it has been configured.
 *
 * Everything comes from the environment, so the site runs identically with no
 * analytics at all: local development, preview deploys and anyone who clones
 * the repo get nothing, and nothing has to be commented out to achieve that.
 *
 * `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` is the switch. Without it this renders
 * null, no script tags are emitted, and nothing is fetched. `OpenPanelComponent`
 * is not a client component - it renders two `next/script` tags, an inline
 * init snippet and the SDK itself - so the whole integration is markup this
 * server component either emits or does not.
 *
 * The other two are optional and describe a self-hosted instance:
 *
 *   NEXT_PUBLIC_OPENPANEL_API_URL     where events are sent
 *   NEXT_PUBLIC_OPENPANEL_SCRIPT_URL  where the SDK script is served from
 *
 * Set both together. Pointing only the API at your own server still leaves the
 * script coming from openpanel.dev - a third-party request to a domain tracker
 * blockers recognise, so it would be blocked for a share of visitors even
 * though the data was only ever going to a first-party server. Served from the
 * instance instead, it is same-site as far as blockers are concerned.
 *
 * Left unset, the SDK falls back to OpenPanel's own cloud endpoints, so the
 * hosted service works with just the client id.
 *
 * On the NEXT_PUBLIC_ prefix: this module runs on the server, so it could read
 * unprefixed variables. It does not, because the client id is written into the
 * inline snippet in the prerendered HTML and the tracking call is made by the
 * visitor's browser - the value is public whatever it is named, and the prefix
 * is the honest label for that. This is the *client id*, a public identifier by
 * design, like a Google Analytics measurement id. The OpenPanel client secret
 * has no place here: it authorises ingestion without an origin check, so
 * publishing it would let anyone forge events into the workspace. It only
 * belongs in a request that never leaves a server.
 */
const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;
const apiUrl = process.env.NEXT_PUBLIC_OPENPANEL_API_URL;
const scriptUrl = process.env.NEXT_PUBLIC_OPENPANEL_SCRIPT_URL;

export function Analytics() {
  if (!clientId) return null;

  return (
    <OpenPanelComponent
      clientId={clientId}
      // The SDK resolves both with `??` / `||`, so undefined is the same as
      // not passing them and its own defaults apply.
      apiUrl={apiUrl}
      scriptUrl={scriptUrl}
      // Page views only. `trackOutgoingLinks` and `trackAttributes` default to
      // false and stay there: nothing beyond the view itself is reported, and
      // there are no custom events to keep in step with the markup.
      trackScreenViews
    />
  );
}
