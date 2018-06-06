import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, InputItem, List } from "antd-mobile";
import { createForm } from "rc-form";

const Item = List.Item;
//todo
class Login extends React.Component {
/*   constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        const form = this.props.form.getFieldsValue();
        if (form.password == 14901991) {
          Actions.wallet();
        } else {
          alert("Yanlış şifre!");
        }
      } else {
        alert("Validation failed");
      }
    });
  } */
  render() {
/*     const { getFieldProps, getFieldError } = this.props.form;
 */    return (
      <View style={styles.viewContainer}>
{/*         <List style={styles.listContainer}>
          <InputItem
            {...getFieldProps("password", {
              rules: [{ required: true, message: "Şifre giriniz" }]
            })}
            clear
            error={!!getFieldError("password")}
            onErrorClick={() => {
              alert(getFieldError("password").join(", "));
            }}
            labelNumber="6"
          >
            Password:
          </InputItem>
          <Item>
            <Button
              type="primary"
              style={styles.button}
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </Item>
        </List> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listContainer: {
    width: "80%"
  },
  button: {
    marginTop: 10
  }
});

/* export default createForm()(Login);
 */export default Login;
