import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import React, { useContext, useRef, useState } from "react";
import StickyHeader from "../../../Header/StickyHeader";
import { Product_URL } from "@utils/Config/URLs";
import { PanelServices } from '@utils/services/PanelServices';
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";
import WebTrendingBarGrid from "./WebTrendingBarGrid";
import AddWebTrendingBar from "./AddWebTrendingBar";

const WebTrendingBarWrapper = ({ loading, setLoading, showSnackBar, isMobile }) => {

    const { lang } = useContext(LanguageContext);
    let entity = "webTrendingBar";

    const [searchParam, setSearchParam] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = searchParam || queryParams.get('query');
    
    const [action, setAction] = useState("create");
    const [openAdd, setOpenAdd] = useState(false);
    const webTrendingBarGridRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState();
    const { updateEntity } = PanelServices(); // Ensure `setProduct` exists in PanelServices
    const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [children, setChildren] = useState([]);

    const clickAddProduct = () => setOpenAdd(true);

    const resetData = () => {
        setSelectedItem(null);
        setAction("create");
    };

    const clickRefresh = () => {
        if (webTrendingBarGridRef.current) {
            webTrendingBarGridRef.current.refresh();
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

    const clickDelete = async (row) => {
        if (row?.status === "ACTIVE") {
            setChildren([
                Literal[lang].activeCantAction.replace("{entity}", Literal[lang][entity]).replace("{action}", Literal[lang].deleted),
                Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
            ]);
            setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.title).replace("{entity}", Literal[lang][entity]));
            setOpenAlert(true);
        } else {
            setConfirmBoxOpen(true);
            setSelectedItem(row);
        }
    };

    const closeConfirmBox = () => {
        setConfirmBoxOpen(false);
        resetData();
    };

    const deleteEntity = async () => {
        await updateEntity(Product_URL + "/delete", selectedItem).then((res) => {
            showSnackBar(res?.message || res);
        });
        resetData();
        clickRefresh();
    };

    const clickSearch = (value) => {
        updateQueryParam("query", value);
        setSearchParam(value);
        if (webTrendingBarGridRef.current) {
            webTrendingBarGridRef.current.handleQueryParamChange(value);
        }
    };

    const content = (
        <BaseAddButton
            handleClick={clickAddProduct}
            addMsg={Literal[lang].add + " " + Literal[lang][entity]}
            handleRefresh={clickRefresh}
            entity={entity}
            clickSearch={clickSearch}
            initialQuery={initialQuery}
        />
    );

    return (
        <div className="panel-main">
            <StickyHeader content={content} />
            <WebTrendingBarGrid
                ref={webTrendingBarGridRef}
                showSnackBar={showSnackBar}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
                initialQuery={initialQuery}
                location={location}
                entity={entity}
                clickCopy={clickCopy}
                clickView={clickView}
            />
            <AddWebTrendingBar
                dialogOpen={openAdd}
                setDialogOpen={setOpenAdd}
                isMobile={isMobile}
                loading={loading}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                // setImageRefreshKey={setImageRefreshKey}
                refresh={clickRefresh}
                trendingItemToEdit={selectedItem}
                setTrendingItemToEdit={setSelectedItem}
                resetData={resetData}
                action={action}
                entity={entity}
                // imageRefreshKey={imageRefreshKey}
            />
            <CustomConfirmBox
                Msg={Literal[lang].deleteMsg.replace("{0}", selectedItem?.title).replace("{1}", Literal[lang][entity])}
                open={confirmBoxOpen}
                setOpen={closeConfirmBox}
                clickedYes={deleteEntity}
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

export default WebTrendingBarWrapper;
