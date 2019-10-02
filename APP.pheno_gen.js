function collectionToArray(collection) {
    var ary = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        ary.push(collection[i]);
    }
    return ary;
}

function choicelist(name) {
    var choices = [];
    const docname = document.getElementsByName(name);
    console.log(docname)
    console.log("The typeof of docname is: " + typeof docname);

    const list = Object.values(docname);
    console.log(list)
    console.log("The typeof of list is: " + typeof list);

    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].checked == true) {
            console.log("The typeof of list[i] is: " + typeof list[i]);
            choices.push(list[i].value);
        }
    }
    return choices;
}
function arraychoose(array) {
    var value = array[Math.floor(Math.random() * array.length)];
    return value;
}
function randomIntFromInterval(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function arraychanger(myarray, search, change) {
    if (myarray.includes(search)) {
        var index = myarray.indexOf(search);
        myarray[index] = change;
    }
}
function chosenrandnum() {
    var numgeneCHOICE;
    if (document.getElementById('typeCHOOSE').checked == true) {
        numgeneCHOICE = 'typeCHOOSE';
    }
    else if (document.getElementById('rangeCHOOSE').checked == true) {
        numgeneCHOICE = 'rangeCHOOSE';
    }
    else if (document.getElementById('surpriseCHOOSE').checked == true) {
        numgeneCHOICE = 'surpriseCHOOSE';
    }

    var numgeneRAND;
    if (numgeneCHOICE == 'typeCHOOSE') {
        var numgeneLIST = choicelist('typeGENE');
        if (numgeneLIST.includes('plain')) {
            numgeneRAND = randomIntFromInterval(0, 1);
        }
        else if (numgeneLIST.includes('simple')) {
            numgeneRAND = randomIntFromInterval(0, 4);
        }
        else if (numgeneLIST.includes('medium')) {
            numgeneRAND = randomIntFromInterval(0, 8);
        }
        else if (numgeneLIST.includes('genobomb')) {
            numgeneRAND = randomIntFromInterval(0, 16)
        }
    }
    else if (numgeneCHOICE == 'rangeCHOOSE') {
        var minRANGE = $("#slider-range").slider("values", 0);
        var maxRANGE = $("#slider-range").slider("values", 1);
        numgeneRAND = randomIntFromInterval(minRANGE, maxRANGE);
    }
    else if (numgeneCHOICE == 'surpriseCHOOSE') {
        numgeneRAND = randomIntFromInterval(0, 16);
    }

    return numgeneRAND;
}

function genogenerator() {
    var genoLENGTH = chosenrandnum();
    console.log("genolength is " + genoLENGTH);
    // Bases
    var baseLIST = choicelist('BASE');
    baseLIST.splice(baseLIST.indexOf('on'), 1);
    console.log("Base is: " + baseLIST);

    // All genes except for Lp
    var geneLIST = choicelist('DILUTE');
    var geneLIST = geneLIST.concat(choicelist('WHITEPATTERN'))
        .concat(choicelist('HAIRDILUTE'))
        .concat(choicelist('MISCGENE'));

    geneLIST.splice(geneLIST.indexOf('on'), 1);
    console.log("Genes is: " + geneLIST);

    //Leopard Complex genes
    var lpLIST = choicelist('LPCOMPLEX');
    lpLIST.splice(lpLIST.indexOf('on'), 1);
    console.log("Lp is: " + lpLIST);

    // Array to hold all of the genes to be used to create the geno.
    var arrayGENO = [];

    // Choose the base.
    baseCHOICE = baseLIST[Math.floor(Math.random() * baseLIST.length)];
    arrayGENO.push(baseCHOICE);

    //If it has a Lp Complex gene, let it have a chance first. 30%.
    if ((Math.floor(Math.random() * 100) < 30) && (lpLIST != undefined || lpLIST != [])) {
        lpCHOICE = lpLIST[Math.floor(Math.random() * lpLIST.length)];
        arrayGENO.push(lpCHOICE);

        --genoLENGTH;
    }

    // Add to gene array all of the normal genes.
    var i;
    for (i = 0; i <= genoLENGTH; i++) {
        if (geneLIST.length > 0) {
            var geneCHOICE = geneLIST[Math.floor(Math.random() * geneLIST.length)];
            arrayGENO.push(geneCHOICE);
            if (geneCHOICE == 'nCr ') {
                var CrCrINDEX = geneLIST.indexOf('CrCr ');
                geneLIST.splice(CrCrINDEX, 1);
            }
            else if (geneCHOICE == 'CrCr ') {
                var nCrINDEX = geneLIST.indexOf('nCr ');
                geneLIST.splice(nCrINDEX, 1);
            }

            var index = geneLIST.indexOf(geneCHOICE);
            geneLIST.splice(index, 1);
        } else {
            break;
        }
    }

    // Bring array of genes together into a string.
    var finalGENO = arrayGENO.join();
    finalGENO = finalGENO.replace(/,/g, "");

    return finalGENO;
}

function phenoGENERAL(genoRESULT, GENE, phenoSTRING, arrayPHENO) {
    if (genoRESULT.includes(GENE)) {
        arrayPHENO.push(phenoSTRING);
    }
}
function phenogenerator() {
    var genoRESULT = genogenerator();
    var arrayPHENO = [];

// genoRESULT.includes('Ee aa ') && genoRESULT.includes('Ee Aa ') && genoRESULT.includes('Ee Ata ') && genoRESULT.includes('Ee A+a ') && genoRESULT.includes('ee aa ')

    // Misc genes that come before the base.
    phenoGENERAL(genoRESULT, 'nW ', 'Dominant White on ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nG ', 'Grey on ', arrayPHENO);
    if ((genoRESULT.includes('Ee aa ') || genoRESULT.includes('Ee Aa ') || genoRESULT.includes('Ee Ata ') || genoRESULT.includes('Ee A+a ')) && !genoRESULT.includes('ee aa ')) {
        phenoGENERAL(genoRESULT, 'nZ ', 'Silver ', arrayPHENO);
    }
    if (!genoRESULT.includes('Ee aa ') && (genoRESULT.includes('Ee Aa ') || genoRESULT.includes('Ee Ata ') || genoRESULT.includes('Ee A+a ') || genoRESULT.includes('ee aa '))) {
        phenoGENERAL(genoRESULT, 'nSty ', 'Sooty ', arrayPHENO);
    }
    if (!genoRESULT.includes('Ee Aa ') && !genoRESULT.includes('Ee aa ') && !genoRESULT.includes('Ee Ata ') && !genoRESULT.includes('Ee A+a ') && genoRESULT.includes('ee aa ')) {
        phenoGENERAL(genoRESULT, 'ff ', 'Flaxen ', arrayPHENO);
    }

    // Base colours.
    phenoGENERAL(genoRESULT, 'Ee aa ', 'Black ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'Ee Aa ', 'Bay ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'ee aa ', 'Chestnut ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'Ee Ata ', 'Seal Bay ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'Ee A+a ', 'Wild Bay ', arrayPHENO);

    // All of the dilutes that changes the wording.
    if (genoRESULT.includes("nCh ")) {
        console.log("Champagne detected!")

        if (genoRESULT.includes("CrCr ") || genoRESULT.includes("nCr ")) {
            console.log("CrCr detected!")

            arraychanger(arrayPHENO, "Seal Bay ", "Sable Cream Champagne ");
            arraychanger(arrayPHENO, "Wild Bay ", "Wild Amber Cream Champagne ");
            arraychanger(arrayPHENO, "Bay ", "Amber Cream Champagne ");
            arraychanger(arrayPHENO, "Black ", "Classic Cream Champagne ");
            arraychanger(arrayPHENO, "Chestnut ", "Gold Cream Champagne ");
            phenoGENERAL(genoRESULT, "nD ", "Dun ", arrayPHENO);
            phenoGENERAL(genoRESULT, "nRn ", "Roan ", arrayPHENO);
        }
        else {
            arraychanger(arrayPHENO, "Seal Bay ", "Sable Champagne ");
            arraychanger(arrayPHENO, "Wild Bay ", "Wild Amber Champagne ");
            arraychanger(arrayPHENO, "Bay ", "Amber Champagne ");
            arraychanger(arrayPHENO, "Black ", "Classic Champagne ");
            arraychanger(arrayPHENO, "Chestnut ", "Gold Champagne ");
            phenoGENERAL(genoRESULT, "nD ", "Dun ", arrayPHENO);;
            phenoGENERAL(genoRESULT, "nRn ", "Roan ", arrayPHENO);;
        }
    }
    else if (genoRESULT.includes("CrCr ")) {
        console.log("CrCr detected!")

        arraychanger(arrayPHENO, "Seal Bay ", "Burnt Perlino ");
        arraychanger(arrayPHENO, "Wild Bay ", "Wild Perlino ");
        arraychanger(arrayPHENO, "Bay ", "Perlino ");
        arraychanger(arrayPHENO, "Black ", "Smokey Cream ");
        arraychanger(arrayPHENO, "Chestnut ", "Cremello ");
        phenoGENERAL(genoRESULT, "nD ", "Dun ", arrayPHENO);;
        phenoGENERAL(genoRESULT, "nRn ", "Roan ", arrayPHENO);;
    }
    else if (genoRESULT.includes("nCr ")) {
        console.log("nCr detected!")

        arraychanger(arrayPHENO, "Seal Bay ", "Burnt Buckskin ");
        arraychanger(arrayPHENO, "Wild Bay ", "Wild Buckskin ");
        arraychanger(arrayPHENO, "Bay ", "Buckskin ");
        arraychanger(arrayPHENO, "Black ", "Smokey Black ");
        arraychanger(arrayPHENO, "Chestnut ", "Palomino ");
        phenoGENERAL(genoRESULT, "nD ", "Dun ", arrayPHENO);;
        phenoGENERAL(genoRESULT, "nRn ", "Roan ", arrayPHENO);;

        if (arrayPHENO.includes("Buckskin ") && arrayPHENO.includes("Dun ")) {
            arraychanger(arrayPHENO, "Dun ", "");
            arraychanger(arrayPHENO, "Buckskin ", "Dunskin ");
        }

    }
    else if (genoRESULT.includes("nD ")) {
        console.log("Dun detected!")

        arraychanger(arrayPHENO, "Seal Bay", "Burnt Bay Dun ");
        arraychanger(arrayPHENO, "Wild Bay ", "Wild Bay Dun ");
        arraychanger(arrayPHENO, "Bay ", "Bay Dun ");
        arraychanger(arrayPHENO, "Black ", "Grullo ");
        arraychanger(arrayPHENO, "Chestnut ", "Red Dun ");
        phenoGENERAL(genoRESULT, "nRn ", "Roan ", arrayPHENO);;
    }
    else if (genoRESULT.includes("nRn ")) {
        console.log("Roan detected!")

        arraychanger(arrayPHENO, "Seal Bay ", "Seal Bay Roan ");
        arraychanger(arrayPHENO, "Wild Bay ", "Wild Bay Roan ");
        arraychanger(arrayPHENO, "Bay ", "Bay Roan ");
        arraychanger(arrayPHENO, "Black ", "Blue Roan ");
        arraychanger(arrayPHENO, "Chestnut ", "Red Roan ");
    }

    //Pearl.
    phenoGENERAL(genoRESULT, 'prlprl ', 'Pearl ', arrayPHENO);

    // White patterns.
    phenoGENERAL(genoRESULT, 'nO ', 'Overo ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nTb ', 'Tobiano ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nSb ', 'Sabino ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nRb ', 'Rabicano ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nSpl ', 'Splash ', arrayPHENO);

    if (arrayPHENO.includes('Overo ') && arrayPHENO.includes('Tobiano ')) {
        arraychanger(arrayPHENO, 'Overo ', '');
        arraychanger(arrayPHENO, 'Tobiano ', '');
        arrayPHENO.push("Tovero ");
    }

    // Lp Complex.
    phenoGENERAL(genoRESULT, 'nLp (PATN1) ', 'Leopard Appaloosa ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nLp (PATN2) ', 'Spotted Blanket Appaloosa ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nLp (snow) ', 'Frosted Appaloosa ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'nLp (roan) ', 'Varnish Roan ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'LpLp (PATN1) ', 'Fewspot Appaloosa ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'LpLp (PATN2) ', 'Snowcap Appaloosa ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'LpLp (snow) ', 'Snowflake Appaloosa ', arrayPHENO);
    phenoGENERAL(genoRESULT, 'LpLp (PATN1PATN2) ', 'Semi Leopard Appaloosa ', arrayPHENO);

    // Pangare.
    if (!genoRESULT.includes('Ee aa ')) {
        phenoGENERAL(genoRESULT, 'nPng ', 'Pangare ', arrayPHENO);
    }

    // Random traits. 30%.
    var traitLIST = choicelist('randTRAIT');
    traitLIST.splice(traitLIST.indexOf('on'), 1);
    console.log("Traits are: " + traitLIST);

    if ((Math.floor(Math.random() * 100) < 30) && (traitLIST != undefined || traitLIST != [])) {
        traitCHOICE = traitLIST[Math.floor(Math.random() * traitLIST.length)];
        arrayPHENO.push(traitCHOICE);
    }

    // Pangare carrier.
    if (genoRESULT.includes('Ee aa ') && !genoRESULT.includes('Ee Aa ') && !genoRESULT.includes('Ee Ata ') && !genoRESULT.includes('Ee A+a ') && !genoRESULT.includes('ee aa ')) {
        phenoGENERAL(genoRESULT, 'nPng ', '(Pangare carrier) ', arrayPHENO);
    }
    // Flaxen carrier.
    if ((genoRESULT.includes('Ee aa ') || genoRESULT.includes('Ee Aa ') || genoRESULT.includes('Ee Ata ') || genoRESULT.includes('Ee A+a ')) && !genoRESULT.includes('ee aa ')) {
        phenoGENERAL(genoRESULT, 'ff ', '(Flaxen carrier) ', arrayPHENO);
    }
    // Silver carrier.
    if (!genoRESULT.includes('Ee aa ') && !genoRESULT.includes('Ee Aa ') && !genoRESULT.includes('Ee Ata ') && !genoRESULT.includes('Ee A+a ') && genoRESULT.includes('ee aa ')) {
        phenoGENERAL(genoRESULT, 'nZ ', '(Silver carrier) ', arrayPHENO);
    }

    var finalPHENO = arrayPHENO.join();
    finalPHENO = finalPHENO.replace(/,/g, "");

    return finalPHENO;
}

function thegenerator() {
    let generatedPHENO = phenogenerator();
    var para = document.createElement("p");
    var node = document.createTextNode(generatedPHENO);
    if (document.getElementById('chimera').checked == true) {
        var generatedPHENO2 = phenogenerator();
        node = document.createTextNode(generatedPHENO + '// ' + generatedPHENO2 + 'Chimera');
    }
    para.appendChild(node);
    var element = document.getElementById("result");

    element.appendChild(para);
}