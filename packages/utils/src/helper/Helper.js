import Cookies from "universal-cookie";
import PropertiesData from "../Config/Properties.json";
import { getAuthToken } from "./ApiConfig/API_Helper";
import { refreshAccessToken } from "./ApiConfig/AuthService";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useContext } from "react";
import LocalDateTimeComponent from "@ui/components/UI/widgets/LocalDateTimeComponent";
import { Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Tooltip, Typography, colors } from "@mui/material";
import BaseSwitch from "@ui/components/UI/widgets/BaseSwitch";
import BasePopover from "@ui/components/UI/widgets/BasePopover";
import Literal from '@ui/literals';
import { LanguageContext } from "@ui/literals/LanguageProvider";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import theme from "@utils/Config/Theme";
import { PanelServices } from "@utils/services/PanelServices";
import { Category_URL, Product_URL } from "@utils/Config/URLs";
import { ArrowBackIosNew, ArrowForwardIos, Inventory} from '@mui/icons-material';
import { styled } from "@mui/system";
 
export const isEmpty = (value) => {
    return (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0)
    );
  };
  export const getServerTimeZone = () => {
    var serverConfig = getReduxState("runtime").serverConfigureProperties;
    if (serverConfig && serverConfig.hasOwnProperty("timeZone")) {
      return serverConfig.timeZone;
    }
  };
  export const getGUITimeFormat = () => {
    // var serverConfig = getReduxState("runtime").serverConfigureProperties;
    // if (serverConfig && serverConfig.hasOwnProperty("guiTimeFormat")) {
    //   return serverConfig.guiTimeFormat ;
    // }
    return 12;
  };

  export const removeLoginDetailCookies = () => {
    const cookies = new Cookies();
    cookies.remove(window.uiTokenName, { path: "/" });
    cookies.remove("saml-user-attributes", { path: "/" });
    cookies.remove("seis", { path: "/" });
    cookies.remove("JSESSIONID", { path: "/" });
  };

  export const isString = (payload) => {
    return typeof payload === "string";
  };

  export const updateBrandName = (str, lang) => {
    const properties = PropertiesData[lang];
    if (typeof str === "string") {
    return str.replaceAll("${BrandName}",properties.BrandName);
    }
  }

  export const toTitleCase=(str)=> {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const validateField = (name, value) => {
  
  let error = "";
  // Skip validation for boolean fields
  if (typeof value === "boolean") return "";

  // Now safely trim strings
  if (typeof value === "string" && !value.trim()) {
      error = "This field is required.";
  } 
  else {
    switch (name) {
      case "otp":
        if (value.length != 6) error = `${name.toUpperCase()} must be 6 digits`;
        break;
      case "fullName":
      case "firstName":
        if (value.length < 3) error = `${"fullname"?"Name":name} must be at least 3 characters.`;
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email address.";
        break;
      case "mobile":
        // Accepts optional '+' at the beginning, followed by 7 to 15 digits
        if (!/^\+?\d{9,18}$/.test(value)) {
          error = "Invalid mobile number (must be 7–15 digits, optionally starting with '+').";
        }        
        break;
      default:
        break;
    }
  }
  return error;
};

export const encodeEmailOrMobile = (mobileOrEmail) => {
  if (!mobileOrEmail) return "";

  if (/^\d+$/.test(mobileOrEmail)) {
    // It's a mobile number (digits only)
    const length = mobileOrEmail.length;

    if (length <= 4) {
      return "*".repeat(length); // Fully hide short numbers
    } else if (length <= 6) {
      return `${mobileOrEmail.slice(0, 1)}${"*".repeat(length - 2)}`;
    } else {
      const hiddenPart = "*".repeat(length - 4);
      return `${mobileOrEmail.slice(0, 1)}${hiddenPart}${mobileOrEmail.slice(-2)}`;
    }
  } else {
    // It's an email
    const [username, domain] = mobileOrEmail.split("@");
    
    if (username.length <= 2) {
      return `${username[0]}${"*".repeat(username.length - 1)}@${domain}`;
    }

    const hiddenPart = "*".repeat(username.length - 3); // Hide middle part
    return `${username.slice(0, 2)}${hiddenPart}${username.slice(-1)}@${domain}`;
  }
};

export const decodeUnicode=(jsonString)=> {
  try {
    // decode both \uXXXX characters and escaped HTML characters
    return JSON.parse(`"${jsonString.replace(/"/g, '\\"')}"`);
  } catch (err) {
    console.error("Invalid unicode string", err);
    return jsonString;
  }
}

export const fetchImage = async (imageUrl) => {
  try {
    const token = getAuthToken();
    const response = await fetch(imageUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-App-Client": getAppName() // 👈 always include app name
      },
    });
    if(response?.status == 401){
      refreshAccessToken();
    }

    if (!response.ok) throw new Error("Image fetch failed");

    const blob = await response.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    return imageObjectURL;
  } catch (error) {
    console.error("Failed to fetch image:", error);
  }
};

export const loadProfileImage = async (imageUrl, imageRefreshKey) => {
  // 1. Safety Check: If no URL is provided, return null immediately
  if (!imageUrl) return null;

  // 2. Create a Unique Key: Includes the URL to distinguish between User A and User B
  // We use `encodeURIComponent` to make the URL safe for use as a key string
  const key = `img_${encodeURIComponent(imageUrl)}_${imageRefreshKey}`;
  
  // 3. Check Session Storage
  const cached = sessionStorage.getItem(key);
  if (cached && cached !== "undefined") {
    return cached;
  } 
  
  // 4. Fetch Fresh Data if Cache Miss
  else {
    // Append timestamp/key to the actual HTTP request to bypass browser's internal network cache
    const refreshedUrl = `${imageUrl}?t=${imageRefreshKey}`;
    const blobUrl = await fetchImage(refreshedUrl);

    if (blobUrl) {
      try {
        sessionStorage.setItem(key, blobUrl);
      } catch (e) {
        // ⚠️ Handle QuotaExceededError: SessionStorage is limited (~5MB).
        // If it's full, we just return the image without caching it to prevent app crash.
        console.warn("SessionStorage full, skipping cache for:", imageUrl);
      }
      return blobUrl;
    } else {
      // Cleanup: If fetch failed, ensure we don't leave bad flags in cache
      sessionStorage.removeItem(key); 
      return null;
    }
  }
};

dayjs.extend(customParseFormat);

export const convertDate = (date) => {
  const parsedDate = dayjs(date, "DD/MM/YYYY");
  if (!parsedDate.isValid()) {
    console.error("Invalid date format. Expected DD/MM/YYYY");
  }
  return parsedDate.format("YYYY-MM-DD");
};

export const convertDateBack = (date) => {
  const parsedDate = dayjs(date, "YYYY-MM-DD");
  if (!parsedDate.isValid()) {
    console.error("Invalid date format. Expected YYYY-MM-DD");
  }
  return parsedDate.format("DD/MM/YYYY");
};

export const paginationData = (type) => {
  return {
    page: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 15, 20, 25, 50, 100],
  };
};
export const homePagePaginationData = (type) => {
  return {
    page: 0,
    pageSize: 5,
  };
};
export const actionColumn = (actionText) => {
  return { show: true, text: actionText };
};

export const getColumnData = (row, value) => {
  let val = value;
  return (
    <Tooltip title={isString(val) && val.length > 10 ? val : ""}>
      <Typography
        sx={{ textOverflow: "ellipsis" }}
        className="custom-span-cellContent"
      >
        {val}
      </Typography>
    </Tooltip>
  );
};

export const getModifiedDateValue = (row) => {
  let value =
    row?.original?.lastModifiedDate + " " + row?.original?.lastModifiedTime;
  return (
    <CustomTooltip title={value}>
      <span className="custom-span-cellContent">{value}</span>
    </CustomTooltip>
  );
};
export const navigateOnQuickSearch = (navigate, path, value) => {
  navigate({
    pathname: path,
    search: "?query=" + value,
  });
};

export const getStatus = (params) => {
  return (
    <span style={{ color: params.value === 'Active' ? 'green' : 'gray' }}>
      {params.value}
    </span>
  );
};

export const getEllipsisSx = (width) => {
  return {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: `${width + 10}px`,
  };
};
export const getLocalDateTime = (
  timestamp,
  showToday = true,
  Literal = { today: "Today" },
  dateformat = "MMM dd yyyy"
) => {
  if (isEmpty(timestamp)) return "";

  const parsedTimestamp =
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;

  // Convert timestamp to a localized Date object
  const zonedDate = utcToZonedTime(
    new Date(parsedTimestamp),
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // Get the current year and the timestamp year
  const currentYear = new Date().getFullYear();
  const timestampYear = zonedDate.getFullYear();

  // Adjust date format: Remove year if it matches the current year
  const adjustedDateFormat =
    currentYear === timestampYear ? "MMM dd" : dateformat;

  // Format date accordingly
  const formattedDate =
    showToday && isToday(zonedDate)
      ? Literal.today
      : format(zonedDate, adjustedDateFormat);
  const timeFormat = getGUITimeFormat() === "12" ? "h:mm:ss a" : "HH:mm:ss";
  const formattedTime = format(zonedDate, timeFormat); // Format time

  return `${formattedDate} ${formattedTime}`;
};
export const convertMilisecondsToTimeFormat = (milliseconds) => {
  // Convert to hours, minutes, seconds, and remaining milliseconds
  const hours = Math.floor(milliseconds / 3600000);
  let remainingMs = milliseconds % 3600000;
  const minutes = Math.floor(remainingMs / 60000);
  remainingMs %= 60000;
  const seconds = Math.floor(remainingMs / 1000);
  remainingMs %= 1000;

  // Build the formatted string conditionally
  const timeComponents = [];
  if (hours > 0) {
    timeComponents.push(`${hours} hr`);
  }
  if (minutes > 0 || hours > 0) {
    // Include minutes if hours are present
    timeComponents.push(`${minutes} min`);
  }
  if (seconds > 0 || minutes > 0 || hours > 0) {
    // Include seconds if higher units are present
    timeComponents.push(`${seconds} sec`);
  }
  timeComponents.push(`${remainingMs} ms`);

  return timeComponents.join(" ");
};

export const ShowStartedDate = ({
  dateTime,
  width,
  dateFormat = "MMM dd yyyy",
}) => {
  var localDateTime = (
    <LocalDateTimeComponent
      serverTimestamp={dateTime}
      showDateOnly={true}
      dateFormat={dateFormat}
    />
  );
  if (dateTime) {
    return (
      <>
        {/* <CustomTooltip arror={true} title={localDateTime}> */}
          <span sx={getEllipsisSx(width)}>{localDateTime}</span>
        {/* </CustomTooltip> */}
      </>
    );
  }
};

export const ShowUserId = ({ userId, width }) => {
  if (userId) {
    return (
      <>
        {/* <CustomTooltip arror={true} title={userId}> */}
          <Typography sx={getEllipsisSx(width)}>{userId}</Typography>
        {/* </CustomTooltip> */}
      </>
    );
  }
};
export const convertDateToEpoch = (dateString) => {
  const date = new Date(dateString);
  const epochTimestamp = date.getTime();
  return epochTimestamp;
};

export function highlightSearchMatch(celltext, isSearchActive, searchText) {
  let resultText = celltext;
  if (isSearchActive && searchText) {
    const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearchText})`, "gi");
    resultText = celltext.replace(regex, '<span class="highlight">$1</span>');
  }
  return resultText;
}

export const getManageCommonColumns = (view, Literal) => {
  let commonColumns = [];
  if (!(view.type === "valuemap" || view.type === "ediReport")) {
    // commonColumns.concat(getIdColumnA());
    const accessorKey = nameKeyEntity.includes(view.type)
      ? "name"
      : "entityName";
    commonColumns.push({
      accessorKey: accessorKey,
      header: "Name",
      size: 150,
      enableSorting: true,
      enableColumnFilter: false,
      enableColumnOrdering: true,
      enableColumnActions: true,
      Cell: ({ renderedCellValue, row }) => {
        return view.showNameIcon ? (
          <Stack width={"100%"} direction={"row"} alignItems={"center"} gap={1}>
            <Avatar
              className="grid-item-logo"
              alt={renderedCellValue}
              variant="rounded"
              src={getAppImageListUrl(row.original)}
            >
              <Avatar
                className={`fallback-icon`}
                alt=""
                sx={{ background: "transparent" }}
                variant="rounded"
                src={URL_CONFIG_Apps.IMAGE_URL + "/oauthprofile.png"}
              />
            </Avatar>{" "}
            {getColumnData(row, renderedCellValue)}
          </Stack>
        ) : (
          getColumnData(row, renderedCellValue)
        );
      },
      // renderCell: (params) => getColumnData(params),
      // renderCell: (params) =>  {
      //   var hideType = ["ediReport", "valuemap"];
      //   if (!hideType.includes(view.type)) {
      //     cell.tdCls = "list-action-text-entityName";
      //   }
      //   if (rec.get("servicename") == "PublishedConnectors") {
      //     v = v.substr(0, v.lastIndexOf("_PC"));
      //   }
      //   var column = Ext.get(cell.column.el),
      //     textMetric = new Ext.util.TextMetrics(column);
      //   if (textMetric.getWidth(v) > column.getWidth() - 21) {
      //     cell.tdAttr =
      //       'data-qtip="' +
      //       HelperUtils.wrapText(Ext.String.htmlEncode(v), 40, 2) +
      //       '"';
      //   }
      //   var type = rec.get("type"),
      //     isConnector =
      //       type == "DatabaseDriverInfo" ||
      //       (type == "DatabaseConnectionInfo" &&
      //         !Ext.isEmpty(view.type) &&
      //         view.type != "jdbc") ||
      //       type == "JmsProvider" ||
      //       type == "MLLPConfiguration" ||
      //       type == "OAuthProfile";
      //   return Ext.isEmpty(v)
      //     ? ""
      //     : view.xtype == "accountlist" && !isConnector
      //     ? view.colTpl.apply(rec)
      //     : Ext.util.Format.htmlEncode(v);
      //   return params.value;
      // },
      // listeners: {
      //   scope: view,
      //   click: function (tableview, td, rowIndex, colIndex, e, rec) {
      //     var hideType = ["ediReport", "valuemap", "prebuiltconnector"];
      //     if (!hideType.includes(view.type) && !me.isCopyingText()) {
      //       var configureWrapper =
      //           Ext.ComponentQuery.query("configurewrapper")[0],
      //         configureController = configureWrapper.getController();
      //       rec["viewType"] = view.type;
      //       configureController.onViewMappingObject(rec);
      //     }
      //   },
      // },
    });
    if (
      !(
        view.type == "ftp" ||
        view.type == "http" ||
        view.type == "netsuite" ||
        view.type == "oauth" ||
        view.type == "valuemap" ||
        view.type == "ediReport" ||
        view.type == "jdbc" ||
        view.type == "mail" ||
        view.type == "rest"
      )
    ) {
      commonColumns.push({
        accessorKey: "description",
        header: "Description",
        size: 120,
        enableSorting: true,
        enableColumnFilter: false,
        enableColumnOrdering: true,
        enableColumnActions: true,
        Cell: ({ renderedCellValue, row }) =>
          getColumnData(row, renderedCellValue),
        // sortable: true,
        // renderCell: (params) => getColumnData(params),
        // renderCell: (params) => {
        //   var column = Ext.get(cell.column.el),
        //     textMetric = new Ext.util.TextMetrics(column);
        //   if (textMetric.getWidth(v) > column.getWidth() - 21) {
        //     cell.style = "cursor: pointer;";
        //   }
        //   return Ext.isEmpty(v) ? "" : Ext.util.Format.htmlEncode(v);
        // },
        // listeners: {
        //   click: function (tableview, td, rowIndex, colIndex, e, rec) {
        //     var textMetric = new Ext.util.TextMetrics(Ext.get(e.target)),
        //       column = Ext.get(td);
        //     if (
        //       textMetric.getWidth(rec.get("description")) >
        //       column.getWidth() - 21
        //     ) {
        //       me.showTipCallout(e.target, rec, "description");
        //     }
        //   },
        // }
      });
    }
    // if (!(view.type === "ediReport" || view.type === "project")) {
    //   commonColumns.push({
    //     headerName: "Project",
    //     flex: 0.6,
    //     field: "projectEntityName",
    //     renderCell: (params) => getColumnData(params),
    //     // renderCell: (params) => {
    //     //   HelperUtils.addDataQTip(cell,v);
    //     //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
    //     //   },
    //     sortable: false,
    //   });
    // }
    if (view.type == "wsprovider" || view.type == "wssoapprovider") {
      commonColumns.push({
        headerName: "Type",
        flex: 0.5,
        field: "publishMode",
        renderCell: (params) => getColumnData(params),
        // renderCell: (params) => {
        //   if (!Ext.isEmpty(v)) {
        //     var val =
        //       v == "standalone"
        //         ? Literal.soapProviderAsPF
        //         : Literal.soapProviderAsTemplate;
        //     HelperUtils.addDataQTip(cell, val);
        //     return val;
        //   }
        //   HelperUtils.addDataQTip(cell, Literal.soapProviderAsPF);
        //   return Literal.soapProviderAsPF;
        // },
        sortable: true,
      });
      commonColumns.push({
        text: view.type == "wsprovider" ? "DOCUMENTATION" : "WSDL",
        flex: 1.2,
        // renderCell: (params) => {
        //   if (rec.data.publishType == "rest") {
        //     return view.docTpl.apply(rec.data);
        //   } else {
        //     return view.wsdlTpl.apply(rec.data);
        //   }
        // },
        sortable: false,
      });
    }
    if (view.type == "nonediinbound" || view.type == "nonedioutbound") {
      commonColumns.push(
        {
          headerName: "documentType",
          flex: 0.9,
          field: "documentType",
          sortable: true,
          renderCell: (params) => getColumnData(params),
          // renderCell: (params) => {
          //   HelperUtils.addDataQTip(cell,v);
          //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
          //   },
        },
        {
          headerName: "Data Format",
          flex: 0.8,
          field: "formatType",
          sortable: true,
          renderCell: (params) => getColumnData(params),
          // renderCell: (params) => {
          //   HelperUtils.addDataQTip(cell,v);
          //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
          //   }
        }
      );
    }
    if (
      !(
        view.type == "valuemap" ||
        view.type == "ediReport" ||
        view.type == "project"
      )
    ) {
      let accessorKey =
        view.type == "jwks_service" ? "createdBy" : "userOwnerEntityName";
      if (view.type == "customEntities") {
        accessorKey = "userOwnerName";
      }
      commonColumns.push(
        {
          header: "Owner",
          accessorKey: accessorKey,
          size:
            view.type == "nonediinbound" || view.type == "nonedioutbound"
              ? 150
              : 120,
          enableSorting: false,
          enableColumnFilter: false,
          enableColumnOrdering: true,
          enableColumnActions: true,
          Cell: ({ renderedCellValue, row }) =>
            getColumnData(row, renderedCellValue),
        },
        {
          header: "Modified",
          size: 120,
          accessorKey: "modifiedDate",
          sortable: true,
          enableSorting: true,
          enableColumnFilter: false,
          enableColumnOrdering: true,
          enableColumnActions: true,
          Cell: (params) => getModifiedDateCell(params, Literal),
          // valueGetter: (params) => {
          //   return `${params.row.lastModifiedDate || ''} ${params.row.lastModifiedTime || ''}`;
          // },
          // renderCell: (params) => {
          //   if (
          //     listType == "accountlist" ||
          //     view.type == "eventregistryevents" ||
          //     view.type == "filerefrences" ||
          //     view.type == "contentbasedrouting" ||
          //     view.type == "contextdownload" ||
          //     view.type == "contextupload" ||
          //     view.type == "mailnotification" ||
          //     view.type == "storedprocedure" ||
          //     view.type == "positionaldatadictionary" ||
          //     view.type == "routing" ||
          //     view.type == "sapaccounts"
          //   ) {
          //     cell.tdCls = "no-border-list-active";
          //   }
          //   if (
          //     view.type == "emailnotificationformat" ||
          //     view.type == "jwks_service"
          //   ) {
          //     var displayText =
          //       rec.get("recentActivityNumber") +
          //       " " +
          //       rec.get("recentActivityText");
          //     HelperUtils.addDataQTip(cell, displayText);
          //     return (
          //       "<b>" +
          //       rec.get("recentActivityNumber") +
          //       "</b> " +
          //       rec.get("recentActivityText")
          //     );
          //   } else {
          //     var displayText =
          //       rec.get("lastModifiedDate") + " " + rec.get("lastModifiedTime");
          //     HelperUtils.addDataQTip(cell, displayText);
          //     return Ext.isEmpty(v)
          //       ? ""
          //       : "<b>" +
          //           rec.get("lastModifiedDate") +
          //           "</b> " +
          //           rec.get("lastModifiedTime");
          //   }
          // }
        }
      );
    }
    if (view.type == "valuemap") {
      commonColumns.push({
        headerName: "Scope",
        flex: 0.4,
        field: "accessLevel",
        renderCell: (params) => getColumnData(params),
        // renderCell: (params) => {
        //   HelperUtils.addDataQTip(cell,v);
        //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
        //   }
      });
    }
  }
  return getIdColumnA("", view).concat(commonColumns);
};

export const getModifiedDateCell = (
  params,
  columnName = "lastModifiedDate",
  displayMode = "both" // "date" | "time" | "both"
) => {
  const width = params?.column?.getSize?.();
  const rawDateTime = params?.row?.[columnName];

  if (!rawDateTime) return null;

  const dateObj = new Date(rawDateTime);
  const now = new Date();

  // check if older than 1 year
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" }); // Fri
  const day = dateObj.getDate(); // 20
  const month = dateObj.toLocaleDateString("en-US", { month: "long" }); // April
  const year = dateObj.getFullYear();

  let formattedDate;
  if (dateObj < oneYearAgo) {
    // older than 1 year → include year
    formattedDate = `${weekday}, ${day} ${month} ${year}`;
  } else {
    // within 1 year → no year
    formattedDate = `${weekday}, ${day} ${month}`;
  }

  let formattedValue;
  if (displayMode === "date") {
    formattedValue = formattedDate;
  } else if (displayMode === "time") {
    formattedValue = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    const formattedTime = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    formattedValue = `${formattedDate}, ${formattedTime}`;
  }

  // return (
  //   <Stack
  //     direction="row"
  //     spacing={1}
  //     sx={{
  //       alignItems: "center",
  //       display: "flex",
  //       height: "100%",
  //     }}
  //   >
  //     <Typography sx={{ width }}>{formattedValue}</Typography>
  //   </Stack>
  // );
  return formattedValue;
};


export const getStatusCell = (params, onToggle, columnName="status") => {
  const width = params?.column?.getSize?.();
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center',
        display: 'flex', // this is important
        height: '100%',  // this ensures it stretches full cell height
        justifyContent: 'center'
      }}
    >      
      <BaseSwitch 
        defaultChecked = {params?.row?.[columnName]=='ACTIVE'}
        onToggle= {onToggle}
        switchKey = {params?.row?.id}
        row = {params?.row}
      />
    </Stack>
  );
};

export const convertEntities = (entities, currentEntityId, status, includeInPath) =>{
    let results = [];
    for(let entity of entities){
        if(currentEntityId!=entity?.id){
          if((status!=null && status==entity?.status) || status==null){
            let result = {};
            result["label"] = entity?.name;
            result["value"] = entity?.id;
            result["path"] = (includeInPath || "") + "/"+(entity?.name.toLowerCase()=="contact us"? "contactUs" : entity?.name.toLowerCase()=="about us"? "aboutUs" : entity?.name.toLowerCase().replace(" ","_"));
            results.push(result);
          }
        }
    }
    return results;
}

export const getCommonPopover = ({ 
  id, 
  anchorPosition, 
  setAnchorPosition, 
  isMobile, 
  lang, 
  onClose 
}) => {
  const handleClose = () => {
    setAnchorPosition(null);
    onClose?.();
  };

  return (
    <BasePopover
      id={id}
      anchorPosition={anchorPosition}
      setAnchorPosition={setAnchorPosition}
      isMobile={isMobile}
      onClose={handleClose}
    >
      <Box sx={{ width: 300, p: 2 }} >
        <List>
          <ListItem button onClick={handleClose}>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" className='account-options-list'/>
          </ListItem>
          <ListItem button onClick={handleClose}>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon sx={{ color: theme.colors.danger }} className='navbar-icon-fav' />
            </ListItemIcon>
            <ListItemText primary="Delete" className='account-options-list' sx={{ color: `${theme.colors.danger} !important` }}/>
          </ListItem>
        </List>
      </Box>
    </BasePopover>
  );
};

export const updateQueryParam = (key, value)=> {
  // Get the current URL query parameters
  const params = new URLSearchParams(window.location.search);

  // Set or update the parameter
  params.set(key, value);

  // Update the URL without reloading the page
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

export const getRankOptions = async (parentCategoryId, fetchSubcategories)=>{

  let options = [];
  let response={};

  if(parentCategoryId !=null){
    const jsonData = { 
      parentId: parentCategoryId,
      statuses: "Active,Inactive"
    };
    response = await fetchSubcategories(Category_URL + "/child", jsonData);
  }
  else{
    const jsonData = { 
      statuses: ["Active", "Inactive"] 
    };
    response = await fetchSubcategories(Category_URL + "/allParents", jsonData);
  }
  const items = response?.data || [];

  const currentItem = items.find(item => item.id === parentCategoryId);
  const usedRanks = items?.map(item => item.rank) || [];
  const count = items?.length || 0;
  const currentRank = currentItem?.rank;

  let i=1;
  if (count > 0) {
    for (i = 1; i <= count; i++) {  // +1 to allow a new rank at the end
      if (!usedRanks.includes(i) || i === currentRank) {
        options.push({
          label: i,
          value: i
        });
      }
    }
  }
  // options.push({
  //   "label": i,
  //   "value": i
  // });
  options.push({
    "label": 9999,
    "value": 9999
  });
  return options;
}

export const getRankOptionsByProduct = async (parentCategoryId, fetchSubcategories, productId)=>{

  let options = [];
  if (parentCategoryId != null) {
    const response = await fetchSubcategories(`${Product_URL}/category/${parentCategoryId}`);
    const items = response?.data || [];

    const currentItem = items.find(item => item.id === productId);
    const usedRanks = items?.map(item => item.rank) || [];
    const count = items?.length || 0;
    const currentRank = currentItem?.rank;

    let i=1;
    if (count > 0) {
      for (i = 1; i <= count; i++) {  // +1 to allow a new rank at the end
        if (!usedRanks.includes(i) || i === currentRank) {
          options.push({
            label: i,
            value: i
          });
        }
      }
    }
    options.push({
      "label": i,
      "value": i
    });
    options.push({
      "label": 9999,
      "value": 9999
    });
  }
  console.log(options);
  return options;
}

export function groupTwoArraysBySizes(array1, array2, groupSizes) {
  const grouped = [];
  let index1 = 0;
  let index2 = 0;

  for (let i = 0; i < groupSizes.length; i++) {
      const size = groupSizes[i];

      if (i % 2 === 0) {
          // Take from array1
          if (index1 >= array1.length) {
              continue; // Skip this turn
          }
          const group = array1.slice(index1, index1 + size);
          grouped.push(group);
          index1 += size;
      } else {
          // Take from array2
          if (index2 >= array2.length) {
              continue; // Skip this turn
          }
          const group = array2.slice(index2, index2 + size);
          grouped.push(group);
          index2 += size;
      }

      // Optional: break if both exhausted
      if (index1 >= array1.length && index2 >= array2.length) {
          break;
      }
  }

  return grouped;
}

export const NextArrow = ({ onClick, disabled = false, arrowsInside = true }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    sx={{
      position: arrowsInside ? 'absolute' : 'relative',
      top: arrowsInside ? '50%' : 'auto',
      right: arrowsInside ? 10 : 'auto',
      transform: arrowsInside ? 'translateY(-50%)' : 'none',
      zIndex: 1,
      backgroundColor: `var(--color-gray-300)`,
      color: 'white',
      '&:hover': { backgroundColor: `var(--color-gray-700)` },
      '&:disabled': {
        backgroundColor: `var(--color-gray-200)`,
        cursor: 'none',
        color: "black"
      },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

export const PrevArrow = ({ onClick, disabled = false, arrowsInside = true }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    sx={{
      position: arrowsInside ? 'absolute' : 'relative',
      top: arrowsInside ? '50%' : 'auto',
      left: arrowsInside ? 10 : 'auto',
      transform: arrowsInside ? 'translateY(-50%)' : 'none',
      zIndex: 1,
      backgroundColor: `var(--color-gray-300)`,
      color: 'white',
      '&:hover': { backgroundColor: `var(--color-gray-700)` },
      '&:disabled': {
        backgroundColor: `var(--color-gray-200)`,
        cursor: 'none',
        color: "black"
      },
    }}
  >
    <ArrowBackIosNew/>
  </IconButton>
);


export function getMaxMRP(inventories) {
  const sale = inventories.find((inventory) => inventory?.type === 'SALE');

  if (!sale || !Array.isArray(sale.inventoryVariants)) return null;

  const maxMRPVariant = sale.inventoryVariants.reduce((max, variant) =>
    variant?.mrp > (max?.mrp ?? 0) ? variant : max, null
  );

  return maxMRPVariant ?? null; // ✅ Return only the number
}

export function getMinPrice(inventories) {
  const sale = inventories.find((inventory) => inventory?.type === 'SALE');

  if (!sale || !Array.isArray(sale.inventoryVariants)) return null;

  const minPriceVariant = sale.inventoryVariants.reduce((min, variant) =>
    variant?.salePrice < (min?.salePrice ?? Infinity) ? variant : min, null
  );

  return minPriceVariant ?? null; // ✅ Return only the number
}

export function getMaxAvailableQuantity(inventories) {
  const sale = inventories.find((inventory) => inventory?.type === 'SALE');

  if (!sale || !Array.isArray(sale.inventoryVariants)) return null;

  const availableQuantities = sale.inventoryVariants
    .map(variant => variant?.quantity ?? 0)
    .filter(qty => qty > 0);

  if (availableQuantities.length === 0) return null;

  return Math.max(...availableQuantities); // already returns number ✅
}

export function formatIndianPrice(price, decimalPlaces = 2) {
  if (price === null || price === undefined || isNaN(Number(price))) return "";

  const roundedPrice = Number(price).toFixed(decimalPlaces);

  return Number(roundedPrice).toLocaleString("en-IN", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}


export const shareProduct = ({ title, productId, inventoryType = "SALE", sizeChartId = "default", returnOnlyText = false }) => {
  const url = `${window.location.origin}/product/${productId}?inventoryType=${inventoryType}&sizeId=${sizeChartId}`;
  const shareText = `${title}\n${url}`;

  if (returnOnlyText) {
    return shareText;
  }

  if (navigator.share) {
    navigator.share({
      title,
      text: shareText,
      url,
    });
  } else {
    // fallback
    console.log("Web Share API not supported");
  }
};

// export const shareOnWhatsApp = (params) => {
//   const shareText = shareProduct({ ...params, returnOnlyText: true });
//   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
//   window.open(whatsappUrl, "_blank");
// };

export const shareOnWhatsApp = async ({ title, productId, inventoryType = "SALE", sizeChartId = "default", imageUrl }) => {
  const url = `${window.location.origin}/product/${productId}?inventoryType=${inventoryType}&sizeId=${sizeChartId}`;
  const shareText = `${title}\n${url}`;

  try {
    if (!navigator.canShare || !navigator.canShare({ files: [] })) {
      throw new Error("Sharing files is not supported on this device.");
    }

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "product.jpg", { type: blob.type });

    await navigator.share({
      title,
      text: shareText,
      files: [file],
    });
  } catch (err) {
    console.error("Error sharing product with image:", err);
    alert("Sharing with image is not supported on your device.");
  }
};

export const DefaultBadge = styled("div")({
  backgroundColor: `var(--maindark-color)`,
  color: `var(--light-color)`,
  fontWeight: "400",
  fontSize: "12px",
  padding: "2px 6px",
  borderRadius: "4px",
  position: "absolute",
  top: 12,
  right: 12,
});

export function formatIndianDateTime(dateTimeStr, getTimeToo = true) {
  const date = new Date(dateTimeStr);

  if (isNaN(date)) return 'Invalid Date';

  const dateOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  };

  const timeOptions = getTimeToo
    ? {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }
    : {};

  return new Intl.DateTimeFormat('en-IN', {
    ...dateOptions,
    ...timeOptions
  }).format(date);
}

export function formatPaymentDetails(payment) {
  if (!payment || !payment.method) return 'Payment details unavailable';

  const method = String(payment.method).trim().toUpperCase();
  

  switch (method) {
    case 'CARD':
      if (payment.cardIssuer && payment.cardLast4) {
        return `${payment.cardIssuer} Card  ****${payment.cardLast4}`;
      }
      return 'Card payment';

    case 'UPI':
      if (details.upiId) {
        return `UPI by ${payment.upiId.trim()}`;
      }
      return 'UPI payment';

    case 'WALLET':
      if (payment.wallet) {
        return `${payment.wallet.trim()} Wallet`;
      }
      return 'Wallet payment';

    case 'BANK':
      if (payment.bank) {
        return `Net Banking by ${payment.bank.trim()}`;
      }
      return 'Net Banking payment';

    case 'COD':
      return 'Cash on Delivery';

    default:
      return `${method.charAt(0)}${method.slice(1).toLowerCase()} payment`;
  }
}

export const ORDER_STATUSES = [
  "PENDING",
  "PLACED",
  "CONFIRMED",
  "IN_PROCESS",
  "READY_TO_DISPATCH",
  "SHIPPED",
  "IN_TRANSIT",
  "DELIVERED",
  "PAYMENT_FAILED"
];

export const AFTER_SALE_STATUSES = [
  "CANCELLATION_REQUESTED",
  "CANCELLED",
  "CANCELLATION_REJECTED",
  "CANCELLATION_REFUNDED",
  "RETURN_REQUESTED",
  "RETURNED",
  "RETURN_REJECTED",
  "RETURN_REFUNDED",
  // RTO flow
  "RTO_REQUESTED",
  "RTO_REJECTED",
  "RTO_APPROVED",
  "RTO_IN_PROGRESS",
  "RTO_DELIVERED",
  "RTO_VERIFIED",
  "RTO_REFUNDED"
];

function formatStatus(status) {
  return status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replaceAll("_", " ")
    : "";
}

export function getOrderStatusActions(currentStatus, multiselect = false) {
  const actions = [];
  const destructiveKeywords = ["Cancel", "Reject", "Refund", "Removal", "Deletion"];

  const previousMap = {
    PENDING: "DRAFT",
    PLACED: "PENDING",
    CONFIRMED: "PLACED",
    IN_PROCESS: "CONFIRMED",
    READY_TO_DISPATCH: "IN_PROCESS",
    SHIPPED: "READY_TO_DISPATCH",
    IN_TRANSIT: "SHIPPED",
    DELIVERED: "IN_TRANSIT",

    // Returns
    RETURN_REQUESTED: "DELIVERED",
    RETURN_REJECTED: "RETURN_REQUESTED",
    RETURNED: "RETURN_REQUESTED",

    // Cancellations
    CANCELLATION_REQUESTED: "PLACED",
    CANCELLATION_REJECTED: "CANCELLATION_REQUESTED",
    CANCELLED: "PLACED",

    // RTO flow
    RTO_REQUESTED: "IN_TRANSIT",
    RTO_REJECTED: "RTO_REQUESTED",
    RTO_APPROVED: "RTO_REQUESTED",
    RTO_IN_PROGRESS: "RTO_APPROVED",
    RTO_DELIVERED: "RTO_IN_PROGRESS",
    RTO_VERIFIED: "RTO_DELIVERED",
    RTO_REFUNDED: "RTO_VERIFIED"
  };

  switch (currentStatus) {
    case "DRAFT":
      actions.push({ label: "Move to Pending", nextStatus: "PENDING" });
      break;

    case "PENDING":
    case "PAYMENT_FAILED":
      actions.push({ label: "Move to Placed", nextStatus: "PLACED" });
      break;

    case "PLACED":
      actions.push({ label: "Confirm Order", nextStatus: "CONFIRMED" });
      actions.push({ label: "Cancel Order", nextStatus: "CANCELLED" });
      break;

    case "CONFIRMED":
      actions.push({ label: "Start Processing", nextStatus: "IN_PROCESS" });
      break;

    case "IN_PROCESS":
      actions.push({ label: "Ready to Dispatch", nextStatus: "READY_TO_DISPATCH" });
      break;

    case "READY_TO_DISPATCH":
      actions.push({ label: "Mark as Shipped", nextStatus: "SHIPPED" });
      break;

    case "SHIPPED":
      actions.push({ label: "Mark In Transit", nextStatus: "IN_TRANSIT" });
      break;

    case "IN_TRANSIT":
      actions.push({ label: "Mark as Delivered", nextStatus: "DELIVERED" });
      actions.push({ label: "Start RTO", nextStatus: "RTO_IN_PROGRESS" });
      break;

    case "DELIVERED":
      actions.push({ label: "Request Return", nextStatus: "RETURN_REQUESTED" });
      // RTO entry point from delivered
      actions.push({ label: "Mark RTO Requested", nextStatus: "RTO_REQUESTED" });
      break;

    // Returns
    case "RETURN_REQUESTED":
      actions.push({ label: "Approve Return", nextStatus: "RETURNED" });
      actions.push({ label: "Reject Return", nextStatus: "RETURN_REJECTED" });
      break;

    case "RETURNED":
      actions.push({ label: "Refund for Return", nextStatus: "RETURN_REFUNDED" });
      actions.push({ label: "Cancel Order", nextStatus: "CANCELLED" });
      break;

    case "RETURN_REFUNDED":
      // terminal; no further actions
      break;

    // Cancellations
    case "CANCELLATION_REQUESTED":
      actions.push({ label: "Approve Cancellation", nextStatus: "CANCELLED" });
      actions.push({ label: "Reject Cancellation", nextStatus: "CANCELLATION_REJECTED" });
      break;

    case "CANCELLED":
      actions.push({ label: "Refund for Cancellation", nextStatus: "CANCELLATION_REFUNDED" });
      break;

    case "CANCELLATION_REFUNDED":
      // terminal; no further actions
      break;

    // RTO flow
    case "RTO_REQUESTED":
      actions.push({ label: "Approve RTO", nextStatus: "RTO_APPROVED" });
      actions.push({ label: "Reject RTO", nextStatus: "RTO_REJECTED" });
      break;

    case "RTO_REJECTED":
      actions.push({ label: "Re-request RTO", nextStatus: "RTO_REQUESTED" });
      break;

    case "RTO_APPROVED":
      actions.push({ label: "Start RTO", nextStatus: "RTO_IN_PROGRESS" });
      break;

    case "RTO_IN_PROGRESS":
      actions.push({ label: "Mark RTO Delivered", nextStatus: "RTO_DELIVERED" });
      break;

    case "RTO_DELIVERED":
      actions.push({ label: "Verify RTO", nextStatus: "RTO_VERIFIED" });
      break;

    case "RTO_VERIFIED":
      actions.push({ label: "Refund for RTO", nextStatus: "RTO_REFUNDED" });
      actions.push({ label: "Start Processing Again", nextStatus: "IN_PROCESS" });
      break;

    case "RTO_REFUNDED":
      // terminal; no further actions
      break;

    default:
      actions.push({ label: "No available actions" });
  }

  // Prepend "Move to <Previous>" when available
  if (previousMap[currentStatus]) {
    const prev = previousMap[currentStatus];
    actions.unshift({
      label: `Move to ${formatStatus(prev)}`,
      nextStatus: prev,
    });
  }

  // When multiselect → remove destructive options
  if (multiselect) {
    return actions.filter(
      (a) => !destructiveKeywords.some((word) => a.label.includes(word))
    );
  }

  return actions;
}

export function formatOrderStatus(status, isManager=false, isOrder = true) {
  const { lang } = useContext(LanguageContext);
  return (
    <span style={{ color: Literal[lang].statusColors[status.toLowerCase()] }}>
      {Literal[lang].statusMessages?.[isOrder? "forOrder": "forItem"]?.[isManager ? "forManager" : "forUser"][
        status.toLowerCase()
      ]}
    </span> || (
      <span style={{ color: `var(--secondarytext-color)` }}>Unknown order status</span>
    )
  );
}

export const getAppName = () => {
  const host = window.location.host || window.location.hostname;

  if (host.includes("panel")) return "panel";
  if (host.includes("localhost:3000")) return "panel"; // dev panel
  return "web"; // default
};

export const calculateAge=(dob)=> {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If the birth month hasn't happened yet, OR 
  // if we are in the birth month but the day hasn't happened yet:
  if (
    monthDifference < 0 || 
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // 'en-GB' uses day-month-year order. 
  // We specify 'long' for the month to get the full name (e.g., "May")
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}


// Extended configuration with 12 Unique Colors & Shapes
export const SHAPE_COLOR_CONFIG = {
  cyan: {
    path: "M300,521.0C376.1,517.9,466.1,529.8,510.7,468.0C554.4,407.6,508.0,329.0,491.3,256.3C474.6,184.1,479.9,96.6,416.2,58.6C348.9,18.5,261.9,40.6,193.5,78.9C130.4,114.3,98.3,180.0,76.8,249.0C52.0,328.5,13.7,421.9,66.5,486.2C119.0,550.2,217.3,524.4,300,521.0",
    color: "#0dcaf0"
  },
  orange: {
    path: "M300,582.1C382.5,586.8,450.0,525.3,502.6,461.6C556.6,396.1,615.9,314.3,586.7,234.6C559.0,158.8,455.0,164.0,381.5,130.8C312.2,99.4,249.0,18.7,179.9,50.5C110.5,82.5,119.8,180.8,109.1,256.4C100.1,320.3,92.2,384.1,124.8,439.7C164.8,508.0,221.0,577.5,300,582.1",
    color: "#fd7e14"
  },
  teal: {
    path: "M300,541.5C382.1,545.1,479.9,548.3,526.4,480.5C571.5,414.8,517.5,332.1,496.5,255.1C477.4,185.0,473.6,105.6,413.1,65.2C343.3,18.7,251.2,5.3,175.1,40.6C97.9,76.4,52.0,156.2,36.4,239.8C21.7,319.2,43.8,401.2,96.9,462.0C147.2,519.6,223.6,538.2,300,541.5",
    color: "#20c997"
  },
  red: {
    path: "M300,503.5C374.8,506.7,464.8,527.2,510.5,467.9C555.9,408.9,512.6,327.6,490.2,256.6C471.1,196.0,447.7,138.1,395.2,102.3C329.3,57.4,248.0,8.3,175.9,42.2C103.4,76.3,93.8,171.0,81.3,250.1C70.2,320.3,64.8,396.7,111.3,450.5C156.2,502.5,231.3,500.5,300,503.5",
    color: "#df1529"
  },
  indigo: {
    path: "M300,532.4C369.4,532.3,429.1,491.6,474.5,439.2C522.9,383.3,569.2,314.3,550.7,242.8C532.7,172.6,456.2,142.6,390.4,112.3C326.7,83.1,258.8,53.5,193.3,78.5C121.6,105.8,62.8,167.2,48.6,242.6C34.8,315.4,76.7,383.4,125.2,439.4C170.7,491.8,230.6,532.4,300,532.4",
    color: "#6610f2"
  },
  pink: {
    path: "M300,566.8C385.7,576.2,478.8,552.9,531.9,484.9C584.6,417.6,582.5,322.7,554.0,242.0C529.2,172.0,465.2,127.7,396.0,100.7C334.2,76.7,269.4,84.6,207.2,107.3C132.9,134.3,41.8,160.0,22.6,236.7C3.3,314.1,72.7,379.2,124.0,440.3C172.9,498.5,224.5,558.5,300,566.8",
    color: "#f3268c"
  },
  blue: {
    path: "M300,503.5C374.8,506.7,464.8,527.2,510.5,467.9C555.9,408.9,512.6,327.6,490.2,256.6C471.1,196.0,447.7,138.1,395.2,102.3C329.3,57.4,248.0,8.3,175.9,42.2C103.4,76.3,93.8,171.0,81.3,250.1C70.2,320.3,64.8,396.7,111.3,450.5C156.2,502.5,231.3,500.5,300,503.5",
    color: "#0d6efd"
  },
  green: {
    path: "M300,541.5C382.1,545.1,479.9,548.3,526.4,480.5C571.5,414.8,517.5,332.1,496.5,255.1C477.4,185.0,473.6,105.6,413.1,65.2C343.3,18.7,251.2,5.3,175.1,40.6C97.9,76.4,52.0,156.2,36.4,239.8C21.7,319.2,43.8,401.2,96.9,462.0C147.2,519.6,223.6,538.2,300,541.5",
    color: "#198754"
  },
  yellow: {
    path: "M300,521.0C376.1,517.9,466.1,529.8,510.7,468.0C554.4,407.6,508.0,329.0,491.3,256.3C474.6,184.1,479.9,96.6,416.2,58.6C348.9,18.5,261.9,40.6,193.5,78.9C130.4,114.3,98.3,180.0,76.8,249.0C52.0,328.5,13.7,421.9,66.5,486.2C119.0,550.2,217.3,524.4,300,521.0",
    color: "#ffc107"
  },
  purple: {
    path: "M300,582.1C382.5,586.8,450.0,525.3,502.6,461.6C556.6,396.1,615.9,314.3,586.7,234.6C559.0,158.8,455.0,164.0,381.5,130.8C312.2,99.4,249.0,18.7,179.9,50.5C110.5,82.5,119.8,180.8,109.1,256.4C100.1,320.3,92.2,384.1,124.8,439.7C164.8,508.0,221.0,577.5,300,582.1",
    color: "#6f42c1"
  },
  navy: {
    path: "M300,532.4C369.4,532.3,429.1,491.6,474.5,439.2C522.9,383.3,569.2,314.3,550.7,242.8C532.7,172.6,456.2,142.6,390.4,112.3C326.7,83.1,258.8,53.5,193.3,78.5C121.6,105.8,62.8,167.2,48.6,242.6C34.8,315.4,76.7,383.4,125.2,439.4C170.7,491.8,230.6,532.4,300,532.4",
    color: "#2c3e50"
  },
  lime: {
    path: "M300,566.8C385.7,576.2,478.8,552.9,531.9,484.9C584.6,417.6,582.5,322.7,554.0,242.0C529.2,172.0,465.2,127.7,396.0,100.7C334.2,76.7,269.4,84.6,207.2,107.3C132.9,134.3,41.8,160.0,22.6,236.7C3.3,314.1,72.7,379.2,124.0,440.3C172.9,498.5,224.5,558.5,300,566.8",
    color: "#82c91e"
  }
};



