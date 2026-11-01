## Change 3: Sorting the Pokémon list

On `/`, add a fourth control after `Generation`: a `<select>` labelled `Sort` with the options
`Dex number` (the default) and `Name`.

- `Name` orders all matching species by humanized name (`localeCompare`), across all pages.
  `Dex number` keeps the current order.
- The choice lives in the URL query as `sort=name`; the default is omitted. Like the other
  filters, changing it updates the URL and goes back to page 1, and the pagination links keep it.
