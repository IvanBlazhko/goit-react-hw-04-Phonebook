import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Style from './Phonebook.module.css';
import PhonebookForm from './PhonebookComponents/PhonebookForm';
import PhonebookSearch from './PhonebookComponents/PhonebookSearch';
import PhonebookContactItem from "./PhonebookComponents/PhonebookContactsItem";

class Phonebook extends Component {
  state = {
    name: '',
    tel: '',
  };
  handelSubmit = event => {
    event.preventDefault();
    this.props.addTodoContact(this.state.name, this.state.tel);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', tel: '' });
  };
  handelInputValue = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const {
      title,
      stateContacts,
      stateSearch,
      handelSearchValue,
      onDeleteContact,
    } = this.props;
    const { name, tel } = this.state;
    return (
      <div className={Style.phonebook__body}>
        <h1 className={Style.phonebook__title}>{title}</h1>
        <div>
          <PhonebookForm
            stateName={name}
            statePhone={tel}
            handelInputValue={this.handelInputValue}
            onSubmit={this.handelSubmit}
          />
          <h2 className={Style.phonebook__title}>Contacts</h2>
          <PhonebookSearch
            stateSearch={stateSearch}
            handelSearchValue={handelSearchValue}
          />
          <div className={Style.phonebook__contacts}>
            {stateContacts.map(({ name, id, phone }) => (
              <PhonebookContactItem
                name={name}
                key={id}
                id={id}
                phone={phone}
                onDeleteContact={onDeleteContact}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Phonebook;

Phonebook.propTypes = {
  title: PropTypes.string,
  stateSearch: PropTypes.string,
  stateContacts: PropTypes.array,
  handelSearchValue: PropTypes.func,
  onDeleteContact: PropTypes.func,
};
