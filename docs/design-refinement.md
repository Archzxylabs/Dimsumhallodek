# Layout & asset refinement — 17 October 2026

## Direction

A photo-led, warm hospitality layout using the existing army, cream, orange, and yellow palette. The opening `KineticShowcase` and its garnish animations stay intact. Subsequent sections use a smaller editorial type scale, consistent content widths, and content-driven heights instead of full-screen minimum heights.

- Home: browse six flavours in a native scrolling gallery; expand actual portion prices and photographs; discover cake, bouquet, frozen, events, membership, and partnership without oversized decorative sections.
- Detail pages: compact introductions, readable forms and product specifications, original client artwork, and fewer ornamental layers.
- Generic star, cartoon dumpling, and invented bouquet artwork removed from rendered pages. Navigation and functional icons remain.
- Mobile: touch controls, two visible flavour/gift cards where the width allows, a single card on very small screens, and one-column detail forms.

## Supplied assets now used

`public/assets/client/manifest.json` records every web derivative and its original source. Original downloads and client archives remain intact.

| Assets | Use |
| --- | --- |
| 17 product photos | Six-flavour gallery and expandable 3/6/16-piece previews. The ambiguous `mentar-16` download is excluded. |
| Menu and cake catalogues | Full-size references linked from the menu and cake sections. |
| Frozen catalogue and two packaging photographs | Replace the generic frozen illustration; full catalogue remains available as a document. |
| Birthday and wedding catalogues | Event previews on home and references beside the event planner. |
| Cake and Bouquet M photos from the catalogue | Replaces the invented bouquet drawing and supplies the gift cards. Crops preserve the photographed product. |
| Two original Bang Mus poses with transparency from the latest PDF | Membership and partnership imagery. PDF soft masks are retained; no new character generation was needed. |
| Storefront concept from the same PDF | Partnership illustration, captioned as a concept/reference rather than an identified operating outlet. |

The exports total approximately 1.9 MB. Product photographs are resized to 800 px and served as WebP; catalogue documents keep sufficient resolution for reading. Images below the opening use lazy loading and retain intrinsic dimensions.

## Content boundaries

The existing catalogue is the source of prices. Original kukus is priced for **4 pcs** in that catalogue; supplied photographs show **6 and 16 pcs**, so their quantity and the distinction are stated explicitly. Other Original portion prices are not invented.

The Year-End promotion is not presented as an active offer without a confirmed validity period. Source sheets and other unselected assets remain in the archive for future use. Two unique downloads are indexed in `client-data/2026-10-17/`; the alternate cake catalogue is held for confirmation because it conflicts on M/Bouquet quantities and introduces additional products. Membership stays at 1% of product price, administered through WhatsApp, with redemption confirmed by the team.

## Verification

Browser artifacts and diagnostic captures are kept locally in `output/playwright/` and excluded from Git/deployment. Checks cover the six routes, narrow phone/phone/tablet/desktop layouts, image loading, gallery controls, existing forms and navigation, and reduced motion. The initial fast-navigation capture timed out on two pages; both were rechecked successfully after page loading settled. Closed, lazy-loaded detail photographs were excluded from broken-image reports and the exported assets were separately checked over HTTP. Viewport emulation is not real-device coverage.
