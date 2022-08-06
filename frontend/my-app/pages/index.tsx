import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import styles from "../styles/Home.module.css";
import { useEffect, useMemo } from "react";
import { getJokes } from "../store/jokes/jokes";

const Home: NextPage = () => {
  const [cookies, setCookie] = useCookies(["joke"]);
  const dispatch = useDispatch();
  const { jokes, loading, error } = useSelector(
    (state: any) => state.JokeReducer
  );
  useEffect(() => {
    if (!error.message.length) {
      dispatch(getJokes());
    }
  }, [error, dispatch]);

  const availJoke = useMemo(() => {
    for (let i = 0; i < jokes.length; ++i) {
      if (!cookies.joke || !Object.keys(cookies.joke).includes(i.toString())) {
        return [i, jokes[i]];
      }
    }
  }, [jokes, cookies.joke]);

  return (
    <>
      {jokes && jokes.length && (
        <div className={styles.container}>
          <Head>
            <title>My App</title>
            <meta name="description" content="My App" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>A joke a day keeps the doctor away</h1>
            <br />

            {availJoke && (
              <div className={styles.grid}>
                <a className={styles.dialog}>
                  <p>{availJoke[1]}</p>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    setCookie("joke", { ...cookies.joke, [availJoke[0]]: 1 })
                  }
                  style={{ backgroundColor: "#008CBA" }}
                  className={styles.card}
                >
                  <p>This is funny!</p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCookie("joke", { ...cookies.joke, [availJoke[0]]: -1 })
                  }
                  className={styles.card}
                >
                  <p>This is not funny</p>
                </button>
              </div>
            )}
            {!availJoke && (
              <div className={styles.grid}>
                <a className={styles.dialog}>
                  <p>That's all the jokes for today! Come back another day!</p>
                </a>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
