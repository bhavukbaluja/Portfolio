import React, { useContext } from "react";
import ContactDetailsTile from "@ui/components/UI/widgets/ContactDetailsTile";
import Instagram from "@assets/Instagram.png";
import Facebook from "@assets/Facebook.svg";
import YouTube from "@assets/YouTube.svg";
import XLogo from "@assets/X.jpg";
import ThreadsLogo from "@assets/Threads.jpg";
import {
  Instagram_URL,
  Facebook_URL,
  Youtube_URL,
  X_URL,
  Threads_URL,
} from "@utils/Config/URLs";
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from "@ui/literals/LanguageProvider";

const SocialMediaLinks = ({ isMobile }) => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];

  return (
    <div
      className="footer-contact-details-vertical-contents"
      style={{
        alignItems: isMobile ? "center" : "flex-start",
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "10px" : "8px",
      }}
    >
      {/* Instagram */}
      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={Instagram}
        title={"instagram"}
        body={["instagram"]}
        url={Instagram_URL}
      />

      {/* Facebook */}
      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={Facebook}
        title={"facebook"}
        body={["facebook"]}
        url={Facebook_URL}
      />

      {/* YouTube */}
      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={YouTube}
        title={"youtube"}
        body={["youtube"]}
        url={Youtube_URL}
      />

      {/* X (formerly Twitter) */}
      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={XLogo}
        title={"x"}
        body={["x"]}
        url={X_URL}
      />

      {/* Threads */}
      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={ThreadsLogo}
        title={"threads"}
        body={["threads"]}
        url={Threads_URL}
      />
    </div>
  );
};

export default SocialMediaLinks;
