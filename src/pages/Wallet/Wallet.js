import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "antd-mobile";
import { sha512 } from "js-sha512";
import { SECRET_KEY, PUBLIC_KEY } from "../../constants/keys";

const Item = List.Item;
const Brief = Item.Brief;

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.getWallet = this.getWallet.bind(this);
    this.getMarkets = this.getMarkets.bind(this);
    this.calculate = this.calculate.bind(this);
    this.state = {
      wallet: [],
      markets: [],
      walletWithPrice: []
    };
  }

  getWallet() {
    //these keys are private
    const secretKey = SECRET_KEY;
    const publicKey = PUBLIC_KEY;
    const nonce = new Date().getTime();
    const uri = `https://bittrex.com/api/v1.1/account/getbalances?apikey=${publicKey}&nonce=${nonce}`;
    const encrypted = sha512.hmac.create(secretKey);
    encrypted.update(uri);
    encrypted.hex();
    fetch(uri, {
      headers: {
        apisign: encrypted
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          wallet: res.result
        });
      });
  }

  getMarkets() {
    fetch("https://bittrex.com/api/v1.1/public/getmarkets")
      .then(res => res.json())
      .then(res => {
        this.setState({
          markets: res.result
        });
      });
  }

  calculate() {
    const { wallet, markets } = this.state;
    const walletWithPrice = wallet.map(w => {
      const market = markets.find(m => m.MarketCurrency === w.Currency);
      return market
        ? {
            ...w,
            logoUrl: market.LogoUrl,
            currencyName: market.MarketCurrencyLong
          }
        : w;
    });
    this.setState({
      walletWithPrice: walletWithPrice
    });
  }

  componentDidMount() {
    this.getWallet();
    this.getMarkets();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.wallet.length > 0 &&
      this.state.markets.length > 0 &&
      this.state.walletWithPrice.length === 0
    ) {
      this.calculate();
    }
  }

  render() {
    const { wallet, markets, walletWithPrice } = this.state;
    console.log("walet,", walletWithPrice);
    return (
      <View>
        <List style={styles.listContainer}>
          {this.state.walletWithPrice
            .filter(currency => currency.Available > 0)
            .map((currency, index) => (
              <Item
                align="top"
                thumb={currency.logoUrl}
                extra={currency.Balance.toString()}
                multipleLine
                key={index}
              >
                {currency.Currency}
                <Brief>{`Available: ${currency.Available}`}</Brief>
              </Item>
            ))}
        </List>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default Wallet;
