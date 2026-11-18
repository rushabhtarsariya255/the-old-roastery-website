# Website photography

All six supplied Google image URLs returned HTTP 200 and decoded as WebP images. The fourth URL was reconstructed by joining the adjacent `cVAR...` continuation. These are individual image links, not an album listing.

The six supplied photos and eight existing photos have distinct website placements. The approved cleanup removed eight byte-identical curated copies and 14 lower-resolution variants. All 11 pre-existing originals and the favicon were preserved and verified by SHA-256.

## Retained website photographs

| Asset | Placement | Dimensions | Retained source | Bytes |
|---|---|---|---|---|
| interior | Hero | 1360 x 907 | public/images/the-old-roastery-interior-seating.jpg | 146286 |
| coffee-counter | Our Story | 680 x 1020 | public/images/curated/coffee-counter.webp | 84620 |
| cranberry | Best Sellers featured drink | 680 x 1020 | public/images/the-old-roastery-cranberry-cold-brew.jpg | 70020 |
| pizza-pair | Menu kitchen photograph | 816 x 1020 | public/images/the-old-roastery-neapolitan-pizzas.jpg | 148774 |
| sandwiches | Menu kitchen photograph | 681 x 1020 | public/images/the-old-roastery-artisanal-sandwich.jpg | 87190 |
| layered-coffee | Experiences: coffee | 680 x 1020 | public/images/the-old-roastery-specialty-coffee.jpg | 34448 |
| plated-dish | Experiences: kitchen | 816 x 1020 | public/images/curated/plated-dish.webp | 88472 |
| table-setting | Experiences: space | 680 x 1020 | public/images/the-old-roastery-table-ambience.jpg | 82658 |
| pour-over | Gallery | 680 x 1020 | public/images/curated/pour-over.webp | 53082 |
| pizza-drink | Gallery | 680 x 1020 | public/images/the-old-roastery-artisan-pizza-drink.jpg | 59612 |
| exterior | Gallery | 680 x 1020 | public/images/the-old-roastery-exterior.jpg | 145446 |
| citrus-drink | Gallery | 680 x 1020 | public/images/curated/citrus-drink.webp | 55550 |
| croissant | Gallery | 680 x 1020 | public/images/curated/croissant.webp | 43730 |
| iced-coffee | Gallery | 816 x 1020 | public/images/curated/iced-coffee.webp | 149626 |

## Storage policy

Each unique photograph has one full-quality source. The eight original `.jpg` filenames are preserved even though their file signatures identify WebP-encoded content; their curated `.webp` copies contained the exact same bytes, so there was no quality advantage to retaining both. The six new supplied images remain in `public/images/curated/`.

All 480px variants were removed as approved. Image registry `src` and its single `srcSet` candidate now point to the retained original-resolution file. Layouts remain responsive, but mobile image transfers are larger than with multiple responsive image sizes. The hero remains eager/high-priority, and lower-section images remain lazy-loaded.

No photo is reused across separate sections, including experience states. The lightbox enlarges the retained gallery photograph. The three unrelated pre-existing photos not currently used on the page remain untouched, as do the favicon and other assets.

## Cleanup audit

The cleanup removed 22 source files and 1,335,918 bytes (approximately 1.27 MiB). Source image assets now comprise 17 unique photographs and one favicon. The production build regenerates its necessary copies in dist; those build artifacts are not additional source versions.

[image-cleanup.json](image-cleanup.json) records each removed file, the retained replacement, and checksums for all protected originals. Historical removed paths in that audit are intentional records, not active image references.

Captions and alt text describe visible subjects and do not certify ingredients, menu item identity, availability, prices, supplier affiliations, or photo licensing. Menu item names/descriptions remain intact; unmatched dishes use text rather than unrelated images.

See [photography-manifest.json](photography-manifest.json) for source URLs/paths, retained checksums, dimensions, and website placements.
