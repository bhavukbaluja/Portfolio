import React from "react";
import BaseStickyHeader from "@ui/components/UI/widgets/BaseStickyHeader";
import "./Header.scss";

const StickyHeader = ({ content }) => {
    return (
        // <div className="sticky-header">
            <BaseStickyHeader content={content} />
        // </div>
    );
};

export default StickyHeader;
