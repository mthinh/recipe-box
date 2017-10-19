import React, { Component } from "react";
import ReactModal from "react-modal";
import Form from "./Form";
import RecipeTab from "./RecipeTab";
import "../styles/RecipePanel.css";
import Typed from "typed.js";
import FA from "react-fontawesome";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class RecipePanel extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      data: []
    };
  }


  componentWillMount() {
    const localStorageRef = localStorage.getItem('data');
    if(localStorageRef) {
      this.setState({
      data: JSON.parse(localStorageRef)
    });
    }
    

  }

  componentDidMount() {
    const { strings } = this.props;
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy();
  }

  componentWillUpdate(nextProps,nextState) {
    localStorage.setItem('data',JSON.stringify(this.state.data));
  }

  findIndex(recipe) {
    const data = this.state.data;
    return data.findIndex(rec => rec.id === recipe.id);
  }

  getChangedData = recipe => {
    const index = this.findIndex(recipe);
    const data = [
      ...this.state.data.slice(0, index),
      recipe,
      ...this.state.data.slice(index + 1)
    ];
    this.setState({ data });
  };

  getData = recipe => {
    const data = [...this.state.data, recipe];
    this.setState({ data });
  };

  deleteData = recipe => {
    const index = this.findIndex(recipe);
    const data = [
      ...this.state.data.slice(0, index),
      ...this.state.data.slice(index + 1)
    ];
    this.setState({ data });
  };

  handleOpenModal = () => {
    this.setState({ isOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const data = this.state.data;
    const tabItems = data.map(recipe => (
      <CSSTransition
        key={recipe.id}
        classNames="example"
        timeout={{ enter: 500, exit: 300 }}
      >
        <RecipeTab
          key={recipe.id}
          deleteData={this.deleteData}
          getChangedData={this.getChangedData}
          recipe={recipe}
          name={recipe.name}
          ingre={recipe.ingre}
          id={recipe.id}
        />
      </CSSTransition>
    ));

    return (
      <div className="container recipe-panel">
        <h1 className={`${this.state.data.length > 0 ? "off" : "on"}`}>
          Recipe B<img
            className="box"
            src="https://cdn.pixabay.com/photo/2012/04/15/19/13/box-34980_960_720.png"
          />x
        </h1>
        <span
          className={`recipe-panel-title ${this.state.data.length > 0
            ? "off"
            : "on"}`}
          ref={el => {
            this.el = el;
          }}
        />
        <TransitionGroup className="group">{tabItems}</TransitionGroup>
        <button className="add-btn" onClick={this.handleOpenModal}>
          +
        </button>
        <span className="arrow">
          <FA name="arrow-down" />
        </span>
        <ReactModal
          className=".ReactModal__Content"
          overlayClassName=".ReactModal__Overlay"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
        >
          <Form
            handleCloseModal={this.handleCloseModal}
            getData={this.getData}
          />
        </ReactModal>
      </div>
    );
  }
}

export default RecipePanel;
