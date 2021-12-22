export const initialValue = `pragma circom 2.0.1;

include "circomlib/poseidon.circom";

template Example(foo, bar) {
    signal input a;
    signal input b;
    signal output c;
    
    c <== a * b;

    assert(a > 2);

    for (var i = 0; i < foo; i++) {
        log(i);
    }
    
    component hash = Poseidon(2);
    hash.inputs[0] <== a;
    hash.inputs[1] <== b;

    log(hash.out);
}

component main { public [ a ] } = Example(4, 5 - 1);

/* INPUT = {
    "a": "5",
    "b": "77"
} */`
