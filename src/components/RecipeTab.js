import React, { Component } from "react";
import ReactModal from "react-modal";
import FormEdit from "./FormEdit";
import FA from "react-fontawesome";

class RecipeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleOpenModal = () => {
    this.setState({ isOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const recipe = this.props.recipe;
    const ingreItems = this.props.ingre.split(',');
    return (
      <div className="recipe-tab">
        <h3 className="recipe-tab-name">{this.props.name}</h3>
        <ul className="ingredient-list">
          <h4>You will need:</h4>
          {ingreItems.map((ingre,index) => <li key={index} className="ingredient-list-item">{ingre}</li>)}
        </ul>
        <div className="button-list">
          <button
            className="btn recipe-tab-edit-btn"
            onClick={this.handleOpenModal}
          >
            <FA name="pencil" />
          </button>
          <button
            className="btn recipe-tab-delete-btn"
            onClick={() => this.props.deleteData(recipe)}
          >
            <FA name="trash" />
          </button>
        </div>
        <ReactModal
          className=".ReactModal__Content"
          overlayClassName=".ReactModal__Overlay"
          isOpen={this.state.isOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal}
        >
          <FormEdit
            getChangedData={this.props.getChangedData}
            name={this.props.name}
            ingre={this.props.ingre}
            id={this.props.id}
            handleCloseModal={this.handleCloseModal}
          />
        </ReactModal>
      </div>
    );
  }
}
export default RecipeTab;
