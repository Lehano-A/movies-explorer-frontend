const widthWindowForFirstCount = {
  big: { from: 1210, quantity: 12 },
  middle: { from: 751, to: 1209, quantity: 8 },
  low: { from: 320, to: 750, quantity: 5 },
}

const widthWindowForSecondaryCounts = {
  big: { from: 1210, quantity: 3 },
  middle: { from: 751, to: 1209, quantity: 2 },
  low: { from: 320, to: 750, quantity: 1 },
}

export { widthWindowForFirstCount, widthWindowForSecondaryCounts }