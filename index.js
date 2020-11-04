function voegLandToe(land) {
    regel = document.createElement('li');
    regel.innerHTML = land;
    antwoord.appendChild(regel);
}

function verzamelLandenOpVolgorde(e) {
    let landen = randomPersonData.map(element => element.region);
    let landen2 = [];
    landen.forEach(land => {
        if (landen2.includes(land)) {} else landen2.push(land)
    });
    landen2 = landen2.sort();
    antwoord.innerHTML = "";
    landen2.forEach(land => voegLandToe(land));
    if (antwoord.classList.contains("plaatjes_weergave"))
        antwoord.classList.remove("plaatjes_weergave");
}

function filtreerSteenbokken() {
    let steenbokken = randomPersonData.filter(element => {
        let dag = element.birthday.dmy.substring(0, 2);
        maand = element.birthday.dmy.substr(3, 2);
        if (isNaN(dag) || isNaN(maand)) { return false } else {
            maand = parseInt(maand);
            dag = parseInt(dag);
            if ((maand === 12 && dag >= 22) || (maand === 1 && dag <= 20))
                return true;
            else return false;
        }
    })
    steenbokken = steenbokken.filter(element => (element.age >= 30 && element.gender === "female"));
    return steenbokken;
}


function sorteerSteenbokken(steenbokken) {
    let steenbokkken = steenbokken.sort(function(a, b) {
        let voornaamA = a.name;
        let voornaamB = b.name;
        if (voornaamA < voornaamB) {
            return -1;
        }
        if (voornaamA > voornaamB) {
            return 1;
        }
        return 0;
    });
}

function vulLijstjeSteenbokken(steenbokken) {
    antwoord.innerHTML = "";
    steenbokken.forEach(element => {
        let plaatje = document.createElement('img');
        plaatje.setAttribute("src", element.photo);
        plaatje.setAttribute("width", "100%");
        plaatje.setAttribute("alt", element.name + " " + element.surname);
        plaatje.classList.add("img_regel");
        regel = document.createElement('li');
        let figuur = document.createElement('figure');
        let onderschrift = document.createElement('figcaption');
        onderschrift.innerHTML = element.name + " " + element.surname;
        figuur.appendChild(plaatje);
        figuur.appendChild(onderschrift);
        regel.appendChild(figuur);
        regel.classList.add("plaatjes_regel");
        antwoord.appendChild(regel);
        antwoord.classList.add('plaatjes_weergave')
    })
}

function verzamelSteenbokken(e) {
    let steenbokken = filtreerSteenbokken();
    let steenboken = sorteerSteenbokken(steenbokken);
    vulLijstjeSteenbokken(steenbokken);

}

function creditcardMaakRegel(naamc, telnrc, nummerc, verloopc, str) {
    regel = document.createElement('li');
    regel.classList.add("creditcard_regel")
    let p1 = document.createElement('p');
    p1.innerHTML = naamc;
    p1.classList.add("creditcard_p1")
    if (str === "yes")
        p1.classList.add("onderstreep");
    let p2 = document.createElement('p');
    p2.innerHTML = telnrc;
    p2.classList.add("creditcard_p2")
    if (str === "yes")
        p2.classList.add("onderstreep");
    let p3 = document.createElement('p');
    p3.innerHTML = nummerc;
    p3.classList.add("creditcard_p3")
    if (str === "yes")
        p3.classList.add("onderstreep");
    let p4 = document.createElement('p');
    p4.innerHTML = verloopc;
    p4.classList.add("creditcard_p4")
    if (str === "yes")
        p4.classList.add("onderstreep");
    regel.appendChild(p1);
    regel.appendChild(p2);
    regel.appendChild(p3);
    regel.appendChild(p4);
    antwoord.appendChild(regel);
}


function verzamelOudeCreditcards(e) {
    antwoord.innerHTML = "";
    if (antwoord.classList.contains("plaatjes_weergave"))
        antwoord.classList.remove("plaatjes_weergave");
    jaar = new Date().getFullYear() + 1;
    let expVolgendJaar = randomPersonData.filter(item => parseInt(item.credit_card.expiration.split('/')[1]) + 2000 === jaar);
    let expVolgendJaarVolwassenen = expVolgendJaar.filter(item => {
        geboorteJaar = item.birthday.dmy.substring(6, 10);
        console.log(geboorteJaar);
        if (isNaN(geboorteJaar)) return false;
        else if (jaar - parseInt(geboorteJaar) >= 19) return true
        else return false;
    });
    expVolgendJaarVolwassenen = expVolgendJaarVolwassenen.sort(function(a, b) {
        let maand1 = a.credit_card.expiration.split('/')[0];
        let maand2 = b.credit_card.expiration.split('/')[0];
        if (isNaN(maand1) || isNaN(maand2))
            return -1
        else {
            maand1 = parseInt(maand1);
            maand2 = parseInt(maand2);
            if (maand1 < maand2) {
                return -1;
            }
            if (maand1 > maand2) {
                return 1;
            }
            return 0;
        }
    })

    creditcardMaakRegel("Naam", "Telefoonnummer", "Creditcard nummer", "Creditcard verloopmaand", "yes")
    expVolgendJaarVolwassenen.forEach(item => {
        creditcardMaakRegel(item.name + " " + item.surname, item.phone, item.credit_card.number, item.credit_card.expiration, "no");
    })
}

function bepaalSterrenbeeld(dag, maand) {
    let sterrenbeeld = "";
    switch (maand) {
        case 1:
            if (dag <= 21) sterrenbeeld = "Steenbok"
            else sterrenbeeld = "Waterman";
            break;
        case 2:
            if (dag <= 19) sterrenbeeld = "Waterman"
            else sterrenbeeld = "Vissen";
            break;
        case 3:
            if (dag <= 20) sterrenbeeld = "Vissen"
            else sterrenbeeld = "Ram";
            break
        case 4:
            if (dag <= 20) sterrenbeeld = "Ram"
            else sterrenbeeld = "Stier";
            break;
        case 5:
            if (dag <= 20) sterrenbeeld = "Stier"
            else sterrenbeeld = "Tweeling";
            break;
        case 6:
            if (dag <= 21) sterrenbeeld = "Tweeling"
            else sterrenbeeld = "Kreeft";
            break;
        case 7:
            if (dag <= 22) sterrenbeeld = "Kreeft"
            else sterrenbeeld = "Leeuw";
            break;
        case 8:
            if (dag <= 23) sterrenbeeld = "Leeuw"
            else sterrenbeeld = "Maagd";
            break;
        case 9:
            if (dag <= 22) sterrenbeeld = "Maagd"
            else sterrenbeeld = "Weegschaal";
            break;
        case 10:
            if (dag <= 23) sterrenbeeld = "Weegschaal"
            else sterrenbeeld = "Schorpioen";
            break
        case 11:
            if (dag <= 22) sterrenbeeld = "Schorpioen"
            else sterrenbeeld = "Boogschutter";
            break;
        case 12:
            if (dag <= 21) sterrenbeeld = "Boogschutter"
            else sterrenbeeld = "Steenbok"

    }
    return sterrenbeeld;
}

function maakMatchRegel(photo, name, surname, region, age, sterrenbeeld, matchbutton) {
    let plaatje = document.createElement("img");
    let box = document.createElement("div");
    plaatje.setAttribute("src", photo);
    plaatje.setAttribute("alt", name + " " + surname);
    plaatje.setAttribute("width", "100%");
    box.classList.add("match_img")
    box.appendChild(plaatje);
    p1 = document.createElement('p');
    p1.innerHTML = name + " " + surname;
    p1.classList.add('match_p1');
    p2 = document.createElement('p2');
    p2.innerHTML = region;
    p2.classList.add('match_p2');
    p3 = document.createElement('p');
    p3.innerHTML = age;
    p3.classList.add('match_p3');
    p4 = document.createElement('p');
    p4.innerHTML = sterrenbeeld;
    p4.classList.add("match_p4");
    button_match = document.createElement("button");
    if (matchbutton === "terug") {
        button_match.innerHTML = "alle personen";
        button_match.classList.add("button_alle_personen");
        console.log(button_match);
    } else {
        button_match.innerHTML = "Maak match"
        button_match.classList.add("button_maak_match");
    }
    let regel = document.createElement("li");
    regel.appendChild(box);
    regel.appendChild(p1);
    regel.appendChild(p2);
    regel.appendChild(p3);
    regel.appendChild(p4);
    if (matchbutton === "yes" || matchbutton === "terug")
        regel.appendChild(button_match);
    regel.classList.add("match_weergave")
    antwoord.appendChild(regel);
}


function vulMatchMakingLijstAllePersonen(volwassenen) {
    volwassenen.forEach(element => {
        maakMatchRegel(element.photo, element.name, element.surname, element.region, element.age, element.sterrenbeeld, "yes");
    })
}

function maakMatches(e) {
    let parent = e.target.parentElement;
    let kinderen = parent.children;
    let kinderenArr = Array.from(kinderen);
    let voorEnAchternaam_ref = "";
    let land_ref = "";
    let age_ref = 0;
    let sterrenbeeld_ref = "";
    let photo_ref = "";
    kinderenArr.forEach((element, index) => {
        if (element.classList.contains("match_img")) {
            let children2 = Array.from(element.children);
            children2.forEach((item, index) => {
                if (item.hasAttribute("src"))
                    photo_ref = item.getAttribute("src");
            })
        }
        if (element.classList.contains("match_p1"))
            voorEnAchternaam_ref = element.textContent;
        if (element.classList.contains("match_p2"))
            land_ref = element.textContent;
        if (element.classList.contains("match_p3"))
            age_ref = parseInt(element.textContent);
        if (element.classList.contains("match_p4"))
            sterrenbeeld_ref = element.textContent;
    })
    console.log(voorEnAchternaam_ref + " " + land_ref + " " + age_ref.toString() + " " + sterrenbeeld_ref + " " + photo_ref);
    console.log("volwassenen " + volwassenen.length);
    let matches = volwassenen.filter(item => {
        if (item.sterrenbeeld === sterrenbeeld_ref) {
            if ((item.name + " " + item.surname) === voorEnAchternaam_ref) { return false; } else { return true; }
        } else { return false }
    });
    //let matches = volwassenen.filter(item => { item.sterrenbeeld === sterrenbeeld_ref });
    console.log("aantal matches " + matches.length);

    antwoord.innerHTML = "";
    console.log("aanroep " + voorEnAchternaam_ref + " " + land_ref + " " + age_ref.toString() + " " + sterrenbeeld_ref + " " + photo_ref);
    maakMatchRegel(photo_ref, voorEnAchternaam_ref, "", land_ref, age_ref.toString(), sterrenbeeld_ref, "terug");
    let regel = document.createElement("li");
    regel.innerHTML = "Wordt gematcht met : ";
    antwoord.appendChild(regel);
    matches.forEach(element => maakMatchRegel(element.photo, element.name, element.surname, element.region, element.age, element.sterrenbeeld, "no"));
    let button_match_terug = document.getElementsByClassName("button_alle_personen");
    button_match_terug[0].addEventListener("click", verzamelMatchMakingLijst);
}

function verzamelMatchMakingLijst(e) {
    antwoord.innerHTML = "";
    if (antwoord.classList.contains("plaatjes_weergave"))
        antwoord.classList.remove("plaatjes_weergave");
    volwassenen = randomPersonData.filter(element => {
        let geboorteJaar = element.birthday.dmy.substring(6, 10);
        if ((parseInt(new Date().getFullYear()) - parseInt(geboorteJaar)) >= 18)
            return true;
        else return false;
    });
    volwassenen.map(item => {
        if (item.surname === "María Elena Carrillo")
            console.log(item.name + " " + item.surname); //+ " " + parseInt(new Date().getFullYear()) - parseInt(geboorteJaar));
        dag = parseInt(item.birthday.dmy.substring(0, 2));
        maand = parseInt(item.birthday.dmy.substring(3, 5));
        sterrenbeeld = bepaalSterrenbeeld(dag, maand);
        if (item.surname === "María Elena Carrillo")
            console.log("sterrenbeeld :" + sterrenbeeld);
        item["sterrenbeeld"] = sterrenbeeld;
    })

    volwassenen = volwassenen.sort(function(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })
    vulMatchMakingLijstAllePersonen(volwassenen);
    buttonsMatchMaking = document.getElementsByClassName("button_maak_match");
    buttonsMatchMakingArr = Array.from(buttonsMatchMaking);
    buttonsMatchMakingArr.forEach(item => item.addEventListener("click", maakMatches));
}

let button_landenlijst = document.getElementById("button_landenlijst");
let button_steenbokken = document.getElementById("button_steenbokken");
let button_oude_creditcards = document.getElementById("button_oude_creditcards");
let button_match_making = document.getElementById("button_match_making");
let antwoord = document.getElementById("antwoord");
let geboortejaar = 0;
let maand = 0;
let jaar = 0;
let regel = "";
let land = "";
let age = 0;
let volwassenen = [];
let sterrenbeeld = "";
let photo = "";
let age_ref = 0;

button_landenlijst.addEventListener("click", verzamelLandenOpVolgorde);
button_steenbokken.addEventListener("click", verzamelSteenbokken);
button_oude_creditcards.addEventListener("click", verzamelOudeCreditcards);
button_match_making.addEventListener("click", verzamelMatchMakingLijst);