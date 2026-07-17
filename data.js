/* ============================================================================
   FIELD GUIDE · DATA LAYER  (data.js)
   ----------------------------------------------------------------------------
   The entire guide is driven by the SPECIES array below.

   ▸ ADD A SPECIES      → copy any { … } block, paste it, edit the fields.
   ▸ ADD / SWAP A MODEL → edit the ONE  model:  line inside a species block:

       model: sketch("SKETCHFAB_UID", "Author Name", "License"),  // 3D embed
       model: glb("models/my-scan.glb", "Author Name", "License"),// self-hosted
       model: null,                                               // placeholder

     · sketch() → embeds https://sketchfab.com/models/UID/embed  (orbit-ready)
     · glb()    → renders your own .glb/.gltf via Google's <model-viewer>
     · null     → shows the illustrated plate + a "find a 3D model" link

   Nothing else in the app needs to change — sidebar groups, search, sort,
   notebook and comparison all pick up new entries automatically.
   ============================================================================ */

const sketch = (uid, author, license) => ({ type: "sketchfab", uid, author, license });
const glb    = (src, author, license) => ({ type: "glb", src, author, license });

const SPECIES = [
  /* ------------------------------ INSECTA ------------------------------- */
  {
    id: "monarch-butterfly",
    common: "Monarch Butterfly",
    latin: "Danaus plexippus",
    class: "Insecta",
    order: "Lepidoptera",
    family: "Nymphalidae",
    range: "North & South America; migratory populations overwinter in central Mexico and coastal California. Established also in Australia and Pacific islands.",
    diet: "Larvae feed exclusively on milkweed (Asclepias); adults take nectar from asters, goldenrod and milkweed blossoms.",
    role: "Pollinator and aposematic model species — sequesters milkweed cardenolides that make it toxic to predators.",
    tags: ["pollinator", "migratory", "aposematic", "milkweed"],
    blurb: "The great migrant of the insect world: four generations a year, one of which flies up to 4,000 km to a forest it has never seen.",
    model: sketch("3a5fc9a496cb402297ffdb6700d2ab60", "University Libraries at Virginia Tech", "CC BY"),
  },
  {
    id: "western-honey-bee",
    common: "Western Honey Bee",
    latin: "Apis mellifera",
    class: "Insecta",
    order: "Hymenoptera",
    family: "Apidae",
    range: "Native to Europe, western Asia and Africa; introduced worldwide wherever crops are grown.",
    diet: "Nectar and pollen; surplus nectar is cured into honey that feeds the colony through winter.",
    role: "Keystone pollinator of crops and wildflowers; eusocial superorganism whose hives anchor human agriculture.",
    tags: ["pollinator", "eusocial", "domesticated"],
    blurb: "A single colony can visit 50 million flowers in a summer — this CT scan shows the worker that does the work.",
    model: sketch("38c955f0c13449969a948bcce107e08a", "etainproject", "CC BY"),
  },
  {
    id: "five-horned-rhinoceros-beetle",
    common: "Five-horned Rhinoceros Beetle",
    latin: "Eupatorus gracilicornis",
    class: "Insecta",
    order: "Coleoptera",
    family: "Scarabaeidae",
    range: "Montane forests of northeast India, southern China, Myanmar, Thailand, Laos and Vietnam.",
    diet: "Adults sip tree sap and fermenting fruit; larvae develop for 1–2 years in rotting wood and leaf litter.",
    role: "Decomposer — its grubs recycle dead hardwood; males wrestle with five horns for mating rights.",
    tags: ["nocturnal", "forest", "sexually-dimorphic"],
    blurb: "Jet-black and gold, carrying four thoracic horns plus one long cephalic horn — a tank among beetles.",
    model: sketch("a949a2adb7394498b08786095b3b677c", "mohamedhussien", "Standard"),
  },
  {
    id: "european-praying-mantis",
    common: "European Praying Mantis",
    latin: "Mantis religiosa",
    class: "Insecta",
    order: "Mantodea",
    family: "Mantidae",
    range: "Southern and central Europe and Asia; introduced to North America in 1899 and still spreading.",
    diet: "Ambush predator of flies, crickets and moths; large females occasionally take small lizards or hummingbirds.",
    role: "Mid-level predator regulating herbivorous insects; in turn feeds birds, spiders and small mammals.",
    tags: ["predator", "ambush-hunter", "introduced"],
    blurb: "The only insect that can look over its shoulder — a triangular head with stereo vision on a swivelling neck.",
    model: sketch("ec088115ec8746d79c41f2db69665f15", "VirReal4", "CC BY"),
  },
  {
    id: "luna-moth",
    common: "Luna Moth",
    latin: "Actias luna",
    class: "Insecta",
    order: "Lepidoptera",
    family: "Saturniidae",
    range: "Deciduous hardwood forests of eastern North America, from Canada to Florida and Texas.",
    diet: "Adults never eat — they lack functional mouthparts. Larvae chew walnut, hickory, birch and sweetgum leaves.",
    role: "Nocturnal pollinator and prey base; its hindwing tails spin in flight to deflect bat echolocation away from the body.",
    tags: ["nocturnal", "silk-moth", "bat-evasion"],
    blurb: "Lives about a week as an adult — just long enough to find a mate by moonlight. Scanned here from a Yale Peabody specimen.",
    model: sketch("3444868c6e4c44b4b834c878ef142720", "Yale Peabody Museum", "CC BY"),
  },
  {
    id: "european-stag-beetle",
    common: "European Stag Beetle",
    latin: "Lucanus cervus",
    class: "Insecta",
    order: "Coleoptera",
    family: "Lucanidae",
    range: "Oak and broadleaf woodlands across Europe to Asia Minor; declining and legally protected in many countries.",
    diet: "Adults lick tree sap and juice of fallen fruit; larvae spend 3–7 years eating decaying oak stumps and roots.",
    role: "Flagship saproxylic species — its grubs are primary recyclers of dead wood and an indicator of old-growth habitat.",
    tags: ["saproxylic", "protected", "sexually-dimorphic"],
    blurb: "The male's antler jaws are for show and wrestling, not biting — the real work is done underground by the larvae.",
    model: sketch("e7d6ce6350fc4039a58cafe6d05d1c09", "mahrcheen", "Standard"),
  },
  {
    id: "common-hawker",
    common: "Common Hawker Dragonfly",
    latin: "Aeshna juncea",
    class: "Insecta",
    order: "Odonata",
    family: "Aeshnidae",
    range: "Moorlands, bogs and lake edges across northern Eurasia; Holarctic, one of the most widespread hawkers.",
    diet: "Aerial predator of midges and mosquitoes on the wing; aquatic nymphs hunt tadpoles and insect larvae.",
    role: "Top invertebrate predator linking aquatic and terrestrial food webs; natural mosquito control.",
    tags: ["predator", "wetland", "aerial-hunter"],
    blurb: "Four wings beating out of phase give it helicopter control — hover, reverse, and 50 km/h passes over the peat bogs.",
    model: sketch("b08203e16bd6401d80db9043ee776017", "julink", "Standard"),
  },
  {
    id: "atlas-moth",
    common: "Atlas Moth",
    latin: "Attacus atlas",
    class: "Insecta",
    order: "Lepidoptera",
    family: "Saturniidae",
    range: "Tropical and subtropical forests of Southeast Asia, from India to Indonesia.",
    diet: "Adults do not feed; larvae strip leaves of citrus, cinnamon, guava and jamun trees.",
    role: "Among the largest moths on Earth (25–30 cm wingspan); wingtip patterns mimic a snake's head to startle predators.",
    tags: ["giant", "nocturnal", "snake-mimic"],
    blurb: "Its cocoons are so tough they are used as purses in Taiwan. A verified 3D model for this one is still on the wishlist.",
    model: null,
  },

  /* -------------------------------- AVES -------------------------------- */
  {
    id: "barn-owl",
    common: "Barn Owl",
    latin: "Tyto alba",
    class: "Aves",
    order: "Strigiformes",
    family: "Tytonidae",
    range: "Nearly worldwide — every continent except Antarctica; absent only from polar and true desert regions.",
    diet: "Small mammals, especially voles and mice, located by hearing alone in total darkness.",
    role: "Nocturnal rodent control on farmland; its regurgitated pellets are a census of local small-mammal life.",
    tags: ["nocturnal", "raptor", "rodent-control"],
    blurb: "The heart-shaped face is a satellite dish: each ear hears a slightly different world, triangulated into a strike.",
    model: sketch("0e65de5934db4f0eae02835ba7227dcc", "Virtual Museums of Małopolska", "CC0"),
  },
  {
    id: "bald-eagle",
    common: "Bald Eagle",
    latin: "Haliaeetus leucocephalus",
    class: "Aves",
    order: "Accipitriformes",
    family: "Accipitridae",
    range: "North America, from Alaska to northern Mexico, always near fish-bearing water.",
    diet: "Fish snatched from the surface; also waterfowl, carrion, and meals stolen from ospreys.",
    role: "Apex predator and scavenger; its recovery from DDT-era collapse is a landmark of conservation law.",
    tags: ["raptor", "apex-predator", "conservation"],
    blurb: "Builds the largest nests of any North American bird — one in Ohio was used for 34 years and weighed two tonnes.",
    model: sketch("707fff56fc93437c81c12674b4736f92", "Nestaeric", "Standard"),
  },
  {
    id: "northern-cardinal",
    common: "Northern Cardinal",
    latin: "Cardinalis cardinalis",
    class: "Aves",
    order: "Passeriformes",
    family: "Cardinalidae",
    range: "Eastern and central North America, expanding northward with backyard feeders and warming winters.",
    diet: "Seeds, grains and fruit cracked with a conical bill; nestlings are raised on insects.",
    role: "Seed disperser and year-round songster — one of the few North American songbirds whose female also sings.",
    tags: ["songbird", "seed-eater", "non-migratory"],
    blurb: "The red comes from carotenoids in its diet: a drab cardinal is a hungry one. Scanned from a Florida Museum specimen.",
    model: sketch("197da567899c4a07a0411a766252d324", "Florida Museum", "Standard"),
  },
  {
    id: "blue-jay",
    common: "Blue Jay",
    latin: "Cyanocitta cristata",
    class: "Aves",
    order: "Passeriformes",
    family: "Corvidae",
    range: "Eastern and central North America, in oak woods, suburbs and parks.",
    diet: "Acorns, nuts and seeds, plus insects and the occasional egg or nestling.",
    role: "Oak-forest planter — a single jay caches thousands of acorns each autumn and forgets enough to plant groves.",
    tags: ["corvid", "intelligent", "seed-disperser"],
    blurb: "The blue is structural, not pigment — crush the feather and it turns brown. Scanned from the RISD Nature Lab collection.",
    model: sketch("6408ce75336142c09e5069145b66180b", "RISD Nature Lab", "CC BY"),
  },
  {
    id: "american-robin",
    common: "American Robin",
    latin: "Turdus migratorius",
    class: "Aves",
    order: "Passeriformes",
    family: "Turdidae",
    range: "All of North America, breeding to the treeline and wintering from the southern US into Mexico.",
    diet: "Earthworms and insects hunted by sight on lawns; switches to fruit and berries in winter.",
    role: "Soil-invertebrate predator and fruit disperser; its return north is a classic phenological marker of spring.",
    tags: ["songbird", "omnivore", "migratory"],
    blurb: "Cocks its head not to listen but to look — eyes on the sides of the skull watch the ground for worm-cast shadows.",
    model: sketch("fdf2bde2c7344787a7044a944ddc05a5", "osuecampus", "CC BY"),
  },
  {
    id: "peregrine-falcon",
    common: "Peregrine Falcon",
    latin: "Falco peregrinus",
    class: "Aves",
    order: "Falconiformes",
    family: "Falconidae",
    range: "Global — every continent except Antarctica, from Arctic cliffs to city skyscrapers.",
    diet: "Medium-sized birds taken in flight, struck with balled talons at the end of a hunting stoop.",
    role: "Apex aerial predator and urban adapter; the fastest animal on Earth, clocked past 380 km/h in a dive.",
    tags: ["raptor", "apex-predator", "fastest-animal"],
    blurb: "Baffles in its nostrils slow the rush of air so its lungs aren't damaged by the pressure of its own dive.",
    model: sketch("f42f04daa38d4daf866b55b978079975", "Abby Crawford", "Standard"),
  },
  {
    id: "common-raven",
    common: "Common Raven",
    latin: "Corvus corax",
    class: "Aves",
    order: "Passeriformes",
    family: "Corvidae",
    range: "Holarctic — mountains, forests, tundra, desert and coasts of the northern hemisphere.",
    diet: "Omnivore and opportunist: carrion, insects, grain, eggs, refuse — cached and remembered.",
    role: "Scavenger and ecosystem cleaner; among the most intelligent birds, capable of tools, play and planning.",
    tags: ["corvid", "intelligent", "scavenger"],
    blurb: "Pairs for life, flies upside-down for fun, and remembers the face of every human who has wronged it.",
    model: sketch("ec9c0ac738fd4495af334ea2092e8d89", "Virtual Museums of Małopolska", "CC0"),
  },
  {
    id: "ruby-throated-hummingbird",
    common: "Ruby-throated Hummingbird",
    latin: "Archilochus colubris",
    class: "Aves",
    order: "Apodiformes",
    family: "Trochilidae",
    range: "Eastern North America in summer; winters in Central America after a non-stop Gulf of Mexico crossing.",
    diet: "Nectar from red tubular flowers, plus small insects and spiders for protein.",
    role: "Specialist pollinator locked into co-evolved mutualisms with trumpet-shaped flowers.",
    tags: ["pollinator", "migratory", "nectar-feeder"],
    blurb: "A 3-gram bird with an 800 km open-water flight in it — wings beating 53 times a second the whole way.",
    model: sketch("7efab9b136144230b862e45d3fe66f83", "Nestaeric", "Standard"),
  },
  {
    id: "resplendent-quetzal",
    common: "Resplendent Quetzal",
    latin: "Pharomachrus mocinno",
    class: "Aves",
    order: "Trogoniformes",
    family: "Trogonidae",
    range: "Cloud forests from southern Mexico to western Panama, 1,200–3,000 m elevation.",
    diet: "Wild avocados and other Lauraceae fruits, swallowed whole and regurgitated as seed; some insects and small frogs.",
    role: "Seed disperser of cloud-forest trees and flagship species for Central American conservation; sacred to Maya and Aztec cultures.",
    tags: ["cloud-forest", "fruit-eater", "flagship"],
    blurb: "The male's tail streamers can reach a metre — feathers so prized that killing one was once forbidden on pain of death.",
    model: null,
  },
];

/* Meta used by the sidebar header and home view. */
const GUIDE_META = {
  title: "Field Guide",
  volume: "Vol. I — Insecta & Aves",
  compiled: "2026 edition",
};

/* Light schema check: warns in the console if an entry is malformed,
   so adding a species stays foolproof. */
(function validateSpecies() {
  const required = ["id", "common", "latin", "class", "order", "family", "range", "diet", "role", "tags", "blurb"];
  SPECIES.forEach((s, i) => {
    required.forEach((k) => {
      if (s[k] === undefined) console.warn(`[field-guide] species #${i} (${s.id || "?"}) is missing “${k}”`);
    });
    if (s.model && !["sketchfab", "glb"].includes(s.model.type)) {
      console.warn(`[field-guide] ${s.id}: unknown model type — use sketch(), glb(), or null`);
    }
  });
})();
