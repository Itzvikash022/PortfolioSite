import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Timeline from '../components/Timeline';
import Certificates from '../components/Certificates';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
// import Testimonials from '../components/Testimonials';
// NOTE: Testimonials/Recommendations section is hidden for now.
// It is fully implemented and can be re-enabled in the future when needed.

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12">
        <Hero />
        <Portfolio />
        <Timeline />
        <Certificates />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </Layout>
  );
}
