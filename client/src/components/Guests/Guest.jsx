import React, { useState } from "react";
import Card from "../UI/Card";
import GuestInteractions from "./GuestInteractions";
import GuestEditInteractions from "./GuestEditInteractions";
import GuestDeleteInteractions from "./GuestDeleteInteractions";


const Guest = (props) => {

    const [interactionsActive, setInteractionsActive] = useState({
        edit: false,
        delete: false
    });


    const deleteInteractionHandler = () => {
        if (interactionsActive.delete) {
            setInteractionsActive((prevState) => {
                return { edit: false, delete: false }
            })
        }
        else {
            setInteractionsActive((prevState) => {
                return { edit: false, delete: true }
            })
        }
    };
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

    const deleteHandler = async () => {

        const response = await fetch(`http://localhost:3001/api/v1/guests/${props.id}`, {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        if (parseInt(response.status) === 201) {
            setInteractionsActive((prevState) => {
                return { edit: false, delete: false }
            });

            props.onDeleteInteraction(props.id);
        }
        else {
            alert("Error deleting guest: \n " + response.message);
        }
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


    return (
        <div>
            <Card className="dark:bg-slate-700 min-h-fit h-38 min-w-fit w-full px-3 py-5 dark:text-white text-center">
                <div className=" flex flex-row mt-2 justify-between">
                    <h2 className="font-bold text-xl">{props.fullName}</h2>
                    <GuestInteractions
                        onDeleteInteraction={deleteInteractionHandler}
                        onEditInteraction={editInteractionHandler}
                    />
                </div>
            </Card>

            {interactionsActive.edit && !interactionsActive.delete &&
                <GuestEditInteractions onEdit={editHandler} prevData={props} />}
            {interactionsActive.delete && !interactionsActive.edit &&
                <GuestDeleteInteractions onDelete={deleteHandler} onDeleteCancel={deleteCancelHandler} prevData={props} />}
        </div>
    )
}

export default Guest;