$(document).ready(function()
{
    //creation du formulaire de dimensionage de la grille
    $("h1").after("<select id = \"selectClass\"></select><br>");
    $("#selectClass").append("<option>Select the dimension of your table</option>");
    $("#selectClass").append("<option value=\"4\">4 x 4</option>");
    $("#selectClass").append("<option value=\"5\">5 x 5</option>");
    $("#selectClass").append("<option value= \"6\">6 x 6</option>");
    $("#selectClass").append("<option value= \"7\">7 x 7</option>");
    $("#selectClass").after("<button id = \"validateSize\">Confirm</button>");

    $("button").after("<button id = \"NewGame\">newGame</button>");

    
  
    $("#validateSize").click(function()
    {   
        var tableSize = $('#selectClass').val();
        var tableSizeInt = parseInt(tableSize);  //la variable contient la taille de la grille
        if(tableSize > 3)
        {
            if($('table').length)
            {
                if (confirm("Erase current tab for a one ?"))
                {
                    $("table").remove();
                } 
                else
                {
                    return;
                }
            } 
            
            
            // $("table").remove();

            $("h1").after("<table id=\"board\"></table>");

            for(var i = 0; i< tableSizeInt; i++)
            {
                $("table").append("<tr></tr>");
                for(var j = 0; j< tableSizeInt; j++)
                {
                    $("tr:last").append("<td id =\"line"+i+"col"+j+"\"></td>");
                }
            } //on construit la grille selon la taille indiquée et chaque cellule td a un ID unique selon (ligne, colone)
            
            var table = new Array(tableSizeInt);

            for (i=0; i <tableSizeInt; i++)
            {
                table[i]=new Array(tableSizeInt);
            }

            for(var i=0; i<tableSizeInt; i++)
            { 
                for (var j=0; j<tableSizeInt; j++)
                {
                    table[i][j] = 0;
                }
            }

            // table[0][0] = 1;
            // table[0][1] = 2;
            // table[0][2] = 3;
            // table[0][3] = 4;

            // table[1][0] = 1;
            // table[1][1] = 6;
            // table[1][2] = 7;
            // table[1][3] = 8;

            // table[2][0] = 9;
            // table[2][1] = 10;
            // table[2][2] = 11;
            // table[2][3] = 12;

            // table[3][0] = 13;
            // table[3][1] = 14;
            // table[3][2] = 15;
            // table[3][3] = 16;


            cellDimensions(tableSizeInt);

            addNumberToTable(table, tableSizeInt);
            addNumberToTable(table, tableSizeInt);
            fillTable(table,tableSizeInt);// on initialise la grille avec 2 nombres au début du game. 
            $("#score").html(count);

            $(document).keydown(function(event) 
            {  
                var instruction = event.key;
                if (instruction == 'ArrowDown' || instruction == 'ArrowUp' || instruction == 'ArrowLeft' ||instruction == 'ArrowRight')
                {
                    moveTo(instruction,table,tableSizeInt);
                    addNumberToTable(table, tableSizeInt);
                    $("#score").html(count);
                    fillTable(table,tableSizeInt);
                    winCondition(table,tableSizeInt);
                    loseCondition(table,tableSizeInt);
                }
            });

            $("#NewGame").click(function()
            {    
                if (confirm("Are you sure ?")) 
                {
                    window.location.replace("index.html");
                } 
                else 
                {
                    alert("tu pues");
                } 
            })
        }
    })
});