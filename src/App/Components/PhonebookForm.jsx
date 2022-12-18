import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Style from '../Style/Phonebook.module.css';

const PhonebookForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');

  const handelInputValue = event => {
    if (event.currentTarget.name === 'name') {
      return setName(event.currentTarget.value);
    }
    if (event.currentTarget.name === 'tel') {
      return setTel(event.currentTarget.value);
    }
  };

  const handelSubmit = event => {
    event.preventDefault();
    addContact(name, tel);
    reset();
  };

  const reset = () => {
    setName('');
    setTel('');
  };

  return (
    <form onSubmit={handelSubmit}>
      <label htmlFor="" className={Style.phonebook__text}>
        Name
        <input
          type="text"
          name="name"
          onChange={handelInputValue}
          value={name}
          className={Style.phonebook__input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="" className={Style.phonebook__text}>
        Phone
        <input
          onChange={handelInputValue}
          value={tel}
          className={Style.phonebook__input}
          type="tel"
          name="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={Style.phonebook__btn}>
        Add contact
      </button>
    </form>
  );
};

export default PhonebookForm;

PhonebookForm.propTypes = {
  addContact: PropTypes.func,
};
