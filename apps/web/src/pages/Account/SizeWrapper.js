import React from "react";
import SizeGuideComponent from "../Middle/Products/SizeGuide/SizeGuideComponent";
const SizeWrapper = ({isMobile, loading, setLoading, showSnackBar})=>{
    return(
        <div style={{padding: '0px 20px 20px 20px', overflow: 'auto'}}>
            <SizeGuideComponent
              isMobile={isMobile}
              loading={loading}
              setLoading={setLoading}
              showSnackBar={showSnackBar}
            />
        </div>
    )
}
export default SizeWrapper;