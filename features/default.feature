Feature: bake-i18n with default arguments

Scenario: Translate with default arguments
  Given a file source.js with
    """
    console.log(_('Hello, world!'));
    """
  And a file es-AR.json with
    """
    {
      "Hello, world!": "Hola, mundo!"
    }
    """
  When running
    """
    bake-i18n source.js es-AR.json
    """
  Then the file source-es-AR.js is
    """
    console.log("Hola, mundo!");
    """
