import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function BaseUploadButton(props) {
  const { lang } = React.useContext(LanguageContext);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,

    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Button
      component="label"
      className={props?.className ? props?.className : "adp-btn-light"}
      size="small"
      sx={{ width: "85px" }}
      startIcon={<FontAwesomeIcon icon={faUpload} />}
    >
      {Literal[lang][props?.text]}
      <VisuallyHiddenInput
        type="file"
        accept={props?.accept || "image/*"}
        onChange={props?.imageHandleUpload}
      />
    </Button>
  );
}
