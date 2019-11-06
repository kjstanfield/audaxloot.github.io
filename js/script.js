let whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true}
let dkptable = `
<table id="dkptable">
<tr>
  <th class="header row">Player</th>
  <th class="header row">Class</th>
  <th class="header row">Current</th>
</tr>
`

$.ajax({
  url: 'https://audaxloot.github.io/xml/dkp.xml',
  type: 'get',
  dataType: 'xml',
  success: function(data) {
    $(data).find('dkpentry').each(function() {
      let player = $(this).find('player').text()
      let pclass = $(this).find('class').text().toLowerCase()
      let current = $(this).find('dkp').text()

      dkptable = dkptable + `
      <tr class="entry">
        <td class="player row">${player}</td>
        <td class="pclass row"><span class="class_text">${pclass}</span><img src="https://wow.zamimg.com/images/wow/icons/large/classicon_${pclass}.jpg"></td>
        <td class="current row">${current}</td>
      </tr>
      `
    })
    dkptable = dkptable + `</table>`
    $("#dkp-table").append(dkptable)
    let table = document.getElementById('dkptable')
    sorttable.makeSortable(table);
  },
  error: function() {
    $('#dkp-table').text('Failed to load data!')
  }
})


let loothistory = `
<table id="loothistory">
<tr>
  <th class="header row">Player</th>
  <th class="header row">Item</th>
  <th class="header row">Zone</th>
  <th class="header row">Boss</th>
  <th class="header row">Cost</th>
</tr>
`

$.ajax({
  url: 'https://audaxloot.github.io/xml/loot.xml',
  type: 'get',
  dataType: 'xml',
  success: function(data) {
    $(data).find('lootentry').each(function() {
      let player = $(this).find('player').text()
      let itemname = $(this).find('itemname').text()
      let itemnumber = $(this).find('itemnumber').text()
      let zone = $(this).find('zone').text()
      let boss = $(this).find('boss').text()
      let cost = $(this).find('cost').text()

      loothistory = loothistory + `
      <tr class="entry">
        <td class="player row">${player}</td>
        <td class="item row"><a href="https://classic.wowhead.com/item=${itemnumber}/" data-wowhead="domain=classic&item=${itemnumber}"></a></td>
        <td class="zone row">${zone}</td>
        <td class="boss row">${boss}</td>
        <td class="cost row">${cost}</td>
      </tr>
      `
    })
    loothistory = loothistory + `</table>`
    $("#dkp-loot").append(loothistory)
  },
  error: function() {
    $('#dkp-loot').text('Failed to load data!')
  }
})

$('#nav-dkp').click(function() {
  $('#dkp-loot').css("display", "none");
  $('#dkp-table').css("display", "block");
})

$('#nav-loot').click(function() {
  $('#dkp-table').css("display", "none");
  $('#dkp-loot').css("display", "block");
})