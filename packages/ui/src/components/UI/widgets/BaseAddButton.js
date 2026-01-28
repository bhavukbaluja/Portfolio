import React, { useContext } from "react";
import "./Base.scss";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AnimatedSearchBar from "./AnimatedSearchBar";
import ChaletOutlinedIcon from '@mui/icons-material/ChaletOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { Box, Tooltip } from "@mui/material";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from '@ui/literals';
import {isEmpty} from "@utils/helper/Helper";


const BaseAddButton = ({handleClick, handleRefresh, handleHome, clickSearch, initialQuery, handleParents, handleDiscontinued, addMsg, entity, child, isMobile, active, isParents}) =>{

    const { lang } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);
    isMobile=false;
    return (
        <div className="header-comp" style={{gap: '10px'}}>

        {/* Left Component */}
            <div style={{display: 'flex', gap: '10px', flex: 1.7, flexDirection: 'row', justifyContent: 'flex-start'}}> 
                {(entity !="webSites" && entity != 'auditTrail' && entity != 'quotaUsage')? ((entity != "customSize" && isEmpty(user))? (
                    <Box className="Add-Button" paddingTop='8px' onClick={handleClick}>
                        {isMobile? Literal[lang].loginSignup+" First": Literal[lang].loginToAddCustomSize}
                    </Box>
                ):(
                <button 
                    type="button"
                    className="Add-Button"
                    onClick={handleClick}
                >
                    <AddOutlinedIcon/> {addMsg}
                </button>
                )):(
                    <Box className="Add-Button" paddingTop='8px'>
                        {addMsg}
                    </Box>
                )}

                {(entity == "category" || entity == "customers" || entity=="teamUsers" || entity == "product") && (
                    <>
                        <Tooltip title={Literal[lang].home} arrow>
                            <button 
                                type="button"
                                className={`refresh-Button ${active=="home" ? 'active' : ''}`}
                                onClick={handleHome}
                            >
                                <HomeOutlinedIcon/>
                            </button>
                        </Tooltip>
                    </>
                )}

                {entity == "category" && (
                    <>
                        <Tooltip title={Literal[lang].base+" "+Literal[lang].parent+"s"} arrow>
                        <button 
                            type="button"
                            className={`refresh-Button ${isParents || active=="parents" ? 'active' : ''}`}
                            onClick={handleParents}
                        >
                            <SupervisedUserCircleOutlinedIcon/> {}
                        </button>
                        </Tooltip>
                    </>
                )}
                <Tooltip title={Literal[lang].refresh} arrow>
                    <button 
                        type="button"
                        className="refresh-Button"
                        onClick={handleRefresh}
                    >
                        <RefreshOutlinedIcon/> {}
                    </button>
                </Tooltip>
                {!(entity == "webSites" || entity == "webTrendingBar") && clickSearch && (
                    <AnimatedSearchBar 
                        entity={entity} 
                        expandFrom="left"
                        clickSearch={clickSearch}
                        initialQuery={initialQuery}
                    />
                )}

            </div>

        {/* Center Component */}
            {/* <div style={{display: 'flex', gap: '10px', flex:0.7, justifyContent: 'center'}}>

            </div> */}

        {/* Right Component */}

            <div style={{display: 'flex', gap: '10px', flex:1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                {(entity == "category" || entity == "customers" || entity=="teamUsers" || entity == "product") && (
                    <>
                        <div style={{fontWeight:'300px', fontSize: '20px', color: `var(--headerBg-color)`, border: `1px black`, margin: `0px !important`}}>
                            {child!=null && (
                                <>
                                <div>{Literal[lang].childrenOf}{child?.name}</div>
                                </>
                            )}
                        </div>
                        <Tooltip title={Literal[lang].discontinued} arrow>
                            <button 
                                type="button"
                                className={`refresh-Button ${active=="discontinued" ? 'active' : ''}`}
                                onClick={handleDiscontinued}
                            >
                                {Literal[lang].discontinued} <ArchiveOutlinedIcon/>
                            </button>
                        </Tooltip>
                    </>
                )}
            </div>
        </div>
    )
}
export default BaseAddButton;
