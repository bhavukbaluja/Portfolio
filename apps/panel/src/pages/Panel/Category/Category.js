import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import React, { useContext, useEffect, useRef, useState } from "react";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
import AddCategory from "./AddCategory";
import CategoryGrid from "./CategoryGrid";
import { Category_URL } from "@utils/Config/URLs";
import { PanelServices } from '@utils/services/PanelServices';
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";

const Category = ({ loading, setLoading, showSnackBar, setImageRefreshKey, isMobile, imageRefreshKey }) => {

    const { lang } = useContext(LanguageContext);
    let entity = "category";

    const [searchParam, setSearchParam] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = searchParam || queryParams.get('query');
    
    const [action, setAction] = useState("create");
    const [openAdd, setOpenAdd] = useState(false);
    
    // ✅ REF 1: For Grid Methods (Refresh, Search)
    const categoryGridRef = useRef(null);
    
    // ✅ REF 2: For Logic Data (Stores 'row' and 'type' for the Confirm Box)
    const pendingActionRef = useRef({ type: "", payload: null });

    const [selectedItem, setSelectedItem] = useState();
    
    // NOTE: Switched to 'updateEntity' for consistency with other files
    const { updateEntity } = PanelServices(); 

    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState(""); // ✅ Added for dynamic messages
    const [child, setChild] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [children, setChildren] = useState([]);
    const [isParents, setIsParents] = useState(true);
    const [statuses, setStatuses] = useState([]);
    const [active, setActive] = useState("");

    const clickAddCategory = () => {
        setOpenAdd(true);
    }

    const resetData = () => {
        setSelectedItem(null);
        setAction("create");
        // Clear the logic ref
        pendingActionRef.current = { type: "", payload: null };
    };

    const clickRefresh = () => {
        if (categoryGridRef.current) {
            categoryGridRef.current.refresh();
        }
    }

    const clickView = (row) => {
        setSelectedItem(row);
        setAction("view");
        setOpenAdd(true);
    };
    
    const clickEdit = (row) =>{
        if(row?.status === "ACTIVE"){
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

    // --- Action Handlers ---

    const clickDelete = async (row) =>{
        if(row?.status === "ACTIVE"){
            setChildren([
                Literal[lang].activeCantAction.replace("{entity}",Literal[lang][entity]).replace("{action}", Literal[lang].deleted),
                Literal[lang].deactivateFirst.replace("{entity}",Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.name).replace("{entity}",Literal[lang][entity]));
            setOpenAlert(true);
        }
        else{
            pendingActionRef.current = { type: "DELETE", payload: row };
            setConfirmMsg(Literal[lang].deleteMsg.replace("{0}", row?.name).replace("{1}", Literal[lang][entity]));
            setConfirmBoxOpen(true);
        }     
    }

    const clickDiscontinued = async (row) => {

        pendingActionRef.current = { type: "DISCONTINUE", payload: row };
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.name).replace("{1}", Literal[lang][entity]).replace("{2}", Literal[lang].setAsDiscontinued));
        setConfirmBoxOpen(true);
    };
    
    const closeConfirmBox = () =>{
        setConfirmBoxOpen(false);
        // Do NOT resetData here.
    };

    // --- Unified Execution Handler ---
    const handleConfirmYes = async () => {
        const { type, payload } = pendingActionRef.current;
        
        if (!type || !payload) {
            setConfirmBoxOpen(false);
            return;
        }

        let url = "";
        let requestPayload = { ...payload };

        if (type === "DELETE") {
            url = Category_URL + "/delete";
        } 
        else if (type === "DISCONTINUE") {
            url = Category_URL + "/update";
            requestPayload['status'] = "DISCONTINUED";
        }
        else if (type === "ACTIVE") {
            // Logic for reactivating from Grid
            url = Category_URL + "/update";
            requestPayload['status'] = "ACTIVE";
        }

        if (url) {
            setLoading(true);
            await updateEntity(url, requestPayload).then((res) => {
                showSnackBar(res?.msg || res);
            }).catch(err => {
                showSnackBar("Action failed", "error");
            });
            setLoading(false);
            
            resetData();
            clickRefresh();
            setConfirmBoxOpen(false);
        }
    };

    const clickChildren = (row)=>{
        setChild(row);
        setIsParents(false);
    }

    const clickAll = () =>{
        setIsParents(false);
        setChild(null);
        setActive("home");
        setStatuses(["ACTIVE, INACTIVE"]);
    }

    const clickParents = () =>{
        setChild(null);
        setIsParents(true);
        setActive("parents");
        setStatuses(["ACTIVE, INACTIVE"]);
    }

    const handleDiscontinued = () =>{

        let entity="discontinued";   
        setActive(entity);     
        setStatuses([entity.toUpperCase()]);    
    }

    const clickSearch=(value) =>{
        updateQueryParam("query", value);
        setSearchParam(value);
        if (categoryGridRef.current) {
            categoryGridRef.current.handleQueryParamChange(value);
        }
    }

    useEffect(()=>{
        clickAll();
    },[]);

    const content = (
        <BaseAddButton 
            addMsg={Literal[lang].add+" "+Literal[lang].category} 
            entity={entity}
            child={child}
            active={active}
            isParents={isParents}
            handleClick={clickAddCategory}
            handleRefresh={clickRefresh}
            handleHome={clickAll}
            clickSearch={clickSearch}
            handleParents={clickParents}
            handleDiscontinued={handleDiscontinued} // Header button
            initialQuery={initialQuery}
        />
    );

    return (
        <div className="panel-main">
            <StickyHeader
                content={content}
            />
            <CategoryGrid 
                ref={categoryGridRef}          // 1. Grid Logic Ref
                actionRef={pendingActionRef}    // 2. Action Data Ref
                
                showSnackBar={showSnackBar} 
                clickEdit={clickEdit} 
                clickDelete={clickDelete}
                clickChildren={clickChildren}
                child={child}
                statuses={statuses}
                initialQuery={initialQuery}
                location={location}
                clickCopy={clickCopy}
                clickView={clickView}
                isParents={isParents}
                clickDiscontinued={clickDiscontinued}
                setConfirmBoxOpen={setConfirmBoxOpen}
                setConfirmMsg={setConfirmMsg}
            />
            <AddCategory
                dialogOpen={openAdd}
                setDialogOpen={setOpenAdd}
                isMobile={isMobile}
                loading={loading}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                imageRefreshKey={imageRefreshKey}
                setImageRefreshKey={setImageRefreshKey}
                refresh={clickRefresh}
                categoryToEdit={selectedItem}
                setCategoryToEdit={setSelectedItem}
                resetData={resetData}
                action={action}
                entity={entity}
            />
            <CustomConfirmBox
                Msg={confirmMsg}
                open={confirmBoxOpen}
                setOpen={closeConfirmBox}
                clickedYes={handleConfirmYes}
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

export default Category;