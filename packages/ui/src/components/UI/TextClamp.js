import React from "react";
const TextClamp = ({ children, lines = 1, className = '', style = {}, ...rest }) => {
    return (
        <div
            className={className}
            style={{
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};


export default TextClamp;
