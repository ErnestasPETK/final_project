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
                const data = await response.json();
                if (data.guests.length > 0) {
                    setGuests(data.guests);
                };
            };
        };
        fetchGuests();
    }, []);
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
    console.log(guests)
    return (
        <div className="text-white h-40 min-h-fit flex flex-col items-center justify-center my-6">
            <h1 className="my-4 text-2xl">Select guest</h1>
            <form onSubmit={addGuestHandler} className="w-full h-full flex flex-col items-center " action="">

                <select className="w-1/3 h-8 min-w-fit rounded text-black" name="guest" id="">
                    <option disabled selected value> -- select an option -- </option>
                    {guests.map((guest) => (
                        <option value={guest.id}>{guest.name}</option>
                    ))}
                </select>
                <Submit />
            </form>


        </div>
    )


}


export default AddEventGuest;