import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import { toTitleCase } from "@utils/helper/Helper";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import { Product_URL } from "@utils/Config/URLs";
import propertiesData from "@utils/Config/Properties.json";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

const BreadCrumb = ({ setLoading }) => {
  const { lang } = useContext(LanguageContext);
  const { getEntities } = WebsiteServices();
  const location = useLocation();
  const pathnames = (location.pathname || "").split("/").filter(Boolean);
  const [dynamicNames, setDynamicNames] = useState({});
  const properties = propertiesData[lang];

  // 👇 fallback route display names
  const breadcrumbNames = {
    about_us: "About Us",
    wishlist: "Wishlist",
    orders: "Your Orders",
    "orders/details": "Order Details", // compound path example
    products: "Products",
    contact_us: "Contact Us",
    login_signup: "Log In/Sign Up",
    addresses: "Your Addresses",
  };

  // 🔧 helper: format snake_case / camelCase → readable
  const formatName = (str) =>
    toTitleCase(
      str
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
    );

  // Fetch dynamic product titles
  useEffect(() => {
    const fetchTitles = async () => {
      let newNames = {};
      for (let i = 0; i < pathnames.length; i++) {
        const current = pathnames[i];
        if (current === "product" && i + 1 < pathnames.length) {
          const id = pathnames[i + 1];
          setLoading(true);
          try {
            const res = await getEntities(`${Product_URL}/${id}?lang=${lang}`, {});
            if (res?.title) {
              newNames[id] = res.title;
            }
          } catch (err) {
            console.error(err);
          }
          setLoading(false);
        }
      }
      setDynamicNames(newNames);
    };

    fetchTitles();
  }, [location.pathname, lang]);

  // 🔑 Update document.title
  useEffect(() => {
    if (pathnames.length === 0) {
      document.title = `${Literal[lang]?.home } | ${properties.BrandName}`;
      return;
    }

    const fullPath = pathnames.join("/");
    let pageTitle;

    // 1️⃣ Check Literal for full path (like "orders/details")
    if (Literal[lang]?.[fullPath]) {
      pageTitle = Literal[lang][fullPath];
    } else if (breadcrumbNames[fullPath]) {
      pageTitle = breadcrumbNames[fullPath];
    } else {
      const lastSegment = pathnames[pathnames.length - 1];
      const isNumber = !isNaN(Number(lastSegment));

      if (isNumber) {
        pageTitle = dynamicNames[lastSegment];
      } else {
        pageTitle =
          Literal[lang]?.[lastSegment] ||
          breadcrumbNames[lastSegment] ||
          formatName(lastSegment);
      }
    }

    if (pageTitle) {
      document.title = `${pageTitle} | ${properties.BrandName}`;
    }
  }, [pathnames, dynamicNames, lang]);

  return (
    <>
      {pathnames.length !== 0 && (
        <div className="breadcrumb-main-container">
          <ul className="breadcrumb">
            <li>
              <Link to="/">{Literal[lang]?.home}</Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isNumber = !isNaN(Number(name));

              if (isNumber) {
                const title = dynamicNames[name];
                if (!title) return null;
                return (
                  <li key={index}>
                    <Link to={routeTo}>{title}</Link>
                  </li>
                );
              }

              const formattedName =
                Literal[lang]?.[name] ||
                breadcrumbNames[name] ||
                formatName(name);

              return (
                <li key={index}>
                  <Link to={routeTo}>{formattedName}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default BreadCrumb;
