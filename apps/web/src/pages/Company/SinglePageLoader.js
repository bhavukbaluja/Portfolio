import "./AboutUs.scss";
import { Page_URL, URL_CONFIG } from '@utils/Config/URLs';
import { PanelServices } from '@utils/services/PanelServices';
import { Box } from "@mui/material";
import he from "he";
import { RichTextReadOnly } from "mui-tiptap";
import React, { useContext, useEffect, useState } from "react";
import useExtensions from "@ui/components/TipTap/useExtensions";
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';

const SinglePageLoader = ({ page, isMobile, loading, setLoading, entity }) => {
  const [pageData, setPageData] = useState("");
  const { lang } = useContext(LanguageContext);
  const { getGridData } = PanelServices();
  const properties = propertiesData[lang];
  const extensions = useExtensions({
    placeholder: "Loading Content...",
  });

  useEffect(() => {
    const fetchPage = async () => {
      if (!page?.value) {
        // Fallback: show local text if page not found
        if (page?.label?.toLowerCase() === "contactus") {
          setPageData(properties.contactUs);
        }
        return;
      }

      setLoading(true);
      try {
        const res = await getGridData(Page_URL + `/getPageData?id=${page.value}`);
        if (res?.description) {
          const decoded = he
            .decode(res.description)
            .replaceAll("$BASE_URL", URL_CONFIG.API_URL);
          setPageData(decoded);
        } else {
          setPageData(properties.contactUs); // fallback text
        }
      } catch (err) {
        console.error("Failed to fetch page data:", err);
        setPageData(properties.contactUs); // fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (!pageData) return <div>Error loading page</div>;

  return (
    <div className={entity!="contactus" && (isMobile ? "about-us-main-container-mobile" : "about-us-main-container-pc")}>
      <Box mt={3}>
        <RichTextReadOnly content={pageData} extensions={extensions} />
      </Box>
    </div>
  );
};

export default SinglePageLoader;
