import React from "react";
import {Image, Header} from "semantic-ui-react";

export const noDataImage = (img, desc) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "20px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          flexDirection: "column",
        }}
      >
        <Image src={img} width="550px" />
        <Header>
          <i>{desc}</i>
        </Header>
      </div>
    );
  };


 export const changeDateFormat = (date) => {
    let currentDate = new Date(date);
    return `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
  };
  