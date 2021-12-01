function getAllPairs(array) {
    var pairs = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            pairs.push([array[i], array[j]]);
        }
    }
    return pairs;
}

function fill(pairs, result = [], half) {
    function check(array) {
        return array.every((s => a => a.every(v => !s.has(v) && s.add(v)))(new Set));
    }

    if (!pairs.length) return result;

    var left = result.slice(Math.floor(result.length / half) * half);

    for (let i = 0; i < pairs.length; i++) {
        if (!check([...left, pairs[i]])) continue;
        var newResult = fill([...pairs.slice(0, i), ...pairs.slice(i + 1)], [...result, pairs[i]], half);
        if (newResult) return newResult; // i miss something like returnIf
    }
}

function pairGenerator(systemIpsArr) {
    var data = systemIpsArr,
    half = data.length / 2,
    temp = fill(getAllPairs(data),[], half),
    result = [],
    i = 0;

    while (i < temp.length) result.push(temp.slice(i, i += half));
    let output = [];
    for (let i = 0; i < result.length; i++) {
        let obj = {
            seq: i + 1,
            set_name: `Set ${i + 1}`,
            call_set: []
        }
        for (let j = 0; j < result[i].length; j++) {
            obj.call_set.push({ [`call_pair`]: result[i][j], callTime: '' });
        }
        output.push(obj);
    }
    return output;
}
module.exports = { pairGenerator };