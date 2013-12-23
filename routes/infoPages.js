// Information pages: about.html, what.html, and contact.html

module.exports = {
    about: function(req, res) {
        res.render('about');
    },

    what: function(req, res) {
        res.render('what');
    },

    contact: function(req, res) {
        res.render('contact');
    },
    
    notFound: function(req, res) {
        res.render('404', { url: "404" });
    },
    
    error: function(req, res) {
        res.render('500');
    }
}
