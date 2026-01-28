import React, { useState, useEffect } from "react";
import moment from "moment";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.min.css";
import "./BasicDateRangePicker.scss";

const BasicDateRangePicker = (props) => {
  const [startDate, setStartDate] = useState(props.startDate || new Date());
  const [endDate, setEndDate] = useState(props.endDate || new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    handleDates();
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleDates = () => {
    setStartDate(props.startDate || new Date());
    setEndDate(props.endDate || new Date());

    if (props.startDate && props.endDate) {
      setDate(
        moment(new Date(props.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(new Date(props.endDate)).format("MM/DD/YYYY")
      );
    } else {
      setDate();
    }
  };

  const handleClickOutside = (event) => {
    if (
      props.datePickerRef?.current &&
      !props.datePickerRef?.current.contains(event.target)
    ) {
      if (showPicker) {
        const dates = {
          startDate,
          endDate,
        };

        props.handleSelect(dates);
        setShowPicker(false);
      }
    }
  };
  return (
    <React.Fragment>
      {(props.openByZoom ? !props.openByZoom : true) && (
        <DateRangePicker
          className={`custom-date-range-picker ${props?.className}`}
          size="xs"
          format="MM-dd-yyyy"
          onClose={() => props.onClickOutside(props.data)}
          preventOverflow={true}
          defaultOpen={props?.isOpen}
          onChange={(item) =>
            props.handleSelect(item, props.data, false)
          }
          placeholder="Select Date Range"
          value={
            props.value
              ? props.value
              : props?.data?.defaultDate
              ? props?.data?.defaultDate
              : null
          }
          cleanable={true}
          placement="bottom"
        />
      )}
      {(props.openByZoom ? props.openByZoom : false) && (
        <DateRangePicker
          className={`custom-date-range-picker ${props?.className}`}
          size="xs"
          format="MM-dd-yyyy"
          preventOverflow={true}
          onChange={(item) =>
            props.handleSelect(item, props.data, false)
          }
          placeholder="Select Date Range"
          value={
            props.value
              ? props.value
              : props?.data?.defaultDate
              ? props?.data?.defaultDate
              : null
          }
          cleanable={true}
          placement="bottom"
        />
      )}
    </React.Fragment>
  );
};

export default BasicDateRangePicker;
