import React, { useContext, useEffect, useState } from "react";
import { useWishlist } from "@utils/helper/ApiConfig/WishlistContext";
import WishlistGridLayout from "./WishlistGridLayout";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import {isEmpty} from "@utils/helper/Helper";

const imageCache = new Map();

const WishlistPage = ({ isMobile, setLoading, loading, showSnackBar }) => {
    
  const { lang } = useContext(LanguageContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [ removedItem, setRemovedItem ] = useState({});

  const undoRemovalFromWishlist = async () => {
    setLoading(true);
    await addToWishlist(removedItem?.product?.id, removedItem?.sizeChartId, removedItem?.type);
    setRemovedItem(null);
    setLoading(false);
  };
  return (
    <div className={`product-page-main-container ${isMobile ? "mobile" : "desktop"}`} style={{gap: '20px', alignItems:'center', justifyContent:'center', paddingTop: '5px', flexDirection: 'column'}}>
      <h1>{Literal[lang].wishlist}</h1>
      {!isEmpty(removedItem)  && 
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <span
            style={{color: `var(--primarytext-color)`}}
            dangerouslySetInnerHTML={{ __html: Literal[lang].undoWishlistMsg.replace("{name}", removedItem?.product?.title) }}
          />
           <span
              style={{ cursor: "pointer", textDecoration: "underline", color:`var(--maindark-color)` }}
              role="button"
              tabIndex={0}
              onClick={() => undoRemovalFromWishlist()}
              onKeyDown={(e) => e.key === 'Enter' && undoRemovalFromWishlist()}
            >
              {Literal[lang].undo}
            </span>
        </div>
      }
      <WishlistGridLayout
        wishlist={wishlist}
        isMobile={isMobile}
        setLoading={setLoading}
        loading={loading}
        showSnackBar={showSnackBar}
        setRemovedItem={setRemovedItem}
      />
      
    </div>
  );
};

export default WishlistPage;
