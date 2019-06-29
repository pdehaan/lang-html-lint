# lang-html-lint

HTML linter for .lang files.

## USAGE

```sh
$ time npx pdehaan/lang-html-lint './locale/**/*.lang'
```

### OUTPUT

```js
// npx: installed 27 in 3.717s
// npx pdehaan/lang-html-lint './locale/**/*.lang'  26.01s user 2.44s system 121% cpu 23.445 total

[
  {
    "file": "./locale/an/firefox/new/quantum.lang",
    "errors": [
      {
        "column": 64,
        "code": "E042",
        "data": {},
        "rule": "tag-close",
        "file": "./locale/an/firefox/new/quantum.lang",
        "html": "La tuya descargar empecipiará automaticament. No ha funcionau? <a id=\"%(id)s\" href=\"%(fallback_url)s\">Preba tornarndo-lo a descargar."
      }
    ]
  },
  ...
]
```
