describe('Test 1', function() {

    var testDoc;

    function t$(selector) {
        return testDoc.find(selector);
    }

    function go(url, callback) {
        var testFrame = $('#testFrame');
        testFrame.attr('src', 'about:blank');
        testFrame.attr('src', url).one('load', function() {
            testDoc = window.testDoc = $(document.getElementById('testFrame').contentDocument);
            callback();
        });
    }

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

    beforeEach(function(done) {
        go('horseData.html', done);
    });

    it('has a heading', function() {
        t$('h1').text().should.eql('Horse Data Search');
    });

    it('loads names and shows in search table', function() {
        t$('#namesForSearch').val('Cecily\nBond Girl');
        t$('#loadNames')[0].click();
        var names = t$('#searchNames tbody td.search-name input').map(function(i, el) { return $(el).val(); }).get();
        names.should.eql(['Cecily', 'Bond Girl']);
    });


});