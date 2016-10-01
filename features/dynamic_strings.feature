Feature: bake-i18n dynamic strings

Scenario: Translate customized message
  Given a file source.js with
    """
    function sayHi(name) {
      console.log(_('Hi $NAME!').replace('$NAME', name));
    }
    console.log(sayHi('John'));
    """
  And a file es-AR.json with
    """
    {
      "Hi $NAME!": "Hola $NAME!"
    }
    """
  When running
    """
    bake-i18n source.js es-AR.json
    """
  Then the file source-es-AR.js is
    """
    function sayHi(name) {
      console.log("Hola $NAME!".replace('$NAME', name));
    }
    console.log(sayHi('John'));
    """
