
const typeSubmitButton = document.getElementById("typeSubmitButton");
const weaknessInput = document.getElementById("weakInput");

const attackingEffective = document.getElementById("attackingEffective");
const attackingIneffective = document.getElementById("attackingIneffective");
const attackingNoEffect = document.getElementById("attackingNoEffect");
const defendingEffective = document.getElementById("defendingEffective");
const defendingIneffective = document.getElementById("defendingIneffective");
const defendingNoEffect = document.getElementById("defendingNoEffect");
const invalidMsg = document.getElementById("invalidMsg");

let currentElements = [];

if (typeSubmitButton){
    typeSubmitButton.addEventListener("click", (e) => {
        
        fetchData(weaknessInput.value);
    });
}

async function fetchData(type){
    try{

        for(let element of currentElements){
            element.remove();
        }

        currentElements = [];
        invalidMsg.style.display = "none";

        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

        if (!response.ok){
            invalidMsg.style.display = "block";
            throw new Error("Could not fetch type!");
        }

        const data = await response.json();

        // Attacking Effective
        for(let type of data.damage_relations.double_damage_to){
            
            weaknessToDom(type.name, attackingEffective);
        }

        // Attacking Ineffective
        for(let type of data.damage_relations.half_damage_to){
            
            weaknessToDom(type.name, attackingIneffective);
        }

        // Attacking No Effect
        for(let type of data.damage_relations.no_damage_to){
            
            weaknessToDom(type.name, attackingNoEffect);
        }

        // Defending Effective
        for(let type of data.damage_relations.half_damage_from){
            
            weaknessToDom(type.name, defendingEffective);
        }

        // Defending Ineffective
        for(let type of data.damage_relations.double_damage_from){
            
            weaknessToDom(type.name, defendingIneffective);
        }

        // Defending No Effect
        for(let type of data.damage_relations.no_damage_from){
            
            weaknessToDom(type.name, defendingNoEffect);
        }
    }
    catch(error){
        console.error(error);
    }
}

function weaknessToDom(typeName, effectivenessBox){

    const newA = document.createElement('a');
    newA.textContent = typeName;

    effectivenessBox.appendChild(newA);

    newA.classList.add("weaknessText");

    currentElements.push(newA);
}