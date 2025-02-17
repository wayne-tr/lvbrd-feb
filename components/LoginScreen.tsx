import { Button, Linking, Text, View } from "react-native";
import {
  LoginWithOAuthInput,
  useLoginWithOAuth,
  useLogin,
} from "@privy-io/expo";
import { useLoginWithPasskey } from "@privy-io/expo/passkey";
import Constants from "expo-constants";
import { useState } from "react";
import * as Application from "expo-application";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const { loginWithPasskey } = useLoginWithPasskey({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });
  const { login } = useLogin();
  const oauth = useLoginWithOAuth({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginHorizontal: 10,
      }}
    >
      <Button
        title="Login with Privy UIs"
        onPress={() => {
          login({ loginMethods: ["twitter"] })
            .then((session) => {
              console.log("User logged in", session.user);
            })
            .catch((err) => {
              setError(JSON.stringify(err.error) as string);
            });
        }}
      />

      <View
        style={{ display: "flex", flexDirection: "column", gap: 5, margin: 10 }}
      >
        {["twitter"].map((provider) => (
          <View key={provider}>
            <Button
              title={`Login with ${provider}`}
              disabled={oauth.state.status === "loading"}
              onPress={() => oauth.login({ provider } as LoginWithOAuthInput)}
            ></Button>
          </View>
        ))}
      </View>
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
}
