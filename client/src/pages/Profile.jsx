import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (userParam && Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
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

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <h4 className="card-header bg-dark text-light p-2">Exercise Logs</h4>
          <div className="card-body">
            {Array.isArray(user.exerciseLogs) && user.exerciseLogs.length === 0 ? (
              <p>No exercise logs found.</p>
            ) : (
              <ul className="list-group">
                {user.exerciseLogs.map((log) => (
                  <li key={log._id} className="list-group-item">
                    <strong>Category:</strong> {log.category}<br />
                    <strong>Details:</strong> {JSON.stringify(log.categorySpecificData, null, 2)}<br />
                    <strong>Duration:</strong> {log.duration} minutes<br />
                    <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
