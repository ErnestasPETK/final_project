import React, { useEffect } from 'react';
import { useState } from 'react';
import Events from '../components/Events/Events';

const EventsPage = () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    }
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch("http://localhost:3001/api/v1/events", {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();

            setEvents(data.events);
        };

        fetchEvents();
    }, []);


    return (
        <div className='dark'>
            <main className="dark:bg-black px-6 py-8 overflow-auto scroll-smooth h-screen w-screen ">
                <Events events={events} />
            </main>
        </div>
    );
};

export default EventsPage;