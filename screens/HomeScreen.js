import { useState, useContext } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { contexts } from "./../contexts";
import { dispatchUsersMiddleware } from "./../store/actions/dispatchUsersMiddleware";
import { counterActions } from "./../store/actions/counterActions";

function HomeScreen({ navigation }) {
  const [state, setstate] = useState(20);

  const { usersState, dispatchState, counter, dispatchCounter } =
    useContext(contexts);

  const dispatch = dispatchUsersMiddleware(dispatchState);

  const loadUsersList = () => {
    dispatchState({ type: "PENDING_USERS" });
    dispatch({ type: "LOAD_DATA" });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
}

export default HomeScreen;
