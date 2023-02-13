import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { create } from "../modules/calculations";
import { PieChart } from "react-minimal-pie-chart";

// function createPathCard(obj) {
// return <p>{obj}</p>;
// }
function isPositiveInteger(str) {
  if (typeof str !== "string") {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}

export default function Home() {
  const [dice, setDice] = useState();
  const [sides, setSides] = useState();
  const [total, setTotal] = useState();
  const [paths, setPaths] = useState();
  // const [likelihoods, setLikelihoods] = useState();
  const [pathCount, setPathCount] = useState();
  // const [likelihoodCount, setLikelihoodCount] = useState();
  // const [isNotValid, setIsNotValid]' = useState();
  // const [paths, setPaths] = useState();
  // const [paths, setPaths] = useState();

  const calculate = () => {
    let a = dice == undefined || !Number.isInteger(dice.trim());
    let b = sides == undefined || !Number.isInteger(sides.trim());
    let c = total == undefined || !Number.isInteger(total.trim());
    // if (a
    // console.log(isInt(a), isInt(b), isInt(c));
    // console.log(isPositiveInteger(a));
    if (
      !isPositiveInteger(dice) ||
      !isPositiveInteger(sides) ||
      !isPositiveInteger(total)
    ) {
      return;
    }
    // } else {
    // setIsNotValid(false);
    // }
    // no empty inputs, dice >= 1, sides >= 1, total >= 0.
    // console.log("clicked");
    // console.log(dice, sides, total);
    const helper = create(dice, sides, total);
    let array = helper[0];
    let m = helper[1];
    let prob = helper[2];

    // console.log(prob);
    // console.log(m[[dice, total]]);
    // let showValues = {
    // paths: m[/[dice, total]],
    // likelihoods: prob,
    // };

    // setPaths(m[[dice, total]]);
    setPathCount(m[[dice, total]].length);
    // setLikelihoodCount(prob.length);
    // console.log(m[[dice, total]].toString());
    // use a string for paths, for mat it here.
    let path_res = "[";
    for (let i = 0; i < m[[dice, total]].length; i++) {
      let p = m[[dice, total]][i];
      let curr_2 = "[";

      for (let i = 0; i < p.length; i++) {
        if (i == p.length - 1) {
          curr_2 += "" + p[i];
        } else {
          curr_2 += "" + p[i] + ", ";
        }
      }
      path_res += curr_2 + "]";
      // console.log(p);
      // let s = "[" + p.toString() + "]";
      // console.log(s);
      // path_res += s;
    }
    path_res += "]";

    let prob_res = "";

    for (let i = 0; i < prob.length; i++) {
      let value = prob[i][0];
      let probability = Math.round(prob[i][1] * 100);
      let curr = "[" + value + ": " + probability + "%" + "]";
      console.log(curr);
      prob_res += curr;
    }

    // console.log(prob);
    // setLikelihoods(prob_res);
    setPaths(path_res);
    // console.log(showValues[paths]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dice Simulator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a target="_blank" href="https://en.wikipedia.org/wiki/Dice">
            Dice Simulator
          </a>
        </h1>

        <p className={styles.description}>
          Get started by entering any number of <code>dice</code>, the number of
          <code>sides</code> each dice has, and the <code>total</code> you would
          like to evaluate.
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h3>Dice &rarr;</h3>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={dice}
              onChange={(e) => setDice(e.target.value)}
            />
          </a>

          <a href="#" className={styles.card}>
            <h3>Sides &rarr;</h3>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={sides}
              onChange={(e) => setSides(e.target.value)}
            />
          </a>

          <a href="#" className={styles.card}>
            <h3>Total &rarr;</h3>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </a>
        </div>
        <div>
          <Button variant="outlined" onClick={calculate}>
            Evaluate
          </Button>
        </div>
        <div className={styles.customBox}>
          {pathCount >= 1 && (
            <p className={styles.description}>
              Paths: {paths} ({pathCount})
            </p>
          )}
          {/* {likelihoodCount >= 1 && (
            <p className={styles.description}>
              Likelihoods: {likelihoods} ({likelihoodCount})
            </p>
          )} */}
        </div>
        {/* <div className={styles.customBox}> */}
        {/* {
            <p className={styles.description}>
              Likelihoods: {likelihoods} ({likelihoodCount})
            </p>
          }
        </div> */}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
