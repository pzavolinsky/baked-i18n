Feature: bake-i18n with a different function name

Scenario: Translate gettext
  Given a file source.js with
    """
    console.log(gettext('Hello, world!'));
    """
  And a file es-AR.json with
    """
    {
      "Hello, world!": "Hola, mundo!"
    }
    """
  When running
    """
    bake-i18n --translate gettext source.js es-AR.json
    """
  Then the file source-es-AR.js is
    """
    console.log("Hola, mundo!");
    """

Scenario: Translate i18n.getString
  Given a file source.js with
    """
    console.log(i18n.getString('Hello, world!'));
    """
  And a file es-AR.json with
    """
    {
      "Hello, world!": "Hola, mundo!"
    }
    """
  When running
    """
    bake-i18n --translate i18n.getString source.js es-AR.json
    """
  Then the file source-es-AR.js is
    """
    console.log("Hola, mundo!");
    """
