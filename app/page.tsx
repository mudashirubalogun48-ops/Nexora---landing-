import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Next sections: Features (#features), How it works (#how-it-works), Pricing (#pricing), Contact (#contact) */}
      </main>
    </>
  );
}
