import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import Style from './Style/Phonebook.module.css';
import PhonebookForm from './Components/PhonebookForm';
import PhonebookSearch from './Components/PhonebookSearch';
import PhonebookContacts from './Components/PhonebookContacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, phone) => {
    const newContact = {
      id: nanoid(),
      name,
      phone,
    };
    const isExist = contacts.find(i => i.name === name);
    if (isExist) {
      return alert(name + ' is already in contacts');
    }
    setContacts(prevState => [...prevState, newContact]);
  };

  const onDeleteContact = Id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== Id));
  };

  const getVisibleContacts = () => {
    const normalizeFilter = search.toLowerCase();
    return contacts.filter(todo =>
      todo.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const handelSearchValue = event => {
    setSearch(event.currentTarget.value);
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={Style.app__wrapper}>
      <div className={Style.phonebook__body}>
        <h1 className={Style.phonebook__title}>Phonebook</h1>
        <div>
          <PhonebookForm addContact={addContact} />
          <h2 className={Style.phonebook__title}>Contacts</h2>
          <PhonebookSearch
            stateSearch={search}
            handelSearchValue={handelSearchValue}
          />
          <PhonebookContacts
            onDeleteContact={onDeleteContact}
            visibleContacts={visibleContacts}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
