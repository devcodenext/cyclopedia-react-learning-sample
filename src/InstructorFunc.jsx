import React, { useEffect, useState } from "react";

const InstructorFunc = (props) => {
  useEffect(() => {
    return () => {
      console.log("Instructor unmounting");
    };
  }, []);
  return (
    <div>
      Name: {props.instructor.name}
      <br />
      Email: {props.instructor.email}
      <br />
      Phone: {props.instructor.phone}
      <br />
    </div>
  );
};

export default InstructorFunc;
