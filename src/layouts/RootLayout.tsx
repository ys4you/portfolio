import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ThemeContext, useThemeProvider } from "@/hooks/useTheme";

export default function RootLayout() {
  const { pathname } = useLocation();
  const themeValue = useThemeProvider();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ThemeContext.Provider>
  );
}