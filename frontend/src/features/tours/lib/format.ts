// Tour prices are free text ("$1,450 per person" from the API, or
// "On request" when the operator quotes per enquiry).
export function hasPrice(from: string) {
  return /\d/.test(from)
}

export function priceShort(from: string) {
  return hasPrice(from) ? from.replace(/ per person$/, '').split(' ')[0] : 'On request'
}

export function nightsLabel(nights: number) {
  return nights > 0 ? `${nights} night${nights === 1 ? '' : 's'}` : 'Day trip'
}
