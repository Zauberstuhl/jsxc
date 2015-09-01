var Diaspora = {
  I18n: {
    language: 'en'
  }
};

var jsxc_options = {
  root: '../../',
  rosterAppend: 'body',
  otr: {
    debug: true,
    SEND_WHITESPACE_TAG: true,
    WHITESPACE_START_AKE: true
  },
  autoLang: true,
  priority: {
    online: 1,
    chat: 1
  },
  displayRosterMinimized: function() {
    return true;
  },
  xmpp: {
    url: '/http-bind/',
    username: 'test',
    domain: 'example.org',
    jid: 'test@example.org',
    password: 'secr3t',
    resource: 'diaspora-jsxc',
    overwrite: true,
    onlogin: true
  }
};

var testLocales = {
  "de": I18next.de.translation,
  "en": I18next.en.translation,
  "es": I18next.es.translation
};

describe( "Check if we provide the correct locales", function() {
  jsxc.init(jsxc_options);
  beforeEach(function() {
    Diaspora.I18n.language = language || 'invalidLanguage';
    jsxc.init(jsxc_options);
  });

  it("I18next is defined", function () {
    expect(I18next).not.toBe(null);
  });

  // should match fallback language 'en'
  $.each(I18next.en.translation, function(key, val) {
    it("\"" + val + "\" equals \"" + $.t(key) + "\"", function () {
      expect($.t(key)).toBe(val);
    });
  });

  for (var prop in testLocales) {
    var language = prop;
    it("I18next is defined", function () {
      expect(I18next).not.toBe(null);
    });

    $.each(testLocales[prop], function(key, val) {
      it("\"" + val + "\" equals \"" + $.t(key) + "\"", function () {
        expect($.t(key)).toBe(val);
      });
    });
  }
});

