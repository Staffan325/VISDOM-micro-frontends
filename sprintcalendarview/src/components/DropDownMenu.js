import React, { useEffect, useState } from "react";
import { getAllStudentData } from "../services/studentData";
import "../styles/dropdown.css";
import Slider from '@material-ui/core/Slider';

const DropdownList = ({ handleClick, options, selectedOption, title }) => {
  return (
    <div style={{ marginRight: "10px" }}>
      <label style={{ paddingRight: "10px" }}>{title}</label>
      <div className="dropdown">
        <button className="dropdown-title-button">{selectedOption}</button>
        <div
          className="dropdown-options"
          style={{ maxHeight: "200px", overflow: "scroll" }}
        >
          {options.map((option, i) => (
            <button key={option} onClick={() => handleClick(option)} >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TimeSelection = ({ 
  timescale,
  setTimescale, 
  maxlength
}) => {

  const resetDate = (e) => {
    e.preventDefault();
    setTimescale({
      start: 0,
      end: maxlength,
    })
  }

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setTimescale({
      start: newValue[0],
      end: newValue[1],
    })
  }

  return (
    <div className="fit-row">
      <Slider
        value={Object.keys(timescale).map(key => timescale[key])}
        onChange={handleChange}
        max={maxlength}
        min={0}
        getAriaValueText={value => value}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        style={{ marginTop: "40px" }}
      />
      <button key="reset-date" onClick={resetDate}>Reset</button>
    </div>
  )
}

export const DropDownMenu = ({ studentID, setStudentID }) => {
  const [studentData, setStudentData] = useState([]);
  const [student, setStudent] = useState({});

  useEffect(() => {
    getAllStudentData()
      .then(res => {
        setStudentData(res)
        res && setStudent(res.find(person => person.student_id === studentID))
      })
      .catch(error => console.log(error))
  },[studentID])

  return(
    <div className="fit-row">
      <DropdownList
        handleClick={setStudentID}
        options={studentData.map((student) => student.student_id)}
        selectedOption={studentID}
        title={"Chosen student:"}
      />
      {(student && studentData) && (
        <table>
          <tbody>
            <tr>
              <td>
                <em>
                  <b>Full name: </b>
                </em>
              </td>
              <td>{student.fullname}</td>
            </tr>
            <tr>
              <td>
                <em>
                  <b>Username: </b>
                </em>
              </td>
              <td>{student.username}</td>
            </tr>
            <tr>
              <td>
                <em>
                  <b>Email: </b>
                </em>
              </td>
              <td>{student.email}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DropDownMenu
