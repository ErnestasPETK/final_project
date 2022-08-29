import React from "react";
import Form from "../UI/Form";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Submit from "../UI/Submit";
import Header from "../UI/Header";

const NewGuests = (props) => {

    return (
        <div className="w-full flex justify-center">
            <div className="w-4/5 flex flex-col items-center">

                <Header>Add a guest</Header>
                <Form onFormSubmit={props.addGuestHandler}>
                    <Label>Full name</Label>
                    <Input name="name" id="name" placeholder="Vardenis Pavardenis" />
                    <Label>Email</Label>
                    <Input name="email" id="email" type="email" placeholder="email@email.com" />
                    <Label>Birth date</Label>
                    <Input name="date" id="date" type="date" pattern="yyyy-mm-dd" />
                    <Submit>Submit</Submit>
                </Form>
            </div>
        </div>
    )
}

export default NewGuests;