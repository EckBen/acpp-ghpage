function selectStatesCounties() {
  try {
    var sac_box = document.getElementById("states_and_counties");

    var states_and_counties =
      "<select name='state_county' id='state_county' onchange='submitCounty(); return false;'><option selected='selected' value=''></option><option disabled='disabled'></option>" +
      "<option value='NB'>NEW BRUUNSWICK</option><option value='Albert, NB'>Albert</option><option value='Carleton, NB'>Carleton</option><option value='Charlotte, NB'>Charlotte</option>" +
      "<option value='Gloucester, NB'>Gloucester</option><option value='Kent, NB'>Kent</option><option value='Kings, NB'>Kings</option><option value='Madawaska, NB'>Madawaska</option><option value='Northumberland, NB'>Northumberland</option>" +
      "<option value='Queens, NB'>Queens</option><option value='Restigouche, NB'>Restigouche</option><option value='Saint John, NB'>St John</option>" +
      "<option value='Sunbury, NB'>Sunbury</option><option value='Victoria, NB'>Victoria</option><option value='Westmorland, NB'>Westmorland</option>" +
      "<option value='York, NB'>York</option><option disabled='disabled'></option>" +
      "<option value='NF'>NEWFOUNDLAND</option><option disabled='disabled'></option>" +
      "<option value='NS'>NOVA SCOTIA</option><option value='Annapolis, NS'>Annapolis</option><option value='Antigonish, NS'>Antigonish</option><option value='Cape Breton, NS'>Cape Breton</option>" +
      "<option value='Colchester, NS'>Colchester</option><option value='Cumberland, NS'>Cumberland</option><option value='Digby, NS'>Digby</option><option value='Guysborough, NS'>Guysborough</option>" +
      "<option value='Halifax, NS'>Halifax</option><option value='Hants, NS'>Hants</option><option value='Inverness, NS'>Inverness</option><option value='Kings, NS'>Kings</option>" +
      "<option value='Lunenburg, NS'>Lunenburg</option><option value='Pictou, NS'>Pictou</option><option value='Queens, NS'>Queens</option><option value='Richmond, NS'>Richmond</option>" +
      "<option value='Shelburne, NS'>Shelburne</option><option value='Victoria, NS'>Victoria</option><option value='Yarmouth, NS'>Yarmouth</option><option disabled='disabled'></option>" +
      "<option value='PE'>PRINCE EDWARD ISLAND</option><option value='Kings, PE'>Kings</option><option value='Prince, PE'>Prince</option><option value='Queens, PE'>Queens</option></select><option disabled='disabled'></option>";

    sac_box.innerHTML = states_and_counties;
  } catch (err) {}
}
