Feature: bake-i18n generate translation template

Scenario: Generate a TODO translation template from a source file
  Given a file source.js with
    """
    export default [
      _('The Phantom Menace'),
      _('Attack of the Clones'),
      _('Revenge of the Sith'),
      _("A New Hope"),
      _("The Empire \"Strikes\" Back"),
      _('Return of the \'Jedi\''),
      _('The Force Awakens'),
      __('Where No Man Has Gone Before')
    ]
    """
  And a file es-AR.json with
    """
    {}
    """
  When running
    """
    bake-i18n --fix-all source.js es-AR.json
    """
  Then the file es-AR.json is
    """
    {
      "A New Hope": "@@@@ TODO @@@@",
      "Attack of the Clones": "@@@@ TODO @@@@",
      "Return of the 'Jedi'": "@@@@ TODO @@@@",
      "Revenge of the Sith": "@@@@ TODO @@@@",
      "The Empire \"Strikes\" Back": "@@@@ TODO @@@@",
      "The Force Awakens": "@@@@ TODO @@@@",
      "The Phantom Menace": "@@@@ TODO @@@@"
    }
    """
