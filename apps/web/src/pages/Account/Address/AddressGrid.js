import React from "react";
import BaseGridLayout from "@ui/components/UI/layout/BaseGridLayout";
import AddressTile from "./AddressTile";
// import "./Base.scss";

const AddressGrid = ({ addresses = [], onEdit, onDelete, clickSetPrimary, maxCols = 3, mobileCols = 1 }) => {
  return (
    <BaseGridLayout
      items={addresses}
      maxCols={maxCols}
      mobileCols={mobileCols}
      renderItem={(address, index) => (
        <AddressTile
          key={address.id || index}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetPrimary={clickSetPrimary}
        />
      )}
    />
  );
};

export default AddressGrid;
