import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EXERCISE_LOG } from '../utils/mutations'; // Ensure this mutation is correctly defined in `mutations.js`
import Auth from '../utils/auth';

const LogExercise = () => {
  const [category, setCategory] = useState('');
  const [categorySpecificData, setCategorySpecificData] = useState({});
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  const [addExerciseLog, { error }] = useMutation(ADD_EXERCISE_LOG);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     // Convert value to the appropriate type based on the category
     if (category === 'cardio' && name === 'distance') {
      setCategorySpecificData((prevData) => ({
        ...prevData,
        cardio: {
          ...prevData.cardio,
          [name]: parseFloat(value) // Ensure value is a Float
        }
      }));
    } else {
      // Handle other categories similarly
      setCategorySpecificData((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Category11:', category);
    console.log('Category Specific Data:', categorySpecificData);
    try {
      await addExerciseLog({
        variables: {
          category,
          categorySpecificData: {
           ...categorySpecificData
          },
          duration: parseInt(duration, 10),
          date
        }  
      });  console.log('Category:', category);
      console.log('Category Specific Data:', categorySpecificData);
      
      // Clear form
      setCategory('yoga');
      setCategorySpecificData({});
      setDuration('');
      setDate('');
    } catch (err) {
      console.error(err);
    }
  };


  if (!Auth.loggedIn()) {
    return null;
  }


  return (
    <div>
      <h2>Log Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="yoga">Yoga</option>
            <option value="stretching">Stretching</option>
            <option value="weightlifting">Weightlifting</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        {category === 'yoga' && (
          <div>
            <label htmlFor="instructor">Instructor:</label>
            <input type="text" id="instructor" name="instructor" onChange={handleInputChange} />
            <label htmlFor="level">Level:</label>
            <select id="level" name="level" onChange={handleInputChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        )}

        {category === 'stretching' && (
          <div>
            <label htmlFor="equipment">Equipment:</label>
            <input type="text" id="equipment" name="equipment" onChange={handleInputChange} />
            <label htmlFor="focus">Focus:</label>
            <input type="text" id="focus" name="focus" onChange={handleInputChange} />
          </div>
        )}

        {category === 'weightlifting' && (
          <div>
            <label htmlFor="sets">Sets:</label>
            <input type="number" id="sets" name="sets" onChange={handleInputChange} />
            <label htmlFor="reps">Reps:</label>
            <input type="number" id="reps" name="reps" onChange={handleInputChange} />
            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" name="weight" onChange={handleInputChange} />
          </div>
        )}

        {category === 'cardio' && (
          <div>
            <label htmlFor="distance">Distance (km):</label>
            <input type="number" id="distance" name="distance" onChange={handleInputChange} />
            <label htmlFor="intensity">Intensity:</label>
            <select id="intensity" name="intensity" onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="duration">Duration (minutes):</label>
          <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <button type="submit">Add Exercise Log</button>

        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default LogExercise;
