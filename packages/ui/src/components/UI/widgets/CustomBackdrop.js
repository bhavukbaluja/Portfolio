import { Backdrop, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import "./CustomAlertBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useZIndexStack } from "@utils/helper/useZIndexStack"; // adjust path as per your setup

export default function CustomBackdrop(props) {
  const { lang } = React.useContext(LanguageContext);
  const zIndex = useZIndexStack(props.loading); // apply dynamic z-index
  const theme = useTheme();

  return (
    <Backdrop
      className="custom-backdrop"
      sx={{
        zIndex: zIndex ?? ((theme) => theme.zIndex.drawer + 1),
        backgroundColor: theme.palette.mode === 'dark'? "var(--color-gray-100) !important" : "var(--color-gray-400) !important"
      }}
      open={props.loading}
    >
      {props.isBackdropLoaderBoxHidden ? (
        <>
          <FontAwesomeIcon size="2xl" icon={faSpinner} spinPulse />
          {!props.typographyHidden && (
            <Typography sx={{ paddingLeft: 2 }}>
              {props.text || Literal[lang]["pleaseWait"]}
            </Typography>
          )}
        </>
      ) : (
        <Box className="backdrop-loader">
          <FontAwesomeIcon size="2xl" icon={faSpinner} spinPulse color="var(--primarytext-color)"/>
          {!props.typographyHidden && (
            <Typography sx={{ paddingLeft: 2, color: "var(--primarytext-color" }}>
              {props.text || Literal[lang]["pleaseWait"]}
            </Typography>
          )}
        </Box>
      )}
    </Backdrop>
  );
}
