import React from "react";
import {
  Box,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

const AddressSelectorDialog = ({
  open,
  onClose,
  addresses = [],
  selectedAddress,
  onSelect,
}) => {
  const { lang } = React.useContext(LanguageContext);
  const [selectedId, setSelectedId] = React.useState(selectedAddress?.id || null);

  const handleSelect = () => {
    const found = addresses.find((addr) => addr.id === selectedId);
    if (found) onSelect(found);
  };

  React.useEffect(() => {
    setSelectedId(selectedAddress?.id || null);
  }, [selectedAddress]);

  const Content = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <RadioGroup
        value={selectedId}
        onChange={(e) => setSelectedId(parseInt(e.target.value))}
      >
        {addresses.map((addr) => (
          <Box
            key={addr.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              mb: 1,
            }}
          >
            <FormControlLabel
              value={addr.id}
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {addr.fullName} {addr.isPrimary && `( ${Literal[lang].defaultAddress} )`}
                  </Typography>
                  <Typography variant="body2">
                    {addr.streetAddress1}, {addr.streetAddress2}
                  </Typography>
                  <Typography variant="body2">
                    {addr.city}, {addr.state}, {addr.pinCode}, {addr.country}
                  </Typography>
                  <Typography variant="body2">{addr.mobile}</Typography>
                </Box>
              }
            />
          </Box>
        ))}
      </RadioGroup>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <button
            type="button"
            className="form-skip-button"
            style={{ width: '100px', height: '45px', flex: 1 }}
            onClick={onClose}
        >
            {Literal[lang].cancel}
        </button>
        <button
            type="button"
            className="form-button"
            style={{ width: '100px', height: '45px', flex: 1 }}
            onClick={handleSelect}
            disabled={selectedId === null}
        >
            {Literal[lang].deliverHere}
        </button>
      </Box>
    </Box>
  );

  return (
    <BaseDialog
      open={open}
      setOpen={onClose}
      title={Literal[lang].selectDeliveryAddress}
      bodyComponent={Content}
    />
  );
};

export default AddressSelectorDialog;
