import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import theme from '@utils/Config/Theme';

export default function BaseAvatar({size, name, imageUrl, ...props}) {

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
    function stringAvatar(name) {
        return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
  const [imageError, setImageError] = React.useState(false);
  return (
    <Stack direction="row" spacing={2}>
      {/* Avatar with image and automatic fallback to initials */}
      <Avatar
        alt={name}
        src={imageError ? undefined : imageUrl}
        onError={() => setImageError(true)}
        sx={{
          width: size,
          height: size,
          border: `2px solid var(--maindarker-color)`,
          bgcolor: (imageError || !imageUrl) ? stringToColor(name) : undefined,
          fontSize: size * 0.4, // Adjust font size for initials
        }}
      >
        {(imageError || !imageUrl) && name
          ? `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] ?? ''}`
          : null}
      </Avatar>
    </Stack>
  );
}
