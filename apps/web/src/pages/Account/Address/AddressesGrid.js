import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PanelServices } from '@utils/services/PanelServices';
import { Address_URL } from '@utils/Config/URLs';
import { paginationData } from '@utils/helper/Helper';
import AddressGrid from './AddressGrid';
import { LanguageContext } from '@ui/literals/LanguageProvider';

const AddressesGrid = forwardRef((props, ref) => {
  const { clickEdit, clickDelete, clickSetPrimary, isMobile } = props;
  const { lang } = useContext(LanguageContext);
  const { getGridData } = PanelServices();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const getUrl = (paginationObj) => {
    let url = `${Address_URL}/user?`;
    return url;
  };

  const getListData = (url) => {
    setLoading(true);
    getGridData(url)
      .then((res) => {
        setAddresses(res?.data || []);
      })
      .finally(() => setLoading(false));
  };

  const onRefreshBtnClick = () => {
    const resetPageModel = { page: 0, pageSize: paginationModel.pageSize };
    setPaginationModel(resetPageModel);
    getListData(getUrl(resetPageModel));
  };

  useImperativeHandle(ref, () => ({
    refresh: () => onRefreshBtnClick()
  }));

  useEffect(() => {
    getListData(getUrl());
  }, []);

  return (
    <Grid container sx={{ width: '100%', paddingY:'20px', alignItems: 'center', justifyContent: 'center'}}>
      {addresses.length>0 ?(
        <Grid item xs={12}>
          <AddressGrid
            addresses={addresses}
            onEdit={clickEdit}
            onDelete={clickDelete}
            clickSetPrimary={clickSetPrimary}
          />
        </Grid>
      ):(
        <Typography variant='body1' style={{padding:'50px'}}>No Address Found</Typography>
      )}

    </Grid>
  );
});

export default AddressesGrid;
