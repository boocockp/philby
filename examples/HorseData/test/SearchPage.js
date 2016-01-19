function SearchPage(element) {
    this.el = $(element);
}

SearchPage.prototype.find = function(selector) {
    return this.el.find(selector);
};

var pageFunctions = {
    heading: function() { return this.el.find('h1').text(); },

    loadNames: function(nameString) {
        this.find('#namesForSearch').val(nameString);
        this.find('#loadNames')[0].click();
    },

    namesToSearch: function() {
        return this.find('#searchNames tbody td.search-name input').map(function(i, el) { return $(el).val(); }).get();
    },

    searchTableRowFor: function(name) {
        var row = this.find('#searchNames tbody tr').filter(function(i, el) { return $(el).find('input').val() == name});
        return new SearchRow(row.get(0));
    }
};

for(var n in pageFunctions) {
    SearchPage.prototype[n] = pageFunctions[n];
}


function SearchRow(element) {
    this.el = $(element);
}

SearchRow.prototype.find = function(selector) {
    return this.el.find(selector);
};

var searchRowFunctions = {
    search: function(callback) {
        var self = this;
        this.find('td.search-name button')[0].click();
        waitFor(function() {
            return self.find('td.search-results').text();
        }, callback)
    },

    searchResultNames: function() {
        return this.find('table.search-results td.horse-name').map(function(i, el) { return $(el).text(); }).get();
    }
};

for(var n in searchRowFunctions) {
    SearchRow.prototype[n] = searchRowFunctions[n];
}


