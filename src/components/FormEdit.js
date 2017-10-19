import React, { Component } from "react";
import FA from "react-fontawesome";

class FormEdit extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleCloseModal();
  };

  changeData = () => {
    const name = this.refs.recipeName.value;
    const ingre = this.refs.ingredients.value;
    const changedRecipe = {
      id: this.props.id,
      name,
      ingre
    };

    this.props.getChangedData(changedRecipe);
    this.props.handleCloseModal();
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={e => this.handleSubmit(e)}
        className="form"
      >
        <h2 className="recipe-card">Recipe Card</h2>
        <hr />
        <div className="input-container">
          <label className="input-label">Title</label>
          <input
            type="text"
            ref="recipeName"
            placeholder="Food name"
            defaultValue={this.props.name}
          />
        </div>
        <div className="input-container">
          <label className="input-label">Ingredient</label>
          <textarea
            type="text"
            ref="ingredients"
            defaultValue={this.props.ingre}
            placeholder="Seperate by commas"
          />
        </div>
        <div className="form-btn-container">
          <button onClick={this.changeData}>
            <FA name="check" />
          </button>
          <button onClick={this.props.handleCloseModal}>
            <FA name="times" />
          </button>
        </div>
      </form>
    );
  }
}

export default FormEdit;
