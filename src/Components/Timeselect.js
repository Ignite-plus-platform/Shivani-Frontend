import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function Timeselect() {
  const [selectTime, setselectTime] = useState("");

  return (
    <div>
      <form>
        <TextField
          id="time"
          type="time"
          variant="outlined"
          value={selectTime}
          onChange={(time) => setselectTime(time.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        {console.log(selectTime)}
      </form>
    </div>
  );
}
