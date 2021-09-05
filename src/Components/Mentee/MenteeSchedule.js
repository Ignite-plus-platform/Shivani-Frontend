import styled from "styled-components";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import SlotAddedByMentee from "./SlotAddedByMentee";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import BookedSlots from "./BookedSlots";
import { useEffect } from "react";

const AboutStyles = styled.div`
  text-align: center;
  align-items: center;
  margin-top: 7rem;
  .maincont {
    margin-top: 3rem;
    margin-bottom: 5rem;
  }
  .root {
    margin-top: 3.5rem;
    width: 80%;
    margin-left: 8rem;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MenteeSchedule = () => {
  const [Names, setNames] = useState(null);
  const [value, setValue] = useState(0);
  const [able, setable] = useState(true);
  const [Name, setName] = useState([]);
  const [userid, setuserid] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [my, setMy] = useState(null);
  var sendid = 0;

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  function GetMentorNameandEmailId() {
    console.log("Hello");
    axios
      .get("http://localhost:8080/schedule/mentee/getMentor")
      .then((response) => {
        console.log(response.data);
        setName(response.data);
        console.log("In");
      })
      .catch(function (error) {
        // if (error.response.request.status === 404) {
        //   alert(error.response.request.message);
        // }
      });
    // window.location.reload();
  }

  useEffect(() => {
    GetMentorNameandEmailId();
  }, []);

  function addDays(date) {
    var result = new Date(date);
    result.setDate(result.getDate() + 7);
    return result;
  }
  function finduserid(val) {
    for (let i = 0; i < Name.length; i++) {
      if (Name[i].name == val) {
        setuserid(Name[i].userid);
      }
    }
  }

  function handleChange(val) {
    setable(false);
    console.log("hoyy " + val);
    finduserid(val);
  }

  return (
    <div>
      <AboutStyles>
        <div className="maincont">
          <h2>Feed in the details </h2>
          <div className="Mentor_Name">
            <h3>Mentor Name</h3>
            <form>
              <TextField
                id="standard-select-currency-native"
                select
                value={Names}
                onChange={(event) => {
                  setNames(event.target.value);
                  handleChange(event.target.value);
                }}
                variant="outlined"
                placeholder="Name"
                SelectProps={{
                  native: true,
                }}
                helperText="* Please select Mentor Name"
              >
                {Name.map((row) => (
                  <option key={row.name} value={row.name}>
                    {row.name}
                  </option>
                ))}
              </TextField>
            </form>
          </div>
          <div className="root">
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange1}>
                <Tab label="Booked Slots" {...a11yProps(0)} />
                <Tab
                  label="Mentor Free Slots"
                  {...a11yProps(1)}
                  disabled={able}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <BookedSlots />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SlotAddedByMentee userid={userid} />
            </TabPanel>
          </div>
        </div>
      </AboutStyles>
    </div>
  );
};

export default MenteeSchedule;
