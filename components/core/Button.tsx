import React from "react";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { onClick, children, className } = props;

    return (
        <button
            onClick={onClick}
            className={`button ${className || ''}`}
        >
            {children}
        </button>
    );
}

export default Button;
