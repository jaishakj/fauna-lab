/* ============================================================
   FAUNA LAB — DATA FILE
   ------------------------------------------------------------
   All species content lives here. To swap an image, just
   replace the `img` value with any working image URL.

   IMAGE SOURCING NOTE (read this before deploying):
   8 species below carry a `verified: true` flag — their `img`
   field is a real photo hot-linked from Wikimedia Commons,
   confirmed by hand while building this file. The other 42
   have `verified: false` and ship with a generated illustrated
   placeholder (see app.js renderCreatureArt) instead of a
   hot-linked photo, because I couldn't manually confirm a
   working Commons file name for each one without an enormous
   number of lookups. Every entry still carries a real
   `commonsQuery` — the app turns this into a live "Find a
   photo on Wikimedia Commons" link on the detail page so you
   (or anyone) can grab a real photo and paste its URL into
   the `img` field in about 10 seconds. Flip `verified` to
   true once you do.

   REAL 3D MODELS (optional — none are wired up by default):
   Add a `model` field to any species object below and the
   viewer automatically swaps its "3D" button from a stylized
   CSS spin over to a real, orbit-able model. Two formats:

     model: { type:'sketchfab', id:'2b5e1e1a4a...' },
       // id = the 32-char code from a Sketchfab model's
       // embed URL: sketchfab.com/models/<id>/embed

     model: { type:'glb', url:'models/honeybee.glb' },
       // any direct .glb/.gltf URL, local or hosted, rendered
       // via <model-viewer> (already loaded in index.html)

   Full instructions, with where to find free/CC models, are
   also in-app: More menu -> "Add a real 3D model".
   ============================================================ */

const CATEGORIES = [
  { key: 'bees',        label: 'Bees',              class: 'Insects', icon: 'bee' },
  { key: 'butterflies', label: 'Butterflies',       class: 'Insects', icon: 'butterfly' },
  { key: 'moths',       label: 'Moths',             class: 'Insects', icon: 'moth' },
  { key: 'beetles',     label: 'Beetles',           class: 'Insects', icon: 'beetle' },
  { key: 'dragonflies', label: 'Dragonflies',       class: 'Insects', icon: 'dragonfly' },
  { key: 'wasps',       label: 'Wasps',             class: 'Insects', icon: 'wasp' },
  { key: 'ants',        label: 'Ants',              class: 'Insects', icon: 'ant' },
  { key: 'hummingbirds',label: 'Hummingbirds',      class: 'Birds',   icon: 'hummingbird' },
  { key: 'songbirds',   label: 'Songbirds',         class: 'Birds',   icon: 'songbird' },
  { key: 'raptors',     label: 'Raptors',           class: 'Birds',   icon: 'raptor' },
  { key: 'owls',        label: 'Owls',              class: 'Birds',   icon: 'owl' },
  { key: 'waterfowl',   label: 'Waterfowl',         class: 'Birds',   icon: 'waterfowl' },
];

const CDN = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file).replace(/%2C/g, ',')}?width=1200`;

const SPECIES = [
// ---------------------------------------------------------- BEES
{
  id:'western-honey-bee', guideNo:1, name:'Western Honey Bee', sci:'Apis mellifera',
  class:'Insects', category:'bees', family:'Apidae', tags:['Social','Pollinator'],
  details:'A eusocial bee that lives in colonies of up to 80,000 workers built around a single queen. Native to Europe, Africa and the Middle East, it is now the most widely kept bee on Earth.',
  traits:'Communicates food locations to nestmates through the waggle dance and round dance, converting the distance and direction of a food source into a repeatable pattern of movement.',
  diet:'Forages nectar and pollen from a huge range of flowering plants, converting nectar into honey for winter stores.',
  range:'Native to Europe, Africa and western Asia; introduced to every continent except Antarctica.',
  role:'The single most economically important managed pollinator, supporting an estimated tens of billions of dollars in global crop production each year.',
  habitat:'Farmland & Gardens', funFact:'A worker bee visits up to 100 flowers on a single foraging trip and can fly roughly 8 km/h.',
  verified:true, img:CDN('Apis mellifera 2 Luc Viatour.JPG'), imgCredit:'Wikimedia Commons — Luc Viatour',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Featured_pictures_of_Apis_mellifera', commonsQuery:'Apis mellifera'
},
{
  id:'buff-tailed-bumblebee', guideNo:2, name:'Buff-tailed Bumblebee', sci:'Bombus terrestris',
  class:'Insects', category:'bees', family:'Apidae', tags:['Social','Cold-tolerant'],
  details:'A large, thickset bumblebee covered in dense hair that lets it forage in cooler, cloudier weather than most bees can tolerate.',
  traits:'Uses buzz pollination — vibrating its flight muscles at a specific frequency to shake pollen loose from flowers like tomatoes, which honey bees cannot do.',
  diet:'Generalist forager on a wide range of wildflowers and crops, with a preference for open, tubular blooms.',
  range:'Native across Europe and western Asia; commercially introduced to South America, Japan and elsewhere for greenhouse pollination.',
  role:'A key early-season pollinator, active from very early spring before most other bees emerge.',
  habitat:'Meadows & Gardens', funFact:'A queen can single-handedly found an entire colony after waking alone from winter hibernation.',
  verified:true, img:CDN('Buff-tailed bumblebee (Bombus terrestris) 2.jpg'), imgCredit:'Wikimedia Commons',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Bombus_terrestris', commonsQuery:'Bombus terrestris'
},
{
  id:'orchid-bee', guideNo:3, name:'Orchid Bee', sci:'Euglossa dilemma',
  class:'Insects', category:'bees', family:'Apidae', tags:['Solitary','Iridescent'],
  details:'A brilliantly metallic green bee named for the males\u2019 habit of collecting fragrance compounds from orchids and other scented sources.',
  traits:'Males store collected scent chemicals in pouches on their hind legs and release them during courtship display, a behavior found in almost no other bee group.',
  diet:'Females feed on nectar and pollen from a wide range of tropical flowers; males also visit rotting fruit and fungi to gather aroma compounds.',
  range:'Native to Central America and Mexico; established in Florida since the early 2000s.',
  role:'A specialist pollinator of orchids, many of which have evolved shapes that fit only euglossine bees.',
  habitat:'Tropical Forest', funFact:'Their metallic sheen comes from microscopic layered structures in the exoskeleton, not pigment.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Euglossa dilemma'
},
{
  id:'alfalfa-leafcutter-bee', guideNo:4, name:'Alfalfa Leafcutter Bee', sci:'Megachile rotundata',
  class:'Insects', category:'bees', family:'Megachilidae', tags:['Solitary','Fast-flying'],
  details:'A small solitary bee that neatly slices circular and oval pieces from leaves to build cigar-shaped brood cells inside tunnels and cavities.',
  traits:'Carries pollen on a dense brush of hair under its abdomen rather than on its legs, making it a notably efficient pollen mover per visit.',
  diet:'Specializes in legume flowers, especially alfalfa, whose tripping mechanism most other bees avoid.',
  range:'Native to Eurasia; introduced to North America where it is now the primary managed pollinator of alfalfa seed crops.',
  role:'Manages pollination on a huge share of commercial alfalfa seed production, often housed in purpose-built nesting boards.',
  habitat:'Farmland', funFact:'A single female can complete her entire nest-building life cycle in about three to four weeks.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Megachile rotundata'
},
{
  id:'violet-carpenter-bee', guideNo:5, name:'Violet Carpenter Bee', sci:'Xylocopa violacea',
  class:'Insects', category:'bees', family:'Apidae', tags:['Solitary','Wood-nesting'],
  details:'Europe\u2019s largest bee, with a stout black body and wings that flash deep violet-blue in direct sunlight.',
  traits:'Chews tunnels into dead wood and soft timber with powerful mandibles to build a nest, rather than digging into soil like most solitary bees.',
  diet:'Favors deep, tubular flowers such as wisteria and sage, and is strong enough to force open blooms that smaller bees cannot access.',
  range:'Southern and central Europe, North Africa and parts of Asia.',
  role:'An important pollinator of early-flowering trees and legumes thanks to its long flight season and large body size.',
  habitat:'Woodland Edge & Gardens', funFact:'Despite its intimidating size, it is docile and very rarely stings unless directly handled.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Xylocopa violacea'
},
{
  id:'blue-orchard-mason-bee', guideNo:6, name:'Blue Orchard Mason Bee', sci:'Osmia lignaria',
  class:'Insects', category:'bees', family:'Megachilidae', tags:['Solitary','Orchard Pollinator'],
  details:'A metallic blue-black bee that nests in narrow, pre-existing holes, sealing each brood cell behind a wall of mud.',
  traits:'Flies at cooler temperatures and lower light levels than honey bees, making it active during the short, unpredictable weather windows of early spring bloom.',
  diet:'A generalist forager but especially valuable on early tree fruit and nut blossom, including apple, cherry and almond.',
  range:'Native across most of temperate North America.',
  role:'A single female can pollinate as much fruit blossom as several hundred honey bee workers, thanks to her loose, messy pollen-carrying style.',
  habitat:'Orchards & Gardens', funFact:'Commercial orchards now rent out cardboard nesting tubes of mason bee cocoons the way they rent honey bee hives.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Osmia lignaria'
},

// ---------------------------------------------------------- BUTTERFLIES
{
  id:'monarch-butterfly', guideNo:7, name:'Monarch Butterfly', sci:'Danaus plexippus',
  class:'Insects', category:'butterflies', family:'Nymphalidae', tags:['Migratory','Toxic'],
  details:'A large orange-and-black butterfly famous for a multigenerational migration spanning up to 4,800 km between North America and central Mexico.',
  traits:'Caterpillars sequester toxic cardenolide compounds from milkweed, making both larvae and adults poisonous to most vertebrate predators.',
  diet:'Caterpillars feed exclusively on milkweed; adults nectar on a wide range of wildflowers along their migratory corridor.',
  range:'North America, with populations also established in Australia, New Zealand, and parts of Europe and the Pacific.',
  role:'An indicator species for milkweed and grassland habitat health, and one of the most closely tracked insect migrations in the world.',
  habitat:'Meadows & Migratory Corridors', funFact:'The generation that migrates south each fall can live up to eight months — ten times longer than a typical summer generation.',
  verified:true, img:CDN('Monarch Butterfly (Danaus plexippus) - Guelph, Ontario.jpg'), imgCredit:'Wikimedia Commons',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Danaus_plexippus', commonsQuery:'Danaus plexippus'
},
{
  id:'old-world-swallowtail', guideNo:8, name:'Old World Swallowtail', sci:'Papilio machaon',
  class:'Insects', category:'butterflies', family:'Papilionidae', tags:['Diurnal','Fast-flying'],
  details:'A large yellow-and-black butterfly with elegant tail streamers on its hindwings, among the most widespread swallowtails on the planet.',
  traits:'Caterpillars defend themselves with an osmeterium — a forked, foul-smelling orange organ that pops out from behind the head when threatened.',
  diet:'Caterpillars feed on plants in the carrot family, especially wild fennel and dill; adults nectar on thistles and other open flowers.',
  range:'Found across Europe, temperate Asia, and North America north of the Arctic Circle.',
  role:'A wide-ranging pollinator whose caterpillars are also a food source for birds, making it a mid-level link in many food webs.',
  habitat:'Meadows & Grasslands', funFact:'It is the only swallowtail butterfly native to the British Isles, where it survives in just a few wetland strongholds.',
  verified:true, img:CDN('Papilio machaon maiting.jpg'), imgCredit:'Wikimedia Commons',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Papilio_machaon', commonsQuery:'Papilio machaon'
},
{
  id:'painted-lady', guideNo:9, name:'Painted Lady', sci:'Vanessa cardui',
  class:'Insects', category:'butterflies', family:'Nymphalidae', tags:['Migratory','Cosmopolitan'],
  details:'One of the most widely distributed butterflies in the world, found on every continent except Antarctica and South America.',
  traits:'Undertakes a multi-generation migration between tropical Africa and the Arctic Circle, a round trip covering roughly 15,000 km that scientists only fully mapped using radar in the 2010s.',
  diet:'Caterpillars feed on thistles and mallows among many other plants; adults nectar on an unusually broad range of flowers.',
  range:'Nearly global, absent only from South America, Antarctica, and Australia.',
  role:'A generalist pollinator whose mass migrations occasionally reach outbreak numbers visible on weather radar.',
  habitat:'Open Country, Nearly Everywhere', funFact:'It is sometimes called the "cosmopolitan" butterfly for its almost worldwide range.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Vanessa cardui'
},
{
  id:'blue-morpho', guideNo:10, name:'Blue Morpho', sci:'Morpho peleides',
  class:'Insects', category:'butterflies', family:'Nymphalidae', tags:['Iridescent','Forest Canopy'],
  details:'A large rainforest butterfly whose brilliant metallic-blue wings flash on and off in flight, an optical effect rather than pigment.',
  traits:'Wing scales are structured with microscopic ridges that scatter light at specific wavelengths, a phenomenon called structural coloration.',
  diet:'Caterpillars feed on legume foliage; adults favor fermenting fruit and tree sap over nectar.',
  range:'Tropical forests of Central America and northern South America.',
  role:'A dramatic example of anti-predator flash coloration, alternately flashing bright blue and camouflaged brown as it flies.',
  habitat:'Tropical Rainforest', funFact:'The underside of its wings is dull brown with eyespots, making it nearly invisible the instant it lands and closes its wings.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Morpho peleides'
},
{
  id:'red-admiral', guideNo:11, name:'Red Admiral', sci:'Vanessa atalanta',
  class:'Insects', category:'butterflies', family:'Nymphalidae', tags:['Territorial','Migratory'],
  details:'A fast, strong-flying butterfly with velvety black wings crossed by bold orange-red bands and white wingtip spots.',
  traits:'Males stake out and defend sunlit territorial perches in late afternoon, chasing off rivals and even investigating passing birds.',
  diet:'Caterpillars feed almost exclusively on nettles; adults are especially drawn to fermenting fruit, tree sap and, in autumn, garden flowers.',
  range:'Europe, North Africa, Asia and North America.',
  role:'A common and conspicuous garden pollinator, often one of the last butterflies still active in late autumn.',
  habitat:'Gardens & Woodland Edges', funFact:'Northern populations migrate south for winter much like monarchs, though the journey is far less studied.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Vanessa atalanta'
},
{
  id:'peacock-butterfly', guideNo:12, name:'Peacock Butterfly', sci:'Aglais io',
  class:'Insects', category:'butterflies', family:'Nymphalidae', tags:['Hibernating','Startle Display'],
  details:'A richly patterned reddish-brown butterfly named for the four enormous eyespots that dominate its wings.',
  traits:'When threatened, it snaps its wings open and rubs them together to produce a hissing sound while flashing its eyespots — a combined visual and audio startle display.',
  diet:'Caterpillars feed in large colonial groups on nettles; adults nectar on buddleia, thistles and other late-summer flowers.',
  range:'Widespread across temperate Europe and Asia.',
  role:'Overwinters as an adult in hollow trees, sheds and outbuildings, making it one of the first butterflies seen each spring.',
  habitat:'Gardens & Woodland', funFact:'The eyespots are thought to mimic the eyes of a small owl closely enough to startle birds mid-attack.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Aglais io'
},

// ---------------------------------------------------------- MOTHS
{
  id:'garden-tiger-moth', guideNo:13, name:'Garden Tiger Moth', sci:'Arctia caja',
  class:'Insects', category:'moths', family:'Erebidae', tags:['Nocturnal','Chemically Defended'],
  details:'A large, boldly patterned moth with chocolate-and-cream marbled forewings that conceal vivid orange hindwings spotted with blue-black.',
  traits:'When disturbed, it flashes its bright hindwings and can release a defensive fluid from glands behind its head, warning predators it is distasteful.',
  diet:'Caterpillars — the densely bristled "woolly bear" — feed on a wide range of low-growing plants including nettle, dock and dandelion.',
  range:'Temperate regions across Europe and North America.',
  role:'A night-flying pollinator and an important food source for bats, though its bristly caterpillar is largely avoided by birds.',
  habitat:'Gardens & Grassland', funFact:'Its caterpillar hair can cause skin irritation in some people, a defense that persists even after it becomes a moth.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Arctia caja'
},
{
  id:'luna-moth', guideNo:14, name:'Luna Moth', sci:'Actias luna',
  class:'Insects', category:'moths', family:'Saturniidae', tags:['Nocturnal','Non-feeding Adult'],
  details:'A pale lime-green silk moth with long, elegantly trailing hindwing tails and a wingspan that can reach 11 cm.',
  traits:'The trailing tails spin during flight to jam the echolocation calls of hunting bats, measurably improving the moth\u2019s odds of escape.',
  diet:'Caterpillars feed on the leaves of walnut, hickory, sweetgum and birch; the short-lived adult has no functional mouthparts and never eats.',
  range:'Deciduous forests of eastern North America.',
  role:'A striking pollinator-adjacent presence in forest ecosystems and a favorite subject for citizen science moth surveys.',
  habitat:'Deciduous Forest', funFact:'Adults live for about a week, existing only to mate — all of their energy was stored up during the caterpillar stage.',
  verified:true, img:CDN('Actias luna in Florida.jpg'), imgCredit:'Wikimedia Commons',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Actias_luna', commonsQuery:'Actias luna'
},
{
  id:'atlas-moth', guideNo:15, name:'Atlas Moth', sci:'Attacus atlas',
  class:'Insects', category:'moths', family:'Saturniidae', tags:['Nocturnal','Giant'],
  details:'One of the largest moths in the world by wing surface area, with wingtips shaped and patterned to resemble a snake\u2019s head.',
  traits:'The snake-head wingtip pattern is thought to startle or deter birds and small predators when the moth flexes its wings.',
  diet:'Caterpillars feed on a range of tropical trees including citrus and cinnamon relatives; adults, like luna moths, have no working mouthparts and do not feed.',
  range:'Tropical and subtropical forests of South and Southeast Asia.',
  role:'Its silk is harvested in parts of Asia for a coarse, durable textile distinct from commercial silkworm silk.',
  habitat:'Tropical Forest', funFact:'A wingspan of up to 30 cm makes it one of the largest lepidopterans on Earth by wing area.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Attacus atlas'
},
{
  id:'hummingbird-hawk-moth', guideNo:16, name:'Hummingbird Hawk-moth', sci:'Macroglossum stellatarum',
  class:'Insects', category:'moths', family:'Sphingidae', tags:['Diurnal','Hovering'],
  details:'A day-flying moth so often mistaken for a hummingbird that its name describes the confusion directly.',
  traits:'Hovers in place while feeding by beating its wings roughly 70–80 times per second, unusually fast for a moth and comparable to a small hummingbird.',
  diet:'Uses an exceptionally long proboscis to drink nectar from tubular flowers such as honeysuckle, jasmine and red valerian without landing.',
  range:'Europe, North Africa and temperate Asia; strongly migratory, appearing well north of its breeding range most summers.',
  role:'An efficient long-tongued pollinator of deep-throated flowers that shorter-tongued insects cannot reach.',
  habitat:'Gardens & Meadows', funFact:'It can remember and revisit productive flowerbeds at the same time of day, showing a measurable sense of time.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Macroglossum stellatarum'
},

// ---------------------------------------------------------- BEETLES
{
  id:'seven-spot-ladybird', guideNo:17, name:'Seven-spot Ladybird', sci:'Coccinella septempunctata',
  class:'Insects', category:'beetles', family:'Coccinellidae', tags:['Predator','Diurnal'],
  details:'A glossy red beetle with seven black spots, among the most recognizable insects in the Northern Hemisphere.',
  traits:'When threatened, it plays dead and releases a foul-tasting yellow fluid called reflex blood from its leg joints to deter predators.',
  diet:'Both larvae and adults are voracious predators of aphids, with a single adult capable of eating dozens in a day.',
  range:'Native across Europe, Asia and North Africa; introduced to North America for pest control.',
  role:'One of the most effective natural aphid control agents in agriculture, reducing the need for chemical pesticides.',
  habitat:'Gardens & Farmland', funFact:'Its bright red-and-black pattern is a textbook example of aposematic, or warning, coloration.',
  verified:true, img:CDN('Seven Spotted-Ladybug - Coccinella septempunctata.jpg'), imgCredit:'Wikimedia Commons',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Coccinella_septempunctata', commonsQuery:'Coccinella septempunctata'
},
{
  id:'stag-beetle', guideNo:18, name:'Stag Beetle', sci:'Lucanus cervus',
  class:'Insects', category:'beetles', family:'Lucanidae', tags:['Nocturnal','Wood-dependent'],
  details:'Europe\u2019s largest beetle, named for the male\u2019s dramatically enlarged, antler-like mandibles.',
  traits:'Males use their oversized jaws to wrestle rivals off tree sap sites and potential mates, in contests that resemble miniature deer rutting battles.',
  diet:'Larvae spend several years feeding inside rotting wood and tree stumps; adults feed little, mainly sipping tree sap and honeydew.',
  range:'Woodlands across western and central Europe.',
  role:'A keystone decomposer whose larvae help break down dead wood, recycling nutrients back into forest soil.',
  habitat:'Deciduous Woodland', funFact:'Despite their fearsome jaws, males cannot actually bite hard — the real pinch comes from the smaller-jawed females.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Lucanus cervus'
},
{
  id:'rhinoceros-beetle', guideNo:19, name:'Rhinoceros Beetle', sci:'Xylotrupes gideon',
  class:'Insects', category:'beetles', family:'Scarabaeidae', tags:['Nocturnal','Powerful'],
  details:'A heavily armored beetle whose males carry a large curved horn used to flip rival males off of fallen fruit and sap flows.',
  traits:'Pound for pound, rhinoceros beetles are among the strongest animals on Earth, able to carry loads many times their own body weight.',
  diet:'Larvae feed on decaying wood and plant matter in soil; adults feed on tree sap and overripe fruit.',
  range:'Southeast Asia and northern Australia.',
  role:'Larvae are important decomposers in tropical leaf litter and rotting wood ecosystems.',
  habitat:'Tropical Forest', funFact:'Its horn is used almost exclusively for wrestling rivals rather than defense against predators.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Xylotrupes gideon'
},
{
  id:'jewel-beetle', guideNo:20, name:'Jewel Beetle', sci:'Sternocera aequisignata',
  class:'Insects', category:'beetles', family:'Buprestidae', tags:['Iridescent','Diurnal'],
  details:'A beetle encased in a hard, brilliantly iridescent green-gold shell that has been used for centuries as a natural decorative material.',
  traits:'Its coloration comes from microscopic structural layers in the exoskeleton rather than pigment, keeping its shine even decades after death.',
  diet:'Adults feed on the foliage of legume trees; larvae bore and develop inside wood.',
  range:'Southeast Asia, especially Thailand and neighboring countries.',
  role:'Historically significant in textile and jewelry traditions across Southeast Asia, where its shed elytra are sewn into garments.',
  habitat:'Tropical & Subtropical Forest', funFact:'Its wing cases have been used in embroidery in Thailand and India for hundreds of years, prized for never fading.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Sternocera aequisignata'
},
{
  id:'sacred-scarab', guideNo:21, name:'Sacred Scarab', sci:'Scarabaeus sacer',
  class:'Insects', category:'beetles', family:'Scarabaeidae', tags:['Diurnal','Decomposer'],
  details:'A stocky black dung beetle that rolls dung into precise balls far larger than itself, revered in ancient Egyptian culture as a symbol of renewal.',
  traits:'Navigates in a straight line while rolling its dung ball by reading polarized light patterns in the sky, and can even orient using the Milky Way on moonless nights.',
  diet:'Feeds on and breeds inside the dung of large grazing mammals.',
  range:'Southern Europe, North Africa and the Middle East.',
  role:'A vital decomposer that buries and recycles animal dung, aerating soil and controlling fly populations in grazing ecosystems.',
  habitat:'Grassland & Savanna', funFact:'Ancient Egyptians associated its dung-rolling behavior with the sun god Ra rolling the sun across the sky.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Scarabaeus sacer'
},

// ---------------------------------------------------------- DRAGONFLIES
{
  id:'blue-emperor-dragonfly', guideNo:22, name:'Blue Emperor Dragonfly', sci:'Anax imperator',
  class:'Insects', category:'dragonflies', family:'Aeshnidae', tags:['Predator','Territorial'],
  details:'One of Europe\u2019s largest dragonflies, with a powder-blue abdomen and a green thorax, patrolling ponds in fast, direct flight.',
  traits:'An apex aerial predator relative to its size, capable of catching and eating prey — including other dragonflies — entirely on the wing.',
  diet:'Adults hunt flying insects including midges, mosquitoes and butterflies; aquatic nymphs prey on tadpoles and small fish.',
  range:'Widespread across Europe, Africa and parts of Asia.',
  role:'A significant natural check on mosquito and midge populations around freshwater habitats.',
  habitat:'Ponds & Wetlands', funFact:'Its huge compound eyes contain up to 30,000 individual lenses, giving it near 360-degree vision.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Anax imperator'
},
{
  id:'blue-dasher', guideNo:23, name:'Blue Dasher', sci:'Pachydiplax longipennis',
  class:'Insects', category:'dragonflies', family:'Libellulidae', tags:['Territorial','Perching'],
  details:'A small, chunky dragonfly, the males powder-blue and the females and juveniles boldly striped in black and yellow.',
  traits:'Males defend a perch with a clear view of open water, darting out to intercept both rivals and prey before returning to the same spot.',
  diet:'Adults ambush small flying insects; nymphs are ambush predators of aquatic invertebrates and small fish fry.',
  range:'Widespread across North America.',
  role:'A common and easily observed indicator of healthy still-water habitats, from garden ponds to large wetlands.',
  habitat:'Ponds & Marshes', funFact:'Its scientific name longipennis, "long-winged," refers to its unusually elongated hindwings.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Pachydiplax longipennis'
},
{
  id:'banded-demoiselle', guideNo:24, name:'Banded Demoiselle', sci:'Calopteryx splendens',
  class:'Insects', category:'dragonflies', family:'Calopterygidae', tags:['Territorial','Slow Flight'],
  details:'A delicate damselfly with a metallic blue-green body; males carry a broad dark band across each wing.',
  traits:'Males perform a fluttering courtship display, hovering in front of females to show off their wing bands before guiding them to a suitable egg-laying site.',
  diet:'Adults take small flying insects; aquatic larvae feed on tiny invertebrates among submerged plants.',
  range:'Rivers and streams across Europe and temperate Asia.',
  role:'A sensitive indicator of clean, well-oxygenated flowing water, quick to disappear from polluted streams.',
  habitat:'Rivers & Streams', funFact:'Unlike true dragonflies, it folds its wings together over its back at rest — the easiest way to tell a damselfly from a dragonfly.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Calopteryx splendens'
},
{
  id:'common-green-darner', guideNo:25, name:'Common Green Darner', sci:'Anax junius',
  class:'Insects', category:'dragonflies', family:'Aeshnidae', tags:['Migratory','Predator'],
  details:'A large green-and-blue dragonfly and one of the few insect species known to undertake a true multigenerational migration.',
  traits:'Migrates south in autumn in loose swarms alongside monarch butterflies, with a second generation returning north the following spring.',
  diet:'A powerful aerial hunter of mosquitoes, midges and other flying insects, caught and eaten in flight.',
  range:'Throughout North America, with resident and migratory populations.',
  role:'A major natural control on mosquito populations and one of the best-studied insect migrations after the monarch butterfly.',
  habitat:'Ponds & Wetlands', funFact:'Radio-tag tracking has shown individual green darners can cover over 100 km in a single day of migration.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Anax junius'
},

// ---------------------------------------------------------- WASPS
{
  id:'european-paper-wasp', guideNo:26, name:'European Paper Wasp', sci:'Polistes dominula',
  class:'Insects', category:'wasps', family:'Vespidae', tags:['Social','Predator'],
  details:'A slender, brightly banded wasp that builds small open-comb paper nests, chewing wood fiber mixed with saliva into a papery pulp.',
  traits:'Colonies are founded by one or several cooperating queens, with dominance settled through ritualized aggression rather than immediate fighting.',
  diet:'Adults feed on nectar but hunt caterpillars and other soft-bodied insects to feed their larvae, chewing prey into a paste.',
  range:'Native to southern Europe; now widespread in North America and elsewhere.',
  role:'A significant natural predator of garden and agricultural caterpillar pests, alongside a secondary role as a pollinator.',
  habitat:'Gardens & Urban Areas', funFact:'Colony members can recognize each other\u2019s individual facial markings, one of the few insects known to do so.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Polistes dominula'
},
{
  id:'tarantula-hawk', guideNo:27, name:'Tarantula Hawk', sci:'Pepsis grossa',
  class:'Insects', category:'wasps', family:'Pompilidae', tags:['Solitary','Extreme Sting'],
  details:'A large, iridescent blue-black wasp with fiery orange wings, hunting tarantulas far larger than itself.',
  traits:'Delivers one of the most painful stings of any insect, ranked near the top of the Schmidt sting pain index, used purely to paralyze prey rather than for defense.',
  diet:'Adults feed on nectar and fermented fruit; females paralyze a tarantula and lay a single egg on it as a living food store for their larva.',
  range:'Deserts and dry habitats of the southwestern United States, Mexico and South America.',
  role:'A specialized natural check on tarantula populations, and the state insect of New Mexico.',
  habitat:'Desert & Scrubland', funFact:'A stung tarantula is not killed outright — it is paralyzed alive and buried, staying fresh for the wasp larva to feed on.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Pepsis grossa'
},
{
  id:'ruby-tailed-wasp', guideNo:28, name:'Ruby-tailed Wasp', sci:'Chrysis ignita',
  class:'Insects', category:'wasps', family:'Chrysididae', tags:['Solitary','Iridescent'],
  details:'A tiny jewel-like wasp with a metallic ruby-and-emerald body, sometimes called a cuckoo wasp for its parasitic nesting habits.',
  traits:'Can curl into a tight, armored ball when attacked by a host wasp, protecting its softer underside with a thickened exoskeleton.',
  diet:'Adults feed on nectar; larvae develop as kleptoparasites, consuming the food stores and sometimes the larvae of solitary bee and wasp hosts.',
  range:'Widespread across Europe and temperate Asia.',
  role:'A natural population regulator of the solitary bees and wasps it parasitizes, part of a finely balanced host-parasite relationship.',
  habitat:'Gardens & Woodland Edges', funFact:'Its brilliant coloring is structural, like a beetle\u2019s, produced by microscopic layers rather than pigment.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Chrysis ignita'
},

// ---------------------------------------------------------- ANTS
{
  id:'leafcutter-ant', guideNo:29, name:'Leafcutter Ant', sci:'Atta cephalotes',
  class:'Insects', category:'ants', family:'Formicidae', tags:['Social','Farmer'],
  details:'A tropical ant famous for stripping leaves and carrying fragments many times its own size back to an underground colony.',
  traits:'Does not eat the leaves directly — it uses them to cultivate a fungus garden underground, the colony\u2019s true food source, in one of the animal kingdom\u2019s few true agricultural systems.',
  diet:'Feeds on a specialized fungus grown on chewed leaf pulp inside the nest.',
  range:'Tropical forests of Central and South America.',
  role:'A major ecosystem engineer, moving more vegetation than almost any other herbivore in its range and aerating large volumes of soil.',
  habitat:'Tropical Rainforest', funFact:'A mature colony can include several million ants and move as much soil as an earthworm population many times its size.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Atta cephalotes'
},
{
  id:'weaver-ant', guideNo:30, name:'Weaver Ant', sci:'Oecophylla smaragdina',
  class:'Insects', category:'ants', family:'Formicidae', tags:['Social','Arboreal'],
  details:'A large, aggressive, bright green-bodied ant that builds nests entirely in trees by binding living leaves together.',
  traits:'Worker ants form living chains, pulling leaf edges together while other workers use silk produced by their own larvae like glue to bind the nest shut.',
  diet:'A generalist predator of other insects, also tending sap-sucking insects for sugary honeydew.',
  range:'Tropical Asia and Australia.',
  role:'Used for centuries as a natural pest-control agent in orchards across Southeast Asia, protecting citrus and mango trees from insect pests.',
  habitat:'Tropical Forest & Orchards', funFact:'Colonies can span multiple trees and contain over half a million ants working as a single coordinated superorganism.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Oecophylla smaragdina'
},

// ---------------------------------------------------------- HUMMINGBIRDS
{
  id:'ruby-throated-hummingbird', guideNo:31, name:'Ruby-throated Hummingbird', sci:'Archilochus colubris',
  class:'Birds', category:'hummingbirds', family:'Trochilidae', tags:['Avian','Migratory'],
  details:'A tiny bird with an emerald back and crown; males show a brilliant iridescent red throat patch called a gorget.',
  traits:'Hovers by beating its wings in a figure-eight pattern roughly 50 times per second, and is the only hummingbird species that regularly breeds in eastern North America.',
  diet:'Feeds on nectar from tubular red and orange flowers, supplemented with small insects and spiders for protein.',
  range:'Breeds in eastern North America; winters in Mexico and Central America.',
  role:'A key pollinator of red, tubular native flowers such as trumpet creeper and cardinal flower.',
  habitat:'Woodland Edges & Gardens', funFact:'It crosses the Gulf of Mexico in a single nonstop flight of up to 800 km during migration, doubling its body weight in fat beforehand.',
  verified:true, img:CDN('Archilochus colubris (Male).jpg'), imgCredit:'Wikimedia Commons — JMSchneid',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Archilochus_colubris', commonsQuery:'Archilochus colubris'
},
{
  id:'annas-hummingbird', guideNo:32, name:'Anna\u2019s Hummingbird', sci:'Calypte anna',
  class:'Birds', category:'hummingbirds', family:'Trochilidae', tags:['Avian','Resident'],
  details:'A stocky, adaptable hummingbird; males show an iridescent rose-pink crown and throat that can look nearly black without direct light.',
  traits:'Performs one of the most extreme dives in the animal kingdom, plunging over 20 meters at speeds exceeding 50 mph during courtship, pulling close to 9 g of force at the bottom.',
  diet:'Feeds on nectar from native and garden flowers, plus small insects, and readily uses backyard feeders.',
  range:'Pacific coast of North America, from Baja California to British Columbia.',
  role:'Unlike most hummingbirds, it does not migrate south for winter, instead surviving cold snaps by dropping into a low-energy torpor overnight.',
  habitat:'Coastal Gardens & Urban Areas', funFact:'Its dive produces a brief chirp sound made not by its voice but by its tail feathers vibrating in the airflow.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Calypte anna'
},
{
  id:'sword-billed-hummingbird', guideNo:33, name:'Sword-billed Hummingbird', sci:'Ensifera ensifera',
  class:'Birds', category:'hummingbirds', family:'Trochilidae', tags:['Avian','High-altitude'],
  details:'The only bird whose bill is longer than the rest of its body, evolved to match one specific group of extremely long, tubular flowers.',
  traits:'Must perch nearly vertically and preen with its feet rather than its bill, since the enormous bill makes normal grooming impossible.',
  diet:'Specializes in nectar from long-tubed Passiflora and other deep flowers that no other hummingbird can reach.',
  range:'High-altitude cloud forests of the Andes, from Venezuela to Bolivia.',
  role:'The exclusive pollinator of several long-tubed Andean flower species, an extreme example of coevolution between bird and plant.',
  habitat:'Andean Cloud Forest', funFact:'Its bill and tongue together can be longer than its entire body, tail included.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Ensifera ensifera'
},
{
  id:'rufous-hummingbird', guideNo:34, name:'Rufous Hummingbird', sci:'Selasphorus rufus',
  class:'Birds', category:'hummingbirds', family:'Trochilidae', tags:['Avian','Migratory'],
  details:'A small, fiery orange hummingbird with an outsized reputation for aggression, often chasing off birds many times its size.',
  traits:'Undertakes one of the longest migrations relative to body size of any bird, traveling roughly 6,400 km one-way along a looping figure-eight route.',
  diet:'Feeds on nectar from a wide range of wildflowers along its migratory route, timing its journey to match successive blooms.',
  range:'Breeds as far north as Alaska; winters in Mexico.',
  role:'An important high-latitude pollinator for wildflowers in the Pacific Northwest and western mountains.',
  habitat:'Mountain Forests & Meadows', funFact:'Pound for pound, its migration is one of the longest of any bird species on the planet.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Selasphorus rufus'
},

// ---------------------------------------------------------- SONGBIRDS
{
  id:'american-robin', guideNo:35, name:'American Robin', sci:'Turdus migratorius',
  class:'Birds', category:'songbirds', family:'Turdidae', tags:['Avian','Widespread'],
  details:'A large, familiar thrush with a warm orange breast and dark gray back, one of the most widely recognized birds in North America.',
  traits:'Hunts earthworms visually rather than by sound, cocking its head to look and listen before a quick, precise strike at the soil.',
  diet:'Feeds on earthworms and insects in spring and summer, switching heavily to fruit and berries in fall and winter.',
  range:'Breeds across most of North America; northern populations migrate south in winter.',
  role:'Widely regarded as an early sign of spring across much of its range, though many populations actually remain through winter.',
  habitat:'Lawns, Gardens & Woodland', funFact:'Its bright blue eggs gave rise to the widely used color name "robin\u2019s egg blue."',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Turdus migratorius'
},
{
  id:'northern-cardinal', guideNo:36, name:'Northern Cardinal', sci:'Cardinalis cardinalis',
  class:'Birds', category:'songbirds', family:'Cardinalidae', tags:['Avian','Non-migratory'],
  details:'A vivid red songbird with a prominent crest, the male among the most eye-catching birds in eastern North American backyards.',
  traits:'Unusually for North American songbirds, females sing nearly as often and as elaborately as males, frequently duetting with their mate from the nest.',
  diet:'Feeds on seeds, grain and fruit, with insects making up a larger share of the diet during the breeding season.',
  range:'Eastern and central United States into Mexico, expanding its range northward in recent decades.',
  role:'A year-round resident and a common backyard feeder bird, contributing to seed dispersal for many native plants.',
  habitat:'Woodland Edges & Gardens', funFact:'It is the state bird of seven U.S. states, more than any other species.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Cardinalis cardinalis'
},
{
  id:'european-robin', guideNo:37, name:'European Robin', sci:'Erithacus rubecula',
  class:'Birds', category:'songbirds', family:'Muscicapidae', tags:['Avian','Territorial'],
  details:'A small, round bird with an orange face and breast, one of the most culturally beloved birds across the United Kingdom and much of Europe.',
  traits:'Fiercely territorial year-round, both sexes defend individual territories with song and will attack anything showing red, including rival robins\u2019 reflections.',
  diet:'Feeds on insects, worms, seeds and berries, and famously follows gardeners to snatch invertebrates turned up by digging.',
  range:'Across Europe, extending into North Africa and western Asia.',
  role:'A familiar garden companion whose habit of following large digging animals for disturbed insects likely originated from following wild boar.',
  habitat:'Gardens & Woodland', funFact:'Its association with Christmas cards dates back to Victorian postmen, who wore red-breasted uniforms and were nicknamed "robins."',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Erithacus rubecula'
},
{
  id:'blue-jay', guideNo:38, name:'Blue Jay', sci:'Cyanocitta cristata',
  class:'Birds', category:'songbirds', family:'Corvidae', tags:['Avian','Intelligent'],
  details:'A large, crested songbird in vivid blue, white and black, and one of the most vocal and intelligent birds in eastern North American forests.',
  traits:'Can mimic the calls of hawks, possibly to warn other jays of danger or to clear a feeder of competing birds.',
  diet:'An omnivore feeding on nuts, seeds, insects, and occasionally the eggs and nestlings of other birds.',
  range:'Eastern and central North America.',
  role:'A major disperser of acorns and other tree seeds, burying far more than it retrieves and helping regenerate oak forests.',
  habitat:'Forests & Urban Parks', funFact:'A single jay can cache several thousand acorns in a single autumn, remembering the location of many months later.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Cyanocitta cristata'
},
{
  id:'house-sparrow', guideNo:39, name:'House Sparrow', sci:'Passer domesticus',
  class:'Birds', category:'songbirds', family:'Passeridae', tags:['Avian','Urban'],
  details:'A stocky, adaptable brown-and-gray sparrow that has followed human settlements around the globe for thousands of years.',
  traits:'Bathes in dust as well as water, working loose dirt into its feathers to help control parasites and absorb excess oil.',
  diet:'A highly opportunistic omnivore, feeding on grain, seeds, scraps and insects, especially when raising chicks.',
  range:'Native to Eurasia and North Africa; introduced almost worldwide, including the Americas and Australia.',
  role:'One of the most successful urban-adapted bird species on the planet, though its numbers have declined sharply in parts of its native range.',
  habitat:'Urban & Suburban Areas', funFact:'It was deliberately introduced to North America in the 1850s and had spread coast to coast within about 50 years.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Passer domesticus'
},

// ---------------------------------------------------------- RAPTORS
{
  id:'bald-eagle', guideNo:40, name:'Bald Eagle', sci:'Haliaeetus leucocephalus',
  class:'Birds', category:'raptors', family:'Accipitridae', tags:['Avian','Apex Predator'],
  details:'A massive fish-eating eagle with a white head and tail contrasting against a dark brown body, the national bird and symbol of the United States.',
  traits:'Builds the largest tree nests of any North American bird, with some used and enlarged over decades reaching several tons in weight.',
  diet:'Primarily fish, caught by snatching them from the water surface with its talons, supplemented with waterfowl and carrion.',
  range:'Throughout North America, near rivers, lakes and coastlines.',
  role:'A conservation success story, recovering from near-extinction in the lower 48 states after the pesticide DDT was banned in 1972.',
  habitat:'Coastlines, Rivers & Lakes', funFact:'Its famous piercing scream in films is almost always dubbed over with a red-tailed hawk call — the bald eagle\u2019s real voice is a series of weak, chirping whistles.',
  verified:true, img:CDN('Haliaeetus leucocephalus2.jpg'), imgCredit:'Wikimedia Commons',
  imgSource:'https://commons.wikimedia.org/wiki/Category:Haliaeetus_leucocephalus', commonsQuery:'Haliaeetus leucocephalus'
},
{
  id:'peregrine-falcon', guideNo:41, name:'Peregrine Falcon', sci:'Falco peregrinus',
  class:'Birds', category:'raptors', family:'Falconidae', tags:['Avian','Fastest Animal'],
  details:'A powerful, streamlined falcon and the fastest animal on Earth, reaching extraordinary speeds during its hunting stoop.',
  traits:'Dives on prey from great height in a stoop that has been recorded at over 380 km/h, striking with a closed talon rather than a grab.',
  diet:'Feeds almost exclusively on medium-sized birds caught in mid-air, from pigeons to waterfowl.',
  range:'Nearly worldwide, absent only from the most extreme polar regions and some remote islands.',
  role:'Another major conservation success following the DDT ban, and now a common urban nester on skyscrapers and bridges, hunting pigeons over cities.',
  habitat:'Cliffs, Coastlines & Cities', funFact:'Special bony structures in its nostrils slow incoming airflow, letting it breathe normally even during its record-speed dives.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Falco peregrinus'
},
{
  id:'red-tailed-hawk', guideNo:42, name:'Red-tailed Hawk', sci:'Buteo jamaicensis',
  class:'Birds', category:'raptors', family:'Accipitridae', tags:['Avian','Soaring'],
  details:'A large, broad-winged hawk and the most common and widespread hawk in North America, often seen soaring in wide circles or perched on roadside poles.',
  traits:'Its piercing raspy scream is so iconic that Hollywood sound editors dub it over nearly every eagle shown on screen, regardless of species.',
  diet:'A generalist predator of small mammals, especially rodents, along with birds and reptiles.',
  range:'Throughout North America, from Alaska to Panama.',
  role:'An effective natural rodent-control predator across farmland, grassland and suburban habitats alike.',
  habitat:'Open Country & Roadsides', funFact:'Individual color variation is so extreme that some populations range from nearly white to almost solid dark brown.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Buteo jamaicensis'
},
{
  id:'golden-eagle', guideNo:43, name:'Golden Eagle', sci:'Aquila chrysaetos',
  class:'Birds', category:'raptors', family:'Accipitridae', tags:['Avian','Apex Predator'],
  details:'One of the largest and most powerful raptors in the Northern Hemisphere, dark brown with golden-tinged feathers across the nape and crown.',
  traits:'Hunts using a mix of high soaring flight and low, terrain-hugging pursuit, capable of taking prey as large as young deer in a cooperative pair attack.',
  diet:'Primarily hares, rabbits and ground squirrels, occasionally larger mammals and birds.',
  range:'Mountainous and open terrain across the Northern Hemisphere, including North America, Europe and Asia.',
  role:'An apex predator and long-standing cultural symbol across many societies, from Rome to Mongolia to Indigenous North America.',
  habitat:'Mountains & Open Highlands', funFact:'A diving golden eagle has been clocked at speeds exceeding 240 km/h.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Aquila chrysaetos'
},

// ---------------------------------------------------------- OWLS
{
  id:'barn-owl', guideNo:44, name:'Barn Owl', sci:'Tyto alba',
  class:'Birds', category:'owls', family:'Tytonidae', tags:['Avian','Nocturnal'],
  details:'A pale, heart-faced owl found on every continent except Antarctica, with one of the most distinctive silhouettes in the bird world.',
  traits:'Its facial disc functions as a satellite dish for sound, and asymmetrically placed ears let it pinpoint prey location in complete darkness by hearing alone.',
  diet:'Feeds almost entirely on small rodents, swallowed whole and later regurgitated as compact pellets of fur and bone.',
  range:'Nearly worldwide except polar regions and some deserts.',
  role:'A single barn owl family can eat over a thousand rodents in a breeding season, making it a valuable natural pest-control species for farms.',
  habitat:'Farmland & Grassland', funFact:'Its wing feathers have a comb-like leading edge that breaks up turbulence, making its flight almost completely silent.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Tyto alba'
},
{
  id:'great-horned-owl', guideNo:45, name:'Great Horned Owl', sci:'Bubo virginianus',
  class:'Birds', category:'owls', family:'Strigidae', tags:['Avian','Powerful'],
  details:'A large, powerful owl with prominent ear tufts and piercing yellow eyes, one of the most widespread and adaptable owls in the Americas.',
  traits:'Has one of the strongest grip strengths of any raptor relative to size, capable of severing the spine of prey with its talons instantly.',
  diet:'An opportunistic predator taking prey from mice to skunks, and even other raptors, including smaller owls.',
  range:'Throughout the Americas, from the Arctic tundra edge to South America.',
  role:'A top nocturnal predator that helps regulate populations of rodents, rabbits and other mid-sized mammals across many habitats.',
  habitat:'Forests, Deserts & Urban Parks', funFact:'It is one of the few predators that regularly hunts skunks, seemingly unbothered by their spray thanks to a limited sense of smell.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Bubo virginianus'
},
{
  id:'snowy-owl', guideNo:46, name:'Snowy Owl', sci:'Bubo scandiacus',
  class:'Birds', category:'owls', family:'Strigidae', tags:['Avian','Arctic'],
  details:'A large white owl of the Arctic tundra, one of the few owls active during full daylight through the polar summer.',
  traits:'Populations track boom-and-bust cycles of Arctic lemmings, with birds sometimes irrupting far south in years when prey collapses.',
  diet:'Feeds heavily on lemmings and other small rodents, switching to birds and hares when rodent numbers crash.',
  range:'Circumpolar Arctic tundra, wintering irregularly farther south across Canada, the northern U.S. and northern Eurasia.',
  role:'A key indicator species for Arctic ecosystem health, closely tied to the boom-and-bust dynamics of tundra rodent populations.',
  habitat:'Arctic Tundra', funFact:'Unlike most owls, it hunts extensively by day during the near-endless daylight of the Arctic summer.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Bubo scandiacus'
},

// ---------------------------------------------------------- WATERFOWL
{
  id:'mallard', guideNo:47, name:'Mallard', sci:'Anas platyrhynchos',
  class:'Birds', category:'waterfowl', family:'Anatidae', tags:['Avian','Widespread'],
  details:'The most familiar and widespread duck in the Northern Hemisphere, males showing a glossy green head and the wild ancestor of nearly all domestic duck breeds.',
  traits:'Almost all domestic duck breeds worldwide, from Pekin to Khaki Campbell, descend from this single wild species through thousands of years of selective breeding.',
  diet:'An omnivorous dabbler, tipping tail-up to feed on aquatic plants, seeds, and small invertebrates near the water surface.',
  range:'Nearly the entire Northern Hemisphere, introduced elsewhere including Australia and New Zealand.',
  role:'A generalist wetland species and a major contributor to global aquatic plant seed dispersal.',
  habitat:'Ponds, Lakes & Wetlands', funFact:'Its wild-type quack is the source of the classic "duck call" sound used across nearly all domesticated breeds too.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Anas platyrhynchos'
},
{
  id:'mute-swan', guideNo:48, name:'Mute Swan', sci:'Cygnus olor',
  class:'Birds', category:'waterfowl', family:'Anatidae', tags:['Avian','Territorial'],
  details:'A large, all-white swan with an orange bill and a distinctive black knob at its base, gliding with its neck held in a graceful S-curve.',
  traits:'Despite its name, it is not silent — it hisses, grunts and snorts, and produces a distinctive throbbing wing-beat sound audible from far away in flight.',
  diet:'Feeds mainly on submerged aquatic vegetation, using its long neck to reach plants other waterfowl cannot access.',
  range:'Native to Europe and temperate Asia; introduced and now established in North America, Australia and southern Africa.',
  role:'Extremely territorial during breeding season, and in parts of its introduced range considered invasive for its effect on native wetland vegetation.',
  habitat:'Lakes, Rivers & Wetlands', funFact:'In England, swans on open water have historically been associated with the Crown, a legal tradition dating back centuries.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Cygnus olor'
},
{
  id:'canada-goose', guideNo:49, name:'Canada Goose', sci:'Branta canadensis',
  class:'Birds', category:'waterfowl', family:'Anatidae', tags:['Avian','Migratory'],
  details:'A large brown-bodied goose with a distinctive black head and neck marked by a white chin strap, among the most recognizable waterfowl in North America.',
  traits:'Flies in a characteristic V-formation on migration, with each bird gaining lift from the wingtip vortex of the bird ahead, rotating the lead position to share the effort.',
  diet:'Grazes on grasses, grains and aquatic plants, and has adapted well to mown lawns, parks and golf courses.',
  range:'Native to North America; introduced and now well established in parts of Europe.',
  role:'Many populations have shifted from long-distance migrants to year-round urban residents, thriving in human-altered landscapes.',
  habitat:'Lakes, Parks & Grassland', funFact:'Migrating flocks can fly at altitudes of over 8,000 meters, among the highest confirmed altitudes for any bird.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Branta canadensis'
},
{
  id:'american-flamingo', guideNo:50, name:'American Flamingo', sci:'Phoenicopterus ruber',
  class:'Birds', category:'waterfowl', family:'Phoenicopteridae', tags:['Avian','Colonial'],
  details:'A tall wading bird with vivid pink-orange plumage, long legs and a distinctively downturned bill adapted for filter feeding.',
  traits:'Its pink coloration comes entirely from pigments in the algae and crustaceans it eats — birds raised on a diet lacking these compounds turn pale gray or white.',
  diet:'Filter-feeds on algae, brine shrimp and small invertebrates, holding its bill upside-down in shallow water to strain food from mud and water.',
  range:'Caribbean coasts, the Yucatán Peninsula, Galápagos Islands and northern South America.',
  role:'Breeds in enormous colonies of thousands of birds, a strategy that helps overwhelm predators through sheer numbers.',
  habitat:'Coastal Lagoons & Salt Flats', funFact:'Flamingos can sleep standing on one leg, a posture that may help conserve body heat lost through the legs.',
  verified:false, img:null, imgCredit:null, imgSource:null, commonsQuery:'Phoenicopterus ruber'
},
];

const DISCOVERIES = SPECIES.map(s => ({ text: s.funFact, id: s.id }));

const QUOTES = [
  'In every wingbeat, a story. In every creature, a connection.',
  'The smallest wings often carry the longest journeys.',
  'Look closely — the field guide is bigger on the inside.',
  'Every species is a small argument for paying attention.',
];

if (typeof module !== 'undefined') module.exports = { SPECIES, CATEGORIES, DISCOVERIES, QUOTES };
