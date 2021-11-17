import React, { useEffect, useState } from "react";
import {
  Segment,
  Header,
  Grid,
  Icon,
  Menu,
  Button,
  Modal,
  Form,
  Input,
} from "semantic-ui-react";
import noDataImg from "../ImagesCommon/noData.jpg";
import { noDataImage, changeDateFormat } from "../Functions/Functions";

const sortDueList = (unsortedList) => {
  return unsortedList.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
};

const sortCompletedList = (unsortedList) => {
  return unsortedList.sort(
    (a, b) => new Date(b.completedDate) - new Date(a.completedDate)
  );
};

export default function ToDoListSeg() {
  const [dueList, setDueList] = useState([]);
  const [compList, setCompList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    var dataDueList = localStorage.getItem("dueList");
    var dataCompList = localStorage.getItem("compList");
    let parsedData;
    if (dataDueList) {
      parsedData = JSON.parse(dataDueList);
      let dueList1 = parsedData.filter(function (e) {
        return e.status === "Due";
      });
      dueList1 = sortDueList(dueList1);
      setDueList(dueList1);
    }
    if (dataCompList) {
      parsedData = JSON.parse(dataCompList);
      let compList1 = parsedData.filter(function (e) {
        return e.status === "Completed";
      });
      compList1 = sortCompletedList(compList1);
      setCompList(compList1);
    }
  }, []);

  function NewItemModel({ onClose }) {
    const [newItem, setNewItem] = useState({
      desc: "",
      duedate: "",
      completedDate: "",
      status: "Due",
    });

    const handleChange = (value, name) => {
      setNewItem((newItem) => {
        newItem[name] = value;
        return { ...newItem };
      });
    };

    const validateForm = () => {
      if (newItem.desc && newItem.duedate) {
        handleSubmit();
      } else {
        alert("Please fill all mandatory fields to save");
      }
    };

    const handleSubmit = () => {
      if (
        dueList.some(
          (u) => u.desc.toLowerCase() === newItem.desc.toLowerCase()
        ) ||
        compList.some(
          (u) => u.desc.toLowerCase() === newItem.desc.toLowerCase()
        )
      ) {
        alert("Item already present");
      } else {
        var dList = [...dueList, newItem];
        const sortList = sortDueList(dList);
        setDueList(sortList);
        setNewItem({
          desc: "",
          duedate: "",
          completedDate: "",
          status: "",
        });
        localStorage.setItem("dueList", JSON.stringify(sortList));
        if (onClose()) {
          onClose();
        }
      }
    };

    return (
      <Modal open>
        <Menu borderless>
          <Menu.Item>
            <Header color="blue"> Add New Item</Header>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              <Icon name="close" color="red" /> Close
            </Menu.Item>
            <Menu.Item onClick={validateForm}>
              <Icon name="check" color="green" /> Done
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Modal.Content>
          <Form>
            <Form.Field
              required
              name="desc"
              control={Input}
              label="Item Description"
              placeholder="Describe your task"
              value={newItem.desc}
              onChange={(e, { value, name }) => handleChange(value, name)}
            />
            <Form.Group widths="equal">
              <Form.Field
                required
                name="duedate"
                control={Input}
                type="date"
                label="Due Date"
                placeholder="Due Date"
                value={newItem.duedate}
                onChange={(e, { value, name }) => handleChange(value, name)}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }

  const handleDelete = (item) => {
    if (item.status === "Completed") {
      let comp = compList.filter((el) => el.desc !== item.desc);
      setCompList(comp);
      localStorage.setItem("compList", JSON.stringify(comp));
    } else {
      let due = dueList.filter((el) => el.desc !== item.desc);
      setDueList(due);
      localStorage.setItem("dueList", JSON.stringify(due));
    }
  };

  const handleCompleteClick = (item) => {
    let due = dueList.filter((el) => el.desc !== item.desc);
    setDueList(due);
    localStorage.setItem("dueList", JSON.stringify(due));
    item["completedDate"] = new Date();
    item["status"] = "Completed";
    let comp = [item, ...compList];
    setCompList(comp);
    localStorage.setItem("compList", JSON.stringify(comp));
  };

  function RenderList(itemArray) {
    return (
      <div style={{ margin: "1rem 0" }}>
        {itemArray?.itemArray?.map((item) => (
          <Segment raised>
            <Grid>
              <Grid.Column width={8}>
                <div
                  className={
                    item.status === "Completed"
                      ? "todolist-status todolist-status-color1"
                      : new Date(item.duedate) > new Date()
                      ? "todolist-status todolist-status-color2"
                      : "todolist-status todolist-status-color3"
                  }
                />
                <Header as="h4" color="blue" className="todolist-header">
                  {item.desc}
                </Header>
              </Grid.Column>
              <Grid.Column width={6}>
                <span>
                  <span style={{ color: "grey" }}>
                    <i>Due date :</i>
                  </span>{" "}
                  {item.duedate}
                </span>
                <br />
                {item.status === "Completed" && (
                  <span>
                    <span style={{ color: "grey" }}>
                      <i>Completed date :</i>
                    </span>{" "}
                    {changeDateFormat(item.completedDate)}
                  </span>
                )}
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon
                  name="trash"
                  link
                  title="Delete"
                  onClick={() => handleDelete(item)}
                  color="red"
                />
                {item.status !== "Completed" && (
                  <Icon
                    link
                    color="green"
                    title="Mark as completed"
                    style={{ marginLeft: "15px" }}
                    name="check"
                    onClick={() => handleCompleteClick(item)}
                  />
                )}
              </Grid.Column>
            </Grid>
          </Segment>
        ))}
      </div>
    );
  }

  return (
    <Segment className="todolist-seg">
      {showModal && <NewItemModel onClose={() => setShowModal(false)} />}
      <Menu borderless className="todolist-menu" inverted size="tiny">
        <Menu.Item>My Items</Menu.Item>
        <Menu.Menu position="right">
          {" "}
          <Menu.Item onClick={() => setShowModal(true)}>
            <Button content="Add Item" size="tiny" icon="plus" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {(dueList.length !== 0 || compList.length !== 0) && (
        <Header as="h6" style={{ marginTop: "50px" }}>
          <div>
            <Icon name="square full" size="tiny" color="green" />
            completed &nbsp;
            <Icon name="square full" size="tiny" color="orange" />
            due &nbsp;
            <Icon name="square full" size="tiny" color="red" />
            overdue &nbsp;
          </div>
        </Header>
      )}

      {dueList.length === 0 && compList.length === 0 ? (
        noDataImage(noDataImg, "No items added in your list")
      ) : (
        <div className="todos-list-seg1">
          <RenderList itemArray={dueList} />
          <RenderList itemArray={compList} />
        </div>
      )}
    </Segment>
  );
}
