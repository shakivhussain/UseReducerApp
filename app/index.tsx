import { StyleSheet, Text, View } from "react-native";
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import UserProfile from "./components/UserProfile";

export default function Page() {
  return (
    <View >
      <UserProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
