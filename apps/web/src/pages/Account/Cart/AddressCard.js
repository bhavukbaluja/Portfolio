import React, { useContext } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
  Button,
} from "@mui/material";
import { Edit, Delete, CheckCircle } from "@mui/icons-material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { DefaultBadge } from "@utils/helper/Helper";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const AddressCard = ({
  address,
  onEdit,
  onSelect,
  selected,
  isMobile = false,
  onPrimary,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { lang } = useContext(LanguageContext);

  const {
    fullName,
    mobile,
    streetAddress1,
    streetAddress2,
    city,
    state,
    pinCode,
    country,
    landmark,
    isPrimary,
  } = address;

  return (
    <Box
      onClick={() => onSelect && onSelect(address)}
      sx={{
        border: selected ? "2px solid #1976d2" : "1px solid #ccc",
        borderRadius: "10px",
        padding: 2,
        width: "100%",
        marginBottom: 2,
        cursor: onSelect ? "pointer" : "default",
        backgroundColor: selected ? "#f0f8ff" : "#fff",
        position: "relative",
        transition: "border 0.3s ease",
      }}
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        {selected && (
          <CheckCircle
            color="primary"
            sx={{ position: "absolute", top: 8, right: 8 }}
          />
        )}
        {isPrimary && (
          <DefaultBadge style={{ marginTop: selected ? 24 : 0 }}>
            {Literal[lang].default}
          </DefaultBadge>
        )}
      </div>

      <Typography variant="subtitle1" fontWeight="bold">
        {fullName}
      </Typography>
      <Typography variant="body2">
        {[streetAddress1, streetAddress2, city, state, pinCode, country]
          .filter(Boolean)
          .join(", ")}
      </Typography>
      {landmark && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          <b>{Literal[lang].landmark}:</b> {landmark}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        <b>{Literal[lang].mobile}:</b> {mobile}
      </Typography>

        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                {/* Set as default button if not already default */}
                { !isPrimary && onPrimary && (
                    <button        
                        type="submit" 
                        className="form-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrimary(address.id);
                        }}                style={{minWidth:'50px', height: '35px', width: '150px'}}
                        sx={{ backgroundColor: "#ffc107", color: "#111" }}
                    >
                        {Literal[lang].setDefault}
                    </button>
                )}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, alignItems: 'center', justifyContent: 'flex-end' }}>

                {onEdit && (
                <Tooltip title="Edit">
                    <IconButton
                        type="button"
                        className="form-skip-button"
                        style={{minWidth:'35px', height: '35px', width: '35px'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(address);
                        }}
                        >
                            <EditOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                )}
            </Box>
        </div>
    </Box>
  );
};

export default AddressCard;
