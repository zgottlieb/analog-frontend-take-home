# Front-End Engineer Take-Home Challenge

A real-time monitoring dashboard built with React, D3, and TailwindCSS. Streams data from 10 producers via WebSockets and visualizes live signal data with shared axis scaling and pause/resume control.

See the writeup of the challenge prompt here: ./challenge-prompt.md

## Getting started

This app was built to use this repo as it's backend: https://github.com/6xzo/challenge-backend

To run the app, install dependencies and run the dev script

```
yarn
yarn dev
```

## How It Works

The app connects to 10 unique WebSocket data producers.

Each chart shows:

- A real-time line plot of values over the last 1 second
- The min, max, and average value for the visible window
- Shared Y-axis scaling to enable meaningful comparison

You can pause the data stream to freeze all charts and view values. A timestamp is displayed to indicate when the pause occurred.

## Future directions

This is only the barebones of what could become a useful monitoring application. There are several features I attempted and/or brainstormed to build here, including:

**Brush tool or other way to select a timeframe**
-I explored a D3-based brush tool for selecting a time window to summarize (min, max, avg) across all charts. This would support more fine-grained inspection beyond the current live window and for selecting unique time ranges to get min/max/avg aside from the default fixed window.

- Due to time considerations, I deferred on implementing this fully, but would have liked to include: D3 code for the brush tool, event handling and state management for when the selection is active, and some form of persistence of data.

**Thresholds & Alerts**

- Enable setting a threshold that sets a line on each chart to denote threshold value
- Update Producer Monitor / Chart background color if threshold crossed
- Long-term: notification system

**Global WebSocket / data management system (e.g. in Context)**

- One of my least favorite parts of the app is the way the yDomain is globally set from the Chart.tsx component.
- An improvement would be to manage WebSocket connections and the data they produce in a React Context that can then update y domain and other globally relevant data as values stream in.
- This approach also would mean pausing streams could happen more cleanly, with control methods made available through the Context. It also would make it easier to track the x-domain in a similar fashion, which would be useful if we wanted to break away from the hardcoded 1 second window.

- Tooltips

  - I didn't spend too much time with tooltips since this is more of a real-time monitoring tool.
  - I think tooltips likely only make sense in Paused mode, if at all. One potentially interesting idea would be to enable the user to hover over a chart in Paused mode, and then see that timestamp (or the closest timestamp) to highlight in other charts with the data summary text updating to show that timestamp and value.

- UI controls

  - Select buffer size (e.g. how much data to hold)
  - Select display size (e.g. how much data to show)
  - Grid controls (e.g. change number of charts per row for different sizes)
  - Toggle between synced vs independent scales across charts

- Testing
  - Implement basic integration tests with Jest and React Testing Library.
  - Use MockServiceWorker to mock WebSocket connections, since that's a core piece of the app.
