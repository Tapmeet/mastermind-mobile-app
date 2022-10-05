import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Content, Item, Input } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import verificationStyle from "../../style/verification/verifcationStyle";

class OtpInputs extends React.Component {
  state = { otp: [] };
  otpTextInput = [];

  componentDidMount() {
    this.otpTextInput[0]._root.focus();
    
  }

  renderInputs() {
    const inputs = Array(6).fill(0);
    const txt = inputs.map((i, j) => (
      <Col key={j} style={styles.txtMargin}>
         <View  style={styles.gridPad} regular>
          <TextInput
            style={verificationStyle.formControl}
            onChangeText={(v) => this.focusNext(j, v)}
            onKeyPress={(e) => this.focusPrevious(e.nativeEvent.key, j)}
            ref={(ref) => (this.otpTextInput[j] = ref)}
            maxLength={1}
          />
         </View >
      </Col>
    ));
    return txt;
  }

  focusPrevious(key, index) {
    if (key === "Backspace" && index !== 0)
      this.otpTextInput[index - 1]._root.focus();
  }

  focusNext(index, value) {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1]._root.focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index]._root.blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({ otp });
    this.props.getOtp(otp.join(""));
  }

  render() {
    return (
      <View style={{ display: "flex", width: "100%", position:"relative", zIndex: 9999 }}>
        <Grid style={styles.gridPad}>{this.renderInputs()}</Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridPad: { padding: 0, borderColor: "#fff" },
  txtMargin: { margin: 0, borderColor: "#fff" },
  inputRadius: { textAlign: "center", borderColor: "#fff" },
});

export default OtpInputs;
