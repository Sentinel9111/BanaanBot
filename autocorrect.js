// source: Woordenboek K - Nederlands (https://docs.google.com/document/d/1lavyuSKmQSTa-GWlmRY5kel-iEe6wuf5_VkqlgXtA7M/mobilebasic)

const replacements = {
    "nice": "🤧",
    "ja": "🧅",
    "een dom persoon": "aardappel",
    "een oude computer": "aardappel",
    "het antwoord op alles": "ankergetal",
    "kromme fruitsoort": "banaan",
    "geweldig": "banaan",
    "schiet op jij slome slak!": "besta sneller",
    "kan letterlijk elk werkwoord betekenen aan de hand van de context": "consumeren", // too specific
    "though": "deeg",
    "kan letterlijk elk woord betekenen": "deur", // too specific
    "doei": "kom met me mee",
    "de deur dicht, maar niet op slot doen": "door de deur de deur dicht doen",
    "scramblen": "door de midden halen",
    "frans": "flut",
    "no offence": "geen uit-hek",
    "geluiden": "geluiten",
    "graphic": "graphic",
    "hersenen": "grote roze hoofd-spons",
    "hoofdingang": "head-in-hallway",
    "heel erg": "heg",
    "hoe laat is het": "hoe tijd is het",
    "hey": "ga weg",
    "hoi": "I wish you a merry x-mas, I wish you a merry x-mas, I wish you a merry x-mas and a happy new year",
    "jep": "Jeb",
    "jou": "jij",
    "de taal k": "Kaas",
    "kapot": "kapto",
    "leven": "leverpastei",
    "blijheid": "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch",
    "ghast": "Marshmallow",
    "ster": "meester",
    "maandag die flut is": "mehndag", // perhaps too specific
    "steve jobs": "Minecraft-hoofdpersonage Banen",
    "natuurkunde": "NASK",
    "natoerkunde": "NASK min SK",
    "no-lifer": "olijfer",
    "o&o": "oooo",
    "de wortel van iets berekenen": "ergens een wortel op pleuren", // perhaps too specific
    "updaten": "omhoogdatumen",
    "pdof": "Portable Document... Oh, and it's a Format",
    "presentatie": "presnentation",
    "appeltaart": "rabbeldebabsquiche",
    "appel": "rabbeldebabski",
    "dingen die random zijn": "randomerigheden",
    "kieran": "Randomerigheden",
    "rasp": "raps",
    "reageert": "rea-Gert",
    "bill gates": "Rekening Poorten",
    "mensen uit groep acht": "rivieren",
    "de lichtelijke irritatie van iemand die lichtelijk geïrriteerd is": "superieure kracht van de woede van de aandachtige Juno door de woede",
    "woede": "**LLANFAIRPWLLGWYNGYLLGOGERYCHWYRNDROBWLLLLANTYSILIOGOGOGOCH!!!**",
    "endportal gateway": "TicTac Endportal",
    "flut": "tomaat",
    "mensen uit klassen hoger dan die van jou": "tunnels", // too specific
    "laptop": "uit de kluiten gewassen klaptelefoon",
    "wat is dit": "wat is these",
    "wat zijn de specs": "wat voor laptop zit er in", // perhaps too specific
    "wesp": "weps",
    "hond": "woef",
    "slapen": "z'tjes consumeren",
    // end of dictionary K - Nederlands
    "bedoelde je: aardappel?": "Aardappel",
    "worst case": "worst kaas",
    "patat": "friet",
    "friet": "patat",
    "oof": "🥚",
    "belgie": "Benederland",
    "belgië": "Benederland",
    "madagaskar": "Mad at gas car",
    "helaas": "gekaasfondued",
    "gtw": "Gouden Thierry Wagen",
    "link": "Golden Mario",
    "verwijderd": "verweitert",
    "wordt": "wort",
    "word": "wort",
    //"o": "OwO", //
    //"u": "UwU", //
    //"t": "TwT", //
};

// key: channel ID
// value: Date when autocorrection is re-enabled
const disabledUntil = {}

function disableAutocorrect(channelId) {
    // 5 minutes
    const fiveMinutes = 5 * 60 * 1000;
    const now = new Date().valueOf();

    disabledUntil[channelId] = new Date(now + fiveMinutes);
}

function autocorrect(message) {
    let du = disabledUntil[message.channel.id];
    if (du) {
        const duVo = du.valueOf();
        const disabled = new Date().valueOf() < duVo;
        if (disabled) {
            return false;
        }
    }

    const messageContent = message.content;

    // Lowercase version of the message. We search this string for the terms, but if we don't find a term somewhere,
    // we keep the character from the original version.
    const msgLowercase = messageContent.toLowerCase();
    let changed = false;
    let result = "";
    searchString:
    for (let i = 0; i < msgLowercase.length; i++) {
        searchTerms:
        // for..in iterates over keys. term is the key in the dictionary above.
        for (const term in replacements) {
            // Check if the term matches msgLowercase at i
            let j = 0;
            for (; j < term.length && i + j < msgLowercase.length; j++) {
                if (term[j] !== msgLowercase[i + j]) {
                    // If the character in the term does not match msgLowercase, move on to the next term.
                    continue searchTerms;
                }
            }
            if (j < term.length) {
                // we broke out of the loop because we reached the end of the message, not because the word is a match
                continue searchTerms;
            }
            // If we got here, it means we broke out of the loop because we reached the end of the term, and so the term is at msgLowercase[i].
            // Stop searching for more terms, and increase i by the length of the term we added.
            const replacement = replacements[term];
            result += replacement;
            changed = true;
            i += term.length - 1; // -1 because the for loop increases it by 1
            continue searchString;
        }
        // If we got here, it means there is no term at msgLowercase[i].
        result += messageContent[i];
    }

    if (changed) {
        return result;
    } else {
        return false;
    }
}

module.exports = { autocorrect, disableAutocorrect };
