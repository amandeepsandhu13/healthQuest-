import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EACH_EXERCISE } from "../utils/queries";

const ActivityDetails = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_EACH_EXERCISE, {
        variables: { id },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    const log = data?.getEachExercise || {};
    console.log(log);

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
        </div>
    );
};

export default ActivityDetails;
