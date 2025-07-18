import fallbackImg from "@assets/NoImage.png";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { URL_CONFIG, SizeChart_URL } from "@utils/Config/URLs";
import { fetchImage } from "@utils/helper/Helper";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import React, { useContext, useEffect, useState } from "react";

const imageCache = new Map();

const CheckoutItemTile = ({ item }) => {
  const { lang } = useContext(LanguageContext);
  const [imageUrl, setImageUrl] = useState(fallbackImg);
  const [sizeChart, setSizeChart] = useState([]);
  const {getEntities} = WebsiteServices();

  useEffect(() => {
    const loadImage = async () => {
      if (item.productImageUrl) {
        if (imageCache.has(item.productImageUrl)) {
          setImageUrl(imageCache.get(item.productImageUrl));
        } else {
          try {
            const fullUrl = `${URL_CONFIG.API_URL}/${item.productImageUrl}`;
            const blob = await fetchImage(fullUrl);
            if (blob) {
              imageCache.set(item.productImageUrl, blob);
              setImageUrl(blob);
            }
          } catch {
            setImageUrl(fallbackImg);
          }
        }
      }
    };
    const loadSizeChart = async () => {
        if(item?.sizeChartId){
            const res = await getEntities(`${SizeChart_URL}/get/${item?.sizeChartId}`)
            setSizeChart(res);
        }
    };
    loadImage();
    loadSizeChart();
  }, [item]);

  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: "16px" }}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
            <Box
                sx={{
                    flexShrink: 0,
                    cursor: "pointer",
                    width: { xs: "100%", sm: 160 },
                    aspectRatio: "2 / 3",
                    overflow: "hidden",
                    borderTopLeftRadius: "16px",
                    borderBottomLeftRadius: { sm: "16px", xs: 0 },
                }}
            >
                <img
                    src={imageUrl}
                    alt={item.productTitle}
                    style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    }}
                />
            </Box>


            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">
                        {item.productTitle}
                    </Typography>

                    <div style={{display: 'flex', flexDirection: 'row', mt: 0.5}}>
                        <Typography variant="body2" color="text.secondary">
                            {Literal[lang].sku}:
                        </Typography>
                        <Typography variant="body2" sx={{ml:'6px'}}>
                            {item?.sku}
                        </Typography>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', mt: 0.5}}>
                        <Typography variant="body2" color="text.secondary">
                            {Literal[lang].inventoryType}:
                        </Typography>
                        <Typography variant="body2" sx={{ml:'6px'}}>
                            {item.inventoryType.toLowerCase() === "sale"
                            ? Literal[lang].purchase
                            : Literal[lang].rent}
                        </Typography>
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'row', mt: 0.5}}>
                        <Typography variant="body2" color="text.secondary">
                            {Literal[lang].size}:
                        </Typography>
                        <Typography variant="body2" sx={{ml:'6px'}}>
                            {sizeChart?.size + (sizeChart?.userId!=1? " (Custom)":"") || "N/A"}
                        </Typography>
                    </div>

                </CardContent>
                <Divider sx={{ my: 1 }} />
                <Stack style={{flexDirection:"row", gap: 2, padding:'16px', justifyContent:'space-evenly', alignItems:'center', textAlign:'center', flexWrap: 'wrap'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="body2" color="text.secondary">
                            {Literal[lang].quantity}:
                        </Typography>
                        <Typography variant="body1" sx={{ml:'6px'}}>
                            {item.quantity}
                        </Typography>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="body2" color="text.secondary">
                            {Literal[lang].price}:
                        </Typography>
                        <Typography variant="body1" sx={{ml:'6px'}}>
                            ₹{item.price}/-
                        </Typography>
                    </div>
                    {item.inventoryType === "RENTAL" && (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Typography variant="body2" color="text.secondary">
                                {Literal[lang].security}:
                            </Typography>
                            <Typography variant="body1" sx={{ml:'6px'}}>
                                ₹{item.security}/-
                            </Typography>
                        </div>
                    )}
                </Stack>
            </Box>
        </Box>
    </Card>
  );
};

export default CheckoutItemTile;
