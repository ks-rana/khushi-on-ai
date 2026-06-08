import { ImageResponse } from "next/og";

export const alt =
  "Is it smart, or does it just sound like us? An interactive essay on AI through a psychology lens, by Khushi Suresh Rana.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14110c",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e08a4f",
            fontFamily: "monospace",
          }}
        >
          An interactive essay · through a psychology lens
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            lineHeight: 1.02,
            color: "#fbf5e9",
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>Is it smart, or does it</div>
          <div style={{ display: "flex" }}>
            just&nbsp;<span style={{ color: "#e08a4f", fontStyle: "italic" }}>sound</span>
            &nbsp;like us?
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 28,
            color: "#a99e89",
          }}
        >
          <div style={{ display: "flex" }}>Khushi Suresh Rana</div>
          <div style={{ display: "flex", fontFamily: "monospace", color: "#7a7060" }}>
            an AI rated more human than me
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
