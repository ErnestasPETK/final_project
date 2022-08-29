import React, { useState, useEffect } from "react";
import Submit from "../UI/Submit";



const AddEventGuest = (props) => {

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

            if (parseInt(response.status) === 200) {

                const eventsResponse = await fetch("http://localhost:3001/api/v1/events_has_guests/" + props.eventId, {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                const eventsData = parseInt(eventsResponse.status) === 200 ? await eventsResponse.json() : null;
                const data = await response.json();
                const filteredGuests = parseInt(eventsResponse.status) === 200 ? data.guests.filter(guest => {
                    return eventsData.guests.find(eventGuest => eventGuest.id === guest.id) === undefined;
                }).map(guest => {
                    return { id: guest.id, name: guest.name };
                }).sort()
                    : data.guests;
                if (filteredGuests.length > 0) {
                    setGuests(filteredGuests);
                };
            };



        };
        fetchGuests();
    }, [props.eventId]);

    const addGuestHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const guestId = formData.get('guest');


        const response = await fetch("http://localhost:3001/api/v1/events_has_guests/" + props.eventId, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                guestId: guestId
            }),
        });

        if (parseInt(response.status) === 201) {
            props.onAddGuest();
        }
        else {
            alert("Error adding guest: \n " + response.message);
        }


    };

    return (
        <div className="text-white h-40 min-h-fit flex flex-col items-center justify-center my-6">
            <h1 className="my-4 text-2xl">Select guest</h1>
            <form onSubmit={addGuestHandler} className="w-full h-full flex flex-col items-center " action="">

                <select defaultValue={"default"} className="w-1/3 h-8 min-w-fit rounded text-black" name="guest" id="">
                    <option disabledvalue={"default"}> -- select an option -- </option>
                    {guests.length > 0 && guests.map((guest) => (
                        <option key={guest.id} value={guest.id}>{guest.name}</option>
                    ))}
                </select>
                <Submit />
            </form>


        </div>
    )


}


export default AddEventGuest;