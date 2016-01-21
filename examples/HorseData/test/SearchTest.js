describe('Horse Data Search', function() {

    var page;

    this.timeout(5000);

    function go(page) {
        return new Promise(function(resolve, reject) {
            var testFrame = $('#testFrame');
            testFrame.attr('src', 'about:blank');
            testFrame.attr('src', page.url).one('load', function () {
                var testDoc = window.testDoc = $(document.getElementById('testFrame').contentDocument);
                var p = new page(testDoc);
                resolve(p);
            });
        });
    }

    beforeEach(function() {
        return go(SearchPage).then(function(p) { page = p; });
    });

    it('has a heading', function() {
        page.heading().should.eql('Horse Data Search');
    });

    it('loads names and shows in search table', function() {
        page.loadNames('Cecily\nBond Girl');
        page.namesToSearch().should.eql(['Cecily', 'Bond Girl']);
    });

    it('searches for a name and shows results in the search table', function() {
        page.loadNames('Cecily');
        var cecilyRow = page.searchTableRowFor('Cecily');
        return cecilyRow.search().then(function() {
            cecilyRow.searchResultNames().forEach( function(name) { name.should.match(/^Cecily|^Not Found/); });
        })

    });

    it('loads horse data page and extracts data when click on search result', function() {
        page.loadNames('Cecily');
        var cecilyRow = page.searchTableRowFor('Cecily');
        return cecilyRow.search()
            .then(function() { return cecilyRow.selectResult(0)})
            .then(function() {
                return cecilyRow.maxOr().should.eql('80');
            });
    });


});