import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import React, { useContext, useEffect, useRef, useState } from "react";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
import AddProduct from "./AddProduct";
import ProductGrid from "./ProductGrid";
import { Product_URL } from "@utils/Config/URLs";
import { PanelServices } from '@utils/services/PanelServices';
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";

const Product = ({ loading, setLoading, showSnackBar, setImageRefreshKey, isMobile, imageRefreshKey }) => {

    const { lang } = useContext(LanguageContext);
    let entity = "product";

    const [searchParam, setSearchParam] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = searchParam || queryParams.get('query');
    
    const [action, setAction] = useState("create");
    const [openAdd, setOpenAdd] = useState(false);
    
    // ✅ REF 1: For Grid Methods (Refresh, Search)
    const productGridRef = useRef(null);
    
    // ✅ REF 2: For Logic Data (Stores 'row' and 'type' for the Confirm Box)
    const pendingActionRef = useRef({ type: "", payload: null });

    const [selectedItem, setSelectedItem] = useState();
    const { updateEntity } = PanelServices(); 

    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState(""); // ✅ Added for dynamic messages
    const [alertMsg, setAlertMsg] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [children, setChildren] = useState([]);
    
    // ✅ Filter State
    const [statuses, setStatuses] = useState(["ACTIVE, INACTIVE"]);
    const [active, setActive] = useState("");

    const clickAddProduct = () => setOpenAdd(true);

    const resetData = () => {
        setSelectedItem(null);
        setAction("create");
        // Clear the logic ref
        pendingActionRef.current = { type: "", payload: null };
    };

    const clickRefresh = () => {
        if (productGridRef.current) {
            productGridRef.current.refresh();
        }
    };

    const clickView = (row) => {
        setSelectedItem(row);
        setAction("view");
        setOpenAdd(true);
      };
    
    const clickEdit = (row) => {
        if (row?.status === "ACTIVE") {
            setChildren([
                Literal[lang].activeCantAction.replace("{entity}", Literal[lang][entity]).replace("{action}", Literal[lang].edited),
                Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.title).replace("{entity}", Literal[lang][entity]));
            setOpenAlert(true);
        } else {
            setSelectedItem(row);
            setOpenAdd(true);
            setAction("edit");
        }
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
                Literal[lang].activeCantAction.replace("{entity}", Literal[lang][entity]).replace("{action}", Literal[lang].deleted),
                Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.title).replace("{entity}", Literal[lang][entity]));
            setOpenAlert(true);
        } else {
            pendingActionRef.current = { type: "DELETE", payload: row };
            setConfirmMsg(Literal[lang].deleteMsg.replace("{0}", row?.title).replace("{1}", Literal[lang][entity]));
            setConfirmBoxOpen(true);
        }
    };

    const clickDiscontinued = async (row) => {
        pendingActionRef.current = { type: "DISCONTINUE", payload: row };
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.title).replace("{1}", Literal[lang][entity]).replace("{2}", Literal[lang].setAsDiscontinued));
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
            url = Product_URL + "/delete";
        } 
        else if (type === "DISCONTINUE") {
            url = Product_URL + "/update";
            requestPayload['status'] = "DISCONTINUED";
        }
        else if (type === "ACTIVE") {
            // Logic for reactivating from Grid
            url = Product_URL + "/update";
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
        if (productGridRef.current) {
            productGridRef.current.handleQueryParamChange(value);
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
            handleClick={clickAddProduct}
            addMsg={Literal[lang].add + " " + Literal[lang].product}
            handleRefresh={clickRefresh}
            entity={entity}
            active={active}
            handleHome={handleHome}
            handleDiscontinued={handleDiscontinued}
            clickSearch={clickSearch}
            initialQuery={initialQuery}
        />
    );

    return (
        <div className="panel-main">
            <StickyHeader content={content} />
            <ProductGrid
                ref={productGridRef}           // 1. Grid Logic Ref
                actionRef={pendingActionRef}    // 2. Action Data Ref
                
                showSnackBar={showSnackBar}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
                initialQuery={initialQuery}
                location={location}
                statuses={statuses}
                clickCopy={clickCopy}
                clickView={clickView}
                clickDiscontinued={clickDiscontinued}
                setConfirmBoxOpen={setConfirmBoxOpen}
                setConfirmMsg={setConfirmMsg}
            />
            <AddProduct
                dialogOpen={openAdd}
                setDialogOpen={setOpenAdd}
                isMobile={isMobile}
                loading={loading}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                setImageRefreshKey={setImageRefreshKey}
                refresh={clickRefresh}
                productToEdit={selectedItem}
                setProductToEdit={setSelectedItem}
                resetData={resetData}
                action={action}
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

export default Product;