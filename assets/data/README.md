# Editing site content

This site is static and GitHub Pages compatible. There is no build step, no `fetch()` call, no npm/Vite dependency, and no module import requirement. The page loads `assets/data/portfolio-data.js` as a plain script.

Most editable content lives in:

- `assets/data/portfolio-data.js`

Use that file to update profile text, skills, navigation, section filters, entries, media, links, captions, and contact details.

## Structure

The file is organized into two main parts:

```js
const ENTRY_LIBRARY = {
  thinkAgain: { ... },
  mastah: { ... },
  tampPanda: { ... },
  cbfDeepracer: { ... },
  beliefSpaceDeepracer: { ... },
  rnePipeline: { ... },
  quadrotorUav: { ... }
};

window.PORTFOLIO_DATA = {
  profile: { ... },
  skills: [ ... ],
  navigation: [ ... ],
  about: { ... },
  sections: [
    {
      id: "research",
      title: "Research",
      filters: [ ... ],
      entries: [
        ENTRY_LIBRARY.thinkAgain,
        ENTRY_LIBRARY.mastah
      ]
    }
  ]
};
```

## Edit an existing entry

Find the entry in `ENTRY_LIBRARY` and edit that object directly.

For example, to edit the TAMP entry, search for:

```js
const ENTRY_LIBRARY = {
  ...
  tampPanda: {
```

The most common fields to edit are:

- `title`
- `summary`
- `meta`
- `descriptions`
- `tags`
- `featuredMedia`
- `media`
- `links`

Opening an entry updates the browser URL to that entry ID, so `#tamp-panda` or `#think-again` can be shared directly.

## Add, remove, or reorder an entry with one line

Each section has an `entries` list near the bottom of `portfolio-data.js`.

To remove an entry, delete or comment out one line:

```js
ENTRY_LIBRARY.tampPanda,
```

To reorder entries, move that one line up or down.

To add an entry, create a new object in `ENTRY_LIBRARY`, then add one line to a section:

```js
ENTRY_LIBRARY.newRobotProject,
```

## Add a new entry object

Copy an existing entry in `ENTRY_LIBRARY` and update:

- `id`: unique page-safe identifier, such as `new-robot-project`.
- `type`: `Research` or `Project`.
- `title`
- `summary`: compact preview sentence for the collapsed card.
- `topics`: must match section filter values if you want filters to show it.
- `meta`: Role, Tools, Timeline, Team, Status.
- `links`: optional list of report, poster, code, demo, or other evidence links.
- `descriptions`: labeled paragraphs shown when expanded.
- `tags`
- `featuredMedia`
- `media`

Example link block:

```js
links: [
  { label: "Report PDF", href: "assets/docs/my_project_report.pdf", type: "pdf" },
  { label: "Code", href: "https://github.com/username/repo" }
]
```

## Add media

Media paths should be relative to `index.html`, for example:

```js
{
  type: "video",
  src: "assets/videos/new-demo.mp4",
  poster: "assets/images/new-demo-poster.jpg",
  caption: "Hardware demonstration",
  blurb: "Short employer-facing explanation of what the viewer is seeing."
}
```

Then place the actual file in `assets/images/`, `assets/videos/`, or `assets/docs/`.

## GitHub Pages notes

- Keep paths relative; do not start local asset paths with `/`.
- Keep `assets/data/portfolio-data.js` loaded before `script.js` in `index.html`.
- Because data is loaded as a plain script, the site works on GitHub Pages without needing JSON fetches, bundlers, Node, npm, or Vite.


## Updating education/status

Edit `profile.subtitle`, `profile.education`, `profile.sidebarNote`, `profile.contactIntro`, and the `about.paragraph` field in `assets/data/portfolio-data.js`. The contact section renders `profile.education` automatically.


## Resume chapter

The embedded resume is a normal content section with `id="resume"` in `index.html`. The left navigation entry is controlled from `navigation` in `portfolio-data.js`, and the PDF path comes from `profile.resume`.
