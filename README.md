# Rothwell Town Friar

Website for Rothwell Town Friar, fish & chips and kebabs at 19 High St, Rothwell, Kettering NN14 6AD.

Live at [rothwelltownfriar.britzadvertiser.co.uk](https://rothwelltownfriar.britzadvertiser.co.uk/). Built by [Britz Advertiser](https://www.britzadvertiser.co.uk/).

Plain HTML and CSS, no build step. Upload the files as they are to the subdomain's folder.

## Structure

```
index.html      the whole site: hero, favourites, full menu, opening hours, map, printed menus
css/friar.css   all styles
js/friar.js     live "open now" badge (UK time), mobile menu, floating call button
assets/img/     logo, shopfront, food photos and printed menus
```

## Updating

- **Prices / menu items:** edit the menu sections in `index.html` (search for the item name).
- **Opening hours:** change them in two places: the hours table in `index.html` and the `HOURS` list at the top of `js/friar.js`.
- **Mobile photo zoom / gold line height:** see the commented lines in the `@media (max-width: 860px)` hero section of `css/friar.css`.
