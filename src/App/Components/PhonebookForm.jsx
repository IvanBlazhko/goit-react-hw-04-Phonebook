import PropTypes from 'prop-types';
import Style from '../Style/Phonebook.module.css';
import {Component} from "react";

class PhonebookForm extends Component {
  state = {
    name: '',
    tel: '',
  }
  handelInputValue = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handelSubmit = event => {
    event.preventDefault();
    this.props.addContact(this.state.name, this.state.tel);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', tel: '' });
  };
  render() {
    const { tel, name } = this.state
    return (
      <form onSubmit={this.handelSubmit}>
        <label htmlFor="" className={Style.phonebook__text}>
          Name
          <input
            type="text"
            name="name"
            onChange={this.handelInputValue}
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
            onChange={this.handelInputValue}
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
  }
}

export default PhonebookForm;

PhonebookForm.propTypes = {
  addContact: PropTypes.func
};
