<div id="mainmenu">
    <header>
        <div class="container">
            <div id="headercontent" >
                <h1>Tennis Journal</h1>
            </div>
        </div>
    </header>
    <div class="mainmenu_container">
        <div class="addMatchContainer">
            <form class="add_match">
                <label for="am_date"><%>date<%></label>
                <input type="datetime-local" id="am_date"/>
                <label for="am_matchtype"><%>matchtype<%></label>
                <input type="text" value="Freies Spiel, Post SV", id="am_matchtype"/>
                <label for="am_itn_match"><%>itn_match<%></label>
                <input type="checkbox" id="am_itn_match"/>
                <label for="am_myITN"><%>myITN<%></label>
                <input type="text" id="am_myITN"/>
                <label for="am_player2"><%>player2<%></label>
                <select id="am_player2">
                    <option disabled="disabled" selected="selected"></option>
                </select>
                <label for="am_player2ITN"><%>player2ITN<%></label>
                <input type="text" id="am_player2ITN"/>
                <label for="am_surface"><%>surface<%></label>
                <select id="am_surface">
                    <option disabled="disabled" selected="selected"></option>
                    <option value="Clay"><%>Clay<%></option>
                    <option value="Hard"><%>Hard<%></option>
                    <option value="Carpet"><%>Carpet<%></option>
                    <option value="Grass"><%>Grass<%></option>
                    <option value="Other"><%>OtherSurface<%></option>
                </select>
                <label for="am_balls"><%>balls<%></label>
                <input type="text" id="am_balls" value="Babolat Team" placeholder="Babolat Team"/>
                <fieldset id="am_set_results">
                    <label for="am_set1Team1"><%>set<%> 1</label>
                    <input type="number" id="am_set1Team1"/>
                    <input type="number" id="am_set1Team2"/>

                    <label for="am_set2Team1"><%>set<%> 2</label>
                    <input type="number" id="am_set2Team1"/>
                    <input type="number" id="am_set2Team2"/>

                    <label for="am_set3Team1"><%>set<%> 3</label>
                    <input type="number" id="am_set3Team1"/>
                    <input type="number" id="am_set3Team2"/>

                    <label for="am_set4Team1"><%>set<%> 4</label>
                    <input type="number" id="am_set4Team1"/>
                    <input type="number" id="am_set4Team2"/>

                    <label for="am_set5Team1"><%>set<%> 5</label>
                    <input type="number" id="am_set5Team1"/>
                    <input type="number" id="am_set5Team2"/>
                </fieldset>
                <label for="am_notes"><%>notes<%></label>
                <textarea id="am_notes"></textarea>
                <div id="am_submit" class="button"><%>submit<%></div>
            </form>
        </div>
        <div class="matchStatsContainer"></div>
        <div class="recentMatchesContainer"></div>
    </div>
</div>