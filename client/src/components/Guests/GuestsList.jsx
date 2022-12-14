import React from "react";
import Guest from "./Guest";

const GuestsList = (props) => {

    const guests = props.guests;
    if (!guests || guests.length === 0) {
        return (
            <div className="text-center">
                <h1>No guests</h1>
            </div>
        )
    }
    return (guests.map((guest, index) => (

        <Guest className="text-white flex flex-row items-center justify-center w-1 h-full"
            key={guest.id}
            id={guest.id}
            fullName={guest.name}
            birthDate={new Date(guest.date)}
            email={guest.email}
            onEditInteraction={props.onEditInteraction}
            onDeleteInteraction={props.onDeleteInteraction}
        />)

    ))
};

export default GuestsList;