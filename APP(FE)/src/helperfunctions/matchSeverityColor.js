export function matchSeverityColor(val) {
  const severity = new Map()
  severity[1] = 'green'
  severity[2] = 'darkorange'
  severity[3] = 'pink'
  severity[4] = '#F66262'
  severity[5] = 'red'

  return severity[val]
}
