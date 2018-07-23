/**
 * @file is-mutant.js
 *
 * Exporta la función "isMutant", que sirve para
 * determinar si un DNA representa a un Humano o
 * a un Mutante
 *
 */
'use strict'


 /**
  * Expresión regular para verificar ocurrencias
  * horizontales.
  */
const horizontalRegex = /A{4}|T{4}|C{4}|G{4}/


/**
 * Verifica si, dada una matriz con DNA, existen
 * 4 letras iguales contiguas de forma horizontal
 * usando la expresión regular "horizontalRegex".
 *
 * @param {dna} Array de Strings
 * @return boolean
 */
function horizontal(dna) {
    return dna.some(function (row) {
        return row.match(horizontalRegex) != null
    })
}

/**
 * Verifica si, dada una matriz con DNA, existen
 * 4 letras iguales contiguas de forma vertical.
 *
 * @param {dna} Array de Strings
 * @return boolean
 */
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

/**
 * Verifica si, dada una matriz con DNA, existen
 * 4 letras iguales contiguas de forma diagonal
 * hacia la derecha. Se ignoran las esquinas
 * donde no hay lugar para 4 letras.
 *
 * @param {dna} Array de Strings
 * @return boolean
 */
function crosswiseRight(dna, n) {
    // Omitir las esquinas de 3x3 ya que 
    // no hay espacio para 4 letras consecutivas
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

/**
 * Verifica si, dada una matriz con DNA, existen
 * 4 letras iguales contiguas de forma diagonal
 * hacia la izquierda. Se ignoran las esquinas
 * donde no hay lugar para 4 letras.
 *
 * @param {dna} Array de Strings
 * @return boolean
 */
function crosswiseLeft(dna, n) {
    // Omitir las esquinas de 3x3 ya que 
    // no hay espacio para 4 letras consecutivas
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

/**
 * Determina si un DNA representa a un humano
 * o a un mutante. Verifica la existencia de
 * 4 letras iguales contiguas de forma
 * horizontal, vertical u oblicua.
 * Se ignoran los casos de 3x3 ya que no hay
 * espacio para las 4 letras.
 *
 * @param {dna} Array de Strings
 * @return boolean
 */
function isMutant(dna) {
    if (dna.length <= 3) {
        return false
    }
    return horizontal(dna) || vertical(dna) || crosswiseRight(dna, dna.length) || crosswiseLeft(dna, dna.length)
}


module.exports = isMutant
