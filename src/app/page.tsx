import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Intro from "@/components/Intro";
import Menu from "@/components/Menu";
import Reservation from "@/components/Reservation";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Menu />
      <Reservation />
      <Gallery />
      <Reviews />
      <Visit />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
