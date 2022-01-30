class Random {
    static choice(num) {
        const milliSecond = new Date().getMilliseconds()
        return (milliSecond % num) + 1
    }
}

export default Random
