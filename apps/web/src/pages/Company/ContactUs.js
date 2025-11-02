import React, { useContext, useEffect, useState } from "react";
import ContactUsDetails from "@ui/pages/Company/ContactUsDetails";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import BrandLogo from '@ui/components/BrandLogo/BrandLogo';
import propertiesData from "@utils/Config/Properties.json";
import SinglePageLoader from "./SinglePageLoader.js";
import { convertEntities } from '@utils/helper/Helper';
import { PanelServices } from '@utils/services/PanelServices';
import { Page_URL } from '@utils/Config/URLs';

const ContactUs=({isMobile, loading, setLoading})=>{

    const { lang } = useContext(LanguageContext);
    const properties = propertiesData[lang];
    const [page, setPage] = useState({"name": "contact us"});
    const { getGridData } = PanelServices();

    useEffect(() => {
        const fetchActivePages = async () => {
            setLoading(true);
            try {
            const res = await getGridData(Page_URL + "/allActive");
            const result = convertEntities(res?.data, "", "ACTIVE", "");

            // ✅ Filter for page where name is "contactUs" (case-insensitive)
            const contactUsPage = result?.find(
                (page) => page?.name?.toLowerCase() === "contact us"
              );
              setPage(contactUsPage || null);
              
            } catch (err) {
            console.error("Failed to load pages", err);
            } finally {
            setLoading(false);
            }
        };

        fetchActivePages();
    }, []);

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding:'30px',
            alignItems: 'center'
        }}>
                <Typography variant="h4" gutterBottom >{Literal[lang].contactUs}</Typography>
        <Box style={{ justifyContent: isMobile ? "center" : "space-between", width: '100%', display: 'flex', flexDirection: isMobile? 'column':'row', alignItems: 'stretch', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: '10px' }}>
                <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1 }}>
                    <BrandLogo fontSize="80px" entity="footer"/>
                    <div>{properties.brandTagLine}</div>
                    {page ? (
                        <SinglePageLoader
                            page={page}
                            isMobile={isMobile}
                            setLoading={setLoading}
                            loading={loading}
                            entity="contactus"
                        />
                        ) : (
                        <div>{properties.contactUs}</div>
                        )
                    }

                </div>
                <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1 }}>
                    <ContactUsDetails isMobile={isMobile}/>
                </div>
        </Box>
        </div>
    )
}
export default ContactUs;