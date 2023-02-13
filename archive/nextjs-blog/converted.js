class DiceProgram {
  constructor(dice, sides, total) {
    var array, cols, map, rows, total_count;

    this.dice = dice;
    this.sides = sides;
    this.total = total;
    rows = dice;
    cols = total;

    array = function () {
      var _pj_a = [],
        _pj_b = range(dice + 1);

      for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
        var i = _pj_b[_pj_c];

        _pj_a.push([0] * (total + 1));
      }

      return _pj_a;
    }.call(this);

    map = {};

    for (var s = 1, _pj_a = this.sides + 1; s < _pj_a; s += 1) {
      map[[1, s]] = [[s]];
    }

    for (var s = 1, _pj_a = this.sides + 1; s < _pj_a; s += 1) {
      array[1][s] = 1;
    }

    for (var d = 2, _pj_a = dice + 1; d < _pj_a; d += 1) {
      for (var t = 1, _pj_b = total + 1; t < _pj_b; t += 1) {
        map[[d, t]] = [];
        total_count = 0;

        for (var s = 1, _pj_c = sides + 1; s < _pj_c; s += 1) {
          if (
            _pj.in_es6(d - 1, range(rows)) &&
            _pj.in_es6(t - s, range(cols))
          ) {
            total_count += array[d - 1][t - s];

            if (_pj.in_es6([d - 1, t - s], map)) {
              for (
                var l,
                  _pj_f = 0,
                  _pj_d = map[[d - 1, t - s]],
                  _pj_e = _pj_d.length;
                _pj_f < _pj_e;
                _pj_f += 1
              ) {
                l = _pj_d[_pj_f];
                map[[d, t]].append(l + [s]);
              }
            }
          }
        }

        array[d][t] = total_count;
      }
    }

    this.array = array;
    this.map = map;
  }

  calculate_likelihood() {
    var row_sum;
    row_sum = 0;

    for (
      var val, _pj_c = 0, _pj_a = this.array[this.dice], _pj_b = _pj_a.length;
      _pj_c < _pj_b;
      _pj_c += 1
    ) {
      val = _pj_a[_pj_c];
      row_sum += val;
    }

    return this.array[this.dice][this.total] / row_sum;
  }

  get_number_of_ways(total) {
    return this.array[this.dice][total];
  }

  get_paths() {
    return this.map[[this.dice, this.total]];
  }
}
