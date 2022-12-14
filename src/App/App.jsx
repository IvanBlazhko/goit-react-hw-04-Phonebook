import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import PhonebookDefaultData from './Data/PhonebookDefaultData.json';

import Style from './Style/Phonebook.module.css'
import PhonebookForm from "./Components/PhonebookForm";
import PhonebookSearch from "./Components/PhonebookSearch";
import PhonebookContacts from "./Components/PhonebookContacts";

class App extends Component {
  state = {
    contacts: [...PhonebookDefaultData],
    search: '',
  };
  addContact = (name, phone) => {
    const newContact = {
      id: nanoid(),
      name,
      phone,
    };
    const isExist = this.state.contacts.find(i => i.name === name)
    if (isExist) {
      return alert(name + ' is already in contacts');
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
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
        <div className={Style.phonebook__body}>
          <h1 className={Style.phonebook__title}>Phonebook</h1>
          <div>
            <PhonebookForm
              addContact={this.addContact}
            />
            <h2 className={Style.phonebook__title}>Contacts</h2>
            <PhonebookSearch
              stateSearch={search}
              handelSearchValue={this.handelSearchValue}
            />
            <PhonebookContacts
              visibleContacts={visibleContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
