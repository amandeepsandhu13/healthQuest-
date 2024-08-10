import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

const Home = () => {
   
    return (
        <main>
            <div className="flex-row justify-center">
            <div className="card-body">
            <p>Welcome to HealthQuest! Select an option below to manage your exercise logs.</p>
            <Link to="/log-exercise" className="btn btn-primary m-2">Log New Exercise</Link>
            <Link className="btn btn-primary m-2" to="/me">
                View Activities Log
              </Link>
            {/* <Link to="/add-exercise-category" className="btn btn-primary m-2">Add Categories</Link> */}
            
          </div>
            </div>
        </main>
    );
};

export default Home;
