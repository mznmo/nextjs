import "./globals.css";
import MainHeader from "@/components/main-header/main-header";

export const metadata = {
  //used for search engine crawlers (SEO)
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
