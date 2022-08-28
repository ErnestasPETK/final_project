import React, { useState } from "react";
import EventsList from "./EventsList";
import Header from "../UI/Header";

const Guests = (props) => {

    const events = props.events;
    console.log(events);

    const classes = "min-h-fit w-full px-3 py-5 rounded-lg shadow-xl flex flex-col justify-center" + props.className;
    return (<div className={classes}>
        <Header className="mb-6">Events</Header>
        <div className="flex w-full justify-center ">
            <div className="w-2/3 flex flex-col gap-y-6">
                <EventsList events={events} />
            </div>
        </div>
    </div>)
}

export default Guests;