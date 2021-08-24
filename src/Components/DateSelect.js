import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

const Dateselect = () => {
  const [selectDate, setselectDate] = useState("");

  return (
    <div>
      <form>
        <TextField
          id="date"
          type="date"
          value={selectDate}
          onChange={(date) => setselectDate(date.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {console.log(selectDate)}
      </form>
    </div>
  );
};
export default Dateselect;
