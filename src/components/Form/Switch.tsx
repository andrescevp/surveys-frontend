import React, {useState} from "react";

import clsx from "clsx";

const Switch = ({
                    label,
                    checked,
                    onChange
                }: { label: string, checked: boolean, onChange?: (checked: boolean) => void }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = () => {
        console.log(isChecked)
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(!isChecked);
        }
    };

    return (
        <div className="flex items-center">
            <label className="flex items-center cursor-pointer" htmlFor={label}
                   role="presentation"
                   onClick={handleClick}>
                <div className="relative">
                    <input
                        checked={isChecked}
                        className="hidden"
                        id={label}
                        type="checkbox"
                        onChange={() => {
                        }}
                    />
                    <div
                        className={clsx("w-10 h-5 bg-gray-400 rounded-full shadow-inner transition duration-300", isChecked && "bg-green-500")}
                    ></div>
                    <div
                        className={clsx("absolute w-4 h-4 bg-white rounded-full shadow inset-y-0 left-0 my-0.5 transition duration-300 transform", isChecked && "translate-x-6")}
                    ></div>
                </div>
                {label && (
                    <div className="ml-3 text-gray-700 font-medium">{label}</div>
                )}
            </label>
        </div>
    );
};

export default Switch;
