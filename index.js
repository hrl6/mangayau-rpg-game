let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [];

const button1 = document.querySelector(`#button1`);
const button2 = document.querySelector(`#button2`);
const button3 = document.querySelector(`#button3`);
const text = document.querySelector(`#text`);
const xpText = document.querySelector(`#xpText`);
const healthText = document.querySelector(`#healthText`);
const goldText = document.querySelector(`#goldText`);
const monsterStats = document.querySelector(`#monsterStats`);
const monsterNameText = document.querySelector(`#monsterName`);
const monsterHealthText = document.querySelector(`#monsterHealth`);

const weapons = [
    {
        name: "\"Bear\" Hand",
        power: 3,
    },
    {
        name: "Legendary Routan",
        power: 10,
        text: `The "Legendary Routan" isn't just a stick; it's the very one 'weapon' used to chase the legendary adventurers.`
    },
    {
        name: "Deceptive Culinary Knife",
        power: 30,
        text: `The "Deceptive Culinary Knife" comes with extraordinary tales of its past. Legend has it that it was once wielded by a supermom who whipped up meals so incredible that they stopped wars and tamed dragons.
        
        While it may not have the power to solve world conflicts, it's certainly great for slicing veggies!`
    },
    {
        name: "Just a Brick",
        power: 50,
        text: `"Just a Brick." No legends, no heroic tales—just a brick.`
    },
    {
        name: "Almighty Pebble",
        power: 100,
        text: `In the sleepy village of Iwagukure, the "Almighty Pebble" is the stuff of legends.
        
        They say it once belonged to a local farmer who swore that one toss from this pebble could move mountains. Of course, nobody ever saw that happen, but it does make for a pretty convincing paperweight!`
    }
];

const monsters = [
    {
        name: "Slime",
        level: 3,
        health: 30,
        power: 2
    },
    {
        name: "Mushrum",
        level: 10,
        health: 150,
        power: 30
    },
    {
        name: "Doragon",
        level: 100,
        health: 3000,
        power: 150,
        text: `You have encountered something... rather extraordinary. As you ventured further into the unknown, a colossal silhouette loomed overhead. Your heart pounded with a mix of fear and curiosity.

        As the shadows gave way to the creature's true form, it became clear that you were face to face with none other than the magnificent dragon, "Doragon". Its immense, serpentine body coiled gracefully, and its eyes gleamed with a wisdom that spoke of ages past.`
    }
]

const locations = [
    {
        name: "village",
        "button text": [`Go to store`, `Go to cave`, `Suicide`],
        "button functions": [goStore, goCave, suicide],
        text: `Kamu di kampong kinek tuk.`
    },
    {
        name: "store",
        "button text": [`Buy 10 Health (10 Gold)`, `Buy a weapon (30 Gold)`, `Go to village`],
        "button functions": [buyHealth, buyWeapon, goVillage],
        text: `You enter a cozy shop, its shelves filled with a variety of items. The friendly shopkeeper greets you with a warm smile.

        "Welcome to Kedai Store," they say. "Browse at your leisure, and if you need assistance, just ask."
        `
    },
    {
        name: "cave",
        "button text": [`Fight Slime`, `Fight Mushrum`, `Go to village`],
        "button functions": [fightSlime, fightMushrum, goVillage],
        text: `With a sense of trepidation, you step into the yawning mouth of the cave. The air turns cool and damp, and your footsteps echo in the darkness.

        Glistening stalactites hang like teeth from the ceiling, and eerie shadows dance along the rugged walls. The path ahead is shrouded in mystery, and the faint sound of dripping water fills the silence.
        
        You can't help but wonder what secrets lie hidden in the depths of this ancient cavern. Adventure awaits, but so does danger. Are you prepared to explore the unknown?
        `
    },
    {
        name: "moves",
        "button text": [`Attack`, `Dodge`, `Flee`],
        "button functions": [attack, dodge, goVillage],
        text: `You have encountered a something.`
    },
    {
        name: "kill monster",
        "button text": [`Stay Here`, `Move Forward`, `Go to village`],
        "button functions": ['', goCave, goVillage],
        text: `You defeated the monster!

        The once-fearsome monster, known throughout the land for its terrifying roars and menacing presence, met its end in the most pitiful way imaginable.`
    },
    {
        name: "lose",
        "button text": [`REPLAY?`, `REPLAY?`, `REPLAY?`],
        "button functions": [restart, restart, restart],
        text: `YOU DIE.`
    },
    {
        name: "restart",
        "button text": [`Go to store`, `Go to cave`, `Suicide`],
        "button functions": [goStore, goCave, suicide],
        text: `Oh, a necromancer. Anyways..
        
        Greetings, chosen one! Welcome to the mystical village of Mangayau End!
        Just like Aang emerging from his iceberg, you've arrived at a crucial moment in our village's history.
        Our little slice of the world is in a pickle, and guess what? You're the pickle-slicer we've been waiting for!
        
        Our wise village elder, who's basically our version of Uncle Iroh without the tea obsession, is waiting to spill the dragon of knowledge.
        
        Head over to the grand hall and prepare to be enlightened.
        But beware, young Avatar... Oops, I mean adventurer! You're about to face more challenges than Zuko chasing the Avatar.
        
        Get ready for some epic quests, quirky characters, and enough plot twists to make even M. Night Shyamalan say, "Whoa, that's a twist!"
        Remember, the fate of our village depends on you! So, go forth, channel your inner bending master, and may Appa's flying spirit guide your way!`
    }
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = suicide;

function update(locations) {
    monsterStats.style.display = "none";
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    if(button3.innerText === `Suicide`){
        button3.classList.add(`red-text`);
    } else {
        button3.classList.remove(`red-text`);
    }
    text.innerText = locations.text;
}

function goVillage() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = `"Saya jual 10 nyawa ya."
        
        "Saya beli," you replied. `
    } else {
        text.innerText = `"NO MONEY?! GET OUT!!!"`;
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = `You now have a "${newWeapon}".
            
            ${weapons[currentWeapon].text}
            
            `;
            inventory.push(newWeapon);
            text.innerText += `In your inventory you have: ${inventory.join(`, `)}.`
        } else {
            text.innerText = `"Please. Have the door over there.
            
            Thank you."`;
        }
    } else {
        text.innerText = `"There is nothing I can sell you anymore. Sell me back for 15 Gold?"`
        button2.innerText = `Sell weapon for 15 Gold`;
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = `You sold a ${currentWeapon}`;
        text.innerText = `
        In you inventory you have: ${inventory.join(`, `)}`;
    } else {
        text.innerText = `"HOW DO YOU WANT TO FIGHT LATER?!"`;
    }
}

function goCave() {
    update(locations[2]);
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightMushrum() {
    fighting = 1;
    goFight();
}

// fight a dragon that guaranteed the player's death
function suicide() {
    console.log(`THE DRAGON WAS HERE!.`)
    fighting = 2;
    goFight();
    text.innerText = monsters[2].text;
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = `The ${monsters[fighting].name} attacks.`;
    text.innerText += ` You attack it with your ${weapons[currentWeapon].name}.`;
    health -= monsters[fighting].power;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }

}

function dodge() {
    text.innerText = `You dodge the ${monsters[fighting].name}'s attack.`;
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 8.7);
    xp += Math.floor(monsters[fighting].level * 1.5);
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5])
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = [];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    update(locations[6]);
}