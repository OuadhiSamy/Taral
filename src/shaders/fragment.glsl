uniform float uTime;
uniform sampler2D uAlphaMap;
uniform float uNegateMask;

varying vec2 vUv;

void main() {
    vec2 coord = 6.0 * vec2(vUv.x, vUv.y);

    for (int n = 1; n < 8; n++) {
        float i = float(n);
        coord += vec2(0.7 / i * sin(i * coord.y + uTime + 0.3 * i) + 0.8, 0.4 / i * sin(coord.x + uTime * i + 0.3) + 1.6);
    }


    vec4 baseClor = vec4(0.5 * sin(coord.x) + 0.5, 0.5 * sin(coord.x) + 0.4, 0.5 * sin(coord.x - coord.x), 1.0);

    vec4 mask = texture2D(uAlphaMap, vUv);
    baseClor.a *= (mask.r + uNegateMask);
    gl_FragColor = baseClor;
}