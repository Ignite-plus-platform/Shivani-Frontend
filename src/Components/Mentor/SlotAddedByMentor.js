import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import TableFooter from "@material-ui/core/TableFooter";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/DeleteSharp";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
//import Snackbar from '@material-ui/core/Snackbar';
//import Alert from '@material-ui/lab/Alert';

//DeleteSchedule(row.schedule_id)
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  tableContainer: {
    
    width: "80%",
    marginLeft: "150px",
  },
  
  container: {
    maxHeight: 440,
  },
  tableHeaderCell: {
    //fontWeight: "bold",
    color:"white",
    backgroundColor: "rgb(204,0,0)",
  },
}));

export default function SlotAddedByMentor() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ans, setAns] = useState([]);
  const [open, setOpen] = React.useState(false);
  //const [open1, setOpen1] = React.useState(false);
 
  //For dialog box that appears to confirm the deletion task
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };*/

  //For Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Delete slot function
  function DeleteSchedule(schedduleid) {
    handleClose();
    axios
      .delete(`http://localhost:8083/schedule/mentor/deleteslot/${schedduleid}`)
      .then((response) => {
        console.log('Slot Deleted');        
        //alert(response.data);
      });
    //window.location.reload();
    GetFreeSlotsAddedByMentor();
    
  }

  //Updates the free slots table
  function GetFreeSlotsAddedByMentor() {
    var id=localStorage.getItem("userid");
    axios
      .get(`http://localhost:8083/schedule/mentor/getslots/${id}`)
      .then((response) => {
        console.log(response.data);
        setAns(response.data);
        
      });
    // window.location.reload();
  }

  useEffect(() => {
        GetFreeSlotsAddedByMentor();
  }, [ans]);

  var no = 1;

  return (
    <div>
      <div>
        <h3>Free Slots</h3>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell className={classes.tableHeaderCell}>Sr.No</TableCell> */}
              <TableCell className={classes.tableHeaderCell} style={{ width: 100 }}>Sr. No</TableCell>
              <TableCell  className={classes.tableHeaderCell} >Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Start Time
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                End Time
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Mentee Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ans
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.date}>
                  <TableCell>{no++}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.start_time}</TableCell>
                  <TableCell>{row.end_time}</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>
                    <IconButton onClick={handleClickOpen}>
                      <Delete />
                    </IconButton>
                    {/* After Clicking the delete icon Confirmation dialog box appears */}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      >
                        <DialogTitle id="alert-dialog-title">{"Are you sure that you want to delete the slot?"}</DialogTitle>
                        
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={() => DeleteSchedule(row.schedule_id)} color="primary" autoFocus>
                            Delete
                          </Button>
                        </DialogActions>
                    </Dialog>
                    {/*<Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1} 
                    anchorOrigin={{vertical:'top',horizontal:'center' }}>
                      <Alert onClose={handleClose1} severity="success">
                        <b>Slot Deleted Successfully!</b>
                      </Alert>
                    </Snackbar>*/}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={ans.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
