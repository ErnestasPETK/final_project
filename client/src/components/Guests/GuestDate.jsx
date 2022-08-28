import React from "react";

const GuestDate = (props) => {
    const year = props.date.toLocaleString("en-US", { year: "numeric" });
    const month = props.date.toLocaleString("en-US", { month: "long" });
    const day = props.date.toLocaleString("en-US", { day: "2-digit" });
    return (
        <div className="dark:text-slate-300 ">
            <div className="font-bold">{year} {month} {day}</div>
        </div>
);
};

export default GuestDate;