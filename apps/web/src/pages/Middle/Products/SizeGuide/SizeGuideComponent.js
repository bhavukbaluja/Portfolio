import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import BaseStickyHeader from "@ui/components/UI/widgets/BaseStickyHeader";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { PanelServices } from "@utils/services/PanelServices";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddSize from "./AddSize";
import SizeGuideGrid from "./SizeGuideGrid";
import "./Panel.scss";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';

const SizeGuideComponent = ({ isMobile, loading, setLoading, showSnackBar, openAddSize, displayComp=true, refresh, setIsLoginSignupOpen}) => {
  
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const entity = "sizeChart";
  const [action, setAction] = useState("create");
  const [openAdd, setOpenAdd] = useState(false);
  const sizeChartGridRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState();
  const { setSubcategories } = PanelServices();
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    setOpenAdd(openAddSize);
  }, [openAddSize]);
  
  const clickAddSizeChart = () => {
    setOpenAdd(true);
    setAction("create");
    setSelectedItem(null);
  };

  const resetData = () => {
    setSelectedItem(null);
    setAction("create");
  };

  const clickRefresh = () => {
    if (sizeChartGridRef.current) {
      sizeChartGridRef.current.refresh();
    }
    if(refresh){
      refresh();
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
      setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.size).replace("{entity}", Literal[lang][entity]));
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
      setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.size).replace("{entity}", Literal[lang][entity]));
      setOpenAlert(true);
    } else {
      setConfirmBoxOpen(true);
      setSelectedItem(row);
    }
  };

  return (
    <>
    {displayComp && (
      <div className="panel-main">
        <BaseStickyHeader
          content={(
              <BaseAddButton
                handleClick={()=>{user? clickAddSizeChart(): setIsLoginSignupOpen(true)}}
                addMsg={`${Literal[lang].add} ${Literal[lang].customSize}`}
                handleRefresh={clickRefresh}
                entity={entity}
                initialQuery={""}
                isMobile={isMobile}
              />
          )}
        />

        <div className={`size-chart-main-wrapper ${isMobile ? "mobile" : "desktop"}`}>
          <div className="size-chart-wrapper">
            <SizeGuideGrid
              ref={sizeChartGridRef}
              clickEdit={clickEdit}
              clickDelete={clickDelete}
              clickCopy={clickCopy}
              clickView={clickView}
              isMobile={isMobile}
            />
          </div>
          <div className="size-chart-image-wrapper">abc</div>
        </div>
      </div>
    )}
      <AddSize
        key={`${action}-${selectedItem?.id ?? "new"}`}  // 👈 this ensures a unique key for each context
        dialogOpen={openAdd}
        setDialogOpen={setOpenAdd}
        isMobile={isMobile}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        refresh={clickRefresh}
        sizeChartToEdit={selectedItem}
        setSizeChartToEdit={setSelectedItem}
        resetData={resetData}
        action={action}
        entity={entity}
      />
    </>
  );
};

export default SizeGuideComponent;
