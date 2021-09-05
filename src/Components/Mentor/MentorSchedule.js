import { Button } from "@material-ui/core";
import styled from "styled-components";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import SlotAddedByMentor from "./SlotAddedByMentor";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const AboutStyles = styled.div`
  text-align: center;
  margin-top: 7rem;
  .maincont {
    margin-top: 3rem;
    margin-bottom: 5rem;
  }
  .container {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-left: 16rem;
    margin-right: 16rem;
    margin-top: 3rem;
    margin-bottom: 5 rem;
  }

  .buttoncol {
    align-self: center;
  }
  .datepicker {
    margin-top: 2rem;
  }
  .shapeme {
    height: 5rem;
  }
`;

const MentorSchedule = () => {
  const [selectDate, setselectDate] = useState(null);
  const [selectStartTime, setselectStartTime] = useState("");
  const [selectEndTime, setselectEndTime] = useState("");
  const [reload, setReload] = useState(true);
  const [open3, setOpen3] = useState(false);
  const [mintime, setMintime] = useState(new Date(0, 0, 0, 8));
  const [maxtime, setMaxtime] = useState(new Date(0, 0, 0, 18, 45));
  const resetDate = () => {
    setselectDate(null);
  };
  const handleClick3 = () => {
    setOpen3(true);
  };

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen3(false);
  };
  function addDays(date) {
    var result = new Date(date);
    result.setDate(result.getDate() + 7);
    return result;
  }

  function Saveme(selectDate, selectStartTime, selectEndTime) {
    axios
      .post("http://localhost:8080/schedule/mentor/addfreeslot", {
        mentor_id: localStorage.getItem("userid"),
        date: selectDate,
        start_time: selectStartTime + ":00",
        end_time: selectEndTime + ":00",
      })
      .then(
        (response) => {
          console.log(response.data);
          handleClick3();
          resetDate();
          setReload(true);
        },
        (error) => {
          console.log(error);
          alert("Some error occured. Try ");
        }
      );
  }

  // const mintime = new Date(0, 0, 0, 8);
  // const maxtime = new Date(0, 0, 0, 18, 45);
  return (
    <div>
      <AboutStyles>
        <div className="maincont">
          <h2>Feed in the details to mark your free slot in the schedule</h2>
          <div className="container">
            <div className="datecol">
              <h3>Date</h3>

              <form>
                <TextField
                  id="date"
                  type="date"
                  value={selectDate}
                  onChange={(date) => setselectDate(date.target.value)}
                  variant="outlined"
                  inputProps={{
                    min: "2021-08-26",
                    max: addDays(selectDate),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                {console.log(selectDate)}
              </form>
            </div>
            <div className="timecol">
              <h3>Start time</h3>
              {/* <Timeselect /> */}
              <form className="shapeme">
                <TextField
                  id="time"
                  type="time"
                  variant="outlined"
                  value={selectStartTime}
                  onChange={(time) => setselectStartTime(time.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    // min: "2021-08-26 11 PM",
                    minTime: mintime,
                    maxTime: maxtime,
                    // max: "10:00",
                    step: 300, // 5 min
                  }}
                />

                {console.log(selectStartTime)}
              </form>
            </div>
            <div className="timecol">
              <h3>End time</h3>
              {/* <Timeselect /> */}
              <form>
                <TextField
                  id="time"
                  type="time"
                  variant="outlined"
                  value={selectEndTime}
                  onChange={(time) => setselectEndTime(time.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                {console.log(selectEndTime)}
              </form>
            </div>
            <div className="buttoncol">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                  Saveme(selectDate, selectStartTime, selectEndTime)
                }
              >
                Save
              </Button>
              <Snackbar
                open={open3}
                autoHideDuration={2000}
                onClose={handleClose3}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={handleClose3} severity="success">
                  <b>Slot Added Successfully!</b>
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
        <SlotAddedByMentor shouldReload={reload} handleReload={setReload} />
      </AboutStyles>
    </div>
  );
};

export default MentorSchedule;
