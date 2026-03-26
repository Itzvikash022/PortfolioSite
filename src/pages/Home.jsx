import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12">
        <Hero />
        <Services />
        <Portfolio />
        <Timeline />
        <Testimonials />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </Layout>
  );
}
