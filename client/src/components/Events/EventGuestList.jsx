import React, { useState, useEffect } from "react";
import GuestList from "../Guests/GuestsList";


const EventGuestList = (props) => {


    const guests = props.guests;
    if (guests && guests.length === 0) {
        return (
            <div className="text-center">
                <h1>No guests</h1>
            </div>
        )
    }
    return guests.map((guest, index) => (

        <div className="text-white flex flex-row items-center justify-center w-1 h-full"
            key={guest.id}
            id={guest.id}
            fullName={guest.name}
            birthDate={new Date(guest.date)}
            email={guest.email}
        >{guest.name}</div>)

    )


}

export default EventGuestList;