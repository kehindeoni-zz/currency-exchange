import React, { Component } from 'react';
import './App.css';

export const fetchExchangeRateUSD = {
  get(amount) {
    return new Promise((resolve, reject) => {
      fetch('http://api.fixer.io/latest?base=USD').then(res=> {
        resolve(res.json());
      }).catch(error => {
        reject();
      });
    })
  }
}

export class Form extends Component {
  constructor() {
    super();
    this.fetchExchangeRate = this.fetchExchangeRate.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.state = {
      convertedAmount: 0,
      initialCurrency: ''
    }
  }

  fetchExchangeRate(e) {
    e.preventDefault();
    const amount = this.refs.amount.value;
    
    if(amount) {
      fetchExchangeRateUSD.get(amount)
        .then(response => {
          const rates = response.rates;
          const currency = rates[`${this.state.initialCurrency}`];
          const convertedAmount = amount/currency;
          this.setState({convertedAmount: convertedAmount });
        }).catch(error => {
          this.setStae({error: 'Error converting amount'});
        })
    } else {
      this.setStae({error: 'Please enter an amount'});
    }
  }

  setCurrency() {
    const initialCurrency = this.refs.currencies.value;
    this.setState({initialCurrency: initialCurrency});
  }
 
  render() {
    const { convertedAmount } = this.state;
    return (
      <div>
        <div className="form-inline">
          <div className="form-group">
            <select ref="currencies" onChange={this.setCurrency}>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="PHP">PHP</option>
              <option value="ZAR">ZAR</option>
            </select>
            <input type="number" ref="amount" placeholder="Enter amount" />
            <button className="btn btn-primary" onClick={ this.fetchExchangeRate }>Submit</button>
            
          </div>
        </div>
        <p className="lead">{ `USD ${convertedAmount}` }</p>
      </div>
    )
  }
}

export class MainApp extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-zm-8 col-sm-offset-2 text-center">
          <h3>Get the exchange rate of any currency in USD</h3>
          <Form />
        </div>
      </div>
    );
  }
}

export default MainApp;
