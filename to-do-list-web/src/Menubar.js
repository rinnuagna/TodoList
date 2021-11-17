import React from "react";
import { Menu, Header, Icon } from "semantic-ui-react";

export default function Menubar() {
  return (
    <div>
      <Menu borderless inverted color="blue" className="menubar-style">
        <Menu.Item>
          <Header inverted>
            <Icon name="list" />
            My To Do List
          </Header>
        </Menu.Item>
      </Menu>
    </div>
  );
}
