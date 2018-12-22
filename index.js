
/// mettre des rules sur la cin condition condition, et la loose condition. 
var count = 0;  

function cellDimensions(size)
{
    var adjustCell = Math.floor(100/size) - 1; //On ajuste les dimensions de la cellule td selon le size pour ne pas que ce soit la merde. 

    if(size>5)
    {
        $('td').css('font-size', "1em");
    }

    $('td').css('width', adjustCell+"%");
    $('td').css('height', adjustCell+"%");
}
   

function fillTable(table, size)//remplissage du table client avec le tableau JS
{
    for(var i=0; i<size; i++)
    { 
        for (var j=0; j<size; j++)
        {
            if(table[i][j] != 0)
            {
                $("#line" + i +"col"+j).html(table[i][j]);
            }
            if(table[i][j] == 0)
            {
                $("#line" + i +"col"+j).html("");
            }
        }
    }

    for(var i=0; i<size; i++)// réglge de la couleur selon la valeur de la cellule
    { 
        for (var j=0; j<size; j++)
        {
            if(table[i][j] == 2)
            {
                $("#line" + i +"col"+j).css("background-color", '#33cc33');
            }

            else if(table[i][j] == 4)
            {
                $("#line" + i +"col"+j).css("background-color", '#ff9900');
            }

            else if(table[i][j] == 8)
            {
                $("#line" + i +"col"+j).css("background-color", '#ff3333');
            }
            

            else if(table[i][j] == 16)
            {
                $("#line" + i +"col"+j).css("background-color", ' #33cc33');
            }
            
            else if(table[i][j] == 32)
            {
                $("#line" + i +"col"+j).css("background-color", '#8033cc');
            }
            
            else if(table[i][j] == 64)
            {
                $("#line" + i +"col"+j).css("background-color", '#808080');
            }

            else if(table[i][j] == 128)
            {
                $("#line" + i +"col"+j).css("background-color", 'rose');
            }
            else if(table[i][j] == 256)
            {
                $("#line" + i +"col"+j).css("background-color", 'purple');
            }
            else if(table[i][j] == 512)
            {
                $("#line" + i +"col"+j).css("background-color", 'yellow');
            }
            else if(table[i][j] == 1024)
            {
                $("#line" + i +"col"+j).css("background-color", 'grey');
            }

            else if(table[i][j] == 2048)
            {
                $("#line" + i +"col"+j).css("background-color", '#40ff00');
            }
            
            else            
            {
                $("#line" + i +"col"+j).css("background-color", 'white');
            }
        }
    }
   

 
}

function randomNumber()//Random du numéro à ajouter à chaque tour de jeu avec 90% pour le 2, et 10% pour le 4
{
    var randomNumber = Math.floor((Math.random() * 10) + 1);
    if(randomNumber == 1)
    {
        return 4;
    }
    else
    {
        return 2;
    }
}

function emptyEntryTab(tab, size) //Recherche dans la table existante quelles sont les cases vides pour stocker les coordonnées x,y dans un tableau empty dédié
{
    var empty = Array();
    var count = 0;

    for(var i =0; i < size; i++)
    {
        for(var j =0; j < size; j++) 
        {
            if(tab[i][j] == 0)
            {
                empty[count] = new Array();
                empty[count]['line'] = i;
                empty[count]['column'] = j;
                count++;
            }
        }
    }
    return(empty);
}

function randomEmptyKey(min, max)//Fonction random de base qui donne un entier entre min et max souhaités (extremums inclus)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function addNumberToTable(tab, size)//Fonction random de base qui ajoute un 2 ou un 4 sur un td vide de tab. 
{
    var empty = emptyEntryTab(tab, size);//on récupère le tableau des empty grâce au tableau existant
    var len = empty.length;

    var emptyKey = randomEmptyKey(0,(len-1));    //empty a une taille correspondant à la somme de cases vides de tab. On prend au hasard un nb entre 0 et longueur-1
    
    var numberToAdd = randomNumber();//2 ou 4
    
    if(empty != undefined)
    {
        if(tab[empty[emptyKey]['line']][empty[emptyKey]['column']] == 0)
        {
            tab[empty[emptyKey]['line']][empty[emptyKey]['column']] = numberToAdd;
        }
    }
}

function pushToDown(tab, size)//action Déplacement de toutes les cases si input UpArrow 
{
    for (var j = 0; j<size; j++)//on déroule col par col
    {
        for(var i = (size-2); i >=0; i--)// ligne par ligne 
        { 
            for(var k = i; k < (size-1); k++)
            {
                if(tab[k][j] != 0)// FONCTION PUSH, mais il faut que la cellule à pousser contienne un chiffre. 
                {
                    if(tab[k+1][j] == 0)// on pushe case par case jusqu'à qu'il y ait une case non vide. 
                    {
                        tab[k+1][j] = tab[k][j];
                        tab[k][j] = 0;
                    }
                }
            }
        }

        for(var m = (size-2); m >=0; m--)// FONCTION MERGE
        {
            if(tab[m+1][j] == tab[m][j]) 
            {
                if(tab[m+1][j] > 0)
                {
                    var x = tab[m+1][j] * 2;
                    count+= x; 
                }

                tab[m+1][j] *= 2;
                tab[m][j] = 0;
            }
        }

        for(var i = (size-2); i >=0; i--)// ligne par ligne 
        { 
            for(var k = i; k < (size-1); k++)
            {
                if(tab[k][j] != 0)// FONCTION PUSH, mais il faut que la cellule à pousser contienne un chiffre. 
                {
                    if(tab[k+1][j] == 0)// on pushe case par case jusqu'à qu'il y ait une case non vide. 
                    {
                        tab[k+1][j] = tab[k][j];
                        tab[k][j] = 0;
                    }
                }
            }
        }
    }
}

function pushToUp(tab, size)//action Déplacement de toutes les cases si input UpArrow 
{
    for (var j = 0; j<size; j++)//on déroule col par col
    {
        for(var i = 1; i < size; i++)// ligne par ligne 
        { 
            for(var k = i; k > 0; k--)
            {
                if(tab[k][j] != 0)// FONCTION PUSH, mais il faut que la cellule à pousser contienne un chiffre. 
                {
                    if(tab[k-1][j] == 0)// on pushe case par case jusqu'à qu'il y ait une case non vide. 
                    {
                        tab[k-1][j] = tab[k][j];
                        tab[k][j] = 0;
                    }
                }
            }
        }

        for(var m = 1; m < size; m++)// FONCTION MERGE
        {
            if(tab[m-1][j] == tab[m][j]) 
            {
                if(tab[m-1][j] > 0)
                {
                    var x = tab[m][j] * 2;
                    count+= x; 
                }
                tab[m-1][j] *= 2;
                tab[m][j] = 0;
            }
        }
    
        for(var i = 1; i < size; i++)// ligne par ligne 
        { 
            for(var k = i; k > 0; k--)
            {
                if(tab[k][j] != 0)// FONCTION PUSH, mais il faut que la cellule à pousser contienne un chiffre. 
                {
                    if(tab[k-1][j] == 0)// on pushe case par case jusqu'à qu'il y ait une case non vide. 
                    {
                        tab[k-1][j] = tab[k][j];
                        tab[k][j] = 0;
                    }
                }
            }
        }
    }
}

function pushToRight(tab, size)//action Déplacement et merge de toutes les cases si input RightArrow 
{
    for (var i = 0; i<size; i++)//on déroule ligne par ligne
    {
        for(var j = (size-2); j >= 0; j--)// puis colonne par colonne et on va balayer de tab[i][size-2] vers tab[i][0] 
        { 
            for(var k = j; k < (size-1); k++)
            {
                if(tab[i][k] != 0)// FONCTION PUSH, mais il faut que la cellule à pousser contienne un chiffre. 
                {
                    if(tab[i][k+1] == 0)// on pushe case par case jusqu'à qu'il y ait une case non vide. 
                    {
                        tab[i][k+1] = tab[i][k];
                        tab[i][k] = 0;
                    }
                }
            }
        }

        for(var m = (size-2); m >= 0; m--)// FONCTION MERGE qui balaie tout la ligne vers la gauche. 
        {
            if(tab[i][m+1] == tab[i][m]) 
            {
                if(tab[i][m+1] > 0)
                {
                    var x = tab[i][m] * 2;
                    count+= x; 
                }
                tab[i][m+1] *= 2;
                tab[i][m] = 0;
            }
        }
    
        for(var j = (size-2); j >= 0; j--)// On PUSH à nouveau puis c'est fini.
        { 
            for(var k = j; k < (size-1); k++)
            {
                if(tab[i][k] != 0)
                {
                    if(tab[i][k+1] == 0) 
                    {
                        tab[i][k+1] = tab[i][k];
                        tab[i][k] = 0;
                    }
                }
            }
        }
    }
}



function pushToLeft(tab, size)//action Déplacement de toutes les cases si input LeftArrow 
{
    for (var i = 0; i<size; i++)
    {
        for(var j = 1; j < size; j++)
        { 
            for(var k = j; k > 0; k--)
            {
                if(tab[i][k] != 0)
                {
                    if(tab[i][k-1] == 0)
                    {
                        tab[i][k-1] = tab[i][k];
                        tab[i][k] = 0;
                    }
                }
            }
        }

        for(var m = 1; m < size; m++)// FONCTION MERGE qui balaie tout la ligne vers la gauche. 
        {
            if(tab[i][m-1] == tab[i][m]) 
            {
                var x = parseInt(tab[i][m]) * 2;
                if(x > 0)
                {
                    count += x; 
                }
               
                tab[i][m-1] *= 2;
                tab[i][m] = 0;
            }
        }
    
        for(var j = 1; j < size; j++)  // On PUSH à nouveau puis c'est fini.
        { 
            for(var k = j; k > 0; k--)
            {
                if(tab[i][k] != 0)
                {
                    if(tab[i][k-1] == 0)
                    {
                        tab[i][k-1] = tab[i][k];
                        tab[i][k] = 0;
                    }
                }
            }
        }
    }
}


function winCondition(tab,size)//condition de victoire
{
    for(var i = 0; i <size; i++)
    {
        for(var j = 0; j <size; j++)
        {
            if(tab[i][j] == 2048)
            {
                alert("Wonderful, you have no life! Now you can try again");
                window.location.replace("index.html");
            }
        }
    }
}


function zeroOntab(tab, size, param)
{
    for(var i = 0; i <size; i++)//Vérifie qu'il y a bien aucun zéro dans le tableau. 
    {
        for(var j = 0; j <size; j++)
        {
            if(tab[i][j] == 0||tab[i][j]== undefined) 
            {
                param = false;
                return param;
            }
        }
        param = true;
    }
    return param;
}

function mergeLine(tab, size, param)
{
   for(var i = 0; i<size; i++)// FUNCTION MERGE LEFT RIGHT (une merge sur la ligne se fait dans les deux directions)
    {
        for(var m = 1; m < size; m++)
        {
            if(tab[i][m-1] == tab[i][m]) 
            {
                param = false;
                return param;
            }
        }
        param = true;
    }
    return param;
}

function mergeColumn(tab, size, param)
{
    for (var j = 0; j<size; j++)//FUNCTION MERGE UP DOWN (une merge sur la colonne se fait dans les deux directions)
    {
        for(var m = (size-2); m >=0; m--)// FONCTION MERGE
        {
            if(tab[m+1][j] == tab[m][j]) 
            {
                param = false;
                return param;
            }
        }
        param = true;
    }
    return param;
}
    
function loseCondition(tab,size)//condition d'échec
{
    var noZeroOnTable = false;
    var noMergeLine = false;
    var noMergeColumn = false;

    var noZeroOnTabF= zeroOntab(tab, size, noZeroOnTable);
    var noMergeLineF= mergeLine(tab, size, noMergeLine);
    var noMergeColumnF= mergeColumn(tab, size, noMergeColumn);
   
    
    if(noZeroOnTabF == true && noMergeLineF == true && noMergeColumnF == true)
    {
        alert("Congrats, You are a loser");
        window.location.replace("index.html");
    } 

}


function moveTo(move, tab, size, count)//Fonction générale rattachée à tout input du keyboard. 
{
    if(move == 'ArrowDown')
    {
        pushToDown(tab, size);
    }

    if(move == 'ArrowUp')
    {
        pushToUp(tab, size);
    }

    if(move == 'ArrowLeft')
    {
        pushToLeft(tab, size);
    }

    if(move == 'ArrowRight')
    {
        pushToRight(tab, size);
    }
}