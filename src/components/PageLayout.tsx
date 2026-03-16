import { ReactNode } from "react";
import Atmosphere from "./Atmosphere";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  dimmed?: boolean;
}

const PageLayout = ({ children, dimmed }: PageLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Atmosphere />
    {dimmed && (
      <div className="fixed inset-0 bg-night-indigo/50 -z-[5]" />
    )}
    <Navbar />
    <main className="flex-1 pt-16 relative z-10">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
