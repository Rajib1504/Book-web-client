// import FeaturedBooks from "../../components/Home/FeaturedBooks";
import Gallery from "../../components/Home/Gallery/Gallery";
import Hero from "../../components/Home/Hero/Hero";
import Testimonials from "../../components/Home/Testimonials";
import HowItWorks from "../../components/Home/HowItWorks";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import FAQ from "../../components/Home/FAQ";
import TrustSection from "../../components/Home/TrustSection";
import MobileAppPreview from "../../components/Home/MobileAppPreview";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustSection />
      {/* <FeaturedBooks /> */}
      <MobileAppPreview />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials/>
      <FAQ/>
      <Gallery />
    </div>
  );
};

export default Home;
