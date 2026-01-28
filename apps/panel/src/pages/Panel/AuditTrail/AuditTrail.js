import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import React, { useContext, useRef, useState } from "react";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
// import AddAuditTrail from "./AddAuditTrail";
import AuditTrailGrid from "./AuditTrailGrid";
import { AuditTrail_URL } from "@utils/Config/URLs";
import { PanelServices } from '@utils/services/PanelServices';
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";

const AuditTrail = ({loading, setLoading, showSnackBar, setImageRefreshKey, isMobile, imageRefreshKey}) => {

    const { lang } = useContext(LanguageContext);
    let entity = "auditTrail";

    const [searchParam, setSearchParam] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = searchParam || queryParams.get('query'); // Get the query parameter initially
    
    const [ action, setAction] = useState("create");
    const [openAdd, setOpenAdd] = useState(false);
    const auditTrailGridRef = useRef(null); // 👈 create ref for AuditTrailGrid
    const [selectedItem, setSelectedItem] = useState();
    const { setSubcategories } = PanelServices(); // 👈 Assumes service method for product API
    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
    const [child, setChild] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [children, setChildren] = useState([]);
    const [isParents, setIsParents] = useState(true);

    const clickAddAuditTrail = () => {
        setOpenAdd(true);
    }

    const resetData = () => {
        setSelectedItem(null);
        setAction("create");
    };

    const clickRefresh = () => {
        if (auditTrailGridRef.current) {
            auditTrailGridRef.current.refresh(); // 👈 call refresh from AuditTrailGrid
        }
    }

    const clickView = (row) => {
        setSelectedItem(row);
        setAction("view");
        setOpenAdd(true);
    };
    
    const clickEdit = (row) =>{
        if(row?.status=="ACTIVE"){
            setChildren([
                Literal[lang].activeCantAction.replace("{entity}",Literal[lang][entity]).replace("{action}",Literal[lang].edited),
                Literal[lang].deactivateFirst.replace("{entity}",Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.name).replace("{entity}",Literal[lang][entity]));
            setOpenAlert(true);
        }
        else{
            setSelectedItem(row);
            setOpenAdd(true);
            setAction("edit");
        } 
    }

    const clickCopy = (row) =>{
        setSelectedItem(row);
        setOpenAdd(true);
        setAction("copy");
    }

    const clickDelete = async (row) =>{
        if(row?.status=="ACTIVE"){
            setChildren([
                Literal[lang].activeCantAction.replace("{entity}",Literal[lang][entity]).replace("{action}", Literal[lang].deleted),
                Literal[lang].deactivateFirst.replace("{entity}",Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.name).replace("{entity}",Literal[lang][entity]));
            setOpenAlert(true);
            
        }
        else{
            setConfirmBoxOpen(true);
            setSelectedItem(row); 
        }     
    }
    
    const closeConfirmBox = () =>{
        setConfirmBoxOpen(false);
        resetData();
    }

    const clickChildren = (row)=>{
        setChild(row);
        setIsParents(false);
    }

    const deleteAuditTrail = async () =>{
        await setSubcategories(AuditTrail_URL+"/delete", selectedItem).then((res)=>{
            showSnackBar(res?.message || res);
        });
        resetData();
        clickRefresh();
    }

    const clickAll = () =>{
        setIsParents(false);
        setChild(null);
    }

    const clickParents = () =>{
        setChild(null);
        setIsParents(true);
    }

    const clickSearch=(value) =>{
        updateQueryParam("query", value);
        setSearchParam(value);
        if (auditTrailGridRef.current) {
            auditTrailGridRef.current.handleQueryParamChange(value);
        }
    }

    const content = (
        <BaseAddButton 
            handleClick={clickAddAuditTrail}
            // addMsg={Literal[lang].add+" "+Literal[lang].auditTrail} 
            addMsg={Literal[lang].auditTrail+"s"} 
            handleRefresh={clickRefresh}
            entity={entity}
            handleHome={clickAll}
            clickSearch={clickSearch}
            handleParents={clickParents}
            initialQuery={initialQuery}
        />
    );

    return (
        <div className="panel-main">
            <StickyHeader
                content={content}
            />
            <AuditTrailGrid 
                ref={auditTrailGridRef} 
                showSnackBar={showSnackBar} 
                clickEdit={clickEdit} 
                clickDelete={clickDelete}
                clickChildren={clickChildren}
                child={child}
                initialQuery={initialQuery}
                location={location}
                clickCopy={clickCopy}
                clickView={clickView}
                isParents={isParents}
            />
            {/* <AddAuditTrail
                dialogOpen={openAdd}
                setDialogOpen={setOpenAdd}
                isMobile={isMobile}
                loading={loading}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                imageRefreshKey={imageRefreshKey}
                setImageRefreshKey={setImageRefreshKey}
                refresh={clickRefresh}
                auditTrailToEdit={selectedItem}
                setAuditTrailToEdit={setSelectedItem}
                resetData={resetData}
                action={action}
                entity={entity}
            /> */}
            <CustomConfirmBox
                Msg={Literal[lang].deleteMsg.replace("{0}",selectedItem?.name).replace("{1}",Literal[lang][entity])}
                open={confirmBoxOpen}
                setOpen={closeConfirmBox}
                clickedYes={deleteAuditTrail}
            />

            <CustomAlertBox 
                Msg={alertMsg} 
                open={openAlert} 
                setOpen={setOpenAlert} 
                children={children}
            />    
        </div>
    )
}

export default AuditTrail;
