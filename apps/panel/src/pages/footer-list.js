import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer/Footer.scss";
import BaseAccordian from "@ui/components/Accordian/BaseAccordian";
import { Grid } from "@mui/material";

const FooterList = ({items, title, isMobile}) => {

    return (
        <Grid item xs={12} sm={6} md={3} mt={1}>
            {isMobile ? (
                //Mobile Version
                <div className="accordian-container" >
                    <BaseAccordian title={title} items={items}/>
                </div>
            ) : (
                //PC Version
                <ul className="footer-links-contents-pc">
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
        </Grid>
    );
};

export default FooterList;
