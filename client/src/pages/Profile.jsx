import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../profile.css';

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

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
    // Extract the username parameter from the URL
    const { username: userParam } = useParams();

    // Fetch user data based on whether a specific username is provided or not
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    // Extract user data from the query response
    const user = data?.me || data?.user || {};

    // Redirect to /me if the logged-in user is viewing their own profile
    if (
        userParam &&
        Auth.loggedIn() &&
        Auth.getProfile().data.username === userParam
    ) {
        return <Navigate to="/me" />;
    }

    // Show a loading message while the query is in progress
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show a message if no user data is found
    if (!user?.username) {
        return (
            <div>
                <h4>
                    You need to be logged in to see this. Use the navigation links
                    above to sign up or log in!
                </h4>
            </div>
        );
    }

    // Aggregate activities by date
    const groupedActivities = aggregateActivities(user.exerciseLogs);

    return (
        <div className="profile-container p-3">
            <div className="flex justify-content-between mb-3">
                <h3>Hi, {user.username}! </h3>
            </div>

            <div className="profile-content">
                {/* User Info Card */}
                <div className="profile-info">
                    <Card title="User Information" className="mb-3">
                        <div className="profile-icon">
                            <img
                                src="src/assets/images/profile-icon-9.png"
                                alt="Profile Icon"
                                className="profile-image"
                            />
                        </div>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Age:</strong> {user.age} years</p>
                        <p><strong>Height:</strong> {user.height}cms</p>
                        <p><strong>Weight:</strong> {user.weight}lbs</p>
                        <p><strong>Goal:</strong> {user.goal}</p>
                        <Button label="Update User Info" className="p-button-outlined" />
                    </Card>
                </div>

{/* Exercise Log List */}
<div className="exercise-logs">
    <h3>Exercise Logs:</h3>
    {Object.keys(groupedActivities).map((date) => (
        <Card key={date} title={`Date: ${date}`} className="mb-3">
            {groupedActivities[date].map((log) => (
                <div key={log._id} className="mb-2">
                    <Button
                        label={`Activity completed: ${capitalizeFirstLetter(log.category)} | Duration: ${log.duration} mins`}
                        className="p-button-secondary"
                        onClick={() => window.location.href = `/activity/${log._id}`}
                    />
                </div>
            ))}
        </Card>
    ))}
</div>

            </div>
        </div>
    );
};

export default Profile;
