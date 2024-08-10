import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Me = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const user = data?.me || {};

    console.log("User Data:", user); //check the user

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle query error
    }

    if (!Auth.loggedIn()) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links
                above to sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            {/* render profile */}
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 bg-dark text-light">
                    Hello {user.username || "user"},
                </h2>
                <h3>{user.height}</h3>{" "}
            </div>
        </div>
    );
};

export default Me;
