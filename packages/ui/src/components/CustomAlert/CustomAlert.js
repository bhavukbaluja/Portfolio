import React from "react";
import { useI18n } from "hooks";
import {
  faExclamationTriangle,
  faTimes,
  faChevronRight,
  faClose,
  faCircleInfo,
} from "@fortawesome/pro-solid-svg-icons";
import "./CustomAlert.scss";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CustomIconButton from "components/UI/CustomIconButton/CustomIconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { renderHTML } from "_helpers/helper";

const handleSave = () => {};
const CustomAlert = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    props?.closeAlert(false);
  };
  const { _t, Literal } = useI18n();

  return (
    <Dialog
      sx={{
        height: 600,
      }}
      data-testid="custom-alert"
      open={props?.open}
      onClose={handleClose}
      maxWidth={props?.minWidth || "sm"}
      fullWidth
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="dialog-header py-1">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{_t(props?.title)}</Typography>
          <CustomIconButton
            title="close"
            type="close-btn"
            buttonClick={handleClose}
            data-testid="custom-alert-ok-btn"
            icon={<FontAwesomeIcon size="sm" icon={faClose} />}
          />
        </Stack>
      </DialogTitle>
      <Divider className="mb-0" />
      <DialogContent className="custom-alert-content">
        <Stack
          direction={{ xs: "row" }}
          spacing={{ xs: 1 }}
          sx={{ wordBreak: "keep-all", whitespace: "normal" }}
        >
          {!props?.isInfoIcon && (
            <FontAwesomeIcon
              className="custom-alert-warning-icon"
              icon={faExclamationTriangle}
            />
          )}
          {props?.isInfoIcon && (
            <FontAwesomeIcon
              className="custom-alert-info-icon"
              icon={faCircleInfo}
            />
          )}
          {renderHTML(props?.children, "14px")}
        </Stack>
        {props?.showBullets?.length > 0 &&
          props?.showBullets.map((point, index) => (
            <Box className="custom-alert-content-bullets" key={index}>
              <Stack direction={{ xs: "row" }} spacing={{ xs: 1 }}>
                <FontAwesomeIcon
                  className="custom-alert-warning"
                  icon={faChevronRight}
                />
                {renderHTML(point, "14px")}
              </Stack>
            </Box>
          ))}
      </DialogContent>

      <DialogActions className="custom-alert-action">
        <Button
          data-testid="custom-alert-ok-btn"
          onClick={handleClose}
          className="adp-btn-dark"
          variant="contained"
        >
          {Literal.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
