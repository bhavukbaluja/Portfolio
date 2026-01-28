import React, { useContext, useRef, useState } from "react";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import BaseStickyHeader from "@ui/components/UI/widgets/BaseStickyHeader";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { PanelServices } from "@utils/services/PanelServices";
import SizeGuideComponent from "./SizeGuideComponent";
import SizeGuideGrid from "./SizeGuideGrid";

const SizeGuideDialog = ({ openSizeGuide, setOpenSizeGuide, isMobile, loading, setLoading, showSnackBar, setIsLoginSignupOpen }) => {
  const { lang } = useContext(LanguageContext);
  const entity = "sizeChart";

  return (
    <BaseDialog
      bodyComponent={
        <SizeGuideComponent
          isMobile={isMobile}
          loading={loading}
          setLoading={setLoading}
          showSnackBar={showSnackBar}
          setIsLoginSignupOpen={setIsLoginSignupOpen}
        />
      }
      PopupClass={true}
      open={openSizeGuide}
      setOpen={setOpenSizeGuide}
      title={Literal[lang].sizeGuide}
    />
  );
};

export default SizeGuideDialog;
