import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

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
    // styling
    const styles = {
        card: {
            display: "block",
            padding: "10px",
            border: "solid 1px black",
            borderRadius: "10px",
            backgroundColor: "#ff6133",
        },
        text: {
            margin: 0,
            padding: "2px",
            textAlign: "left",
            color: "white",
        },
        linkText: {
            color: "black",
            textDecoration: "none",
        },
        updateText: {
            color: "black",
            textAlign: "right",
            padding: "2px",
            marginBottom: "0",
        },
    };

    // for user info
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
                You need to be logged in to see this. Use the navigation links
                above to sign up or log in!
            </h4>
        );
    }

    // Aggregate activities
    const groupedActivities = aggregateActivities(user.exerciseLogs);

    return (
        <div>
            <div className="flex-row mb-3">
                {/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                    Viewing {userParam ? `${user.username}'s` : "your"} profile.
                </h2> */}
                <h3>Hi, {user.username}</h3>
                <br />
                {/* display user info */}
                <div className="card" style={styles.card}>
                    <p style={styles.text}>
                        <strong>gender:</strong> {user.gender}
                    </p>
                    <p style={styles.text}>
                        <strong>age:</strong> {user.age}
                    </p>
                    <p style={styles.text}>
                        <strong>height:</strong> {user.height}
                    </p>
                    <p style={styles.text}>
                        <strong>weight:</strong> {user.weight}
                    </p>
                    <p style={styles.text}>
                        <strong>goal:</strong> {user.goal}
                    </p>
                    <p style={styles.updateText}>Update user Info</p>
                </div>
                {/* Exercise Log List */}
                <div className="col-12 col-md-10 mb-5">
                    <Link to="/log-exercise" className="btn btn-primary m-2">
                        Log New Exercise
                    </Link>

                    <h3>Exercise Logs:</h3>
                    {Object.keys(groupedActivities).map((date) => (
                        <div key={date} className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Date: {date}</h4>
                                {groupedActivities[date].map(
                                    (log, logIndex) => (
                                        <React.Fragment key={log._id}>
                                            <Link
                                                to={`/activity/${log._id}`}
                                                key={log._id}
                                                style={styles.linkText}
                                            >
                                                <p>
                                                    Activity Completed:{" "}
                                                    {log.category}
                                                </p>
                                                <p>Activity id: {log._id}</p>
                                                <p>
                                                    Duration: {log.duration}{" "}
                                                    minutes
                                                </p>
                                            </Link>
                                            {/* Dynamically Render category-specific data */}
                                            {/* {log.categorySpecificData && (
                                                <div>
                                                    {Object.keys(
                                                        log.categorySpecificData
                                                    ).map((key) => {
                                                        if (
                                                            key === "__typename"
                                                        )
                                                            return null; // Skip the __typename field
                                                        const categoryData =
                                                            log
                                                                .categorySpecificData[
                                                                key
                                                            ];
                                                        if (
                                                            categoryData &&
                                                            Object.keys(
                                                                categoryData
                                                            ).length > 0
                                                        ) {
                                                            return (
                                                                <div key={key}>
                                                                    <h5>
                                                                        {key
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            key.slice(
                                                                                1
                                                                            )}{" "}
                                                                        Details:
                                                                    </h5>
                                                                    {Object.entries(
                                                                        categoryData
                                                                    ).map(
                                                                        ([
                                                                            field,
                                                                            value,
                                                                        ]) =>
                                                                            key ===
                                                                                "__typename" &&
                                                                            value && (
                                                                                <p
                                                                                    key={
                                                                                        field
                                                                                    }
                                                                                >
                                                                                    {field
                                                                                        .charAt(
                                                                                            0
                                                                                        )
                                                                                        .toUpperCase() +
                                                                                        field.slice(
                                                                                            1
                                                                                        )}

                                                                                    :{" "}
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </p>
                                                                            )
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            )} */}
                                            {/* Add a divider line between logs */}
                                            {logIndex <
                                                groupedActivities[date].length -
                                                    1 && (
                                                <div className="activity-divider"></div>
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
