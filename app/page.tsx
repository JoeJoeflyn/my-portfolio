import Image from "next/image";
import Header from "./header/index";
import About from "./body/about";
import SocialMedia from "./body/socialMedia";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <SocialMedia />
      <Footer />
    </>
  );
}
