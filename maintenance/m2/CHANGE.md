## Change 2: Generation pages

A new page, `/generations/:name`, where the name is a generation API name such as `generation-i`:

- `h1`: the generation's English name (`Generation I`). The document title follows the rule for every page.
- A description list with `Region`: the humanized name of the generation's `main_region` (`Kanto`).
- Section `Pokémon`: the text `<count> Pokémon`, then a list of Pokémon cards for every species
  introduced in that generation, ordered by dex number.
- A generation the API doesn't have shows the not-found page.

On the Pokémon page, near the top (not in a section), add a link to the species' generation page,
labelled with the generation's English name.

The new page follows the app's rendering mode like every other page.
