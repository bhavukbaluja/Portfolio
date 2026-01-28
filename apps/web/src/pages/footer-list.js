import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer/Footer.scss";
import BaseAccordian from "@ui/components/Accordian/BaseAccordian";
import { Grid, Box } from "@mui/material";

const FooterList = ({items, title, isMobile}) => {

    return (
        <Box style={{justifyContent: "flex-start", display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
            {isMobile ? (
                //Mobile Version
                <div className="accordian-container" >
                    <BaseAccordian title={title} items={items}/>
                </div>
            ) : (
                //PC Version
                <ul className="footer-links-contents-pc" style={{width: '70%'}}>
                    <li className="footer-links-title">{title}</li>
                    {items.map((item, index) => (
                        <li key={index} className="footer-links">
                            <Link to={item.path} className="footer-links">
                                <span className="Nav-text">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
};

export default FooterList;
