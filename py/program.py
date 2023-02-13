import numpy as np
import itertools

class DiceProgram:
    # any number of dice, where each has some number of sides, in order to add to create every sum from 1 up to total.
    def __init__(self, dice, sides, total):
        assert dice >= 1
        assert total >= 0
        assert sides >= 1

        self.dice = dice
        self.sides = sides
        self.total = total

        rows = dice
        cols = total
        array = [ [0] * (total + 1) for i in range(dice + 1) ]
        map = {}

        for s in range(1, self.sides + 1):
            map[(1, s)] = [[s]]

        for s in range(1, self.sides + 1):
            array[1][s] = 1

        for d in range(2, dice + 1):
            for t in range(1, total + 1):
                map[(d, t)] = []
                total_count = 0

                for s in range(1, sides + 1):
                    if d-1 in range(rows) and t - s in range(cols):
                        total_count += array[d - 1][t - s]

                        if (d - 1, t - s) in map:
                            for l in map[(d - 1,t - s)]:
                                map[(d, t)].append(l + [s])

                array[d][t] = total_count
        
        self.array = array
        self.map = map
    
    # return the likelihood of receiving a sum given dice, sides, and total.
    # assumes the sample space of the possible sums rolling the given dice.
    def calculate_likelihood(self):
        row_sum = 0

        for val in self.array[self.dice]:
            row_sum += val
        
        return self.array[self.dice][self.total] / row_sum
    
    # return the number of ways to reach some total.
    def get_number_of_ways(self, total):
        return self.array[self.dice][total]

    # return all the paths to reach a total.
    def get_paths(self):
        return self.map[(self.dice, self.total)]