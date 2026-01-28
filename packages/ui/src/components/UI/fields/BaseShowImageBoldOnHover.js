import React from "react";
import "./Base.scss";

const BaseShowImageBoldOnHover = ({imageUrl, alt, aspectRatio}) =>{
    return(
        <img
            src={imageUrl}
            alt={alt}
            className="BaseShowImageBoldOnHover"
            style={{
                aspectRatio: aspectRatio,
            }}
        />
    );
}
export default BaseShowImageBoldOnHover;