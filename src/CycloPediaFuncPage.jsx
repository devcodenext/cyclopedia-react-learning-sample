import React, { useEffect, useRef, useState } from "react";
import { getRandomUser } from "./Utility/api.jsx";
import InstructorFunc from "./InstructorFunc.jsx";

const CycloPediaFuncPage = () => {
  // In functional component we do not have constructor.

  // componentDidUpdate = async (previousProps, previousState) => {
  //   console.log("Component Did Update");
  //   localStorage.setItem("cyclopedia", JSON.stringify(this.state));
  //   console.log("Old State - " + previousState.studentCount);
  //   console.log("New State - " + this.state.studentCount);
  //   if (previousState.studentCount < this.state.studentCount) {
  //     const response = await getRandomUser();
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [
  //           ...prevState.studentList,
  //           {
  //             name: response.data.first_name + " " + response.data.last_name,
  //           },
  //         ],
  //       };
  //     });
  //   } else if (previousState.studentCount > this.state.studentCount) {
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [],
  //       };
  //     });
  //   }
  // };

  // componentWillUnmount() {
  //   console.log("Component Will Unmount");
  // }

  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  // const [totalRender, setTotalRender] = useState(0); - Infinite loop in this case, because it will be called on every render.
  const totalRender = useRef(0);
  const prevStudentCount = useRef(0);
  const feedbackInputRef = useRef(null);

  const [inputName, setInputName] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  useEffect(() => {
    console.log("This will be called on Every render.");
    // setTotalRender((prevState) => prevState + 1); -- Infinite loop in this case, because it will be called on every render.
    totalRender.current = totalRender.current + 1;
    console.log("render " + totalRender.current);
  });

  // Replication of componentDidMount from class component.
  useEffect(() => {
    console.log("This will be called on intial/first render/mount");
    const getUser = async () => {
      const response = await getRandomUser();
      console.log(response);
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    if (!state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  // Replacement of ComponentDidUpdate in Hooks.
  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      console.log(response);
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    };
    if (prevStudentCount.current < state.studentCount) {
      getUser();
    } else if (prevStudentCount.current > state.studentCount) {
      setState((prevState) => {
        return { ...prevState, studentList: [] };
      });
    }
    // if (state.studentList.length < state.studentCount) {
    //   getUser();
    // } else if (state.studentList.length > state.studentCount) {
    //   setState((prevState) => {
    //     return { ...prevState, studentList: [] };
    //   });
    // }
  }, [state.studentCount]);

  useEffect(() => {
    prevStudentCount.current = state.studentCount;
  }, [state.studentCount]);

  useEffect(() => {
    console.log(
      "This will be called on whenever value of inputFeedback changes"
    );
  }, [inputFeedback, inputName]);

  useEffect(() => {
    console.log("This will be called on intial/first render/mount");
    feedbackInputRef.current.focus();
    return () => {
      console.log("This will be called on unmounting");
    };
  }, []);

  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handleToggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor&nbsp;</span>
        <i
          className={`bi ${
            state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
          } btn btn-success btn-sm`}
          onClick={handleToggleInstructor}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <InstructorFunc instructor={state.instructor} />
        ) : null}
      </div>
      <div className="p-3">Total Render : {totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          value={inputName}
          placeholder="Name..."
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        ></input>{" "}
        Value: {inputName}
        <br />
        <textarea
          value={inputFeedback}
          ref={feedbackInputRef}
          placeholder="Feedback..."
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
        ></textarea>{" "}
        Value : {inputFeedback}
        <br />
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span>
        <br />
        <div>Student Count: {state.studentCount}</div>
        <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
          Add Student
        </button>{" "}
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemoveAllStudent}
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              - {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CycloPediaFuncPage;
