import React, { useState, useEffect } from "react";
import Guests from "../components/Guests/Guests";
import NewGuests from "../components/NewGuests/NewGuests";
import Navigation from "../components/Navigation/Navigation";

const GuestsPage = () => {
    const [guests, setGuests] = useState([]);
    useEffect(() => {
        const fetchGuests = async () => {
            const response = await fetch("http://localhost:3001/api/v1/guests", {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();

            setGuests(data.guests);
        };
        fetchGuests();
    }, []);

    const addGuestHandler = (guest) => {
        setGuests((prevGuests) => {
            return [
                ...prevGuests,
                {
                    name: guest.fullName,
                    email: guest.email,
                    date: new Date(guest.date),
                },
            ];
        });
    };

    const deleteGuestHandler = (id) => {
        setGuests((prevGuests) => {
            return prevGuests.filter((guest) => guest.id !== id);
        });
    };

    const editGuestHandler = (id, guest) => {
        setGuests((prevGuests) => {
            return prevGuests.map((g) => (g.id === id ? guest : g));
        });
    };

    return (
        <div className="dark">
            <main className="dark:bg-black px-6 py-8 overflow-auto scroll-smooth h-screen w-screen ">
                <NewGuests addGuestHandler={addGuestHandler} />
                <Guests
                    onGuestDelete={deleteGuestHandler}
                    onGuestEdit={editGuestHandler}
                    guests={guests}
                />
            </main>
        </div>
    );
};

export default GuestsPage;
