/*global document: false */

/* Helper functions: {{{ */
var car = function(xs) {
    return xs[0];
};

var cdr = function(xs) {
    return xs.slice(1);
};

var cons = function(x, xs) { // ineffective
    return Array.concat(x, xs);
};

var cadr = function(xs) {
    return car(cdr(xs));
};

var cddr = function(xs) {
    return cdr(cdr(xs));
};

var isempty = function(xs) {
    return (xs.length === 0);
};

var empty = function() {
    return [];
};

var map = function(f, xs) {
    if (isempty(xs)) {
        return empty();
    }

    return cons(
            f(car(xs)), 
            map(f, cdr(xs)));
};

var mapS = function(f, xs) {
    if (!isempty(xs)) {
        f(car(xs));
        mapS(f, cdr(xs));
    }
};

var range = function(x) {
    if (x === 0) {
        return empty();
    }
    return cons(range(x - 1), x);
};

var foldr = function(f, i, xs) {
    if (isempty(car(xs))) {
        return i;
    }

    return f(car(xs), foldr(f, i, cdr(xs)));
};

var foldr1 = function(f, xs) {
    return foldr(f, 
                 f(car(xs), cadr(xs)), 
                 cddr(xs));
};

var and = function(x, y) {
    return x & y;
};

var or = function(x, y) {
    return x | y;
};

var item = function() {
    return {
        domObject: document.createElement("div"),
        background: function(color) {
            this.domObject.style.backgroundColor = color;
            return this;
        },
        appendOnto: function(domObject) {
            domObject.appendChild(this.domObject);
            return this;
        },
        width: function(w) {
            this.domObject.style.width = w;
            return this;
        },
        height: function(h) {
            this.domObject.style.height = h;
            return this;
        },
        class: function (c) {
            this.domObject.className = c;
            return this;
        }
    };
};

var ln = function(x) {
    return Math.log(x);
};

var log2 = function(x) {
    return ln(x) / ln(2);
};

var pow = function(x, y) {
    return Math.pow(x, y);
};

var karnaughMap = function(n) {
    return map(item, range(pow(2,n)));
};
/* }}} */

mapS(
        function(i) { 
            i.class("kblock").appendOnto(document.getElementById("center"));
        }, 
        karnaughMap(4));
