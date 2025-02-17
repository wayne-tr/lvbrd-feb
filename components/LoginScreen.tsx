import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  LoginWithOAuthInput,
  useLoginWithOAuth,
  useLogin,
} from "@privy-io/expo";
import { useState } from "react";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const { login } = useLogin();
  const oauth = useLoginWithOAuth({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });

  return (
    <View style={styles.container as ViewStyle}>
      <Text style={styles.welcomeText as TextStyle}>Welcome to Lovebird</Text>

      <View style={styles.square as ViewStyle}>
        <View style={styles.diagonal} />

        {/* Male Symbol */}
        <TouchableOpacity
          style={[styles.symbolContainer, styles.maleContainer] as ViewStyle[]}
          onPress={() =>
            oauth.login({ provider: "twitter" } as LoginWithOAuthInput)
          }
        >
          <Text style={[styles.symbol, { color: "#8B89FF" }] as TextStyle[]}>
            ♂
          </Text>
        </TouchableOpacity>

        {/* Female Symbol */}
        <TouchableOpacity
          style={
            [styles.symbolContainer, styles.femaleContainer] as ViewStyle[]
          }
          onPress={() => {
            login({ loginMethods: ["email"] })
              .then((session) => {
                console.log("User logged in", session.user);
              })
              .catch((err) => {
                setError(JSON.stringify(err.error) as string);
              });
          }}
        >
          <Text style={[styles.symbol, { color: "#FF69B4" }]}>♀</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  square: {
    width: 382,
    height: 382,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  diagonal: {
    position: "absolute",
    width: "141.4%", // √2 * 100% to account for rotation
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    top: "50%",
    left: "-20.7%",
    transform: [{ rotate: "-45deg" }],
  },
  symbolContainer: {
    position: "absolute",
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  maleContainer: {
    top: "12.5%",
    left: "12.5%",
  },
  femaleContainer: {
    bottom: "12.5%",
    right: "12.5%",
  },
  symbol: {
    fontSize: 40,
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
});
