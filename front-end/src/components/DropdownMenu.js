/*
import React from "react"

const DropdownMenu = (props) => {

    return (
        <div className="flex justify-center overflow-hidden px-4 py-2 bg-lavender_blush-900 border-[1px] border-rose rounded-md text-rose font-bold">
            <select className="bg-transparent" value={props.label} name={props.name} onChange={props.onChange}>
                <option>{props.label}</option>

                {props.options.map(x => (
                    <option key={props.options.indexOf(x)} className="px-4 py-2" value={x}>{x}</option>
                ))}
            </select>
        </div>
    )
}

export default DropdownMenu
*/

import React from "react";

const DropdownMenu = ({ label, name, options, onChange, value }) => {
  return (
    <div className="flex justify-center overflow-hidden px-4 py-2 bg-lavender_blush-900 border-[1px] border-rose rounded-md text-rose font-bold">
      <select
        className="bg-transparent"
        value={value}
        name={name}
        onChange={onChange}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
