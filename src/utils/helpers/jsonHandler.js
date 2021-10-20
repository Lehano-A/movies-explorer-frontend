// ПАРСЕР JSON
function parseJSON(data) {
  return JSON.parse(data)
}

// СТРОЧЕР JSON
function stringifyJSON(data) {
  return JSON.stringify(data)
}

export { parseJSON, stringifyJSON }