import React from 'react';

const ManageEvents = async() => {

    const res = await fetch('http://localhost:5000/manage-events')
    const data = await res.json()
    console.log(data)

    return (
        <div>
            <h2>ManageEvents</h2>
        </div>
    );
};

export default ManageEvents;