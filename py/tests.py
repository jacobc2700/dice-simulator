from program import DiceProgram

d = DiceProgram(3, 6, 10)

def test_array():
    assert d.get_number_of_ways(3) == 1