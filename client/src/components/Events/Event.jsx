import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import EventGuestList from "./EventGuestList";
import AddEventGuest from "./AddEventGuest";
const Event = (props) => {

    const [interactionsActive, setInteractionsActive] = useState({
        addGuest: false,
    });


    const editInteractionHandler = () => {
        if (interactionsActive.edit) {
            setInteractionsActive((prevState) => {
                return { edit: false, delete: false }
            })
        }
        else {
            setInteractionsActive((prevState) => {
                return { edit: true, delete: false }
            })
        }
    };

    const deleteCancelHandler = () => {
        setInteractionsActive((prevState) => {
            return { edit: false, delete: false }
        }
        )
    }

    const editHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const guest = {
            id: props.id,
            name: formData.get('fullName'),
            date: formData.get('birthDate'),
            email: formData.get('email')
        }
        const response = await fetch(`http://localhost:3001/api/v1/guests/${props.id}`, {
            method: 'PATCH',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(guest)
        });

        if (parseInt(response.status) === 201) {
            setInteractionsActive((prevState) => {
                return { edit: false, delete: false }
            });

            props.onEditInteraction(props.id, guest);
        }
        else {
            alert("Error editing guest: \n " + response.message);
        }
    }
    const interactionHandler = () => {
        if (interactionsActive.addGuest) {
            setInteractionsActive((prevState) => {
                return { addGuest: false, edit: false, delete: false }
            })
        }
        else {
            setInteractionsActive((prevState) => {
                return { addGuest: true, edit: false, delete: false }
            })
        }

    }

    const eventId = props.id;

    const [guests, setGuests] = useState([]);
    useEffect(() => {
        const fetchGuests = async () => {
            const response = await fetch("http://localhost:3001/api/v1/events_has_guests/" + eventId, {
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

    return (
        <div>
            <Card className="dark:bg-slate-700 min-h-fit h-38 min-w-fit w-full px-3 py-5 dark:text-white text-center">
                <div onClick={interactionHandler} className=" flex flex-row mt-2 justify-between">
                    <h2 className="font-bold text-xl">{props.name}</h2>
                    <img className="h-10 w-11" alt="DropDown" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-down-basic-ui-elements-flatart-icons-outline-flatarticons.png" />
                </div>
            </Card>
            {/* <EventGuestList guests={guests} /> */}
            {interactionsActive.addGuest &&
                <AddEventGuest onAddGuest={interactionHandler} eventId={props.id} />}
        </div>
    )
}

export default Event;