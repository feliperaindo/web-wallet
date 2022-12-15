import { Component } from 'react';

class WalletForm extends Component {
  state = {
    valueInput: 0,
  };

  render() {
    const { valueInput } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          <input
            type="number"
            name="valueInput"
            id="value-input"
            data-testid="value-input"
            value={ valueInput }
          />
        </label>
      </form>
    );
  }
}

export default WalletForm;
