// eslint-disable-next-line
import * as dataFormat from 'pages/CRUD/Monitoring/table/MonitoringDataFormatters';

import actions from 'actions/monitoring/monitoringListActions';
import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import {uniqueId} from 'lodash';
import { withStyles } from '@mui/styles';
import {makeStyles} from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Link as LinkMaterial} from '../../../../components/Wrappers';
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import Widget from 'components/Widget';
import Actions from '../../../../components/Table/Actions';
import Dialog from "../../../../components/Dialog";

const useStyles = makeStyles({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  actions: {
    display: 'flex',
    justifyContent: 'start',
    marginBottom: 10,
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
  },
  element: {
    marginRight: '1rem',
  }
});

const MonitoringTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const linkCsvDownload = useRef(null);
  const [width, setWidth] = React.useState(window.innerWidth);

  const [filters, setFilters] = React.useState([

  ]);

  const [filterItems, setFilterItems] = React.useState([]);
  const [filterUrl, setFilterUrl] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const count = useSelector((store) => store.monitoring.list.count);
  const modalOpen = useSelector((store) => store.monitoring.list.modalOpen);
  const rows = useSelector((store) => store.monitoring.list.rows);
  const idToDelete = useSelector((store) => store.monitoring.list.idToDelete);

  const [rowsState, setRowsState] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const loadData = async (limit, page, orderBy, request) => {
    setLoading(true);
    await dispatch(actions.doFetch({ limit, page, orderBy, request }));
    setLoading(false);
  }

  React.useEffect(() => {
    loadData(rowsState.pageSize, rowsState.page, sortModel[0], filterUrl);
  }, [sortModel, rowsState]);

  React.useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [])

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth)
  }

  const handleChange = (id) => (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFilterItems(filterItems.map(item =>
      item.id === id ? { id, fields: { ...item.fields, [name]: value }} : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let request = '&';
    filterItems.forEach(item => {
      filters[filters.map(filter => filter.title).indexOf(item.fields.selectedField)].hasOwnProperty('number')
      ? request += `${item.fields.selectedField}Range=${item.fields.filterValueFrom}&${item.fields.selectedField}Range=${item.fields.filterValueTo}&`
      : request += `${item.fields.selectedField}=${item.fields.filterValue}&`
      })

    loadData(rowsState.pageSize, 0, sortModel[0], request);
    setFilterUrl(request);
  };

  const handleReset = () => {
    setFilterItems([])
    setFilterUrl('');
    dispatch(actions.doFetch({limit: rowsState.pageSize, page: 0, request: '' }));
  }

  const getMonitoringCSV = async () => {
    const response = await axios({url: '/monitoring?filetype=csv', method: 'GET',responseType: 'blob'});
    const type = response.headers['content-type']
    const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'monitoringCSV.csv'
    link.click()
  };

  const addFilter = () => {
    let newItem = {
        id: uniqueId(),
        fields: {
          filterValue: "",
          filterValueFrom: "",
          filterValueTo: "",
        }
    }
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem])
  }

  const deleteFilter = (value) => (e) => {
    e.preventDefault();
    const newItems = filterItems.filter((item) => item.id !== value);
    if (newItems.length) {
        setFilterItems(newItems);
    } else {
        dispatch(actions.doFetch({limit: 10, page: 1}));
        setFilterItems(newItems);
    }
  }

  const handleDelete = () => {
    dispatch(actions.doDelete({ limit: 10, page: 0, request: filterUrl }, idToDelete));
  }

  const openModal = (event, cell) => {
    const id = cell;
    event.stopPropagation();
    dispatch(actions.doOpenConfirm(id));
  }

  const closeModal = () => {
    dispatch(actions.doCloseConfirm());
  }

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No results found
      </Stack>
    );
  }

  function humanize(str) {
    return str
        .replace(/^[\s_]+|[\s_]+$/g, '')
        .replace(/[_\s]+/g, ' ')
        .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
  }

  const columns = [

      {
        field: 'id',
        headerName: 'Actions',
        sortable: false,
        flex: 0.6,
        maxWidth: 80,
        renderCell: (params) => <Actions classes={classes} entity="monitoring" openModal={openModal} {...params} />,
      }
  ];

  return (
    <div>
      <Widget title={<h4>{humanize('Monitoring')}</h4>} disableWidgetMenu>
        <Box className={classes.actions}>
          <Link to="/admin/monitoring/new" className={classes.element}>
            <Button variant='contained'>New</Button>
          </Link>
          <Button
            type='button'
            variant="contained"
            className={classes.element}
            onClick={addFilter}
          >
            Add Filter
          </Button>
          <Button type='button' variant='contained' onClick={getMonitoringCSV} className={classes.element}>
            Export CSV
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {filterItems.map((item) => (
            <Grid
              container
              alignItems="center"
              columns={12}
              spacing={1}
              className={classes.container}
            >
              <Grid item xs={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Field</InputLabel>
                  <Select
                    label="Field"
                    name='selectedField'
                    size="small"
                    value={item.fields.selectedField}
                    onChange={handleChange(item.id)}
                  >
                    {filters.map((selectOption) => (
                      <MenuItem
                        key={selectOption.title}
                        value={`${selectOption.title}`}
                      >
                        {selectOption.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {filters.find(filter => filter.title === item.fields.selectedField).hasOwnProperty('number') ? (
                <>
                  <Grid item xs={2}>
                    <TextField
                      label="From"
                      type='text'
                      name='filterValueFrom'
                      size="small"
                      fullWidth
                      onChange={handleChange(item.id)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="To"
                      type='text'
                      name='filterValueTo'
                      size="small"
                      fullWidth
                      onChange={handleChange(item.id)}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={4}>
                  <TextField
                    label="Contained"
                    type='text'
                    name='filterValue'
                    size="small"
                    fullWidth
                    onChange={handleChange(item.id)}
                  />
                </Grid>
              )}

              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={deleteFilter(item.id)}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
          {filterItems.length > 0 && (
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={(e) => handleSubmit(e)}
                >
                  Apply
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleReset}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>

        <div style={{minHeight: 500, width: "100%", paddingTop: 20, paddingBottom: 20}}>
          <DataGrid
            rows={loading ? [] : rows}
            columns={columns}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            pageSize={5}

            pagination
            {...rowsState}
            rowCount={count}
            paginationMode="server"
            components={{ NoRowsOverlay, LoadingOverlay: LinearProgress, }}
            onPageChange={(page) => {
              setRowsState((prev) => ({ ...prev, page }))
            }}
            onPageSizeChange={(pageSize) => {
              setRowsState((prev) => ({ ...prev, pageSize }))
              }
            }

            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}

            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
            loading={loading}
            onRowClick={(e) => {history.push(`/admin/monitoring/${e.id}/edit`)}}
            autoHeight
          />
        </div>

        <div>
          <LinkMaterial
            color={'primary'}
            target={'_blank'}
            href={
              process.env.NODE_ENV === 'production'
                ? window.location.origin + '/api-docs/#/Monitoring'
                : 'http://localhost:8080/api-docs/#/Monitoring'
            }
          >
            API documentation for monitoring
          </LinkMaterial>
        </div>
      </Widget>

      <Dialog
        open={modalOpen}
        title="Confirm delete"
        contentText="Are you sure you want to delete this item?"
        onClose={closeModal}
        onSubmit={handleDelete}
      />
    </div>
  )
}

export default MonitoringTable;
