import React from "react";
import { StyleSheet, Button, ScrollView, Text } from "react-native";
import { Proptypes } from "prop-types";
import { Icon, List } from "antd-mobile/lib";

const Item = List.Item;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getMarkets = this.getMarkets.bind(this);
    this.state = {
      markets: []
    };
  }

  componentDidMount() {
    this.getMarkets();
  }

  getMarkets() {
    fetch("https://bittrex.com/api/v1.1/public/getmarkets")
      .then(res => res.json())
      .then(response => {
        this.setState({
          markets: response.result
        });
      });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <List style={styles.listContainer}>
          {this.state.markets.map((market, index) => (
            <Item
              style={{ paddingTop: 5, paddingBottom: 5 }}
              align="top"
              thumb={market.LogoUrl}
              extra={market.MarketCurrency}
              multipleLine
              key={index}
            >
              {market.MarketCurrencyLong}
            </Item>
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default Home;
