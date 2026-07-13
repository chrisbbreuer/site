/*
 * SplatHash decoder (browser, decode-only).
 *
 * Expands a 16-byte SplatHash (base64, 24 chars) into a 32x32 preview and
 * returns a BMP data URL for use as an instant background placeholder.
 * Algorithm ported from junevm/splathash (MIT, (c) 2025 junevm); the full
 * encoder lives server-side in ts-images. Kept dependency-free and tiny so
 * it can paint before any real image byte arrives.
 */
;(function (global) {
  var SIZE = 32
  var SIGMA = [0.025, 0.1, 0.2, 0.35]
  var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  function fromBase64(str) {
    var clean = str.replace(/=+$/, ''), out = [], bits = 0, acc = 0
    for (var i = 0; i < clean.length; i++) {
      var v = B64.indexOf(clean[i])
      if (v < 0) continue
      acc = (acc << 6) | v; bits += 6
      if (bits >= 8) { bits -= 8; out.push((acc >> bits) & 0xFF) }
    }
    return out
  }

  function BitReader(bytes) { this.b = bytes; this.pos = 0; this.rem = 0; this.cur = 0 }
  BitReader.prototype.read = function (n) {
    var val = 0
    while (n > 0) {
      if (this.rem === 0) {
        if (this.pos >= this.b.length) return val << n
        this.cur = this.b[this.pos++]; this.rem = 8
      }
      var take = Math.min(this.rem, n), shift = this.rem - take, mask = (1 << take) - 1
      val = (val << take) | ((this.cur >> shift) & mask)
      this.rem -= take; n -= take
    }
    return val
  }

  function unquant(v, min, max, bits) { var steps = (1 << bits) - 1; return (v / steps) * (max - min) + min }

  function oklabToSrgb(l, a, b) {
    var l_ = l + 0.3963377774 * a + 0.2158037573 * b
    var m_ = l - 0.1055613458 * a - 0.0638541728 * b
    var s_ = l - 0.0894841775 * a - 1.291485548 * b
    var l3 = l_ * l_ * l_, m3 = m_ * m_ * m_, s3 = s_ * s_ * s_
    var r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
    var g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
    var bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3
    return [gamma(r), gamma(g), gamma(bl)]
  }
  function gamma(c) {
    if (c <= 0) return 0
    if (c >= 1) return 1
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  }

  function decodeHash(bytes) {
    var br = new BitReader(bytes)
    var meanMap = br.read(16)
    var mL = ((meanMap >> 10) & 0x3F) / 63.0
    var mA = (((meanMap >> 5) & 0x1F) / 31.0) * 0.4 - 0.2
    var mB = ((meanMap & 0x1F) / 31.0) * 0.4 - 0.2
    var splats = []
    for (var i = 0; i < 3; i++) {
      var xi = br.read(4), yi = br.read(4), sg = br.read(2)
      var lQ = br.read(4), aQ = br.read(4), bQ = br.read(4)
      if (xi === 0 && yi === 0 && lQ === 0 && aQ === 0 && bQ === 0) continue
      splats.push({ x: xi / 15, y: yi / 15, s: SIGMA[sg], l: unquant(lQ, -0.8, 0.8, 4), a: unquant(aQ, -0.4, 0.4, 4), b: unquant(bQ, -0.4, 0.4, 4) })
    }
    for (i = 0; i < 3; i++) {
      xi = br.read(4); yi = br.read(4); sg = br.read(2); lQ = br.read(5)
      if (xi === 0 && yi === 0 && lQ === 0) continue
      splats.push({ x: xi / 15, y: yi / 15, s: SIGMA[sg], l: unquant(lQ, -0.8, 0.8, 5), a: 0, b: 0 })
    }
    return { mL: mL, mA: mA, mB: mB, splats: splats }
  }

  function render(hash) {
    var d = decodeHash(fromBase64(hash))
    var W = SIZE, W2 = W * W
    var gL = new Float64Array(W * W), gA = new Float64Array(W * W), gB = new Float64Array(W * W)
    for (var i = 0; i < W * W; i++) { gL[i] = d.mL; gA[i] = d.mA; gB[i] = d.mB }
    for (var k = 0; k < d.splats.length; k++) {
      var sp = d.splats[k], scale2 = 2 * sp.s * sp.s * W2
      var cx = Math.floor(sp.x * W), cy = Math.floor(sp.y * W)
      for (var y = 0; y < W; y++) {
        var dy = y - cy
        for (var x = 0; x < W; x++) {
          var dx = x - cx, dsq = dx * dx + dy * dy
          var wv = Math.exp(-dsq / scale2)
          if (wv < 1e-4) continue
          var idx = y * W + x
          gL[idx] += sp.l * wv; gA[idx] += sp.a * wv; gB[idx] += sp.b * wv
        }
      }
    }
    return bmpURL(W, W, gL, gA, gB)
  }

  function bmpURL(w, h, gL, gA, gB) {
    var stride = (w * 3 + 3) & ~3, pix = stride * h, size = 54 + pix
    var buf = new Uint8Array(size), dv = new DataView(buf.buffer)
    buf[0] = 0x42; buf[1] = 0x4D
    dv.setUint32(2, size, true); dv.setUint32(10, 54, true)
    dv.setUint32(14, 40, true); dv.setInt32(18, w, true); dv.setInt32(22, h, true)
    dv.setUint16(26, 1, true); dv.setUint16(28, 24, true); dv.setUint32(34, pix, true)
    for (var y = 0; y < h; y++) {
      var row = 54 + (h - 1 - y) * stride
      for (var x = 0; x < w; x++) {
        var rgb = oklabToSrgb(gL[y * w + x], gA[y * w + x], gB[y * w + x])
        var o = row + x * 3
        buf[o] = clamp(rgb[2]); buf[o + 1] = clamp(rgb[1]); buf[o + 2] = clamp(rgb[0])
      }
    }
    var bin = ''
    for (var i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i])
    return 'data:image/bmp;base64,' + btoa(bin)
  }
  function clamp(c) { var v = Math.round(c * 255 + 0.5); return v < 0 ? 0 : v > 255 ? 255 : v }

  global.splatHashToDataURL = render
})(window)
