import { Stack, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

export default function CustomTooltip(props) {
    const { lang } = useContext(LanguageContext);
  return (
    <Tooltip
      title={
        props?.title
          ? Literal[lang][props?.title]
            ? Literal[lang][props?.title]
            : props?.title
          : ""
      }
      arrow={props?.arrow || true}
    >
      <Stack>{props.children}</Stack>
    </Tooltip>
  );
}
