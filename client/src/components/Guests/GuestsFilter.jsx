import React from "react";

const GuestsFilter = (props) => {
    <div className="w-full">
            <div className="flex justify-between w-full">
                <label className="dark:text-white" htmlFor="">Filter by name or surname </label>
                {/* <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/4" placeholder="Enter name or surname" onChange={props.onChangeFilter} value={props.selected} name="" id=""/> */}
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/4" placeholder="Enter name or surname" onChange={props.onChangeFilter} name="" id=""/>
            </div>
        </div>
}

export default GuestsFilter;