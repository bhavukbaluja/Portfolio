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

/**
 * ✅ SinglePageLoader
 * Used for displaying CMS pages such as About Us, Contact Us, Terms, etc.
 * Fetches data from backend using page ID, decodes HTML content, and renders it read-only.
 */
const SinglePageLoader = ({ page, isMobile, loading, setLoading, entity }) => {
  const [pageData, setPageData] = useState("");         // Stores decoded page HTML
  const { lang } = useContext(LanguageContext);         // Current language
  const { getGridData } = PanelServices();              // API service method
  const properties = propertiesData[lang];              // Localized fallback text
  const extensions = useExtensions({ placeholder: "Loading Content..." });

  useEffect(() => {
    const fetchPage = async () => {
      // 🔹 If no valid page ID provided, use fallback
      if (!page?.value) {
        if (page?.label?.toLowerCase() === "contact us") {
          setPageData(properties.contactUs);
        } else {
          setPageData(properties.defaultPageContent || "Page not available");
        }
        return;
      }

      setLoading(true);
      try {
        // 🔹 Fetch page data from backend
        const res = await getGridData(`${Page_URL}/getPageData?id=${page.value}`);

        // The backend returns a PageDTO — ensure we extract and decode the description
        if (res?.description) {
          const decodedContent = he
            .decode(res.description)
            .replaceAll("$BASE_URL", URL_CONFIG.API_URL);
          setPageData(decodedContent);
        } else {
          // Fallback to static content if description missing
          setPageData(properties.defaultPageContent || properties.contactUs);
        }
      } catch (err) {
        console.error("❌ Failed to fetch page data:", err);
        setPageData(properties.defaultPageContent || properties.contactUs);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [page]);

  // 🔹 Loading and error states
  if (loading) return <div className="about-us-loading">Loading...</div>;
  if (!pageData) return <div className="about-us-error">Error loading page</div>;

  return (
    <div
      className={
        entity !== "contactus"
          ? isMobile
            ? "about-us-main-container-mobile"
            : "about-us-main-container-pc"
          : ""
      }
    >
      <Box mt={3}>
        {/* 🔹 Render read-only rich text content */}
        <RichTextReadOnly content={pageData} extensions={extensions} />
      </Box>
    </div>
  );
};

export default SinglePageLoader;
