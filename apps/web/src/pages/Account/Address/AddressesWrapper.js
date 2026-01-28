import React from "react";
import AddressesComponent from "./AddressesComponent";

const AddressesWrapper = ({isMobile, loading, setLoading, showSnackBar})=>{
    return(
        <div style={{padding: '0px 20px 20px 20px', overflow: 'auto'}}>
            <AddressesComponent
              isMobile={isMobile}
              loading={loading}
              setLoading={setLoading}
              showSnackBar={showSnackBar}
            />
        </div>
    )
}
export default AddressesWrapper;