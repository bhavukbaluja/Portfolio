import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import { Divider, Grid, Box, Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import theme from '@utils/Config/Theme';
import propertiesData from "@utils/Config/Properties.json";
import { Facebook_URL, Instagram_URL, Linkedin_URL, Pinterest_URL, X_URL, Youtube_URL, Page_URL } from '@utils/Config/URLs';
import FreeDelivery from "@assets/FreeDelivery.png";
import MasterCardLogo from "@assets/MasterCardLogo.png";
import RupayLogo from "@assets/RupayLogo2.png";
import VisaLogo from "@assets/VisaLogo.png";
import PaytmLogo from "@assets/paytm.png";
import RazorpayLogo from "@assets/razorpay.png";
import BrandLogo from '@ui/components/BrandLogo/BrandLogo';
import dynamic from 'next/dynamic';
import { convertEntities } from '@utils/helper/Helper';
import { PanelServices } from '@utils/services/PanelServices';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import './Footer.scss';
import ContactDetails from "@ui/pages/Company/ContactDetails.js";
import SocialMediaLinks from "@ui/pages/Company/SocialMediaLinks.js";

const FooterList = dynamic(() => import('../footer-list'), { ssr: false });

const Footer = ({ isMobile, setLoading }) => {
    const { getGridData } = PanelServices();
    const { lang } = useContext(LanguageContext);
    const properties = propertiesData[lang];
    const currentYear = new Date().getFullYear();
    const [footerCompanyItems, setFooterCompanyItems] = useState([]);
    const footerMyAccountItems = [
        { label: Literal[lang].wishlist, path: "/wishlist" },
        { label: Literal[lang].shoppingCart, path: "/cart" },
        { label: Literal[lang].orders, path: "/orders" },
        { label: Literal[lang].profile, path: "/profile" },
        { label: Literal[lang].addresses, path: "/addresses" },
        { label: Literal[lang].sizes, path: "/sizes" },
        { label: Literal[lang].logout, path: "/logout" }
    ];

    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            let url = Page_URL + '/allActive';
            getGridData(url)
                .then((res) => {
                    setFooterCompanyItems(convertEntities(res?.data, "", "ACTIVE", ""));
                })
                .catch(() => {})
                .finally(() => setLoading(false));
        };
        loadData();
    }, []);

    return (
        <div className='footer-main-container'>
            <Box style={{ justifyContent: isMobile ? "center" : "space-between", display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div className='footer-contact-details-vertical-contents' style={{ alignItems: isMobile ? "center" : "center", flex: 1, justifyContent: 'flex-start' }}>
                    <div className='logo-tag'>
                        <BrandLogo fontSize="150px" entity="footer" isMobile={isMobile}/>
                        <div>{properties.brandTagLine}</div>
                    </div>
                </div>
                {!isMobile &&
                    [...Array(3)].map((_, index) => (
                        <div key={index} className='footer-contact-details-vertical-contents' style={{ alignItems: isMobile ? "center" : "flex-start", flex: 1, justifyContent: 'flex-start' }}></div>
                    ))
                }
            </Box>

            <Box style={{ justifyContent: isMobile ? "center" : "space-between", display: 'flex', flexDirection: 'row', alignItems: 'stretch', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: '10px' }}>
                
                <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1 }}>
                    <Typography>{Literal[lang].contactUs}</Typography>
                    <ContactDetails isMobile/>
                </div>
                {isMobile && 
                    <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1 }}>
                            <Typography>{Literal[lang].followUs}</Typography>
                            <SocialMediaLinks isMobile/>
                    </div>
                }
                <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1 }}>
                    <FooterList items={footerCompanyItems} title={Literal[lang].company} isMobile={isMobile} />
                </div>

                <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1, justifyContent: 'space-between'}}>
                    <FooterList items={footerMyAccountItems} title={Literal[lang].myAccount} isMobile={isMobile} />
                    <div className='footer-vertical-contents'>
                        <img className='free-delivery' src={FreeDelivery?.src || FreeDelivery} alt={Literal[lang].freeDelivery} />                        
                    </div>
                </div>
                {!isMobile && 
                    <div className='footer-contact-details-vertical-contents' style={{ alignItems: "center", flex: 1 }}>
                            <Typography>{Literal[lang].followUs}</Typography>
                            <SocialMediaLinks isMobile/>
                    </div>
                }
            </Box>

            <Divider variant="middle" sx={{ margin: "10px 0px !important", color: theme.colors.maindark, backgroundColor: theme.colors.maindark }} />

            <Grid container justifyContent={isMobile ? "center" : "space-between"} flexDirection={isMobile? 'column': 'row'} alignItems={'center'}>
                <Grid item xs={4} display="flex" alignItems="center">
                    <div className='footer-vertical-contents'>
                        <div className='footer-text'><CopyrightOutlinedIcon className='copyright-icon' />{currentYear}, {properties.BrandName}</div>
                        <div className='footer-text' style={{ marginLeft: "6px" }}>{Literal[lang].allRightsReserved}</div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    {/* Empty for spacing */}
                </Grid>
                <Grid item xs={4} display="flex" flexDirection="row" gap="10px" alignItems="center">
                    {/* <div className='footer-text'>{Literal[lang].followUs}</div>
                    {[
                        { icon: faInstagram, url: Instagram_URL },
                        { icon: faFacebookF, url: Facebook_URL },
                        { icon: faXTwitter, url: X_URL },
                        { icon: faYoutube, url: Youtube_URL },
                        { icon: faPinterestP, url: Pinterest_URL },
                        { icon: faLinkedinIn, url: Linkedin_URL }
                    ].map((item, idx) => (
                        <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={item.icon} className='social-media-icons' />
                        </a>
                    ))} */}
                    <div className='footer-vertical-contents'>
                        <div className='footer-text'>{Literal[lang].fastAndSecured}</div>
                        <ul className='payment-gateways-list' style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            {[RupayLogo, VisaLogo, MasterCardLogo, RazorpayLogo, PaytmLogo].map((logo, idx) => (
                                <li key={idx} className='item'>
                                    <img className='payment-gateways' src={logo?.src || logo} alt="Payment Logo" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;
