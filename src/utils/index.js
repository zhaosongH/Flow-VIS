// RGB颜色转16进制代码
export function rgb2Hex(aColor) {
  let strHex = '#'
  for (let i = 0; i < aColor.length; i++) {
    let hex = Number(aColor[i]).toString(16)
    if (hex === '0') {
      hex += hex
    }
    strHex += hex
  }
  return strHex
}

// 16进制转RGBA颜色([r, g, b, a])
export function hex2Rgba(hex, opacity) {
  return [
    parseInt(`0x${hex.slice(1, 3)}`, 16),
    parseInt(`0x${hex.slice(3, 5)}`, 16),
    parseInt(`0x${hex.slice(5, 7)}`, 16),
    opacity,
  ]
}

// 触发窗口resize
export function toggleResize() {
  const e = document.createEvent('Event')
  e.initEvent('resize', true, true)
  window.dispatchEvent(e)
}

// calculate boundary
export function getBounds(texData) {
  const boundx = { max: texData[0], min: texData[0] }
  const boundy = { max: texData[1], min: texData[1] }
  for (let i = 0; i < texData.length / 4; i++) {
    if (texData[4 * i] > boundx.max) {
      boundx.max = texData[4 * i]
    }
    if (texData[4 * i] < boundx.min) {
      boundx.min = texData[4 * i]
    }
    if (texData[4 * i + 1] > boundy.max) {
      boundy.max = texData[4 * i + 1]
    }
    if (texData[4 * i + 1] < boundy.min) {
      boundy.min = texData[4 * i + 1]
    }
  }
  return { boundx, boundy }
}
