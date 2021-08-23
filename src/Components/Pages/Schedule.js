import React from "react";
import MentorSchedule from "../Mentor/MentorSchedule";
import MenteeSchedule from "../Mentee/MenteeSchedule";
const Schedule = () => {
  if((localStorage.getItem("role")==="Mentor")){
    return <MentorSchedule />;
}
  return (
    <div>
        <MenteeSchedule/>
    </div>
  );
};
export default Schedule;
