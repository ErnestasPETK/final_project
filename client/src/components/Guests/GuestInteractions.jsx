import React from "react";

const GuestInteractions = (props) => {

    return <div className="flex flex-row gap-x-2">
                <button onClick={props.onEditInteraction} className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-2xl">Edit</button>
                <button onClick={props.onDeleteInteraction} className="bg-rose-500 text-white text-sm font-bold py-2 px-4 rounded-2xl">Delete</button>
            </div>
}

export default GuestInteractions;