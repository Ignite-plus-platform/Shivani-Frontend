import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  tableContainer: {
    
    width: "100%",
    // marginLeft: "150px",
  },
  
  container: {
    display:"flex",
    maxHeight: 440,
    
  },
  tableHeaderCell: {
    //fontWeight: "bold",
    color:"white",
    backgroundColor: "rgb(204,0,0)",
  },
}));

export default function SlotAddedByMentee(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ans, setAns] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectStartTime, setselectStartTime] = useState("");
  const [selectEndTime, setselectEndTime] = useState("");
  const [selectDate, setselectDate] = useState("");
  const [sid,selectsid] = useState(0);
  //const [err,seterr] = useState(false);
  //const [text,settext] = useState("");
  //const [err1,seterr1] = useState(false);
  //const [text1,settext1] = useState("");
  const [able,setable] = useState(false);
 
  const handleClickOpen = () => {
    //console.log("row no = " + no);
    console.log(props.userid);
    setOpen(true);
    
  };

  const handleClose = () => {
    
    setOpen(false);
  };
  // const handlestarttime = (time) => {
  //   if(time.target.value >= ans.starttime && time.target.value <= ans.endtime)
  //   {
  //     setselectStartTime(time.target.value);
  //     seterr(false);
  //     settext("");
  //     handlesave();
  //   }
  //   else
  //   {
  //     setselectStartTime("");
  //     seterr(true);
  //     settext("Incorrect entry");
  //   }
  // };

  // const handleendtime = (time) => {
  //   if(time.target.value > selectStartTime && time.target.value <= ans.endtime)
  //   {
  //     setselectEndTime(time.target.value);
  //     seterr1(false);
  //     settext1("");
  //     handlesave();
  //   }
  //   else
  //   {
  //     setselectEndTime("");
  //     seterr1(true);
  //     settext1("Incorrect entry");
  //   }
  // };

  // const handlesave = () =>{
  //   if(selectStartTime !== "" && selectEndTime !== "")
  //   {
  //     setable(false);
  //   }
  // }
  

  //For Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function Saveme(sid,selectdate) {
    console.log("Start time = "+ selectStartTime);
    console.log("End time = "+ selectEndTime);
    setOpen(false);
    
    axios
      .post("http://localhost:8083/schedule/mentee/bookslot", {
        mentee_id: localStorage.getItem("userid"),
        date: selectdate,
        start_time: selectStartTime + ":00",
        end_time: selectEndTime + ":00",
        schedule_id:sid,
      })
      .then(
        (response) => {
          console.log(response.data);
          // handleClick3();
          // resetDate();
        },
        (error) => {
          console.log(error);
          alert("Some error occured. Try ");
        }
      );
    // window.location.reload();
  }

    
  function GetFreeSlotsAddedByMentor() {
    
    axios
      .get("http://localhost:8083/schedule/mentee/getslots/availabletobook", {
        params: { userid: props.userid },
      })
      .then((response) => {
        console.log(response.data);
        setAns(response.data);
        
      })
      .catch(function (error) {
        // if (error.response.request.status === 404) {
        //   alert(error.response.request.message);
        // }
      });
    // window.location.reload();
  }

  useEffect(() => {
    GetFreeSlotsAddedByMentor();
  }, []);

  var no = 1;

  return (
    <div>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell className={classes.tableHeaderCell}>Sr.No</TableCell> */}
              <TableCell className={classes.tableHeaderCell} style={{ width: 70 }}>Sr. No</TableCell>
              <TableCell className={classes.tableHeaderCell} >Mentor Name</TableCell>
              <TableCell  className={classes.tableHeaderCell} >Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Start Time
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                End Time
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {ans
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                //<TableRow key={row.date}>
                  <TableRow
                  key={no}>
                                    
                  <TableCell>{no++}</TableCell>
                  <TableCell>{row.mentor_name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.start_time}</TableCell>
                  <TableCell>{row.end_time}</TableCell>
                  
                  <TableCell>
                    <Button variant="contained" onClick={handleClickOpen}>
                      Book
                    </Button>
                    <form>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Book Slot</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Select start time and end time.
                          </DialogContentText>
                          <div className = "container">
                            <div>
                              <h3>Start time</h3>
                              
                              <TextField
                                // error={err}
                                id="time"
                                type="time"
                                variant="outlined"
                                value={selectStartTime}
                                onChange={(time) => setselectStartTime(time.target.value)}
                                // helperText={text}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  step: 300, // 5 min
                                }}
                              />
                            </div>
                            <div>
                              <h3>End time</h3>
                              <TextField
                                // error={err1}
                                id="time"
                                type="time"
                                variant="outlined"
                                value={selectEndTime}
                                onChange={(time) => setselectEndTime(time.target.value)}
                                // helperText={text1}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  min: "2021-08-26 11 PM" ,
                                  // max: "10:00",
                                  step: 300, // 5 min
                                }}
                              />
                               
                            </div>
                            
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={Saveme(row.schedule_id,row.date)} color="primary" >
                            Save
                          </Button>
                        </DialogActions>
                    </Dialog>
                    </form>
                  </TableCell>
            </TableRow>
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
    </div>
  );
};
