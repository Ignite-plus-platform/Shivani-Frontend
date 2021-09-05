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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  tableContainer: {
    width: "100%",
    // marginLeft: "150px",
  },

  container: {
    display: "flex",
    maxHeight: 440,
  },
  tableHeaderCell: {
    //fontWeight: "bold",
    color: "white",
    backgroundColor: "rgb(204,0,0)",
  },
}));

function BookedSlots() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ans, setAns] = useState([]);

  //const [value, setValue] = useState<Date | null>(new Date("2021-08-27 12:00"));
  //const [open1, setOpen1] = React.useState(false);

  //For Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function GetFreeSlotsAddedByMentor() {
    var id = localStorage.getItem("userid");
    console.log(id);
    axios
      .get("http://localhost:8080/schedule/mentee/scheduledMeetings", {
        params: { userid: id },
      })
      .then((response) => {
        console.log("Booked");
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
              <TableCell
                className={classes.tableHeaderCell}
                style={{ width: 70 }}
              >
                Sr. No
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Mentor Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Start Time
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                End Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ans
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                //<TableRow key={row.date}>
                <TableRow key={row.date}>
                  <TableCell>{no++}</TableCell>
                  <TableCell>{row.mentor_name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.start_time}</TableCell>
                  <TableCell>{row.end_time}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BookedSlots;
