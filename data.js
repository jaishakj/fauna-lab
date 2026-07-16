/*=========================================================
 WildGuide 3D
 data.js
 Part 3A
=========================================================*/

/*
==========================================================
 MODEL TYPES
==========================================================
*/

const MODEL_TYPES = {

    GLB: "glb",

    SKETCHFAB: "sketchfab",

    NONE: "none"

};

/*
==========================================================
 LOCAL STORAGE KEYS
==========================================================
*/

const STORAGE = {

    NOTES: "wildguide_notes",

    FAVORITES: "wildguide_favorites",

    COMPARISON: "wildguide_compare"

};

/*
==========================================================
 APPLICATION SETTINGS
==========================================================
*/

const APP = {

    title: "WildGuide 3D",

    version: "1.0.0",

    maxComparison: 4,

    defaultSort: "name"

};

/*
==========================================================
 DATA SCHEMA

Every species follows this structure.

{

    id,

    commonName,

    scientificName,

    class,

    family,

    habitat,

    range,

    diet,

    ecologicalRole,

    conservation,

    description,

    tags: [],

    keywords: [],

    model:{

        type,

        src,

        poster,

        search

    }

}

==========================================================
*/

/*
==========================================================
 MAIN DATABASE
==========================================================
*/

const SPECIES = [

/* Species are added in Part 3B
   and Part 3C */

];

/*
==========================================================
 HELPER FUNCTIONS
==========================================================
*/

function getSpecies(id){

    return SPECIES.find(

        species => species.id === id

    );

}

function getFavorites(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE.FAVORITES

        ) || "[]"

    );

}

function saveFavorites(list){

    localStorage.setItem(

        STORAGE.FAVORITES,

        JSON.stringify(list)

    );

}

function getComparison(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE.COMPARISON

        ) || "[]"

    );

}

function saveComparison(list){

    localStorage.setItem(

        STORAGE.COMPARISON,

        JSON.stringify(list)

    );

}

function getNotes(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE.NOTES

        ) || "{}"

    );

}

function saveNotes(notes){

    localStorage.setItem(

        STORAGE.NOTES,

        JSON.stringify(notes)

    );

}

/*
==========================================================
 GROUP BY CLASS > FAMILY

Sidebar uses this.
==========================================================
*/

function buildTree(){

    const tree = {};

    SPECIES.forEach(species => {

        if(!tree[species.class]){

            tree[species.class] = {};

        }

        if(!tree[species.class][species.family]){

            tree[species.class][species.family] = [];

        }

        tree[species.class][species.family]

            .push(species);

    });

    return tree;

}

/*
==========================================================
 SORT
==========================================================
*/

function sortSpecies(

    list,

    mode = "name"

){

    const items = [...list];

    switch(mode){

        case "family":

            items.sort(

                (a,b)=>

                a.family.localeCompare(b.family)

            );

            break;

        case "class":

            items.sort(

                (a,b)=>

                a.class.localeCompare(b.class)

            );

            break;

        default:

            items.sort(

                (a,b)=>

                a.commonName.localeCompare(

                    b.commonName

                )

            );

    }

    return items;

}

/*
==========================================================
 SEARCH
==========================================================
*/

function searchSpecies(query){

    if(!query){

        return SPECIES;

    }

    query = query.toLowerCase();

    return SPECIES.filter(species => {

        return (

            species.commonName

                .toLowerCase()

                .includes(query)

            ||

            species.scientificName

                .toLowerCase()

                .includes(query)

            ||

            species.family

                .toLowerCase()

                .includes(query)

            ||

            species.class

                .toLowerCase()

                .includes(query)

            ||

            species.tags

                .join(" ")

                .toLowerCase()

                .includes(query)

            ||

            species.keywords

                .join(" ")

                .toLowerCase()

                .includes(query)

        );

    });

}
/*=========================================================
 WildGuide 3D
 data.js
 Part 3B
 Insect Species

 Append these INSIDE the SPECIES array from Part 3A.
 Add commas between objects as needed.
=========================================================*/

{
    id: "monarch-butterfly",

    commonName: "Monarch Butterfly",

    scientificName: "Danaus plexippus",

    class: "Insecta",

    family: "Nymphalidae",

    habitat: "Grasslands, meadows, gardens",

    range: "North America, Central America",

    diet: "Flower nectar (adult), milkweed (larva)",

    ecologicalRole: "Pollinator",

    conservation: "Endangered (IUCN)",

    description:
        "Famous migratory butterfly recognized by its bright orange wings with black veins.",

    tags: [
        "butterfly",
        "pollinator",
        "migration",
        "orange"
    ],

    keywords: [
        "monarch",
        "danaus",
        "milkweed"
    ],

    model:{

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Danaus+plexippus&type=models"

    }

},

{
    id: "western-honey-bee",

    commonName: "Western Honey Bee",

    scientificName: "Apis mellifera",

    class: "Insecta",

    family: "Apidae",

    habitat: "Gardens, forests, agricultural land",

    range: "Worldwide",

    diet: "Nectar and pollen",

    ecologicalRole: "Major pollinator",

    conservation: "Not Evaluated",

    description:
        "Social bee responsible for pollinating numerous crops and producing honey.",

    tags:[
        "bee",
        "pollinator",
        "honey"
    ],

    keywords:[
        "apis",
        "bee",
        "honeybee"
    ],

    model:{

        type: MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Apis+mellifera&type=models"

    }

},

{
    id:"ladybird",

    commonName:"Seven-spotted Lady Beetle",

    scientificName:"Coccinella septempunctata",

    class:"Insecta",

    family:"Coccinellidae",

    habitat:"Fields, forests, gardens",

    range:"Europe, Asia, North America",

    diet:"Aphids",

    ecologicalRole:"Natural pest control",

    conservation:"Least Concern",

    description:
        "Predatory beetle valued for consuming agricultural pests.",

    tags:[
        "ladybug",
        "beetle",
        "predator"
    ],

    keywords:[
        "ladybird",
        "ladybug",
        "coccinella"
    ],

    model:{

        type:MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Coccinella+septempunctata&type=models"

    }

},

{
    id:"green-darner",

    commonName:"Green Darner",

    scientificName:"Anax junius",

    class:"Insecta",

    family:"Aeshnidae",

    habitat:"Wetlands, lakes, ponds",

    range:"North America",

    diet:"Flying insects",

    ecologicalRole:"Predator",

    conservation:"Least Concern",

    description:
        "Large dragonfly capable of long-distance migration.",

    tags:[
        "dragonfly",
        "predator",
        "wetlands"
    ],

    keywords:[
        "anax",
        "darner"
    ],

    model:{

        type:MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Anax+junius&type=models"

    }

},

{
    id:"praying-mantis",

    commonName:"European Praying Mantis",

    scientificName:"Mantis religiosa",

    class:"Insecta",

    family:"Mantidae",

    habitat:"Grasslands, shrubs",

    range:"Europe, Asia, Africa",

    diet:"Insects",

    ecologicalRole:"Predator",

    conservation:"Least Concern",

    description:
        "Ambush predator with folded forelegs adapted for catching prey.",

    tags:[
        "mantis",
        "predator",
        "camouflage"
    ],

    keywords:[
        "mantis",
        "religiosa"
    ],

    model:{

        type:MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Mantis+religiosa&type=models"

    }

},

{
    id:"atlas-moth",

    commonName:"Atlas Moth",

    scientificName:"Attacus atlas",

    class:"Insecta",

    family:"Saturniidae",

    habitat:"Tropical forests",

    range:"South and Southeast Asia",

    diet:"Adults do not feed",

    ecologicalRole:"Prey species",

    conservation:"Not Evaluated",

    description:
        "One of the world's largest moths by wing surface area.",

    tags:[
        "moth",
        "giant",
        "asia"
    ],

    keywords:[
        "atlas",
        "attacus"
    ],

    model:{

        type:MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Attacus+atlas&type=models"

    }

},

{
    id:"stag-beetle",

    commonName:"European Stag Beetle",

    scientificName:"Lucanus cervus",

    class:"Insecta",

    family:"Lucanidae",

    habitat:"Woodlands",

    range:"Europe",

    diet:"Tree sap",

    ecologicalRole:"Wood decomposer",

    conservation:"Near Threatened",

    description:
        "Large beetle known for the male's antler-like mandibles.",

    tags:[
        "beetle",
        "woodland"
    ],

    keywords:[
        "stag",
        "lucanus"
    ],

    model:{

        type:MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Lucanus+cervus&type=models"

    }

},

{
    id:"firefly",

    commonName:"Common Eastern Firefly",

    scientificName:"Photinus pyralis",

    class:"Insecta",

    family:"Lampyridae",

    habitat:"Fields, forests",

    range:"North America",

    diet:"Small insects, nectar",

    ecologicalRole:"Predator",

    conservation:"Least Concern",

    description:
        "Bioluminescent beetle using flashing signals during courtship.",

    tags:[
        "firefly",
        "glowing",
        "bioluminescence"
    ],

    keywords:[
        "photinus",
        "lightning bug"
    ],

    model:{

        type:MODEL_TYPES.NONE,

        src:"",

        poster:"",

        search:
        "https://sketchfab.com/search?q=Photinus+pyralis&type=models"

    }

}
/*=========================================================
 WildGuide 3D
 data.js
 Part 3C
 Bird Species

 Append these INSIDE the SPECIES array
 after the insect species from Part 3B.
=========================================================*/

{
    id: "bald-eagle",

    commonName: "Bald Eagle",

    scientificName: "Haliaeetus leucocephalus",

    class: "Aves",

    family: "Accipitridae",

    habitat: "Lakes, rivers, coastal forests",

    range: "North America",

    diet: "Fish, waterfowl, carrion",

    ecologicalRole: "Apex predator and scavenger",

    conservation: "Least Concern",

    description:
        "Large bird of prey and the national bird of the United States, recognized by its white head and powerful yellow beak.",

    tags: [
        "raptor",
        "eagle",
        "predator"
    ],

    keywords: [
        "bald eagle",
        "haliaeetus",
        "bird of prey"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Bald+Eagle&type=models"

    }

},

{
    id: "barn-owl",

    commonName: "Barn Owl",

    scientificName: "Tyto alba",

    class: "Aves",

    family: "Tytonidae",

    habitat: "Grasslands, farmland, open woodland",

    range: "Worldwide",

    diet: "Rodents, small mammals",

    ecologicalRole: "Nocturnal predator",

    conservation: "Least Concern",

    description:
        "Nocturnal owl with a heart-shaped facial disc and silent flight.",

    tags: [
        "owl",
        "nocturnal",
        "raptor"
    ],

    keywords: [
        "barn owl",
        "tyto"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Barn+Owl&type=models"

    }

},

{
    id: "house-sparrow",

    commonName: "House Sparrow",

    scientificName: "Passer domesticus",

    class: "Aves",

    family: "Passeridae",

    habitat: "Cities, villages, farmland",

    range: "Worldwide",

    diet: "Seeds, grains, insects",

    ecologicalRole: "Seed disperser",

    conservation: "Least Concern",

    description:
        "One of the world's most familiar urban birds, highly adapted to living alongside humans.",

    tags: [
        "songbird",
        "urban"
    ],

    keywords: [
        "sparrow",
        "passer"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=House+Sparrow&type=models"

    }

},

{
    id: "ruby-throated-hummingbird",

    commonName: "Ruby-throated Hummingbird",

    scientificName: "Archilochus colubris",

    class: "Aves",

    family: "Trochilidae",

    habitat: "Woodlands, gardens",

    range: "Eastern North America",

    diet: "Nectar and insects",

    ecologicalRole: "Pollinator",

    conservation: "Least Concern",

    description:
        "Tiny hovering bird capable of rapid wingbeats and backward flight.",

    tags: [
        "hummingbird",
        "pollinator",
        "nectar"
    ],

    keywords: [
        "ruby",
        "hummingbird"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Ruby+throated+Hummingbird&type=models"

    }

},

{
    id: "common-kingfisher",

    commonName: "Common Kingfisher",

    scientificName: "Alcedo atthis",

    class: "Aves",

    family: "Alcedinidae",

    habitat: "Rivers, streams, lakes",

    range: "Europe, Asia, North Africa",

    diet: "Fish and aquatic insects",

    ecologicalRole: "Aquatic predator",

    conservation: "Least Concern",

    description:
        "Small brightly colored bird famous for diving into water to catch fish.",

    tags: [
        "kingfisher",
        "fish",
        "river"
    ],

    keywords: [
        "alcedo",
        "kingfisher"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Common+Kingfisher&type=models"

    }

},

{
    id: "indian-peafowl",

    commonName: "Indian Peafowl",

    scientificName: "Pavo cristatus",

    class: "Aves",

    family: "Phasianidae",

    habitat: "Forests, scrubland, farmland",

    range: "Indian Subcontinent",

    diet: "Seeds, insects, reptiles",

    ecologicalRole: "Omnivore",

    conservation: "Least Concern",

    description:
        "Large colorful bird known for the spectacular iridescent train displayed by males.",

    tags: [
        "peacock",
        "colorful",
        "india"
    ],

    keywords: [
        "peafowl",
        "pavo",
        "peacock"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Indian+Peafowl&type=models"

    }

},

{
    id: "greater-flamingo",

    commonName: "Greater Flamingo",

    scientificName: "Phoenicopterus roseus",

    class: "Aves",

    family: "Phoenicopteridae",

    habitat: "Salt lakes, lagoons, wetlands",

    range: "Africa, Southern Europe, Asia",

    diet: "Algae, crustaceans",

    ecologicalRole: "Filter feeder",

    conservation: "Least Concern",

    description:
        "Tall pink wading bird with a distinctive downturned bill specialized for filter feeding.",

    tags: [
        "flamingo",
        "wetlands",
        "pink"
    ],

    keywords: [
        "phoenicopterus",
        "flamingo"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Greater+Flamingo&type=models"

    }

},

{
    id: "emperor-penguin",

    commonName: "Emperor Penguin",

    scientificName: "Aptenodytes forsteri",

    class: "Aves",

    family: "Spheniscidae",

    habitat: "Antarctic sea ice",

    range: "Antarctica",

    diet: "Fish, squid, krill",

    ecologicalRole: "Marine predator",

    conservation: "Near Threatened",

    description:
        "The tallest and heaviest living penguin species, adapted to extreme Antarctic conditions.",

    tags: [
        "penguin",
        "antarctica",
        "marine"
    ],

    keywords: [
        "emperor penguin",
        "aptenodytes"
    ],

    model: {

        type: MODEL_TYPES.NONE,

        src: "",

        poster: "",

        search:
        "https://sketchfab.com/search?q=Emperor+Penguin&type=models"

    }

}
/*=========================================================
 WildGuide 3D
 data.js
 Part 3D

 Append AFTER the SPECIES array and helper functions.
=========================================================*/

/*=========================================================
 LOOKUP MAPS
=========================================================*/

const SPECIES_BY_ID = new Map(
    SPECIES.map(species => [species.id, species])
);

const SPECIES_BY_CLASS = {};

const SPECIES_BY_FAMILY = {};

SPECIES.forEach(species => {

    if (!SPECIES_BY_CLASS[species.class]) {

        SPECIES_BY_CLASS[species.class] = [];

    }

    SPECIES_BY_CLASS[species.class].push(species);

    if (!SPECIES_BY_FAMILY[species.family]) {

        SPECIES_BY_FAMILY[species.family] = [];

    }

    SPECIES_BY_FAMILY[species.family].push(species);

});


/*=========================================================
 SIDEBAR TREE
=========================================================*/

const SIDEBAR_TREE = buildTree();


/*=========================================================
 TAG INDEX
=========================================================*/

const TAG_INDEX = {};

SPECIES.forEach(species => {

    species.tags.forEach(tag => {

        if (!TAG_INDEX[tag]) {

            TAG_INDEX[tag] = [];

        }

        TAG_INDEX[tag].push(species.id);

    });

});


/*=========================================================
 SEARCH INDEX
=========================================================*/

const SEARCH_INDEX = SPECIES.map(species => ({

    id: species.id,

    text: [

        species.commonName,

        species.scientificName,

        species.class,

        species.family,

        species.habitat,

        species.range,

        species.diet,

        species.ecologicalRole,

        species.conservation,

        ...(species.tags || []),

        ...(species.keywords || [])

    ]

        .join(" ")

        .toLowerCase()

}));


function searchIndex(query){

    if(!query){

        return SPECIES;

    }

    const q = query.toLowerCase().trim();

    return SEARCH_INDEX

        .filter(item => item.text.includes(q))

        .map(item => SPECIES_BY_ID.get(item.id));

}


/*=========================================================
 MODEL HELPERS
=========================================================*/

function hasVerifiedModel(species){

    return (

        species.model &&

        species.model.type !== MODEL_TYPES.NONE &&

        species.model.src

    );

}


function getModelData(id){

    const species = getSpecies(id);

    if(!species){

        return null;

    }

    return species.model;

}


function getFallbackModelLink(species){

    if(

        species.model &&

        species.model.search

    ){

        return species.model.search;

    }

    return `https://sketchfab.com/search?q=${encodeURIComponent(
        species.scientificName
    )}&type=models`;

}


/*=========================================================
 NOTEBOOK HELPERS
=========================================================*/

function getSpeciesNote(id){

    const notes = getNotes();

    return notes[id] || "";

}


function saveSpeciesNote(id,text){

    const notes = getNotes();

    notes[id] = text;

    saveNotes(notes);

}


/*=========================================================
 FAVORITES
=========================================================*/

function isFavorite(id){

    return getFavorites().includes(id);

}


function toggleFavorite(id){

    const favorites = getFavorites();

    const index = favorites.indexOf(id);

    if(index === -1){

        favorites.push(id);

    }else{

        favorites.splice(index,1);

    }

    saveFavorites(favorites);

    return favorites;

}


/*=========================================================
 COMPARISON
=========================================================*/

function addComparison(id){

    const compare = getComparison();

    if(compare.includes(id)){

        return compare;

    }

    if(compare.length >= APP.maxComparison){

        compare.shift();

    }

    compare.push(id);

    saveComparison(compare);

    return compare;

}


function removeComparison(id){

    const compare = getComparison()

        .filter(item => item !== id);

    saveComparison(compare);

    return compare;

}


function clearComparison(){

    saveComparison([]);

}


/*=========================================================
 SORT MODES
=========================================================*/

const SORT_MODES = {

    name(list){

        return [...list].sort(

            (a,b)=>

            a.commonName.localeCompare(

                b.commonName

            )

        );

    },

    scientific(list){

        return [...list].sort(

            (a,b)=>

            a.scientificName.localeCompare(

                b.scientificName

            )

        );

    },

    family(list){

        return [...list].sort(

            (a,b)=>

            a.family.localeCompare(

                b.family

            )

        );

    },

    class(list){

        return [...list].sort(

            (a,b)=>

            a.class.localeCompare(

                b.class

            )

        );

    }

};


/*=========================================================
 STATISTICS
=========================================================*/

const DATABASE_STATS = {

    totalSpecies: SPECIES.length,

    totalClasses:

        Object.keys(SPECIES_BY_CLASS).length,

    totalFamilies:

        Object.keys(SPECIES_BY_FAMILY).length,

    speciesWithModels:

        SPECIES.filter(

            hasVerifiedModel

        ).length,

    speciesWithoutModels:

        SPECIES.filter(

            s => !hasVerifiedModel(s)

        ).length

};


/*=========================================================
 OPTIONAL GLOBAL EXPORTS
=========================================================*/

window.WildGuide = {

    APP,

    STORAGE,

    MODEL_TYPES,

    SPECIES,

    SIDEBAR_TREE,

    SEARCH_INDEX,

    DATABASE_STATS,

    SORT_MODES,

    buildTree,

    searchSpecies,

    searchIndex,

    sortSpecies,

    getSpecies,

    getSpeciesNote,

    saveSpeciesNote,

    toggleFavorite,

    isFavorite,

    addComparison,

    removeComparison,

    clearComparison,

    hasVerifiedModel,

    getModelData,

    getFallbackModelLink

};


/*=========================================================
 END OF data.js
=========================================================*/
