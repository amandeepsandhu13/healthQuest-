import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EACH_EXERCISE } from "../utils/queries";
import { DELETE_EXERCISE_LOG } from "../utils/mutations";

const ActivityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch the exercise log details
    const { loading, data } = useQuery(GET_EACH_EXERCISE, {
        variables: { id },
    });

    // Mutation for deleting the exercise log
    const [deleteExerciseLog, { loading: deleteLoading }] = useMutation(
        DELETE_EXERCISE_LOG,
        {
            onCompleted: () => {
                navigate("/me");
            },
            onError: (error) => {
                console.error("Error deleting exercise log:", error);
                alert("Failed to delete exercise log.");
            },
        }
    );

    if (loading || deleteLoading) {
        return <div>Loading...</div>;
    }

    const log = data?.getEachExercise || {};

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this activity?")) {
            deleteExerciseLog({ variables: { id } });
        }
    };

    return (
        <div>
            <h2>Activity Details</h2>
            <p>Category: {log.category}</p>
            <p>Duration: {log.duration} minutes</p>
            <p>Date: {new Date(parseInt(log.date)).toLocaleString()}</p>

            {log.categorySpecificData && (
                <div>
                    {log.category === "yoga" && (
                        <>
                            <p>
                                Instructor:{" "}
                                {log.categorySpecificData.yoga.instructor}
                            </p>
                            <p>Level: {log.categorySpecificData.yoga.level}</p>
                        </>
                    )}
                    {log.category === "stretching" && (
                        <>
                            <p>
                                Equipment:{" "}
                                {log.categorySpecificData.stretching.equipment}
                            </p>
                            <p>
                                Focus:{" "}
                                {log.categorySpecificData.stretching.focus}
                            </p>
                        </>
                    )}
                    {log.category === "weightlifting" && (
                        <>
                            <p>
                                Sets:{" "}
                                {log.categorySpecificData.weightlifting.sets}
                            </p>
                            <p>
                                Reps:{" "}
                                {log.categorySpecificData.weightlifting.reps}
                            </p>
                            <p>
                                Weight:{" "}
                                {log.categorySpecificData.weightlifting.weight}{" "}
                                kg
                            </p>
                        </>
                    )}
                    {log.category === "cardio" && (
                        <>
                            <p>
                                Distance:{" "}
                                {log.categorySpecificData.cardio.distance} km
                            </p>
                            <p>
                                Intensity:{" "}
                                {log.categorySpecificData.cardio.intensity}
                            </p>
                        </>
                    )}
                </div>
            )}
            <button id="delete" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

export default ActivityDetails;
