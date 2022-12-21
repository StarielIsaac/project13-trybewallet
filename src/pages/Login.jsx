import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUserEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    passwordInput: '',
    loginInput: '',
    buttonForm: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validations());
  };

  validations = () => {
    const minLength = 6;
    const { loginInput, passwordInput } = this.state;
    const resultEmail = this.validateEmail(loginInput);
    const resultSenha = passwordInput.length >= minLength;
    if (resultEmail && resultSenha) {
      this.setState({
        buttonForm: false,
      });
    } else {
      (
        this.setState({
          buttonForm: true,
        })
      );
    }
  };

  validateEmail = (email) => {
    const result = /\S+@\S+\.\S+/;
    return result.test(email);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { loginInput } = this.state;
    dispatch(actionUserEmail(loginInput));
    this.setState({
      loginInput: '',
      passwordInput: '',
    });
    history.push('/carteira');
  };

  render() {
    const { passwordInput, loginInput, buttonForm } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="login-Id">
            Email:
            <input
              data-testid="email-input"
              type="email"
              id="login-Id"
              name="loginInput"
              value={ loginInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-Id">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              id="password-Id"
              name="passwordInput"
              value={ passwordInput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ buttonForm }
            onClick={ this.handleClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
