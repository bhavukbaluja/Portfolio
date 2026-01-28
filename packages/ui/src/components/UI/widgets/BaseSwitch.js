import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

// Default style switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#ffffff',
      transform: 'translateX(24px)',
      '& .MuiSwitch-thumb': {
        backgroundColor: `var(--success-color)`,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'><path d='M20.285 2.998L9 14.283l-5.285-5.285L2 10.713l7 7L22 4z'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '20px 20px',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: '#b2fab4', // ✅ Matching PowerSwitch checked color
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: `var(--danger-color)`,
    width: 30,
    height: 30,
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'><path d='M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.42L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '20px 20px',
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#ffe6e6', // ✅ Updated to match PowerSwitch's improved visibility
    opacity: 1,
    borderRadius: 16,
    transition: theme.transitions.create(['background-color'], {
      duration: 500, // ✅ Matching transition duration
    }),
  },
}));

// Power button styled switch with icon inside thumb
const PowerSwitch = styled((props) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
    icon={
      <div className="custom-thumb">
        <PowerSettingsNewOutlinedIcon fontSize="small" style={{ color: 'white' }} />
      </div>
    }
    checkedIcon={
      <div className="custom-thumb">
        <PowerSettingsNewOutlinedIcon fontSize="small" style={{ color: 'white' }} />
      </div>
    }
  />
))(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#b2fab4',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#ffe6e6',
    borderRadius: 16,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
  '& .custom-thumb': {
    backgroundColor: `var(--danger-color)`,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  '& .Mui-checked .custom-thumb': {
    backgroundColor: `var(--success-color)`,
  },
}));

// Exported switch component
export default function BaseSwitch({
  defaultChecked = false,
  name = 'status',
  onToggle,
  switchKey,
  row,
  powerStyle = false,
}) {
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (onToggle) onToggle(isChecked, row);
  };

  const SwitchComponent = powerStyle ? PowerSwitch : MaterialUISwitch;

  return (
    <FormControlLabel
      key={switchKey}
      control={
        <SwitchComponent
          checked={checked}
          onChange={handleChange}
          name={name}
        />
      }
    />
  );
}
