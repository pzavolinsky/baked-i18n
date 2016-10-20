Feature: bake-i18n fixing translations

Scenario: Fix translations
  Given a file source.js with
    """
    console.log(_('Hello, world!'));
    """
  And a file es-AR.json with
    """
    {
      "Heya!": "Buenas!"
    }
    """
  When running
    """
    bake-i18n --fix-all source.js es-AR.json
    """
  Then the file es-AR.json is
    """
    {
      "Hello, world!": "@@@@ TODO @@@@"
    }
    """
