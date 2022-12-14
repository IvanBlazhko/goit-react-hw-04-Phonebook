import PropTypes from 'prop-types';


import PhonebookContactItem from "./PhonebookContactsItem";

export const PhonebookContacts = ({visibleContacts, onDeleteContact}) => {
    return (
      <div>
        <div>
          {visibleContacts.map(({ name, id, phone }) => (
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
    );
}

export default PhonebookContacts;

PhonebookContacts.prototype = {
  visibleContacts: PropTypes.func,
  onDeleteContact: PropTypes.func
}
