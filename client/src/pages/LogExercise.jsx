import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE_LOG } from "../utils/mutations";
import Auth from "../utils/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const LogExercise = () => {
  const [category, setCategory] = useState('yoga');
  const [categorySpecificData, setCategorySpecificData] = useState({});
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [level, setLevel] = useState(''); // State for the "level" dropdown
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

    const [addExerciseLog] = useMutation(ADD_EXERCISE_LOG);
    const toast = React.useRef(null);

    const handleCategoryChange = (e) => {
        setCategory(e.value);
    };

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (category === "cardio" && name === "distance") {
            setCategorySpecificData((prevData) => ({
                ...prevData,
                cardio: {
                    ...prevData.cardio,
                    [name]: parseFloat(value),
                },
            }));
        } else {
            setCategorySpecificData((prevData) => ({
                ...prevData,
                [category]: {
                    ...prevData[category],
                    [name]: value,
                },
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addExerciseLog({
                variables: {
                    category,
                    categorySpecificData: { ...categorySpecificData },
                    duration: parseInt(duration, 10),
                    date,
                },
            });

            // Clear form
            setCategory("yoga");
            setCategorySpecificData({});
            setDuration("");
            // setDate('');
            // Set success message
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Activity added successfully!",
            });
            navigate("/me");
            setError(null);
        } catch (err) {
            console.error(err);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to add activity. Please try again.",
            });
            setSuccessMessage("");
        }
    };

    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="p-fluid">
            <Toast ref={toast} />

            <h2 className="p-text-center p-mb-4">Log Exercise</h2>

            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="category">Category:</label>
                    <Dropdown
                        id="category"
                        value={category}
                        options={[
                            { label: "Yoga", value: "yoga" },
                            { label: "Stretching", value: "stretching" },
                            { label: "Weightlifting", value: "weightlifting" },
                            { label: "Cardio", value: "cardio" },
                        ]}
                        onChange={handleCategoryChange}
                        placeholder="Select a category"
                    />
                </div>

        {category === 'yoga' && (
          <div className="p-field">
            <label htmlFor="instructor">Instructor:</label>
            <InputText id="instructor" name="instructor" onChange={handleInputChange} />
            <label htmlFor="level">Level:</label>
            <Dropdown
              id="level"
              name="level"
              value={level} // Bind state to dropdown

              options={[
                { label: 'Select option', value: '' },
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' }
              ]}
              onChange={(e) => setLevel(e.value)} // Directly update state
              placeholder="Select a level"
            />
          </div>
        )}

                {category === "stretching" && (
                    <div className="p-field">
                        <label htmlFor="equipment">Equipment:</label>
                        <InputText
                            id="equipment"
                            name="equipment"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="focus">Focus:</label>
                        <InputText
                            id="focus"
                            name="focus"
                            onChange={handleInputChange}
                        />
                    </div>
                )}

                {category === "weightlifting" && (
                    <div className="p-field">
                        <label htmlFor="sets">Sets:</label>
                        <InputNumber
                            id="sets"
                            name="sets"
                            onValueChange={(e) =>
                                handleInputChange({
                                    target: { name: "sets", value: e.value },
                                })
                            }
                        />
                        <label htmlFor="reps">Reps:</label>
                        <InputNumber
                            id="reps"
                            name="reps"
                            onValueChange={(e) =>
                                handleInputChange({
                                    target: { name: "reps", value: e.value },
                                })
                            }
                        />
                        <label htmlFor="weight">Weight (kg):</label>
                        <InputNumber
                            id="weight"
                            name="weight"
                            onValueChange={(e) =>
                                handleInputChange({
                                    target: { name: "weight", value: e.value },
                                })
                            }
                        />
                    </div>
                )}

        {category === 'cardio' && (
          <div className="p-field">
            <label htmlFor="distance">Distance (km):</label>
            <InputNumber id="distance" name="distance" onValueChange={(e) => handleInputChange({ target: { name: 'distance', value: e.value } })} />
            <label htmlFor="intensity">Intensity:</label>
            <Dropdown
              id="intensity"
              name="intensity"
              value={level} // Bind state to dropdown

              options={[
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'Medium' },
                { label: 'High', value: 'High' }
              ]}
              onChange={(e) => setLevel(e.value)} // Directly update state
              placeholder="Select an intensity"
            />
          </div>
        )}

                <div className="p-field">
                    <label htmlFor="duration">Duration (minutes):</label>
                    <InputNumber
                        id="duration"
                        value={duration}
                        onValueChange={(e) => setDuration(e.value)}
                    />
                </div>

                <Button
                    type="submit"
                    label="Add Exercise Log"
                    icon="pi pi-plus"
                    className="p-mt-3 p-button-primary"
                />
            </form>
        </div>
    );
};

export default LogExercise;
