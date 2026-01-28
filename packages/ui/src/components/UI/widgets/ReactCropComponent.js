import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import React, { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "@utils/helper/hooks/useDebounceEffect";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { ImageServices } from "@utils/services/ImageServices";
import BaseDialog from "../fields/BaseDialog";
import { canvasPreview } from "./canvasPreview";

/* Aspect Cropper Function */
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100, // Show full image width initially
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ReactCropComponent({
  show = false,
  imgSrc,
  setImgSrc,
  onHandlecropSave,
  setImageRefreshKey,
  aspectRatio,
  setShow,
  setLoading
}) {
  const { postImageforUrl } = ImageServices();
  const { lang } = React.useContext(LanguageContext);
  const previewCanvasRefLg = useRef(null);
  const previewCanvasRefSm = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  let aspect = aspectRatio || 1;

  // Aspect ratio cropping function
  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100, // Show full image width initially
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  // On Image Load handler
  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  // Download cropped image
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRefLg.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    let absoluteCrop = {
      unit: completedCrop.unit,
      x: completedCrop.x * scaleX,
      y: completedCrop.y * scaleY,
      height: completedCrop.height * scaleY,
      width: completedCrop.width * scaleX,
    };

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // Convert to blob and upload
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    setLoading(true);
    blobUrlRef.current = URL.createObjectURL(blob);
    const imageUploadResponse = await postImageforUrl(blobUrlRef.current, blob);
    if (imageUploadResponse.status === 200) {
      await onHandlecropSave(imageUploadResponse.data.imgurl, crop, absoluteCrop);
      setImgSrc(null);
      setShow(false);
      setLoading(false);
    }
  }

  // Use debounced effect to optimize the image preview
  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current) {
        canvasPreview(
          imgRef.current,
          previewCanvasRefLg.current,
          completedCrop,
          scale,
          rotate
        );
        canvasPreview(
          imgRef.current,
          previewCanvasRefSm.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, show, scale, rotate]
  );

  // Close the image modal
  const handleClose = () => {
    setImgSrc(null);
    setShow(false);
  };

  return (
    <BaseDialog
      open={show}
      isAlert={false}
      setOpen={setShow}
      title={Literal[lang].adjustImage}
      bodyComponent={
        <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', gap: 2, width: '100%', height: 'auto', paddingBottom: '10px' }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: `var(--secondarytext-color)`,
              }}
            >
              {Literal[lang].dragSqrToChangeImgSizePos}
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            wrap="nowrap"
            sx={{
              width: "100%",
              maxHeight: "70vh",
              padding: "0px 10px",
              overflow: "auto",
              display: "flex",
              justifyContent: 'center',
              alignItems: 'space-around',
              flexWrap: "nowrap", // extra safety
            }}
          >
            {/* Cropper */}
            <Grid item xs={9}>
              <Box
                sx={{
                  maxHeight: "65vh",
                  overflow: "auto",
                  background: "ghostwhite",
                  borderRadius: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >

              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                style={{ maxHeight: "70vh" }}
                imgStyle={{
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                }}
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  onLoad={onImageLoad}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                  }}
                />
              </ReactCrop>
              </Box>
            </Grid>

            {/* Preview */}
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                maxWidth: "25%", // optional safety net
              }}
            >
              <Typography variant="h6">{Literal[lang].preview}</Typography>
              <canvas
                ref={previewCanvasRefLg}
                style={{
                  width: "100%",
                  // height: "100%",
                  background: "ghostwhite",
                  border: "1px solid #d4d4d4",
                  borderRadius: 4,
                  objectFit: "fit",
                }}
              />
              <canvas
                ref={previewCanvasRefSm}
                style={{
                  width: 80,
                  height: 80,
                  background: "ghostwhite",
                  border: "1px solid #d4d4d4",
                  borderRadius: 4,
                  objectFit: "contain",
                }}
              />
            </Grid>
          </Grid>

        </>
      }
      button={
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, paddingTop: '20px' }}>
          <button type="button"
            className="form-skip-button"
            onClick={handleClose}>
            {Literal[lang].cancel}
          </button>
          <button
            type="submit" 
            className="form-button"
            onClick={onDownloadCropClick}
          >
            {Literal[lang].save}
          </button>
        </Box>
      }
    />
  );
}
