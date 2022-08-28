import React, { useState } from "react";
import GuestsFilter from "./GuestsFilter";
import GuestsList from "./GuestsList";
import Header from "../UI/Header";

const Guests = (props) => {

    const [filterQuery, setFilterQuery] = useState(false);

    const filteredGuests = filterQuery ? props.guests.filter(guest => {
        return guest.name.toLowerCase().includes(filterQuery.toLowerCase())
    }
    ) : props.guests;

    const filterChangeHandler = (filterQuery) => {
        setFilterQuery(filterQuery);
    }

    const classes = "min-h-fit w-full px-3 py-5 rounded-lg shadow-xl flex flex-col justify-center" + props.className;
    return (<div className={classes}>
        <Header className="mb-6">Guests</Header>
        <div className="flex w-full justify-center ">
            <GuestsFilter selected={filterQuery} onChangeFilter={filterChangeHandler} />
            <div className="w-2/3 flex flex-col gap-y-6">
                <GuestsList onEditInteraction={props.onGuestEdit} onDeleteInteraction={props.onGuestDelete} guests={filteredGuests} />
            </div>
        </div>
    </div>)
}

export default Guests;