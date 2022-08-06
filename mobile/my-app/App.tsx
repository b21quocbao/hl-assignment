import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./store/configureStore";
import { clearErrors, getJokes } from "./store/jokes/jokes";
import rootSaga from "./store/sagas";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
  const [cookies, setCookie] = useState();
  const dispatch = useDispatch();
  const { jokes, loading, error } = useSelector(
    (state: any) => state.JokeReducer
  );
  useEffect(() => {
    const start = async () => {
      const data = await AsyncStorage.getItem("cookies");
      if (data) {
        setCookie(JSON.parse(data));
      }
    };
    start();
  }, []);
  useEffect(() => {
    if (!error.message.length) {
      dispatch(getJokes());
    }
  }, [error, dispatch]);

  const availJoke = useMemo(() => {
    for (let i = 0; i < jokes.length; ++i) {
      if (!cookies || !Object.keys(cookies).includes(i.toString())) {
        return [i, jokes[i]];
      }
    }
  }, [jokes, cookies]);

  return (
    <View style={[styles.container]}>
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
          <Button
            title="Retry"
            onPress={() => {
              dispatch(clearErrors());
            }}
          />
        </View>
      ) : null}
      {!error.message.length && (
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            A joke a day keeps the doctor away
          </Text>
          {availJoke && (
            <View>
              <Text>{availJoke[1]}</Text>
              <View style={[styles.button]}>
                <Button
                  title="This is funny!"
                  onPress={() => {
                    setCookie((prevState: any) => {
                      AsyncStorage.setItem(
                        "cookies",
                        JSON.stringify({
                          ...prevState,
                          [availJoke[0]]: 1,
                        })
                      );
                      return {
                        ...prevState,
                        [availJoke[0]]: 1,
                      };
                    });
                  }}
                />
              </View>
              <View style={[styles.button]}>
                <Button
                  title="This is not funny"
                  onPress={() => {
                    setCookie((prevState: any) => {
                      AsyncStorage.setItem(
                        "cookies",
                        JSON.stringify({
                          ...prevState,
                          [availJoke[0]]: -1,
                        })
                      );
                      return {
                        ...prevState,
                        [availJoke[0]]: -1,
                      };
                    });
                  }}
                />
              </View>
            </View>
          )}
          {!availJoke && (
            <View>
              <Text>
                That's all the jokes for today! Come back another day!
              </Text>
              <View style={[styles.button]}>
                <Button
                  title="Remove cookie"
                  onPress={() => {
                    setCookie(() => {
                      AsyncStorage.removeItem("cookies");
                      return {};
                    });
                  }}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default function App() {
  const store = configureStore();
  store.runSaga(rootSaga);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
  },
});
