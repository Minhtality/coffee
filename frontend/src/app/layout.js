import "@/styles/globals.css";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import Providers from "./providers";

export const metadata = {
  title: "Good Soup.",
  description: "Minh's passion projects.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
