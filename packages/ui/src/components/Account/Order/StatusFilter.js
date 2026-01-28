import React, { useContext } from "react";
import { Box, Chip, Tooltip } from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

const StatusFilter = ({
  statuses,              // now array
  selectedStatuses,
  setSelectedStatuses,
  onSectionSelect
}) => {
  const { lang } = useContext(LanguageContext);

  const handleToggle = (statusKey) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusKey)
        ? prev.filter((s) => s !== statusKey)
        : [...prev, statusKey]
    );
  };

  const allSelected = statuses.every((status) =>
    selectedStatuses.includes(status)
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {/* Select/Deselect all button for the section */}
      <button
        size="small"
        className="small-button"
        onClick={() => onSectionSelect(!allSelected)}
      >
        {allSelected ? "Deselect All" : "Select All"}
      </button>

      {/* Individual status chips */}
      {statuses.map((status) => (
        <Tooltip
          key={status}
          title={Literal[lang].statusMessages.forOrder.forManager[status.toLowerCase()]}
        >
          <Chip
            label={status.replace(/_/g, " ")}
            onClick={() => handleToggle(status)}
            sx={{
              backgroundColor: selectedStatuses.includes(status)
                // ? Literal[lang].statusColors[status.toLowerCase()]
                ? `var(--color-gray-400)`
                : "var(--chip-bg, #f0f0f0)",
              color: selectedStatuses.includes(status)
                ? "#fff"
                : "#000",
              cursor: "pointer",
              border: "1px solid"
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
};

export default StatusFilter;
