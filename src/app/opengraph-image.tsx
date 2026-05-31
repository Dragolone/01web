import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Zero-One Innovation — Forward, Innovate, Push the Boundary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/brand/logo-white.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "white",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0e3bcb 60%, #1849dc 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" height={64} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 6,
              opacity: 0.75,
              fontWeight: 500,
            }}
          >
            ZERO-ONE INNOVATION
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            <span>Forward. Innovate.</span>
            <span>Push the Boundary.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 26,
              opacity: 0.78,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Mobile robots · Smart charging stations · VTOL aircraft
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
