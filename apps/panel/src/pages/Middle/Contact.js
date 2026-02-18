import React, { useContext, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ContactDetailsTile from "@ui/components/UI/widgets/ContactDetailsTile";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import propertiesData from "@utils/Config/Properties.json";
import { WhatsApp_URL , URL_CONFIG} from "@utils/Config/URLs";

// Icons
import PlaceRoundedIcon from "@mui/icons-material/PlaceOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import "@ui/pages/Account/Account.scss";

const Contact = ({ isMobile }) => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Anti-spam & Status State
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Spam Trap Check
    if (honeypot) {
      console.warn("Spam detected.");
      return; 
    }

    // 2. Set Loading State
    setStatus({ loading: true, message: Literal[lang].sendingMessage, type: 'info' });

    try {
      // 3. Send to Cloudflare Worker
      const response = await fetch(URL_CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot, userName: properties?.user?.firstName, userEmail: properties?.user?.email})
      });

      if (response.ok) {
        setStatus({ loading: false, message: Literal[lang].messageSent, type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 5000);
      } else {
        setStatus({ loading: false, message: Literal[lang].messageFailed, type: 'error' });
      }
    } catch (error) {
      console.error("Email error:", error);
      setStatus({ loading: false, message: Literal[lang].networkError, type: 'error' });
    }
  };

  return (
    <section id="contact">
      {/* Section Title */}
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].contact}</span>
        <p>{Literal[lang].contactDesc}</p>
      </div>

      <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px'}} data-aos="fade-up" data-aos-delay="50">          
          
          {/* Left Column: Contact Info Tiles */}
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 2, padding: '20px', borderRadius: '10px', border: '1px solid var(--color-gray-300)', boxShadow: '0 5px 20px var(--color-gray-400)'}}>
            <ContactDetailsTile
              isMobile={isMobile}
              icon={<PlaceRoundedIcon />}
              title={"address"}
              body={properties?.user?.city}
            />
            <ContactDetailsTile
              isMobile={isMobile}
              icon={<HeadsetMicOutlinedIcon />}
              title={"contactUs"}
              body={properties?.user?.mobile}
              url={"tel:" + properties?.user?.mobile}
            />
            <ContactDetailsTile
              isMobile={isMobile}
              icon={<WhatsAppIcon />}
              title={"whatsAppUs"}
              body={properties?.user?.mobile}
              url={WhatsApp_URL}
            />
            <ContactDetailsTile
              isMobile={isMobile}
              icon={<EmailOutlinedIcon />}
              title={"email"}
              body={properties?.user?.email}
              url={"mailto:" + properties?.user?.email}
            />
          </Box>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200" style={{ flex: 4 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", width: '100%', gap: 2, padding: '20px', borderRadius: '10px', border: '1px solid var(--color-gray-300)', boxShadow: '0 5px 20px var(--color-gray-400)' }}>                
                
                {/* Name */}
                <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                  <BaseTextField2
                    label={Literal[lang].yourName}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeHolderText={Literal[lang].yourName}
                    required={true}
                    type="text"
                    sx={{ width: '100%' }}
                  />
                </Box>

                {/* Email */}
                <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                  <BaseTextField2
                    label={Literal[lang].yourEmail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeHolderText={Literal[lang].yourEmail}
                    required={true}
                    type="email"
                    sx={{ width: '100%' }}
                  />
                </Box>

                {/* Subject */}
                <Box sx={{ flex: 1, minWidth: "100%"}}>
                  <BaseTextField2
                    label={Literal[lang].subject}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeHolderText={Literal[lang].subject}
                    required={true}
                    type="text"
                    sx={{ width: '100%' }}
                  />
                </Box>

                {/* Message (Multiline) */}
                <Box sx={{ flex: 1, minWidth: "100%"}}>
                  <BaseTextField2
                    label={Literal[lang].message}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeHolderText={Literal[lang].message}
                    required={true}
                    multiline={true}
                    rows={8}
                    sx={{ width: '100%' }}
                  />
                </Box>

                {/* Hidden Honeypot Field for Spam Bots */}
                <input 
                  type="text" 
                  name="honeypot" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  style={{ display: 'none' }} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />

                {/* Status Message Display */}
                {status.message && (
                  <Typography 
                    sx={{ 
                      width: '100%', 
                      textAlign: 'center', 
                      color: status.type === 'error' ? 'red' : status.type === 'success' ? 'green' : 'var(--primarytext-color)',
                      fontWeight: 500,
                      mt: 1 
                    }}
                  >
                    {status.message}
                  </Typography>
                )}

                {/* Submit Button */}
                <button type="submit" className="form-button" disabled={status.loading} style={{ opacity: status.loading ? 0.7 : 1 }}>
                  {status.loading ? Literal[lang].sending : Literal[lang].sendMessage}
                </button>
            </Box>
          </form>

      </div>
    </section>
  );
};

export default Contact;