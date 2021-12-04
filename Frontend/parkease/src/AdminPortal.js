import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const theme = createTheme();
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, "firstName") || ""} ${
    //     params.getValue(params.id, "lastName") || ""
    //   }`,
  },
  { field: "Phone", headerName: "Phone", width: 140 },
  {
    field: "Name",
    headerName: "name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.getValue(params.id, "fullName") || ""} `,
  },
];

// { id: 1, fullName: "Bharath Varier", Phone: "9889189991" },
//   { id: 2, fullName: "Adit Danewa", Phone: "9889189991" },

function AdminPortal(props) {
  var rows = [];
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [lop, setLop] = React.useState([]);
  React.useEffect(async () => {
    const result = await axios
      .get("http://localhost:8080/parkeasy/admin/worker/show")
      .then((resp) => {
        console.log(resp.data);
        for (var k = 0; k < resp.data.length; k++) {
          var lst = {
            id: resp.data[k].id,
            fullName: resp.data[k].name,
          };
          rows = Object.assign([], rows);
          rows.push(lst);
        }
        console.log(rows);
        setLop(rows);
      });
    return () => {};
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <h1>{props.location.state.counter}</h1> */}
      <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
        <DataGrid
          rows={lop}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            console.log(newSelection);
            setSelectionModel(newSelection);
          }}
          selectionModel={selectionModel}
        />
      </Box>
      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "space-around",
        }}
        noValidate
        autoComplete='off'>
        <Box component='form'>
          <TextField
            margin='normal'
            id='outlined-basic'
            label='Add Rows'
            variant='outlined'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 1 }}
            style={{
              borderRadius: 35,
              backgroundColor: "#17375b",
              width: "215px",
            }}>
            Add Rows
          </Button>
        </Box>
        <Box component='form'>
          <TextField
            margin='normal'
            id='outlined-basic'
            label='Add Admin Password'
            variant='outlined'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 1 }}
            style={{
              borderRadius: 35,
              backgroundColor: "#17375b",
              width: "215px",
            }}>
            Add Admin
          </Button>
        </Box>
        <Box component='form'>
          <TextField
            id='outlined-basic'
            margin='normal'
            label='Worker Name'
            variant='outlined'
          />

          <TextField
            id='outlined-basic'
            margin='normal'
            label='Worker Phone Number'
            variant='outlined'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 1 }}
            style={{
              borderRadius: 35,
              backgroundColor: "#17375b",
              width: "215px",
            }}>
            Add Worker
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminPortal;
