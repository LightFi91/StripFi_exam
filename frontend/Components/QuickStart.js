import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, SafeAreaView, View, KeyboardAvoidingView } from "react-native";
import { Layout, Text, ViewPager } from "@ui-kitten/components";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from "react-native-paper";
import NativeBalance from "./Assets//NativeBalance";
import ERC20Balance from "./Assets/ERC20Balance";
import { useWalletConnect } from "../WalletConnect";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressBook, faCoins } from "@fortawesome/free-solid-svg-icons";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";

export default function QuickStart({ navigation }) {
  const color = "#315399";
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated
  } = useMoralis();
  const [address, setAddress] = useState();
  const [addInput, setAddInput] = useState();
  const [visible, setVisible] = useState(false);
  const [balances, setBalance] = useState([]);
  
  const hideDialog = () => setVisible(false);

  const getCoinsBalance = () => {
    setAddress(addInput);
  }

  const gotoTransfer = () => {
    if (isAuthenticated) {
      navigation.navigate("Transfer");
    }
  }

  const handleCryptoLogin = () => {
    console.log("[ND][login] called");
    authenticate({ connector })
      .then(() => {
        if (authError) {
          setErrortext(authError.message);
          setVisible(true);
        } 
        // else {
          // if (isAuthenticated) {
            // navigation.replace("Transfer");
          // }
        // }
      })
      .catch(() => {});
  }

  return (
    <Provider>
        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
          <ScrollView>
            <View style={styles.scrollViewContainer}>

              <KeyboardAvoidingView enabled>

                <View>
                  {authError && (
                    <Portal>
                      <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Authentication error:</Dialog.Title>
                        <Dialog.Content>
                          <Paragraph>
                            {authError ? authError.message : ""}
                          </Paragraph>
                        </Dialog.Content> 
                        <Dialog.Actions>
                          <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                  )}
                  {isAuthenticating && (
                    <ActivityIndicator animating={true} color={"white"} />
                  )}
                </View>
              </KeyboardAvoidingView>

              <View >
                <View style={styles.viewContainer}>
                  <View style={[styles.flex1, styles.inputView]}>
                    <View style={styles.viewContainer}>
                      <View style={[styles.flex1, { marginTop: 22 }]}>
                        <FontAwesomeIcon icon={faAddressBook} size={40} color={color} />
                      </View>
                      <View style={styles.flex4}>
                        <TextInput
                            mode="outlined"
                            
                            value={addInput}

                            // label="Address"
                            // placeholder="Public address (0x)"
                            onChangeText={(text) => setAddInput(text)}
                            style={ {backgroundColor: "white" }}
                            maxLength={42}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={getCoinsBalance}>
                    <Text style={styles.buttonTextStyle}>Fetch balances</Text>
                </TouchableOpacity>
                {  (address !== undefined) ? ( <>
                  <Text>ETH</Text>
                <NativeBalance chain="0x1" address={address}></NativeBalance>
                <Text>USDC</Text>
                <ERC20Balance symbol="USDC" address={address}></ERC20Balance>
                <Text>USDT</Text>
                <ERC20Balance symbol="USDT" address={address}></ERC20Balance>
                </>) : (<></>)}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={isAuthenticated? gotoTransfer : handleCryptoLogin}>
                    {isAuthenticated ? (<Text style={styles.buttonTextStyle}> Transfer </Text>) : (<Text style={styles.buttonTextStyle}> Login with metamask </Text>)}
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "white",
    },
    scrollViewContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    chainText: {
        fontSize: 15,
        color: "#414a4c",
        paddingTop: 20,
        paddingHorizontal: 5,
        fontWeight: "600",
    },
    headerText: {
        color: "black",
        fontWeight: "600",
        fontSize: 35,
    },
    buttonStyle: {
      backgroundColor: "#7DE24E",
      borderWidth: 0,
      color: "#FFFFFF",
      borderColor: "#7DE24E",
      height: 40,
      alignItems: "center",
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
    },
    buttonTextStyle: {
      color: "#FFFFFF",
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: "600",
    },
    viewContainer: {
        // paddingHorizontal: 20,
        // paddingTop: 10,
        // flex: 10,
        flexDirection: "row"
    },
    inputStyle: {
      flex: 1,
      color: "grey",
      
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: "white",
      backgroundColor: "#dadae8"
    },
    inputView: {
      borderColor: "grey",
      borderRadius: 15,
      borderWidth: 0.5,
      justifyContent: "space-around",
      // shadowOffset: "5",
      elevation: 10,
      marginTop: 10,
      padding: 20,
      shadowColor: "grey",
      // shadowOffset: { width: 0, height: 3 },
      // shadowOpacity: 0.2,
      // shadowRadius: 10,
    },
    flex1: {
      flex: 1,
    },
    flex4: {
      flex: 4,
    },
});