import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, ClickAwayListener, Grow, LinearProgress, Paper, Popper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import theme from "@utils/Config/Theme";
import Literal from "@ui/literals";
import BaseTextField2 from "../UI/fields/BaseTextField2";
import "./UserActivationPage.scss";

const SetPasswordComp = ({SubmitButton, lang, formData, setFormData, setErrors, errors, loading, setLoading, value, showSnackBar, setOpenAlert, setAlertMsg, loadingParam, setDialogOpen, action, setChildren}) =>{
  
    const textRef = useRef(null);
    const popperRef = useRef(null);
    const [strength, setStrength] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopper, setOpenPopper] = useState(false);
    const mobileOrEmail = value;

    const requirements = [
        { id: 1, label: Literal[lang].minimum8Char, regex: /.{8,}/ },
        { id: 2, label: Literal[lang].oneUpperCase, regex: /[A-Z]/ },
        { id: 3, label: Literal[lang].oneLowerCase, regex: /[a-z]/ },
        {
          id: 4,
          label: Literal[lang].atLeastOneSpecialChar,
          regex: /[!@#$%^&*(),.?":{}|<>]/,
        },
        { id: 5, label: Literal[lang].atLeastOneNumericals, regex: /\d/ },
      ];

      const checkStrength = (password) => {
        let passed = 0;
        requirements.forEach((requirement) => {
          if (requirement.regex.test(password)) passed += 1;
        });
        setStrength((passed / requirements.length) * 100);
        if ((passed / requirements.length) * 100 === 100) {
          setAnchorEl(null);
          setOpenPopper(false);
        }
      };

      const handlePasswordChange = (event) => {
        const { name, value } = event.target;  
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "password") {
          handlePopperOpen(event);
          checkStrength(value);
        
          for (let requirement of requirements) {
            if (!requirement.regex.test(value)) {
              let error = Literal[lang].passReqNotFulfil;
              setErrors((prev) => ({ ...prev, [name]: error }));
              break;
            } else {
              setErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
              });
            }
          }
        }
        if(name=="confirmPassword"){
          if(formData?.password!=value){
            let error = Literal[lang].confirmPasswordNotMatchPassword;
            setErrors((prev) => ({...prev, [name]: error}));
          }
          else 
          {
            setErrors((prev) => {
              const updated = { ...prev };
              delete updated[name];
              return updated;
            });
          }    
        }
      };

      const handlePopperOpen = (event) => {
        if (textRef.current) {
          setAnchorEl(textRef.current); // use ref directly instead of event.target
          setOpenPopper(true);
          textRef.current.focus();
        }
      };
      
    
      const handlePopperClose = (event) => {
        if (
          popperRef.current &&
          !popperRef?.current?.contains(event?.relatedTarget) &&
          !textRef?.current?.contains(event.relatedTarget)
        ) {
          setAnchorEl(null);
          setOpenPopper(false);
        }
      };

    return(
        <>
            {action == "update" && (
              <BaseTextField2
                  name="oldPassword"
                  id="oldPassword"
                  label="oldPassword"
                  required={true}
                  type="password"
                  onChange={handlePasswordChange}
                  errorMsg={errors?.oldPassword}
                />
            )}
                    <ClickAwayListener onClickAway={handlePopperClose}>
                      <div className="password-comp-div">
                        <BaseTextField2
                          inputRef={textRef}
                          name="password"
                          id="password"
                          label="password"
                          required={true}
                          type="password"
                          onChange={handlePasswordChange}
                          onBlur={handlePopperClose}
                          errorMsg={errors?.password}
                        />
                        <Popper
                          sx={{ marginTop: "1px !important", zIndex: 1500 }}
                          open={openPopper}
                          anchorEl={anchorEl}
                          data-testid="password-popper"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transition
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              id="password-popper"
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "top left"
                                    : "bottom left",
                              }}
                            >
                              <Paper>
                                <Box
                                  ref={popperRef}
                                  sx={{
                                    background: "#f8f9fa",
                                    padding: "10px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {requirements.map((requirement) => (
                                    <Typography
                                      key={requirement.id}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: requirement.regex.test(
                                          formData?.password
                                        )
                                          ? theme.colors.success
                                          : theme.colors.danger,
                                      }}
                                    >
                                      {requirement.regex.test(
                                        formData?.password
                                      ) ? (
                                        <CheckCircleIcon fontSize="small" />
                                      ) : (
                                        <CancelIcon fontSize="small" />
                                      )}
                                      <span style={{ marginLeft: "8px" }}>
                                        {requirement.label}
                                      </span>
                                    </Typography>
                                  ))}
                                  <Box sx={{ marginTop: "10px" }}>
                                    <Typography>
                                      {Literal.passwordStrength}
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={strength}
                                      aria-valuenow={strength}
                                      data-testid="password-progressbar"
                                    />
                                  </Box>
                                </Box>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                    </ClickAwayListener>
                <div className="password-comp-div">
                  <BaseTextField2
                    name="confirmPassword"
                    id="confirmPassword"
                    label="confirmPassword"
                    required={true}
                    type="password"
                    onChange={handlePasswordChange}
                    errorMsg={errors?.confirmPassword}
                  />
                </div>
              <Box className="submit-button">
                  {SubmitButton}
              </Box>
        </>
    )
}
export default SetPasswordComp;