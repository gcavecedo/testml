var isMutant = require('../is-mutant.js')
var expect = require('chai').expect

describe('isMutant()', function () {
    var smallDNAMutants = [
        ["CTGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"],
        ["ATGCAAGTGT", "CAGTTCGAGG", "TTTTGTACAA", "AGAAGGAGGA", "CCCCGACTAT", "TCACGGAAGG", "AGAAAGACCA", "CCCCGTCCAG", "TCACGAATTA", "AGAAGGTAGA"],
        ["ATGA", "CAAT", "TAAT", "AGAA"],
        ["ATGA", "AAAT", "AAAT", "AGAA"],
        ["ATGCAAGTGT", "CAGTTCGAGG", "TTCTGTACAA", "AGAAGGAGGA", "CTCCAACTTT", "TCACGGAAGG", "AGAAAGACCA", "CTCCGACCAG", "TCACAATTTA", "AGAAGGTAGA"]
    ]
    
    var smallDNANonMutants = [
        ["ATG", "CAA", "TAA"],
        ["ATGT", "CAAC", "TACG", "AGAA"],
        ["ATGCAAGTGT", "CAGTTCGAGG", "TTCTGTACAA", "AGAAGGAGGA", "CTCCAACTTT", "TCACGGAAGG", "AGAAAGACCA", "CTCCGACCAG", "TCACGATTTA", "AGAAGGTAGA"]
    ]

    var bigDNAMutant = [
        Array(10000).fill("T".repeat(10000)),
    ]

    var bigDNANonMutant = [
        Array(2000).fill("TAGCA".repeat(2000)),
    ]

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

    bigDNANonMutant.forEach(function(dna, index) {  
        it(`should detect a non mutant with a big DNA, case ${index}`, function() {
            const mutant = isMutant(dna);
            expect(mutant).to.be.true
        })
    });
});

