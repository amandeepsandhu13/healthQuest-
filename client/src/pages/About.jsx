import "../about.css";
const About = () => {
  return (
    <main>
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-text">
          <h1>Our Mission</h1>
          <p>To empower people to live well by energizing their every day.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="grid-container">
          <div className="grid-item">
            <div className="grid-item-content">
              <img
                src="/images/excercise.jpg"
                alt="Our Origin Image"
              />
            </div>
          </div>
          <div className="grid-item">
            <div className="grid-item-content">
              <h2>Our Origin Story</h2>
              <p>
                At HealthQuest, we help our customers achieve limitless
                potential with the tools, inspiration, and motivation they need
                to fuel their routines, crush goals, and breakthrough
                unchartered territory that leads to happier, healthier and more
                fulfilling lives. What started as our l wellness journey has
                evolved to inspire millions to unlock total well-being. Always
                deeply passionate about health, it wasn’t until he needed to
                train like a superhero that we connected with world-class
                wellness experts to achieve his goals. Working with the
                best-of-the-best, we experienced the power of interconnected
                fitness, nutrition, and mental wellness, and became determined
                to make this level of education and transformative wellness
                available to more people around the world. With our vision as
                our foundation, HealthQuest’s philosophy is to help you build
                lifelong healthy habits through personalized coaching that
                activates your movement, meals and mind. Whether you come to
                HealthQuest to start or end your day, or for something
                in-between, your goals are our mission. Together, we’ll make
                your vision a reality, making health and wellness available to
                all.
              </p>
            </div>
          </div>
          <div className="grid-item">
            <div className="grid-item-content">
              <h2>Our Values</h2>
              <p>
                We infuse fun and levity into the mundane of daily routine.
                Every experience you have with HealthQuest will be as enjoyable
                as it is valuable to your wellness routine. We don’t believe in
                a one-size-fits-all approach to living well. Every person is
                unique, and we’re here to motivate, celebrate and support our
                customers on their individual journey to self-actualization.
                Showing up means being accountable, reliable and collaborative
                with your community. When we’re part of something bigger than
                ourselves, we get better as individuals too. We believe that
                when you love something as much as we love health and
                well-being, you should be eager to welcome others in and share
                the knowledge and tools you’ve acquired along your journey. We
                never gate keep, because our goal is to always help as many
                people as possible to live well. We’re confident in our
                expertise but our humility and passion for exploration inspires
                us to always seek new ways to learn and grow. Our philosophy is
                rooted in going beyond our comfort zones to find ways to
                improve.
              </p>
            </div>
          </div>
          <div className="grid-item">
            <div className="grid-item-content">
              <img
                src="/images/anywhere.jpg"
                alt="Mission Image 2"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
