import { Grid } from "@mui/material";
import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { Page_URL } from "@utils/Config/URLs";
import { updateQueryParam } from "@utils/helper/Helper";
import { PanelServices } from '@utils/services/PanelServices';
import React, { useContext, useRef, useState } from "react";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
import AddPage from "./AddPage";
import PageGrid from "./PageGrid";

/**
 * Pages Component — Admin panel for managing CMS pages
 * Handles listing, adding, editing, viewing, copying, and deleting pages
 */
const Pages = ({ loading, setLoading, showSnackBar, setImageRefreshKey, isMobile, location }) => {

    const { lang } = useContext(LanguageContext);
    const entity = "page";

    // State variables
    const [searchParam, setSearchParam] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = searchParam || queryParams.get('query');

    const [action, setAction] = useState("create");
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [children, setChildren] = useState([]);
    const PageGridRef = useRef(null);

    const { setSubcategories } = PanelServices(); // Used for delete API calls

    /** ✅ Open Add Page dialog */
    const clickAddPage = () => {
        setOpenAdd(true);
    };

    /** ✅ Reset selected data & state */
    const resetData = () => {
        setSelectedItem(null);
        setAction("create");
    };

    /** ✅ Refresh page list via child ref */
    const clickRefresh = () => {
        PageGridRef.current?.refresh();
    };

    /** ✅ Handle viewing an existing page */
    const clickView = (row) => {
        setSelectedItem(row);
        setAction("view");
        setOpenAdd(true);
    };

    /** ✅ Handle editing an existing page */
    const clickEdit = (row) => {
        if (row?.status === "ACTIVE") {
            setChildren([
                Literal[lang].activeCantAction
                    .replace("{entity}", Literal[lang][entity])
                    .replace("{action}", Literal[lang].edited),
                Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive
                .replace("{0}", row?.name)
                .replace("{entity}", Literal[lang][entity]));
            setOpenAlert(true);
        } else {
            setSelectedItem(row);
            setOpenAdd(true);
            setAction("edit");
        }
    };

    /** ✅ Handle copying a page */
    const clickCopy = (row) => {
        setSelectedItem(row);
        setOpenAdd(true);
        setAction("copy");
    };

    /** ✅ Handle delete click (opens confirm box) */
    const clickDelete = async (row) => {
        if (row?.status === "ACTIVE") {
            setChildren([
                Literal[lang].activeCantAction
                    .replace("{entity}", Literal[lang][entity])
                    .replace("{action}", Literal[lang].deleted),
                Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive
                .replace("{0}", row?.name)
                .replace("{entity}", Literal[lang][entity]));
            setOpenAlert(true);
        } else {
            setConfirmBoxOpen(true);
            setSelectedItem(row);
        }
    };

    /** ✅ Confirm delete and refresh list */
    const deletePage = async () => {
        try {
            const res = await setSubcategories(`${Page_URL}/delete`, selectedItem);
            showSnackBar(res?.message || res?.msg || res);
            resetData();
            clickRefresh();
        } catch (err) {
            showSnackBar(err.message || "Error deleting page");
        }
    };

    /** ✅ Close confirm box */
    const closeConfirmBox = () => {
        setConfirmBoxOpen(false);
        resetData();
    };

    /** ✅ Handle search bar changes */
    const clickSearch = (value) => {
        updateQueryParam("query", value);
        setSearchParam(value);
        PageGridRef.current?.handleQueryParamChange(value);
    };

    /** ✅ Header content (with Add, Refresh, Search controls) */
    const content = (
        <BaseAddButton
            handleClick={clickAddPage}
            addMsg={`${Literal[lang].add} ${Literal[lang].page}`}
            handleRefresh={clickRefresh}
            entity={entity}
            clickSearch={clickSearch}
            initialQuery={initialQuery}
        />
    );

    /** ✅ Render component structure */
    return (
        <div className="panel-main">
            {/* Header Bar */}
            <StickyHeader content={content} />

            {/* Data Grid */}
            <PageGrid
                ref={PageGridRef}
                showSnackBar={showSnackBar}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
                clickCopy={clickCopy}
                clickView={clickView}
                initialQuery={initialQuery}
                location={location}
            />

            {/* Add/Edit/View Page Dialog */}
            <AddPage
                dialogOpen={openAdd}
                setDialogOpen={setOpenAdd}
                isMobile={isMobile}
                loading={loading}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                setImageRefreshKey={setImageRefreshKey}
                refresh={clickRefresh}
                pageToEdit={selectedItem}
                setPageToEdit={setSelectedItem}
                resetData={resetData}
                action={action}
                entity={entity}
            />

            {/* Confirm Delete Dialog */}
            <CustomConfirmBox
                Msg={Literal[lang].deleteMsg
                    .replace("{0}", selectedItem?.name)
                    .replace("{1}", Literal[lang][entity])}
                open={confirmBoxOpen}
                setOpen={closeConfirmBox}
                clickedYes={deletePage}
            />

            {/* Alert Box for active items */}
            <CustomAlertBox
                Msg={alertMsg}
                open={openAlert}
                setOpen={setOpenAlert}
                children={children}
            />
        </div>
    );
};

export default Pages;
