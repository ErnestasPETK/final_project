import React from "react";
import Form from "../UI/Form";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Submit from "../UI/Submit";
import Card from "../UI/Card";

const GuestEdit = props => {

    const prevData = props.prevData;

    const prevBirthDate = prevData.birthDate.toLocaleString("en-US", { year: "numeric" }) + "-" +
        prevData.birthDate.toLocaleString("en-US", { month: "2-digit" }) + "-" +
        prevData.birthDate.toLocaleString("en-US", { day: "2-digit" });

    return (

        <div className="w-full flex flex-col items-center my-1 px-2">
            <Card className="flex justify-center w-full ">
                <Form className="shadow-none" onFormSubmit={props.onEdit}>
                    <Label>Full name</Label>
                    <Input
                        name="fullName"
                        id="name"
                        placeholder="Vardenis Pavardenis"
                        defaultValue={prevData.fullName}
                        className="mb-4"
                    />
                    <Label>Email</Label>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="email@email.com"
                        defaultValue={prevData.email}
                        className="mb-4"
                    />
                    <Label>Birth date</Label>
                    <Input
                        name="birthDate"
                        id="date"
                        type="date"
                        defaultValue={prevBirthDate}
                    />
                    <Submit>Submit</Submit>
                </Form>
            </Card>
        </div>
    )

};

export default GuestEdit;
