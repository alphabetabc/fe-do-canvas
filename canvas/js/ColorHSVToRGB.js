/** -----------------------
 * HSV (1978) = H: Hue / S: Saturation / V: Value
 ------------------------*/
let Color = {};

Color.HSV_RGB = function (o) {
  let H = o.H / 360,
    S = o.S / 100,
    V = o.V / 100,
    R, G, B;
  let _A, _B, _C, _D;

  if (S === 0) {
    R = G = B = Math.round(V * 255);
  } else {
    if (H >= 1) H = 0;
    H = 6 * H;

    _D = H - Math.floor(H);
    _A = Math.round(255 * V * (1 - S));
    _B = Math.round(255 * V * (1 - (S * _D)));
    _C = Math.round(255 * V * (1 - (S * (1 - _D))));
    V = Math.round(255 * V);

    switch (Math.floor(H)) {
      case 0:
        R = V;
        G = _C;
        B = _A;
        break;
      case 1:
        R = _B;
        G = V;
        B = _A;
        break;
      case 2:
        R = _A;
        G = V;
        B = _C;
        break;
      case 3:
        R = _A;
        G = _B;
        B = V;
        break;
      case 4:
        R = _C;
        G = _A;
        B = V;
        break;
      case 5:
        R = V;
        G = _A;
        B = _B;
        break;
    }
  }
  return {
    R: R,
    G: G,
    B: B
  }
};
