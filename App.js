import { useReducer, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// actions
const counterActions = {
  inc: "INCREASE_COUNTER",
  dec: "DECREASE_COUNTER",
};

// reducer
function couterReducer(state, { type, payload }) {
  switch (type) {
    case counterActions.inc:
      return state + (payload || 1);
    case counterActions.dec:
      return state - (payload || 1);
    default:
      return state;
  }
}

function dispatchUsersMiddleware(dispatch) {
  return async function (action) {
    switch (action.type) {
      case "LOAD_DATA":
        try {
          const res = await fetch("https://api.github.com/users");
          const json = await res.json();
          dispatch({ type: "SUCCESS_USERS", payload: json });
        } catch (err) {
          dispatch({ type: "REJECTED_USERS", payload: err });
        }
        break;
      default:
        dispatch(action);
        break;
    }
  };
}

// usersReducer
function usersReducer(state, { type, payload }) {
  switch (type) {
    case "PENDING_USERS":
      return {
        ...state,
        pending: true,
      };
    case "SUCCESS_USERS":
      return {
        ...state,
        data: payload,
        pending: false,
      };
    case "REJECTED_USERS":
      return {
        ...state,
        rejected: true,
      };
    default:
      return state;
  }
}

function HomeScreen({ navigation }) {
  const [state, setstate] = useState(20);

  // state
  const [counter, dispatchCounter] = useReducer(couterReducer, 10);

  // state call api
  const [usersState, dispatchState] = useReducer(usersReducer, {
    data: [],
    pending: false,
    rejected: false,
  });

  const dispatch = dispatchUsersMiddleware(dispatchState);

  const loadUsersList = () => {
    dispatchState({ type: "PENDING_USERS" });
    dispatch({ type: "LOAD_DATA" });
  };

  console.log(usersState);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />

      <Button
        title={"Increase " + state}
        onPress={() => setstate((prev) => prev + 1)}
      />
      <Button
        title={"Decrease " + counter}
        onPress={() => dispatchCounter({ type: counterActions.inc })}
      />
      <Button title={"Load Users "} onPress={loadUsersList} />
      <Text>Home Screen</Text>
      {usersState.pending ? (
        <Text>loading...</Text>
      ) : (
        usersState.data.map((user) => <Text key={user.id}>{user.login}</Text>)
      )}
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: "test title here",
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor="#212121" style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
