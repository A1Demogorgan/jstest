import "./globals.css";

export const metadata = {
  title: "A1.Solve | Wipro Innovation Team",
  description:
    "A1.Solve is a coming soon innovation studio inside Wipro, blending AI, IoT, and AR/VR to turn business problems into funded cases.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
