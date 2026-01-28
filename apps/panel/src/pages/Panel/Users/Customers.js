import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import React, { useContext, useEffect, useRef, useState } from "react";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
import AddUser from "./AddUser";
import UsersGrid from "./UsersGrid";
import { URL_CONFIG, Users_URL } from "@utils/Config/URLs";
import { PanelServices } from '@utils/services/PanelServices';
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";

const Customers = ({ loading, setLoading, showSnackBar, setImageRefreshKey, isMobile, imageRefreshKey }) => {

    const { lang } = useContext(LanguageContext);
    let entity = "customers";

    const [searchParam, setSearchParam] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = searchParam || queryParams.get('query');
    
    const [action, setAction] = useState("create");
    const [openAdd, setOpenAdd] = useState(false);
    
    // ✅ REF 1: For Grid Methods (Refresh, Search)
    const usersGridRef = useRef(null);
    
    // ✅ REF 2: For Logic Data (Stores 'row' and 'type' for the Confirm Box)
    const pendingActionRef = useRef({ type: "", payload: null });

    const [selectedItem, setSelectedItem] = useState();
    const { updateEntity } = PanelServices();
    
    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState(""); // Added state for dynamic msg
    const [openAlert, setOpenAlert] = useState(false);
    const [children, setChildren] = useState([]);
    
    // ✅ New Filters State
    const [statuses, setStatuses] = useState(["ACTIVE, INACTIVE"]);
    const [active, setActive] = useState("");

    const clickAddUser = () => setOpenAdd(true);

    const resetData = () => {
        setSelectedItem(null);
        setAction("create");
        // Clear the logic ref
        pendingActionRef.current = { type: "", payload: null };
    };

    const clickRefresh = () => {
        if (usersGridRef.current) {
            usersGridRef.current.refresh();
        }
    };

    const clickView = (row) => {
        setSelectedItem(row);
        setAction("view");
        setOpenAdd(true);
      };
    
    const clickEdit = (row) => {
        setSelectedItem(row);
        setOpenAdd(true);
        setAction("edit");
    };

    const clickCopy = (row) => {
        setSelectedItem(row);
        setOpenAdd(true);
        setAction("copy");
    };

    // --- Action Handlers ---

    const clickDelete = async (row) => {
        if (row?.status === "ACTIVE") {
            setChildren([
                Literal[lang].activeCantAction.replace("{entity}", Literal[lang].customer).replace("{action}", Literal[lang].deleted),
                Literal[lang].deactivateFirst.replace("{entity}", Literal[lang].customer),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.firstName + " " + row?.lastName).replace("{entity}", Literal[lang].customer));
            setOpenAlert(true);
        } else {
            pendingActionRef.current = { type: "DELETE", payload: row };
            setConfirmMsg(Literal[lang].deleteMsg.replace("{0}", row?.firstName + " " + row?.lastName).replace("{1}", Literal[lang].customer));
            setConfirmBoxOpen(true);
        }
    };

    const clickResetPassword = async (row) => {
        pendingActionRef.current = { type: "RESET_PASSWORD", payload: row };
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.firstName+" "+row?.lastName).replace("{1}", Literal[lang].customer+"'s account").replace("{2}", Literal[lang].resetToDefaultPassword));
        setConfirmBoxOpen(true);
    };

    const clickDiscontinued = async (row) => {
        pendingActionRef.current = { type: "DISCONTINUE", payload: row };
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.firstName+" "+row?.lastName).replace("{1}", Literal[lang].customer+"'s account").replace("{2}", Literal[lang].setAsDiscontinued));
        setConfirmBoxOpen(true);
    };

    const closeConfirmBox = () => {
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
            url = URL_CONFIG.ADMIN_URL + "/user/delete";
        } 
        else if (type === "RESET_PASSWORD") {
            url = Users_URL + "/deletePassword"; 
        } 
        else if (type === "DISCONTINUE") {
            url = Users_URL + "/updateStatus";
            requestPayload['status'] = "DISCONTINUED";
        }
        else if (type === "ACTIVE") {
            url = Users_URL + "/updateStatus";
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

    const clickSearch = (value) => {
        updateQueryParam("query", value);
        setSearchParam(value);
        if (usersGridRef.current) {
            usersGridRef.current.handleQueryParamChange(value);
        }
    };

    // --- Filter Handlers ---
    const handleHome = () => {
        let activeEntity = "home";
        setActive(activeEntity);
        setStatuses(["ACTIVE, INACTIVE"]);
    }

    const handleDiscontinued = () => {
        let activeEntity = "discontinued";
        setActive(activeEntity);
        setStatuses(["DISCONTINUED"]);
    }

    useEffect(() => {
        handleHome();
    }, []);

    const content = (
        <BaseAddButton
            handleClick={clickAddUser}
            addMsg={Literal[lang].add + " " + Literal[lang].customer}
            handleRefresh={clickRefresh}
            entity={entity}
            active={active}
            handleDiscontinued={handleDiscontinued}
            handleHome={handleHome}
            clickSearch={clickSearch}
            initialQuery={initialQuery}
        />
    );

    return (
        <div className="panel-main">
            <StickyHeader content={content} />
            <UsersGrid
                ref={usersGridRef}           // 1. Grid Logic Ref
                actionRef={pendingActionRef}  // 2. Action Data Ref
                
                showSnackBar={showSnackBar}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
                initialQuery={initialQuery}
                location={location}
                imageRefreshKey={imageRefreshKey}
                setImageRefreshKey={setImageRefreshKey}
                team={false} // ✅ This is Customers, so team is false
                statuses={statuses}
                clickCopy={clickCopy}
                clickView={clickView}
                clickResetPassword={clickResetPassword}
                clickDiscontinued={clickDiscontinued}
                setConfirmBoxOpen={setConfirmBoxOpen}
                setConfirmMsg={setConfirmMsg}
            />
            <AddUser
                dialogOpen={openAdd}
                setDialogOpen={setOpenAdd}
                isMobile={isMobile}
                loading={loading}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                setImageRefreshKey={setImageRefreshKey}
                refresh={clickRefresh}
                userToEdit={selectedItem}
                setUserToEdit={setSelectedItem}
                resetData={resetData}
                action={action}
                team={false}
                entity={entity}
                imageRefreshKey={imageRefreshKey}
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
    );
};

export default Customers;