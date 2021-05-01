import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Homepage.module.css";

import { UserContext } from "../Store/UserContext";

function ClassCard(props) {
  return (
    <div className="card shadow col-8 mx-auto my-3">
      <img
        className="card-img-top"
        src="https://yt3.ggpht.com/ytc/AAUvwniZgi1B2MEAMI1hrYuk1AFy_9fv2cZDkaCNBop5AA=s900-c-k-c0x00ffffff-no-rj"
        alt="CLASS10"
      />
      <div className="card-body">
        <h4 className="card-title">{`Section: ${props.section}`}</h4>
        <p className="card-text">{`Code: ${props.code}`}</p>
        <p className="card-text">{`Faculty: ${props.facultyAdvisor}`}</p>
        <Link
          to={`/student/table/${props.code}`}
          className="stretched-link"
        ></Link>
      </div>
    </div>
  );
}

function Homepage() {
  const userContext = useContext(UserContext);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    async function getClasses() {
      try {
        const { data } = await axios.get("/api/v1/class/all", {
          headers: {
            Authorization: `Bearer ${userContext.token}`,
          },
        });
        setClasses(data.classes);
      } catch (err) {
        const { response } = err;
        alert(response.data.error);
      }
    }
    getClasses();
  });
  const allClasses = classes.map((c, index) => (
    <ClassCard key={index} {...c} />
  ));
  return <div className={styles["card-stack"]}>{allClasses}</div>;
}

export default Homepage;
