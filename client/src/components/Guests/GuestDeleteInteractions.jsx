import React from "react";
import Card from "../UI/Card";

const GuestDelete = props => {

    const prevData = props.prevData;
    return (

        <div className="w-full flex flex-col items-center my-1 px-2">
            <Card className="flex flex-col items-center w-full text-white">
                <div>Are you sure you want to delete <span className="font-bold"> {prevData.fullName} </span> ?</div>
                <div className="flex flex-row gap-x-2 mt-6" >
                    <form>
                        <button onClick={props.onDelete} className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-2xl mx-1">Delete</button>
                        <button onClick={props.onDeleteCancel} className="bg-rose-500 text-white text-sm font-bold py-2 px-4 rounded-2xl mx-1">Cancel</button>
                    </form>
                </div>
            </Card>
        </div>
    )

};

export default GuestDelete;
