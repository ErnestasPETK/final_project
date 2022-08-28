import React from "react";
import Event from "./Event";

const EventsList = (props) => {

    const events = props.events;

    return events.map((event, index) => (

        <Event className="text-white flex flex-row items-center justify-center w-1 h-full"
            key={event.id}
            id={event.id}
            name={event.name}
            date={new Date(event.date)}
        />)

    )
};

export default EventsList;