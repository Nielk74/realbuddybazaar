import { createAsyncThunk } from '@reduxjs/toolkit';
// import { BACKEND_URL } from "@env";
const BACKEND_URL = "http://localhost:3000";

export const getOwnActivities = createAsyncThunk('activities/getOwnActivities', async (args) => {
    const { token } = args;
    const response = await fetch(`${BACKEND_URL}/api/activities/by-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': `${token}`
        },
    });
    const data = await response.json();
    return Promise.resolve({res:data, error:!response.ok});
});

