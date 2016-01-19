describe('Test 1', function() {

    var testDoc;
    var page;

    function go(url, callback) {
        var testFrame = $('#testFrame');
        testFrame.attr('src', 'about:blank');
        testFrame.attr('src', url).one('load', function() {
            testDoc = window.testDoc = $(document.getElementById('testFrame').contentDocument);
            page = new SearchPage(testDoc);
            callback();
        });
    }

    beforeEach(function(done) {
        go('horseData.html', done);
    });

    it('has a heading', function() {
        page.heading().should.eql('Horse Data Search');
    });

    it('loads names and shows in search table', function() {
        page.loadNames('Cecily\nBond Girl');
        page.namesToSearch().should.eql(['Cecily', 'Bond Girl']);
    });

    it('searches for a name and shows results in the search table', function(done) {
        page.loadNames('Cecily');
        var cecilyRow = page.searchTableRowFor('Cecily');
        cecilyRow.search(function() {
            cecilyRow.searchResultNames().forEach( function(name) { name.should.match(/^Cecily|^Not Found/); });
            done();
        })

    });


});