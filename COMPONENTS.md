# Portfolio Components

This is a static browser application: `index.html` provides the page structure,
`assets/data/portfolio-data.js` supplies content, `script.js` renders and controls
the page, and `style.css` provides responsive presentation. There are no separate
runtime subsystems or build dependencies.

The component records below are derived from the `@component` blocks in
[`script.js`](script.js). Those blocks are authoritative for modification dates,
verification identities, confidence, and evidence.

## Startup Entrance

| Component ID | Purpose | Inputs | Outputs and Dependencies |
| --- | --- | --- | --- |
| `portfolio.startup.initializeSite` | Render content and bind existing interactions before revealing the page. | DOM-ready event and portfolio content data. | Rendered page and event handlers; always schedules the entrance reveal. |
| `portfolio.startup.finishPageEntrance` | Reveal the initialized page after a bounded profile-image decode wait. | Root loading class, profile image, and reduced-motion preference. | Replaces `is-loading` with `is-ready`; waits at most 800ms for image decoding, without waiting for other media. |

The small head bootstrap in `index.html` enables the loading state before the
first styled paint. A four-second fallback reveals the page if application
scripts fail. CSS applies finite opacity transitions and a subtle hero entrance;
reduced-motion users receive an immediate reveal without entrance animations.
The profile image has explicit dimensions and starts loading from the HTML.
If decoding exceeds the readiness budget, the page reveals and the image fades
in separately once ready, without moving the surrounding layout.
An initial project hash is positioned before reveal so scrolling cannot trigger
the existing offscreen-card auto-close behavior during startup.

## Skills Ticker

| Component ID | Purpose | Inputs | Outputs and Dependencies |
| --- | --- | --- | --- |
| `portfolio.skills.setupSeamlessScroll` | Build an exact repeat and control steady ticker playback. | Rendered skill labels, intrinsic group width, viewport visibility, motion preference, and document visibility. | Two matching groups, measured duration at 45 CSS pixels per second, and an `is-running` state; uses CSS transforms and resize/intersection observers where available. |

Each group includes its trailing gap, so a half-track translation reaches the
next copy exactly without rounded per-label measurements. The second copy is
hidden from assistive technology. The ticker pauses offscreen and in hidden tabs
without resetting its position; measurements update when the group size changes.
Mobile/tablet layouts retain their static strip, and reduced-motion layouts show
one wrapped copy of the skill labels without animation or edge masking.

## Media and Card Lifecycle

| Component ID | Purpose | Inputs | Outputs and Dependencies |
| --- | --- | --- | --- |
| `portfolio.media.renderYouTubeMedia` | Render a deferred YouTube player with its caption. | Gallery media object with `videoId` and optional `caption`. | Figure and iframe, or an empty text node for an invalid ID; uses browser DOM helpers and YouTube's privacy-enhanced embed endpoint. |
| `portfolio.media.renderGalleryItem` | Render a gallery item for its media type. | Gallery media object. | YouTube figure, local-video trigger, or image trigger; depends on media renderers and DOM helpers. |
| `portfolio.cards.openCard` | Expand a project and activate its deferred players. | Project card element. | Updated card, URL hash, description, and iframe sources; closes other cards and the expanded-media viewer. |
| `portfolio.cards.closeCard` | Collapse a project and unload its players. | Project card element. | Updated card and hash; removes iframe sources to stop playback. |
| `portfolio.cards.setupCards` | Bind expansion without intercepting native controls. | Rendered project cards. | Click and keyboard handlers; leaves links and form controls' keyboard behavior intact. |

YouTube items appear within an expanded project's media column. Their iframe
source is absent while the card is closed. Opening the card supplies the source;
YouTube's controls start playback. Closing the card, opening another project, or
filtering out the project unloads the player through the existing card lifecycle.
Player clicks and Enter/Space events do not toggle the surrounding card.

The responsive player keeps at least 200px of height. External video links remain
visible in collapsed cards as an alternative to the embedded player. Local demo
videos continue to use their existing viewport-based playback behavior.

See [`assets/data/README.md`](assets/data/README.md#youtube-presentations) for the
content format. Existing unannotated components are outside this documentation's
current metadata coverage; this index does not assert verification for them.
