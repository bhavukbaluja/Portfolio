import styled from '@emotion/styled';
import {
  DataGrid,
  gridClasses
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import theme from '@utils/Config/Theme';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BasePopover from './BasePopover';
import ChildFriendlyOutlinedIcon from '@mui/icons-material/ChildFriendlyOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import Literal from '@ui/literals';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import SyncLockOutlinedIcon from '@mui/icons-material/SyncLockOutlined';

export default function BaseList(props) {
  const { lang } = useContext(LanguageContext);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [popoverRow, setPopoverRow] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});
  const [tableColumns, setTableColumns] = useState([]);
  const [rowCountState, setRowCountState] = useState(
    props?.data?.totalRowsCount || 0,
  );

  const contructTableColumns = (data) => {
    if (Array.isArray(props?.columns)) {
      let tempTableCols = [...props.columns];

      if (props?.actions?.show) {
        if (tempTableCols[tempTableCols?.length - 1]?.field !== "actions") {
          const actionCol = {
            field: 'actions',
            headerName: Literal[lang].actions,
            width: 80,
            sortable: false,
            renderCell: (params) => {
              const { id, row } = params;
              return (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}>
                  <IconButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setAnchorPosition({
                        left: e.clientX,
                        top: e.clientY,
                      });
                      setPopoverRow({ id, row });
                    }}
                  >
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </div>
              );
            }
          };
          tempTableCols.push(actionCol);
        }
      }

      setTableColumns(tempTableCols);
    }
  };

  useEffect(() => {
    contructTableColumns(props?.data || []);
    setRowCountState((prevRowCountState) =>
      props?.data?.totalRowsCount !== undefined
        ? props?.data?.totalRowsCount
        : prevRowCountState,
    );
  }, [props?.data, props?.data?.totalRowsCount, props?.columns, lang]);

  const handlePaginationModelChange = (pageSizeObj) => {
    props.handlePaginationModel(pageSizeObj);
  };

  const handleSortModelChange = (sortingObj) => {
    props.handleSortingModel(sortingObj);
  };

  const StripedDataGrid = styled(DataGrid)(({ theme1 }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "var(--color-gray-100)",
      '&:hover, &.Mui-hovered': {
        backgroundColor: "var(--color-gray-300)",
      },
      '&.Mui-selected': {
        backgroundColor: "var(--color-gray-500)",
      },
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: "var(--color-gray-50)",
      '&:hover, &.Mui-hovered': {
        backgroundColor: "var(--color-gray-200)",
      },
      '&.Mui-selected': {
        backgroundColor: "var(--color-gray-500)",
      },
    }
  }));

  const handleClosePopover = (e) => {
    if (e) e.preventDefault();
    setAnchorPosition(null);
    setPopoverRow(null);
  };

  return (
    <>
      <StripedDataGrid
        sx={{
          flex: 1,
          width: '100%',
          height: props?.gridHeight,
          minHeight: props?.gridHeight,
          '.MuiDataGrid-columnHeader': {
            backgroundColor: "var(--color-gray-0)",
          }
        }}
        hideFooter={props?.hideFooter}
        sortingOrder={['asc', 'desc']}
        hideFooterSelectedRowCount
        className='data-grid'
        rowHeight={props?.rowHeight || 'auto'}
        rows={props?.data?.items || []}
        loading={props.loading}
        columns={tableColumns}
        showColumnVerticalBorder
        initialState={{
          pagination: {
            paginationModel: props.paginationModel,
          }
        }}
        paginationModel={props.paginationModel}
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
        rowCount={rowCountState}
        paginationMode='server'
        onPaginationModelChange={handlePaginationModelChange}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        disableRowSelectionOnClick
        columnVisibilityModel={props.columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          props?.handleColumnVisibilityModel(newModel)
        }
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />

      {popoverRow && (
        <BasePopover
          id={popoverRow.id}
          disablePortal={true}
          anchorPosition={anchorPosition}
          setAnchorPosition={setAnchorPosition}
          isMobile={props?.isMobile}
          onClose={handleClosePopover}
        >
          <List>
            <ListItem
              button
              onClick={(e) => {
                handleClosePopover(e);
                props?.clickView?.(popoverRow.row);
              }}
            >
              <ListItemIcon>
                <FullscreenOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="View" className='account-options-list' />
            </ListItem>

            <ListItem
              button
              onClick={(e) => {
                handleClosePopover(e);
                props?.clickEdit?.(popoverRow.row);
              }}
            >
              <ListItemIcon>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" className='account-options-list' />
            </ListItem>

            <ListItem
              button
              onClick={(e) => {
                handleClosePopover(e);
                props?.clickCopy?.(popoverRow.row);
              }}
            >
              <ListItemIcon>
                <ContentCopyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Copy" className='account-options-list' />
            </ListItem>

            <ListItem
              button
              onClick={(e) => {
                handleClosePopover(e);
                props?.clickDelete?.(popoverRow.row);
              }}
            >
              <ListItemIcon>
                <DeleteOutlineOutlinedIcon
                  sx={{ color: theme.colors.danger }}
                  className='navbar-icon-fav'
                />
              </ListItemIcon>
              <ListItemText
                primary="Delete"
                className='account-options-list'
                sx={{ color: `${theme.colors.danger} !important` }}
              />
            </ListItem>

            {props?.entity === "category" && (
              <ListItem
                button
                onClick={(e) => {
                  handleClosePopover(e);
                  props?.clickChildren?.(popoverRow.row);
                }}
              >
                <ListItemIcon>
                  <ChildFriendlyOutlinedIcon className='navbar-icon-fav' />
                </ListItemIcon>
                <ListItemText primary="View Children" className='account-options-list' />
              </ListItem>
            )}

            {(props?.entity === "users") && (
              <ListItem
                button
                onClick={(e) => {
                  handleClosePopover(e);
                  props?.clickResetPassword?.(popoverRow.row);
                }}
              >
                <ListItemIcon>
                  <SyncLockOutlinedIcon className='navbar-icon-fav' />
                </ListItemIcon>
                <ListItemText primary={Literal[lang].resetToDefaultPassword} className='account-options-list' sx={{ color: `${theme.colors.danger} !important` }}/>
              </ListItem>
            )}

            {(props?.entity === "users" || props?.entity==="category" || props?.entity==="product") && popoverRow.row.status !== "DISCONTINUED" &&(
              <ListItem
                button
                onClick={(e) => {
                  handleClosePopover(e);
                  props?.clickDiscontinued?.(popoverRow.row);
                }}
              >
                <ListItemIcon>
                  <PersonOffOutlinedIcon className='navbar-icon-fav' />
                </ListItemIcon>
                <ListItemText primary={Literal[lang].setAsDiscontinued} className='account-options-list' sx={{ color: `${theme.colors.danger} !important` }}/>
              </ListItem>
            )}

          </List>
        </BasePopover>
      )}
    </>
  );
}
