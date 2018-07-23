/**
 * @file is-mutant.js
 *
 * Test para la función isMutant
 *
 */

const isMutant = require('../src/is-mutant.js')
const expect = require('chai').expect


describe('isMutant()', function () {
    // ADN mutante
    var smallDNAMutants = [
        ["CTGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"],
        ["ATGCAAGTGT", "CAGTTCGAGG", "TTTTGTACAA", "AGAAGGAGGA", "CCCCGACTAT", "TCACGGAAGG", "AGAAAGACCA", "CCCCGTCCAG", "TCACGAATTA", "AGAAGGTAGA"],
        ["ATGA", "CAAT", "TAAT", "AGAA"],
        ["ATGA", "AAAT", "AAAT", "AGAA"],
        ["ATGCAAGTGT", "CAGTTCGAGG", "TTCTGTACAA", "AGAAGGAGGA", "CTCCAACTTT", "TCACGGAAGG", "AGAAAGACCA", "CTCCGACCAG", "TCACAATTTA", "AGAAGGTAGA"]
    ]
    var bigDNAMutant = [
        Array(2000).fill("ATCG".repeat(2000)),
    ]
    
    // ADN Humano
    var smallDNANonMutants = [
        ["ATG", "CAA", "TAA"],
        ["ATGT", "CAAC", "TACG", "AGAA"],
        ["ATGCAAGTGT", "CAGTTCGAGG", "TTCTGTACAA", "AGAAGGAGGA", "CTCCAACTTT", "TCACGGAAGG", "AGAAAGACCA", "CTCCGACCAG", "TCACGATTTA", "AGAAGGTAGA"]
    ]

    // Tests
    smallDNAMutants.forEach(function(dna, index) {  
        it(`should detect a mutant with a small DNA, case ${index}`, function() {
            const mutant = isMutant(dna);
            expect(mutant, `dna=${dna}`).to.be.true
        })
    });

    smallDNANonMutants.forEach(function(dna, index) {  
        it(`should detect a non mutant with a small DNA, case ${index}`, function() {
            const mutant = isMutant(dna);
            expect(mutant, `dna=${dna}`).to.be.false
        })
    });

    bigDNAMutant.forEach(function(dna, index) {  
        it(`should detect a mutant with a big DNA, case ${index}`, function() {
            const mutant = isMutant(dna);
            expect(mutant).to.be.true
        })
    });

});

