import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EACH_EXERCISE } from "../utils/queries";
import { DELETE_EXERCISE_LOG } from "../utils/mutations";
import { Button } from "primereact/button";
import '../log-exercise.css'; // Include your updated styles

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
                alert("Exercise log deleted successfully.");
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
        <div className="log-exercise-container p-4">
            <h2 className="p-text-center p-mb-4">Activity Details</h2>
            <div className="details-container">
                <p className="detail-header">Category:</p> <p className="detail-value">{log.category}</p>
                <p className="detail-header">Duration:</p> <p className="detail-value">{log.duration} minutes</p>
                <p className="detail-header">Date:</p> <p className="detail-value">{new Date(parseInt(log.date)).toLocaleString()}</p>

                {log.categorySpecificData && (
                    <div>
                        {log.category === "yoga" && (
                            <>
                                <p className="detail-header">Instructor:</p> <p className="detail-value">{log.categorySpecificData.yoga.instructor}</p>
                                <p className="detail-header">Level:</p> <p className="detail-value">{log.categorySpecificData.yoga.level}</p>
                            </>
                        )}
                        {log.category === "stretching" && (
                            <>
                                <p className="detail-header">Equipment:</p> <p className="detail-value">{log.categorySpecificData.stretching.equipment}</p>
                                <p className="detail-header">Focus:</p> <p className="detail-value">{log.categorySpecificData.stretching.focus}</p>
                            </>
                        )}
                        {log.category === "weightlifting" && (
                            <>
                                <p className="detail-header">Sets:</p> <p className="detail-value">{log.categorySpecificData.weightlifting.sets}</p>
                                <p className="detail-header">Reps:</p> <p className="detail-value">{log.categorySpecificData.weightlifting.reps}</p>
                                <p className="detail-header">Weight:</p> <p className="detail-value">{log.categorySpecificData.weightlifting.weight} kg</p>
                            </>
                        )}
                        {log.category === "cardio" && (
                            <>
                                <p className="detail-header">Distance:</p> <p className="detail-value">{log.categorySpecificData.cardio.distance} km</p>
                                <p className="detail-header">Intensity:</p> <p className="detail-value">{log.categorySpecificData.cardio.intensity}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            <Button
                id="delete"
                label="Delete"
                icon="pi pi-trash"
                className="p-button-danger p-mt-4"
                onClick={handleDelete}
            />
        </div>
    );
};

export default ActivityDetails;
