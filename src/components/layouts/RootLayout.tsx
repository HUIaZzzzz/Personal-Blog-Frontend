import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Header from "@/components/layouts/Header.tsx";
import Footer from "@/components/layouts/Footer.tsx";
import ScrollToTop from "@/components/ScrollToTop.tsx";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-40">
        <div className="p-3 px-3">
          <ScrollToTop/>
          <Header />
          <main className="min-h-screen">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
