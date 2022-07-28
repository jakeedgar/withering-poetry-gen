import React from 'react';
import { v4 } from 'uuid';
import PoemList from './PoemList';
import PoemDetail from './PoemDetail';
import NewPoemForm from './NewPoemForm';
import UpdatePoem from './UpdatePoem';
import NavBar from '../NavBar';

class PoemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainPoemList: [
        {
          id: v4(),
          title: 'Wandering',
          creator: "Akiva N'cham",
          content:
            'I am seated in an office, surrounded by heads and bodies. My posture is consciously congruent to the shape of my hard chair. This is a cold room in University Administration, wood-walled, Remington-hung, double-windowed against the November heat'
        }
      ],
      selectedPoem: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedPoem != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedPoem: null,
        editing: false
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  };

  handleAddingNewPoemToList = (newPoem) => {
    const newMainPoemList = this.state.mainPoemList.concat(newPoem);
    this.setState({
      mainPoemList: newMainPoemList,
      formVisibleOnPage: false
    });
  };

  handleChangingSelectedPoem = (id) => {
    const selectedPoem = this.state.mainPoemList.filter((poem) => poem.id === id)[0];
    this.setState({ selectedPoem: selectedPoem });
  };

  handleDeletingPoem = (id) => {
    const newMainPoemList = this.state.mainPoemList.filter((poem) => poem.id !== id);
    this.setState({
      mainPoemList: newMainPoemList,
      selectedPoem: null
    });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleUpdatingPoemInList = (poemToEdit) => {
    const editedMainPoemList = this.state.mainPoemList.filter((poem) => poem.id !== this.state.selectedPoem.id).concat(poemToEdit);
    this.setState({
      mainPoemList: editedMainPoemList,
      editing: false,
      selectedPoem: null
    });
  };

  handleRedactingPoem = (poem) => {
    const editedMainPoemList = this.state.mainPoemList.filter((poem) => poem.id !== this.state.selectedPoem.id).concat(poem);
    let arr = poem.split(' ');
    let output = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 10 === 0) {
        output.push(arr[i]);
      } else {
        output.push(`<span className='redacted'>` + arr[i] + '</span>');
      }
    }
    return output.join(' ');
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <UpdatePoem poem={this.state.selectedPoem} onUpdatePoem={this.handleUpdatingPoemInList} />;
      buttonText = 'Poem List';
    } else if (this.state.editing) {
      currentlyVisibleState = <UpdatePoem poem={this.state.selectedPoem} onUpdatePoem={this.handleRedactingPoem} />;
      buttonText = 'Poem List';
    } else if (this.state.selectedPoem != null) {
      currentlyVisibleState = <PoemDetail poem={this.state.selectedPoem} onClickingDelete={this.handleDeletingPoem} onClickingEdit={this.handleEditClick} onClickingSell={this.handlePintSales} />;
      buttonText = 'Poem List';
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewPoemForm onNewPoemCreation={this.handleAddingNewPoemToList} />;
      buttonText = 'Poem List';
    } else {
      currentlyVisibleState = <PoemList poemList={this.state.mainPoemList} onPoemSelection={this.handleChangingSelectedPoem} />;
      buttonText = 'New Poem';
    }

    return (
      <React.Fragment>
        <NavBar />
        <div className="center-piece">
          {currentlyVisibleState}
          <div className="ml-2">
            <button className="btn-secondary" onClick={this.handleClick}>
              {buttonText}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PoemControl;
