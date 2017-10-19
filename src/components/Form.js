import React, { Component } from "react";
import uniqid from "uniqid";
import FA from "react-fontawesome";

class Form extends Component {
  handleChange = e => {
    e.preventDefault();
    this.props.handleCloseModal();
  };

  sendData = () => {
    const name = this.refs.recipeName.value;
    const ingre = this.refs.ingredients.value;
    const id = uniqid.time();
    if (name && ingre) {
      const recipe = {
        id,
        name,
        ingre
      };
      this.props.getData(recipe);
    }
  };

  render() {
    return (
      <form className="form" onSubmit={e => this.handleChange(e)}>
        <h2 className="recipe-card">Recipe Card</h2>
        <hr />
        <div className="input-container">
          <label className="input-label">Title</label>
          <input
            id="name"
            type="text"
            ref="recipeName"
            placeholder="Food name"
          />
        </div>
        <div className="input-container">
          <label className="input-label">Ingredient</label>
          <textarea
            id="ingredients"
            type="text"
            ref="ingredients"
            placeholder="Seperate by commas"
          />
        </div>
        <div className="form-btn-container">
          <button onClick={this.sendData}>
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

export default Form;
