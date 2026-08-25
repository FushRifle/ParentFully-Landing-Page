import Hero from "@/components/Hero";
import Container from "@/components/Container";
import ScrollToTop from "@/components/ScrollToTop";
import ProductStory from "@/components/ProductStory";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <ProductStory />
      </Container>
      <ScrollToTop />
    </>
  );
};

export default HomePage;
