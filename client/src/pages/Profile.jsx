import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

const aggregateActivities = (logs) => {
  // Group activities by date
  const groupedByDate = logs.reduce((acc, log) => {
    const date = new Date(parseInt(log.date)).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});

  return groupedByDate;
};

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (
    userParam &&
    Auth.loggedIn() &&
    Auth.getProfile().data.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // Aggregate activities
  const groupedActivities = aggregateActivities(user.exerciseLogs);

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        {/* Exercise Log List */}
        <div className="col-12 col-md-10 mb-5">
          <Link to="/log-exercise" className="btn btn-primary m-2">Log New Exercise</Link>

          <h3>Exercise Logs:</h3>
          {Object.keys(groupedActivities).map((date) => (
            <div key={date}>
              <h4 className="text-center">{date}</h4>
              {groupedActivities[date].map((log) => (
                <div key={log._id} className="card mb-3">
                  <div className="card-body">
                    <p>Activity Completed: {log.category}</p>
                    <p>Duration: {log.duration} minutes</p>

                    {/* Render only the relevant details based on the activity completed */}
                    {log.categorySpecificData && log.categorySpecificData[log.category.toLowerCase()] && (
                      <div>
                        <h5>
                          {log.category.charAt(0).toUpperCase() + log.category.slice(1)} Details:
                        </h5>
                        {Object.entries(log.categorySpecificData[log.category.toLowerCase()])
                          .filter(([field]) => field !== "__typename")
                          .map(([field, value]) => (
                            <p key={field}>
                              {field.charAt(0).toUpperCase() +
                                field.slice(1)}
                              : {value}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
