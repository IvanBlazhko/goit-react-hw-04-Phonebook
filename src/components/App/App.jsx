import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Phonebook from '../Phonebook/Phonebook';
import PhonebookDefaultData from '../Phonebook/PhonebookDefaultData.json';

import Style from './App.module.css';

class App extends Component {
  state = {
    contacts: [...PhonebookDefaultData],
    search: '',
  };
  componentDidMount() {
    const storage = localStorage.getItem("contacts")
    const parsedContacts = JSON.parse(storage)
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

  addTodo = (name, phone) => {
    const todo = {
      id: nanoid(),
      name,
      phone,
    };
    const isExist = this.state.contacts.find(i => i.name === name)
    if (isExist) {
      return alert(name + ' is already in contacts');
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, todo],
    }));
  };
  onDeleteContact = Id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== Id),
    }));
  };
  getVisibleContacts = () => {
    const { search, contacts } = this.state;
    const normalizeFilter = search.toLowerCase();
    return contacts.filter(todo =>
      todo.name.toLowerCase().includes(normalizeFilter)
    );
  };
  handelSearchValue = event => {
    this.setState({
      search: event.currentTarget.value,
    });
  };
  render() {
    const { search } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={Style.app__wrapper}>
        <Phonebook
          title="My phonebook"
          stateSearch={search}
          stateContacts={visibleContacts}
          addTodoContact={this.addTodo}
          handelSearchValue={this.handelSearchValue}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
