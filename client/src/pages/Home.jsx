import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

import "../home.css";


const Home = () => {
 

  const teamMembers = [
    {
      name: "Sophia Anderson",
      role: "Founder",
      imgSrc: "../src/assets/images/user2.jpeg",
    },
    {
      name: "Ethan Clark",
      role: "Functional Trainer",
      imgSrc: "../src/assets/images/user1.jpg",
    },
    {
      name: "Olivia Johnson",
      role: "Pilates Trainer",
      imgSrc: "../src/assets/images/user5.jpeg",
    },
    {
      name: "Liam Martinez",
      role: "Heavyweight Trainer",
      imgSrc: "../src/assets/images/user3.jpeg",
    },
  ];

  return (
    <main>
              <div className="flex-row justify-center">
            <div className="card-body">
            <p>Welcome to HealthQuest! Select an option below to manage your exercise logs.</p>
            <Link to="/log-exercise" className="btn btn-primary m-2">Log Today's Activity</Link>
            <Link className="btn btn-primary m-2" to="/me">
                View Activities Log
              </Link>
            {/* <Link to="/add-exercise-category" className="btn btn-primary m-2">Add Categories</Link> */}
            </div>
          </div>
    
      <section className="banner-home">
        <div className="banner-home-content">
          <h1>YOUR PERSONAL FITNESS JUST GOT BETTER</h1>
          <p>
            A fitness app and so much more! Take your workouts to the next-level
            with HealthQuest’s team of experts.
          </p>
        </div>
      </section>

      {/* Home Section */}
      <section className="mission">
        <div className="grid-container">
          <div className="grid-item">
            <h2>Personalized wellness Tracking</h2>
            <p>
              We’re your partner through your well-being journey, delivering
              daily advice to fuel your movement, meals, and mind. Our support,
              guidance and motivation are here to power your routine, help you
              navigate choices and promote lifelong change. Go further every day
              with our fitness equipment skilfully designed to power your
              routine. Expert-approved tools for smashing your strength,
              agility, mobility, and recovery goals.
            </p>
          </div>
          <div className="grid-item">
            <img src="../src/assets/images/log.jpeg" alt="Mission Image 2" />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.imgSrc} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
