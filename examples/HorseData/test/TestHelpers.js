function waitFor(condition, action) {
    var count = 0;
    function checkCondition() {
        if (condition()) {
            action()
        } else if (count < 20) {
            count++;
            setTimeout(checkCondition, 100);
        } else {
            throw new Error("Timed out waiting for " + condition.toString())
        }
    }

    checkCondition();
}
