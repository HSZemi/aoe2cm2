import DraftOption from "./DraftOption";

enum Name {
    AZTEC = "Aztec",
    BRITISH = "British",
    CHINESE = "Chinese",
    DUTCH = "Dutch",
    FRENCH = "French",
    GERMAN = "German",
    INCAN = "Incan",
    INDIAN = "Indian",
    HAUDENOSAUNEE = "Haudenosaunee",
    JAPANESE = "Japanese",
    OTTOMAN = "Ottoman",
    PORTUGUESE = "Portuguese",
    RUSSIAN = "Russian",
    LAKOTA = "Lakota",
    SPANISH = "Spanish",
    SWEDISH = "Swedish",
    USA = "USA",
}

class Aoe3Civilisation extends DraftOption {

    public static readonly AZTEC: Aoe3Civilisation = new Aoe3Civilisation(Name.AZTEC);
    public static readonly BRITISH: Aoe3Civilisation = new Aoe3Civilisation(Name.BRITISH);
    public static readonly CHINESE: Aoe3Civilisation = new Aoe3Civilisation(Name.CHINESE);
    public static readonly DUTCH: Aoe3Civilisation = new Aoe3Civilisation(Name.DUTCH);
    public static readonly FRENCH: Aoe3Civilisation = new Aoe3Civilisation(Name.FRENCH);
    public static readonly GERMAN: Aoe3Civilisation = new Aoe3Civilisation(Name.GERMAN);
    public static readonly INCAN: Aoe3Civilisation = new Aoe3Civilisation(Name.INCAN);
    public static readonly INDIAN: Aoe3Civilisation = new Aoe3Civilisation(Name.INDIAN);
    public static readonly HAUDENOSAUNEE: Aoe3Civilisation = new Aoe3Civilisation(Name.HAUDENOSAUNEE);
    public static readonly JAPANESE: Aoe3Civilisation = new Aoe3Civilisation(Name.JAPANESE);
    public static readonly OTTOMAN: Aoe3Civilisation = new Aoe3Civilisation(Name.OTTOMAN);
    public static readonly PORTUGUESE: Aoe3Civilisation = new Aoe3Civilisation(Name.PORTUGUESE);
    public static readonly RUSSIAN: Aoe3Civilisation = new Aoe3Civilisation(Name.RUSSIAN);
    public static readonly LAKOTA: Aoe3Civilisation = new Aoe3Civilisation(Name.LAKOTA);
    public static readonly SPANISH: Aoe3Civilisation = new Aoe3Civilisation(Name.SPANISH);
    public static readonly SWEDISH: Aoe3Civilisation = new Aoe3Civilisation(Name.SWEDISH);
    public static readonly USA: Aoe3Civilisation = new Aoe3Civilisation(Name.USA);



    // DO NOT CHANGE THE ORDER OF ELEMENTS IN THIS ARRAY!!!
    // ONLY APPEND NEW CIVILISATIONS AT THE END!!!
    public static readonly ALL = [
        Aoe3Civilisation.AZTEC,
        Aoe3Civilisation.BRITISH,
        Aoe3Civilisation.CHINESE,
        Aoe3Civilisation.DUTCH,
        Aoe3Civilisation.FRENCH,
        Aoe3Civilisation.GERMAN,
        Aoe3Civilisation.INDIAN,
        Aoe3Civilisation.INCAN,
        Aoe3Civilisation.HAUDENOSAUNEE,
        Aoe3Civilisation.JAPANESE,
        Aoe3Civilisation.OTTOMAN,
        Aoe3Civilisation.PORTUGUESE,
        Aoe3Civilisation.RUSSIAN,
        Aoe3Civilisation.LAKOTA,
        Aoe3Civilisation.SPANISH,
        Aoe3Civilisation.SWEDISH,
        Aoe3Civilisation.USA,
    ];

    private constructor(name: Name) {
        super(name, name, Aoe3Civilisation.defaultImageUrlsForCivilisation(name));
    }

    public static defaultImageUrlsForCivilisation(name: string) {
        return {
            unit: `/images/aoe3/Flag_${name}.png`,
            emblem: `/images/aoe3/Flag_${name}.png`,
            animated_left: `/images/aoe3/Flag_${name}.png`,
            animated_right: `/images/aoe3/Flag_${name}.png`,
        }
    }

}

export default Aoe3Civilisation;
export {Name};
