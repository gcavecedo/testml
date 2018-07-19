

function horizontal(dna) {
    return dna.some(function (row) {
        return row.match(/A{4}|T{4}|C{4}|G{4}/) != null
    })
}

function vertical(dna) {
    var col, row, times, last
    for (col = 0; col < dna[0].length; col++) {
        times = 0
        last = null
        for (row = 0; row < dna.length; row++) {
            if (dna[row].charAt(col) == last) {
                if (times == 3) {
                    return true
                }
                times++
            } else {
                last = dna[row].charAt(col)
                times = 1
            }
        }
    }
    return false
}

function crosswiseRight(dna, n) {
    // Omitir las esquinas de 3x3 ya que no hay espacio para 4 letras consecutivas
    var n4 = n - 4
    var col = 0
    var row = n4
    var times, last, len, i
    while (col <= n4) {
        times = 0
        last = null
        len = Math.min(n - row, n - col)
        
        for (i = 0; i < len; i++) {
            if (dna[row + i].charAt(col + i) == last) {
                if (times == 3) {
                    return true
                }
                times++
            } else {
                last = dna[row + i].charAt(col + i)
                times = 1
            }
        }

        if (row > 0) {
            row--
        } else {
            col++
        }
    }
    return false
}
function crosswiseLeft(dna, n) {
    // Omitir las esquinas de 3x3 ya que no hay espacio para 4 letras consecutivas
    var n4 = n - 4
    var col = n - 1
    var row = n4
    var times, last, len, i
    while (col >= 3) {
        times = 0
        last = null
        len = Math.min(n - row, col + 1)
        for (i = 0; i < len; i++) {
            if (dna[row + i].charAt(col - i) == last) {
                if (times == 3) {
                    return true
                }
                times++
            } else {
                last = dna[row + i].charAt(col - i)
                times = 1
            }
        }

        if (row > 0) {
            row--
        } else {
            col--
        }
    }
    return false
}

function isMutant(dna) {
    if (dna.length <= 3) {
        return false
    }
    return horizontal(dna) || vertical(dna) || crosswiseRight(dna, dna.length) || crosswiseLeft(dna, dna.length)
}

module.exports = isMutant