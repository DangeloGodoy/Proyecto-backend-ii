const sum = () => {
    let sum = 0;
    for (let i = 0; i < 5e9; i++) {
        sum += i;
    }
    return sum;
}

export default sum;