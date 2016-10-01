Feature: bake-i18n in different (programming) languages

Scenario: Translate C (with gettext)
  Given a file source.c with
    """
    #include <stdio.h>
    main() { printf("%s\n", gettext("Hello, world!")); }
    """
  And a file es-AR.json with
    """
    {
      "Hello, world\\n": "Hola, mundo\\n"
    }
    """
  When running
    """
    bake-i18n --translate gettext source.c es-AR.json
    """
  Then the file source-es-AR.c is
    """
    #include <stdio.h>
    main() { printf("%s\n", "Hello, world!"); }
    """
