import React from "react";

interface Props {
    name: string;
    className?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    type: "email" | "password" | "text" | "number";
}

const Input = ({name, type, className, placeholder, icon}: Props) => {
    return (
        <div className="form-control relative w-full my-4">
            <input type={type} name={name} className={`input input-lg max-w-full pl-10 ${className}`}
                   placeholder={placeholder}/>

            <span className="absolute inset-y-0 left-3 inline-flex items-center">
			{icon}
		</span>
        </div>
    );
};

export default Input;