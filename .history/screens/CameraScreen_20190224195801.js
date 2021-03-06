import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Camera, Permissions, BarCodeScanner } from "expo";

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    qrFeedback: null
  };
  this.onBarCodeScannedSuccess = this.onBarCodeScannedSuccess.bind(this)

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onBarCodeScannedSuccess({ type, data }) {
    this.setState({qrFeedback: 'data'})
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} 
            type={this.state.type}
            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={(data) => console.log(data)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>{this.state.qrFeedback}</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
