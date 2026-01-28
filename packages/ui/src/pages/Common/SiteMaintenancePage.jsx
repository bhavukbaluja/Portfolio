import React, { useContext, useState } from "react";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import MaintenancePCImage from "@assets/MaintenancePCImage.png";
import MaintenanceMobileImage from "@assets/MaintenanceMobileImage.png";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import SafeImage from "@utils/helper/SafeImage";
import BrandLogo from "@ui/components/BrandLogo/BrandLogo.js";
import FloatingButtons from "@ui/components/FloatingButtons.js";
import ContactUsDialog from "../Company/ContactUsDialog";

const SiteMaintenancePage = ({isMobile}) =>{

    const NavigateTo = useNavigateTo();
    const { lang } = useContext(LanguageContext);
    const [open, setOpen] = useState(false);

    return(
        <div style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px'}}>
            <BrandLogo entity="maintenance" isMobile={isMobile}/>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <SafeImage src={isMobile? MaintenanceMobileImage : MaintenancePCImage} style={{width: 'auto', minWidth: '100vw', height: '67vh'}}/>
              {/* <p>{Literal[lang].siteUnderMaintenance}</p>
              <p>{Literal[lang].weWillGetbackShortly}</p> */}
          </div>
          <div style={{display: 'flex', flexDirection: isMobile? 'column': 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '40px', gap: '20px'}}>
              <button 
                  type="button" 
                  className="form-button"
                  onClick={()=>window.location.reload() }
              >
                  {Literal[lang].reload}
              </button>
              <button 
                  type="button" 
                  className="form-skip-button"
                  onClick={()=>setOpen(true) }
              >
                  {Literal[lang].contactUs}
              </button>
          </div>
      <FloatingButtons/>
      <ContactUsDialog open={open} setOpen={setOpen} isMobile={isMobile}/>
        </div>
    );
}
export default SiteMaintenancePage;
  