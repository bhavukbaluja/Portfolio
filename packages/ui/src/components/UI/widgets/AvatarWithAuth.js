import React, { useEffect, useState } from "react";
import { loadProfileImage } from "@utils/helper/Helper";
import BaseAvatar from "./BaseAvatar";

const AvatarWithAuth = ({user, size, name, imageUrl, imageRefreshKey,  setImageRefreshKey, ...props}) => {
  const [imageBlobUrl, setImageBlobUrl] = useState(null);

  useEffect(() => {
    if (user) {
      (async () => {
    //   const refreshedUrl = `${imageUrl}?t=${imageRefreshKey}`;
      const blobUrl = await loadProfileImage(imageUrl, imageRefreshKey);
        setImageBlobUrl(blobUrl);
      })();
    }
  }, [user, imageUrl, imageRefreshKey]);
  

  return (
    <BaseAvatar
      size={size}
      name={name}
      imageUrl={imageBlobUrl}
    />
  );
};

export default AvatarWithAuth;
