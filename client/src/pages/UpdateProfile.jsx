import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button'; // Ensure this import is correct
import { InputText } from 'primereact/inputtext'; // Ensure this import is correct
import { Card } from 'primereact/card';
import '../profile.css';

const UpdateProfile = () => {
    const navigate = useNavigate();
    
    // Fetch current user data
    const { data, loading, error } = useQuery(QUERY_ME);
    const [updateUser, { error: updateError }] = useMutation(UPDATE_USER);

    // Local state for form fields
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        goal: '',
    });

    useEffect(() => {
        if (data) {
            const { me } = data;
            setFormState({
                username: me.username,
                email: me.email,
                gender: me.gender || '',
                age: me.age || '',
                height: me.height || '',
                weight: me.weight || '',
                goal: me.goal || '',
            });
        }
    }, [data]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert values to appropriate types
        const updatedData = {
            id: data?.me._id, // Ensure you're passing the user ID here
            username: formState.username,
            email: formState.email,
            gender: formState.gender,
            age: formState.age ? parseInt(formState.age) : null,
            height: formState.height ? parseFloat(formState.height) : null,
            weight: formState.weight ? parseFloat(formState.weight) : null,
            goal: formState.goal,
        };

        try {
            await updateUser({
                variables: updatedData,
            });
            navigate('/me');
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data: {error.message}</div>;
    if (updateError) return <div>Error updating user: {updateError.message}</div>;

    return (
        <div className="update-profile-container p-3">
            <Card title="Update Profile" className="p-mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            name="username"
                            value={formState.username}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="gender">Gender</label>
                        <InputText
                            id="gender"
                            name="gender"
                            value={formState.gender}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="age">Age</label>
                        <InputText
                            id="age"
                            name="age"
                            value={formState.age}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="height">Height</label>
                        <InputText
                            id="height"
                            name="height"
                            value={formState.height}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="weight">Weight</label>
                        <InputText
                            id="weight"
                            name="weight"
                            value={formState.weight}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="goal">Goal</label>
                        <InputText
                            id="goal"
                            name="goal"
                            value={formState.goal}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" label="Update" className="p-button-outlined" />
                </form>
            </Card>
        </div>
    );
};

export default UpdateProfile;
