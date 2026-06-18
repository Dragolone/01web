"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fullscreen WebGL "energy field" — an animated fbm flow shader in brand blue.
 * Zero dependencies (raw WebGL1), self-throttling and gracefully degrading:
 *  - caps device-pixel-ratio for fill-rate on mobile
 *  - pauses the rAF loop when off-screen (IntersectionObserver) or tab hidden
 *  - renders a single static frame when the user prefers reduced motion
 *  - if the GL context is unavailable the canvas stays transparent and the
 *    CSS gradient behind it (see ImmersiveHero) shows through instead.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// hash / value-noise / fbm ---------------------------------------------------
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;            // aspect correct
  float t = u_time * 0.06;

  // mouse-warped domain so the flow drifts toward the cursor
  vec2 m = (u_mouse - 0.5) * 0.6;
  vec2 q = vec2(fbm(p*2.0 + t + m), fbm(p*2.0 - t + 1.7));
  float f = fbm(p*3.0 + q*1.8 + vec2(0.0, t*1.5));

  // brand palette: deep navy -> brand blue -> bright edge
  vec3 navy  = vec3(0.024, 0.043, 0.094);  // #060b18
  vec3 brand = vec3(0.094, 0.286, 0.862);  // #1849dc
  vec3 glow  = vec3(0.45, 0.62, 1.0);

  vec3 col = mix(navy, brand, smoothstep(0.25, 0.85, f));
  col = mix(col, glow, smoothstep(0.7, 1.05, f) * 0.6);

  // soft moving light from upper area
  float beam = smoothstep(0.9, 0.0, distance(uv, vec2(0.5 + m.x*0.3, 0.15)));
  col += brand * beam * 0.25;

  // vignette + subtle grain
  float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
  col *= 0.55 + 0.6*vig;
  col += (hash(uv*u_time) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export function ShaderField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // single fullscreen triangle
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let raf = 0;
    let running = true;
    const start = performance.now();
    const render = (now: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running && !reduce) raf = requestAnimationFrame(render);
    };

    // pause when scrolled away to save battery / GPU
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduce && !raf) raf = requestAnimationFrame(render);
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && !reduce && !raf) raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      render(performance.now()); // one static frame
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduce]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
