/**
 * Shared category icons, image assets, and formatters
 */

export function getCategoryIcon(catName = '') {
  const lower = (catName || '').toLowerCase()
  if (lower.includes('venue') || lower.includes('estate') || lower.includes('space') || lower.includes('grounds')) return 'villa'
  if (lower.includes('cater') || lower.includes('food') || lower.includes('cellar') || lower.includes('dining')) return 'restaurant'
  if (lower.includes('floral') || lower.includes('decor') || lower.includes('botanical')) return 'local_florist'
  if (lower.includes('music') || lower.includes('dj') || lower.includes('audio') || lower.includes('sound')) return 'graphic_eq'
  if (lower.includes('light') || lower.includes('ambience') || lower.includes('dmx')) return 'lightbulb'
  if (lower.includes('photo') || lower.includes('cinema') || lower.includes('film') || lower.includes('media')) return 'videocam'
  if (lower.includes('logistics') || lower.includes('staff') || lower.includes('valet')) return 'local_shipping'
  if (lower.includes('contingency') || lower.includes('buffer')) return 'shield_with_heart'
  return 'verified'
}

export function getIdeaIcon(ideaType = '') {
  const lower = (ideaType || '').toLowerCase()
  if (lower.includes('theme') || lower.includes('concept')) return 'palette'
  if (lower.includes('music') || lower.includes('dj') || lower.includes('sonic')) return 'music_note'
  if (lower.includes('light') || lower.includes('sensory') || lower.includes('candle')) return 'wb_incandescent'
  if (lower.includes('culinary') || lower.includes('beverage') || lower.includes('food')) return 'celebration'
  if (lower.includes('spatial') || lower.includes('journey')) return 'view_in_ar'
  return 'auto_awesome'
}

export function getCategoryImage(category = '') {
  const lower = (category || '').toLowerCase()
  if (lower.includes('venue') || lower.includes('estate')) {
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzOLwNMf3H40bXwsDeg7oIT1zh2I12uMpawaQMDq2CAdcAQ_jPyJ37vgIQ6zJ_L9O1e7VaXPps_OcXW0MjOl76rh1hJ8PmqDrVUjBihLA0TUsUebE-k1slAP3SAbKdXIGb_MHlLagE01_Hx3GhbH8Z3FPGhKSUoJQoCw1_V9metBssBpUtxF0f_ZICyOqMkhEpfrud8xZznS06BdOCvQT2Ec-cJs4DaEi3HsBPQNibleWnGJjWhRKzcQ'
  }
  if (lower.includes('cater') || lower.includes('food') || lower.includes('dining')) {
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuABKou_odwYH62s0vLxS-tzzRkB4Jg3_YJldhmSB3dJe7FBo_TRIXCZzWV7YEGwDFQNV3SxyjfioxrW-51xZmh7Y2KJciv5IBdWGCAbByfpy9ayha5JD4CJZid2BK98GiwYxch1oUqIh5xfEnI32tCyA48eqBJutdKbLt50RQw8QjLbKAmzA_4WqNr3KL-Ys-9vyTLhUw5R_mwCSBdp5tvrkn8DiI0ISx6z0fompH2F46r0z4NTysOMTA'
  }
  if (lower.includes('floral') || lower.includes('decor')) {
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdddrwbp3FtstAFuWov2-9NPrHMabjrLuinyrorARJ0MXc58UXC3zCmm7hiL0vRShATiVCp_MWaJUvHNpAEtfZ7Jq1XcAiZvtU2f8sZiNRuA8K-wiNL0QgNWsW03_7iZUIaFtXcHZbeUEjJSkMiPV8p5GBzGiq9JR-Hz4ZE2_NrpWwGV_F8cVxs9HC4azrPacP75dTMPoLKih2-eJ_ymwyCbROsgkQS93YexY9mm-6pMJ4nMpwkh9M0A'
  }
  if (lower.includes('music') || lower.includes('dj') || lower.includes('sound')) {
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnj7KROafwNp2qEYbtymvnxa2KyNmjv33bAsx5l07rigF6N5heUugISZ_drEWixZGfvr99khHONGy5THtxPpXv1Ykg7avBsBjoi9h-wWZkgcQDacEgUOQQX5hG1JB9LRCv7725viik8tmOsMFNv9Kc6bW0cjhrRaaD8aQ8xyHMMYrfs57bY1eo_HHzF_SDX_q5Tpsy2wbpVkp-klSRIY-GtUvfR8nzJ8AegYCjYrfVBwR34HgjvucGVQ'
  }
  if (lower.includes('light') || lower.includes('ambience')) {
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCADvOhiVhDS1eufMxvV5VQyYr7iqM1zUcHo-1xow4AXBho-eyE7H4e8-TiEYO5Td_oRaysJr_kVAp059uo1Rsuq156MP26FCvKv4fy3MobU2TaB-dUsytD9QRx48bE-Uhhv7N7_pl0w-jX5QiVqijssSJCzXTJz72xM7Omg8FG4UwzkMRgPEg2r7qoZeCN3QShV2EYQd1EhVYcgrzGUZJbQgQ7MxobxoP7zee6-1t9LDNrR_6s87Xq5Q'
  }
  return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSEZYj4SAcNmtLCNbR0Z3qXPYRrQxAz30zB62RHV1gmLEaaSKJxkwwupX8-R5S6nXf5nk8f7CFrPr2dnpDshoKGVuuLeDT2AQYrHpjeL5eM0HuEENPrmuf-2KiCTycdK1vOXxkHGp85V4SkX1D1tExtS-zGCqmXad0wGYlPtLDyeJiJs6sT1Mcd-S31pIU4FbWApcWO1GvcLRPaTF9j9YpNqaBcIunjzQWZbUhyYaIoaj_gzDecB4sqQ'
}

export function formatCurrency(amount = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
