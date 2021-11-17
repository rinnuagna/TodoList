import React from "react";
import { Menu, Header, Icon } from "semantic-ui-react";

export default function Menubar() {
  // const currentDate = new Date();
  // const dateYr = `${currentDate.getDate()}/${currentDate.getFullYear()}`;
  // let month = currentDate.toLocaleString('en-us', { month: 'long' });
  return (
    <div>
      <Menu borderless inverted color="blue" className="menubar-style">
        <Menu.Item>
          <Header inverted>
            <Icon name="list" />
            My To Do List
          </Header>
        </Menu.Item>
        {/* <Menu.Menu position="right">
          <Menu.Item>{dateYr}</Menu.Item>
        </Menu.Menu> */}
      </Menu>
    </div>
  );
}
