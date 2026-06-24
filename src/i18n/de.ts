import type { ToolContent } from './types';

// Deutsch.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'PDF teilen — Seiten im Browser extrahieren, ohne Upload | runlocally',
    description:
      'Teile ein PDF oder extrahiere Seitenbereiche in ein neues PDF, direkt im Browser. Die Datei wird auf deinem Gerät gelesen und nie hochgeladen. Open Source (MIT), läuft offline.',
    ogTitle: 'PDF teilen — Seiten im Browser extrahieren, ohne Upload',
    ogDescription:
      'Extrahiere Seitenbereiche aus einem PDF in eine neue Datei, im Browser. Nichts wird hochgeladen. Open Source, läuft offline.',
  },

  hero: {
    h1: 'PDF teilen',
    tagline:
      'Extrahiere Seitenbereiche aus einem PDF in eine neue Datei — im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'PDF teilen, im Browser',
    paras: [
      'Zieh ein PDF hierher, und das Tool zeigt dir, wie viele Seiten es hat. Tippe die Seiten ein, die du brauchst — zum Beispiel 1-3, 5, 8-10 — und genau diese Seiten werden in ein neues PDF kopiert, das du herunterladen kannst. Die Originaldatei bleibt unverändert.',
      'Alles läuft im Browser mit pdf-lib. Die Seiten werden unverändert kopiert: nichts wird komprimiert, neu gerendert, per OCR erfasst oder konvertiert. So öffnet sich das Ergebnis in jedem gängigen PDF-Reader und sieht aus wie die Vorlage.',
    ],
  },

  privacy: {
    h2: 'Warum deine Datei auf deinem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, auf den man hochladen könnte:',
    points: [
      'Das Teilen läuft vollständig in deinem Browser.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit deinem PDF.',
      'Der Quellcode ist offen, und jeder kann ihn lesen (MIT).',
      'Die Seite funktioniert offline – was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne beim Extrahieren das Netzwerk-Panel deines Browsers — keine Anfrage trägt deine Datei.',
    sourceLinkText: 'Lies den Quellcode.',
  },

  howto: {
    h2: 'So benutzt du es',
    steps: [
      {
        h3: 'PDF auswählen',
        p: 'Klicke, um ein PDF auszuwählen, oder zieh es irgendwo auf die Seite. Sobald es geladen ist, erscheint die Seitenzahl.',
      },
      {
        h3: 'Seiten eintippen',
        p: 'Gib einen Bereich mit Zählung ab 1 ein, etwa 1-3, 5, 8-10. Seite 1 ist die erste Seite; das Feld ist anfangs auf das gesamte Dokument voreingestellt.',
      },
      {
        h3: 'Extrahieren und herunterladen',
        p: 'Die gewählten Seiten werden in ein neues PDF kopiert, das automatisch heruntergeladen wird. Deine Originaldatei bleibt unverändert.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird mein PDF irgendwohin hochgeladen?',
      a: 'Nein. Das Teilen läuft vollständig in deinem Browser. Es gibt keine Server-Komponente, also hat deine Datei keinen Weg von deinem Gerät weg. Der Quellcode ist offen, und du kannst das im Netzwerk-Panel deines Browsers nachprüfen.',
    },
    {
      q: 'Wie gebe ich an, welche Seiten extrahiert werden sollen?',
      a: 'Tippe einen Bereich mit Zählung ab 1 ein, etwa 1-3, 5, 8-10. Seite 1 ist die erste Seite. Einzelne Seiten und Bereiche lassen sich mischen, durch Kommas getrennt; um Duplikate und die Reihenfolge kümmert sich das Tool automatisch — das neue PDF behält die Seiten in aufsteigender Reihenfolge.',
    },
    {
      q: 'Verändert es die Originaldatei?',
      a: 'Nein. Die gewählten Seiten werden in ein ganz neues PDF kopiert, das du herunterlädst. Das PDF, das du hineingezogen hast, wird nie verändert.',
    },
    {
      q: 'Verringert das Teilen die Qualität oder verändert es die Seiten?',
      a: 'Nein. Die ausgewählten Seiten werden genau so kopiert — keine Komprimierung, kein OCR, keine Konvertierung. Text, Bilder und Layout sind dieselben wie in der Vorlage, und das Ergebnis öffnet sich in jedem gängigen PDF-Reader.',
    },
    {
      q: 'Kann es ein passwortgeschütztes PDF öffnen?',
      a: 'Nein. Verschlüsselte (passwortgeschützte) PDFs lassen sich nicht öffnen, und du bekommst dazu eine klare Meldung. Entferne das Passwort zuerst in einem Reader, dem du vertraust, und teile die Datei dann hier.',
    },
    {
      q: 'Läuft es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch ist es zwischengespeichert, sodass das Teilen ohne Netzwerkverbindung funktioniert. Du kannst es auch zu deinem Startbildschirm hinzufügen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; alle Prüfungen und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
