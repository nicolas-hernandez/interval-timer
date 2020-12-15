# Interval Timer

Timer with countdown to control intervals and time lapses in your workouts

## Instalation

Simply grab the latest release from github's [releases page](https://github.com/nicolas-hernandez/interval-timer/releases),
decompress it and run `interval-timer.exe`.

## Development

This is esentially an electron app.

To run the app:
``` bash
git clone https://github.com/nicolas-hernandez/interval-timer.git
cd interval-timer
npm start
```

The tool used to create the windows release is `electron-packager`.
You can generate the release by running:
```
npm win
```

## Roadmap

- Fix CSS for the pause/reset overlays
- Remember last time's config instead of reversing to the default one.
- Add clock if the app is fullscreen

