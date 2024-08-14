import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        height: "",
        weight: "",
        goal: "",
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        // Convert strings to the appropriate numeric types
        const submissionData = {
            ...formState,
            age: parseInt(formState.age, 10), // Convert age to an integer
            height: parseFloat(formState.height), // Convert height to a float
            weight: parseFloat(formState.weight), // Convert weight to a float
        };

        try {
            const { data } = await addUser({
                variables: { ...submissionData },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">
                        Sign Up
                    </h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{" "}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="username"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your gender"
                                    name="gender"
                                    type="text"
                                    value={formState.gender}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your age in years"
                                    name="age"
                                    type="text"
                                    value={formState.age}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your height in cms"
                                    name="height"
                                    type="text"
                                    value={formState.height}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your weight in lbs"
                                    name="weight"
                                    type="text"
                                    value={formState.weight}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your goal"
                                    name="goal"
                                    type="text"
                                    value={formState.goal}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: "pointer" }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
