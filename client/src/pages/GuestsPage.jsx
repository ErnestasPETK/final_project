import React, { useState, useEffect } from "react";
import Guests from "../components/Guests/Guests";
import NewGuests from "../components/NewGuests/NewGuests";
import Navigation from "../components/Navigation/Navigation";

const GuestsPage = () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    }
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

    const addGuestHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newGuest = {
            name: formData.get("name"),
            email: formData.get("email"),
            date: formData.get("date"),
        };

        const fetchNewGuest = async () => {
            const response = await fetch("http://localhost:3001/api/v1/guests", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(newGuest),
            });
            const data = await response.json();
            if (parseInt(response.status) === 201) {
                return data.id;
            }
            if ([404, 400, 500].includes(parseInt(response.status))) {
                alert("Error adding guest: \n " + data.message);
            }

        };

        const newGuestId = await fetchNewGuest();
        if (newGuestId) {
            if (guests.length > 0) {

                setGuests((prevGuests) => {
                    return [
                        ...prevGuests,
                        {
                            id: newGuestId,
                            name: newGuest.name,
                            email: newGuest.email,
                            date: new Date(newGuest.date),
                        },
                    ];
                });
            }
            else {
                setGuests(
                    {
                        id: newGuestId,
                        name: newGuest.name,
                        email: newGuest.email,
                        date: new Date(newGuest.date),
                    }
                );
            }
        };

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
