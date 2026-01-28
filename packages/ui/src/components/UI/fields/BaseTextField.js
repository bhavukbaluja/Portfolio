import * as React from "react";
import {
  Stack,
  TextField,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import InfoTipIcon from "../tooltip/InfoTipIcon";
import CustomTooltip from "../tooltip/CustomTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FieldMask from "./FieldMask";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";

const BaseTextField = React.memo(function BaseTextField({
  maxLength,
  fieldLabel,
  hideLabel,
  showRequired,
  showToolTip,
  showToolTipMessage,
  placeHolderText,
  hidePasswordIcon,
  handleChange,
  handleBlur,
  inputProps,
  inputRef,
  readOnly,
  multiline,
  formik,
  type = "text",
  showActionBtn,
  handleEditBtnClick,
  handleAddBtnClick,
  inputPropsOption = "",
  loading = false,
  styles = {},
  handleFldClick,
  labelProps = {},
  showHelpText = false,
  ...props
}) {
  const { lang } = React.useContext(LanguageContext);
  const labelText = Literal[lang][fieldLabel] || fieldLabel;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = (e) => {
    if (handleFldClick) {
      handleFldClick(e);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  let LabelPropsObj = {
    htmlFor: props.id,
    ...labelProps,
  };
  return (
    <>
      {!hideLabel && (
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <Tooltip title={labelText} arrow>
            <InputLabel {...LabelPropsObj}>{labelText}</InputLabel>
          </Tooltip>
          {showRequired && <span className="form-label-required-field">*</span>}
          {showToolTip && (
            <InfoTipIcon
              tipMsg={showToolTipMessage}
              anchorHorizontal={props?.anchorHorizontal}
              transformHorizontal={props?.transformHorizontal}
            />
          )}
        </Stack>
      )}
      <Stack
        direction={"row"}
        gap={0.5}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ position: "relative" }}
      >
        <TextField
          fullWidth
          {...props}
          size="small"
          variant="outlined"
          placeholder={Literal[lang][placeHolderText] || placeHolderText}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline={multiline}
          rows={multiline ? (props?.rows ? props?.rows : 3) : undefined}
          autoComplete="off"
          inputRef={inputRef}
          onClick={handleClick}
          sx={{ background: "#fff" }}
          InputProps={
            inputPropsOption || {
              ...inputProps,
              ref: inputRef,
              maxLength: maxLength,
              readOnly: readOnly,
              type: multiline ? undefined : showPassword ? "text" : type,
              endAdornment:
                type == "password" && !hidePasswordIcon ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      disabled={readOnly}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                ),
            }
          }
        />
        {showActionBtn && (
          <CustomTooltip title={props?.value ? "edit" : "addButton"}>
            <IconButton
              className="adp-btn-dark rounded-icon-btn"
              onClick={props?.value ? handleEditBtnClick : handleAddBtnClick}
            >
              <FontAwesomeIcon size="sm" icon={props?.value ? faPen : faPlus} />
            </IconButton>
          </CustomTooltip>
        )}
        {loading && <FieldMask />}
      </Stack>
    </>
  );
});

export default BaseTextField;
