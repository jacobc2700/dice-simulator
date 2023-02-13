function makeArray(r, c) {
  let result = [];

  for (let i = 0; i < r; i++) {
    let nested = [];
    for (let j = 0; j < c; j++) {
      nested.push(0);
    }

    result.push(nested);
  }

  return result;
}

function sortObj(obj) {
  // Sort object as list based on values
  return Object.keys(obj)
    .map((k) => [k, obj[k]])
    .sort((a, b) => b[1] - a[1]);
}
// const create = function (dice, sides, total) {
//   let rows = dice;
//   let columns = total;

//   let array = makeArray(dice + 1, total + 1);
//   let m = {};
//   console.log(array);

//   for (let s = 1; s <= sides; s++) {
//     m[[1, s]] = [[s]];
//   }

//   for (let s = 1; s <= sides; s++) {
//     array[1][s] = 1;
//   }

//   for (const key in m) {
//     console.log("The value for " + key + " is = " + m[key]);
//   }

//   for (let d = 2; d <= dice; d++) {
//     for (let t = 1; t <= total; t++) {
//       m[[d, t]] = [];
//       let total_count = 0;

//       for (let s = 1; s <= sides; s++) {
//         if (d - 1 >= 0 && d - 1 <= rows && t - s >= 0 && t - s <= columns) {
//           total_count += array[d - 1][t - s];

//           if ([d - 1, t - s] in m) {
//             for (l in m[[d - 1, t - s]]) {
//               //   console.log("HERE");
//               //   console.log(l);
//               let copy = [...l];
//               copy.push(s);
//               //   l.push(s);
//               m[[d, t]].push(copy);
//               //   console.log(l + [s]);
//             }
//           }
//         }
//       }

//       array[d][t] = total_count;
//     }
//   }

//   //   console.log(array);
//   //   console.log([...m.entries()]);
//   return [m, array];
// };

// const { m, array } = create(3, 6, 10);
// for (const key in m) {
//   console.log("The value for " + key + " is = " + m[key]);
// }

// //     for d in range(2, dice + 1):
// //         for t in range(1, total + 1):
// //             map[(d, t)] = []
// //             total_count = 0

// //             for s in range(1, sides + 1):
// //                 if d-1 in range(rows) and t - s in range(cols):
// //                     total_count += array[d - 1][t - s]

// //                     if (d - 1, t - s) in map:
// //                         for l in map[(d - 1,t - s)]:
// //                             map[(d, t)].append(l + [s])

// //             array[d][t] = total_count

// //     self.array = array
// //     self.map = map

// // def calculate_likelihood(self):
// //     row_sum = 0

// //     for val in self.array[self.dice]:
// //         row_sum += val

// //     return self.array[self.dice][self.total] / row_sum

// // def get_number_of_ways(self, total):
// //     return self.array[self.dice][total]

// // def get_paths(self):
// //     return self.map[(self.dice, self.total)]

const create = function (dice, sides, total) {
  //   console.log(dice, sides, total);
  let array = makeArray(dice + 1, total + 1);
  //   console.log(array);

  let m = {};

  for (let s = 1; s <= sides; s++) {
    m[[1, s]] = [[s]];
  }

  for (let s = 1; s <= sides; s++) {
    array[1][s] = 1;
  }

  //   console.log(m);
  //   console.log(array);

  for (let d = 2; d <= dice; d++) {
    for (let t = 1; t <= total; t++) {
      m[[d, t]] = [];
      let total_count = 0;

      for (let s = 1; s <= sides; s++) {
        if (d - 1 >= 0 && d - 1 < dice && t - s >= 0 && t - s < total) {
          total_count += array[d - 1][t - s];

          if ([d - 1, t - s] in m) {
            // for (let j = 0 j < m[[d - 1, t - s]]);
            for (let j = 0; j < m[[d - 1, t - s]].length; j++) {
              //   console.log(j);
              //   console.log("HEREs");
              //   console.log(m[[d - 1, t - s]]);
              let mx = [...m[[d - 1, t - s]][j]];
              mx.push(s);
              m[[d, t]].push(mx);
            }
          }
        }
      }
      array[d][t] = total_count;
    }
  }

  //   likelihood too
  let row_sum = 0;

  for (let x = 0; x < array[dice].length; x++) {
    row_sum += array[dice][x];
  }

  //   def calculate_likelihood(self):
  //   row_sum = 0

  //   for val in self.array[self.dice]:
  //       row_sum += val

  //   return self.array[self.dice][self.total] / row_sum
  //   console.log(array);
  //   console.log(m);
  let prob = {};

  for (let nx = 0; nx < array[dice].length; nx++) {
    if (array[dice][nx] != 0) {
      prob[nx] = array[dice][nx] / row_sum;
    }
  }
  prob = sortObj(prob);
  //   console.log(prob);
  //   console.log("here");
  return [array, m, prob];
};

// create(3, 6, 10);

export { create };
//
