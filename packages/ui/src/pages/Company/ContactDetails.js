import React, { useContext } from "react";
import ContactDetailsTile from "@ui/components/UI/widgets/ContactDetailsTile";
import GoogleMaps from "@assets/Google_Maps.png";
import WhatsApp from "@assets/WhatsApp.svg";
import Phone from "@assets/Phone.jpeg";
import Mail from "@assets/Mail.svg";
import WorkingSchedule from "@assets/WorkingSchedule.svg";
import PlaceRoundedIcon from "@mui/icons-material/PlaceOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import propertiesData from "@utils/Config/Properties.json";
import { WhatsApp_URL, GoogleMaps_URL, } from "@utils/Config/URLs"; 
import { LanguageContext } from "@ui/literals/LanguageProvider";

const ContactDetails = ({ isMobile }) => {

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
      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={GoogleMaps}
        icon={<PlaceRoundedIcon />}
        title={"address"}
        body={["address1", "address2"]}
        url={GoogleMaps_URL}
      />

      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={Phone}
        icon={<HeadsetMicOutlinedIcon />}
        title={"contactUs"}
        body={["contactNo"]}
        url={"tel:"+properties.contactNo}
      />

      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={WhatsApp}
        icon={<WhatsAppIcon />}
        title={"whatsAppUs"}
        body={["whatsAppNo"]}
        url={WhatsApp_URL}
      />

      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={Mail}
        icon={<EmailOutlinedIcon />}
        title={"email"}
        body={["email"]}
        url={"mailto:"+properties.email}
      />

      <ContactDetailsTile
        isMobile={isMobile}
        imageUrl={WorkingSchedule}
        icon={<QueryBuilderRoundedIcon />}
        title={"workingHours"}
        body={["workingHours1", "workingHours2"]}
        url={GoogleMaps_URL}
      />
    </div>
  );
};

export default ContactDetails;
