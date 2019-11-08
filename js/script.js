var whTooltips = {
  colorLinks: true,
  iconizeLinks: true,
  renameLinks: true
};

// MAIN DKP TABLE
$.ajax({
  url: 'https://audaxloot.github.io/xml/dkp.xml',
  type: 'get',
  dataType: 'xml',
  success: function(data) {
    $(data)
      .find('dkpentry')
      .each(function() {
        let dkp_player = $(this)
          .find('player')
          .text();
        let dkp_class = $(this)
          .find('class')
          .text()
          .toLowerCase();
        let dkp_current = $(this)
          .find('dkp')
          .text();

        let new_row = `
      <tr class="dkp_entry">
        <td class="row dplayer">${dkp_player}</td>
        <td class="row dclass"><span class="dtext">${dkp_class}</span><img src="https://wow.zamimg.com/images/wow/icons/large/classicon_${dkp_class}.jpg"></td>
        <td class="row dcurrent">${dkp_current}</td>
      </tr>`;

        $('#dkp_table tbody').append(new_row);
      });
    var tableObject = document.getElementById('dkp_table');
    sorttable.makeSortable(tableObject);
    
    var myTH = document.getElementsByTagName('th')[2];
    sorttable.innerSortFunction.apply(myTH, []);
  },
  error: function() {
    $('#dkp_table').text('Failed to load data!');
  }
});

// LOOTED ITEM HISTORY
$.ajax({
  url: 'https://audaxloot.github.io/xml/loot.xml',
  type: 'get',
  dataType: 'xml',
  success: function(data) {
    $(data)
      .find('lootentry')
      .each(function() {
        let loot_player = $(this)
          .find('player')
          .text();
        let loot_itemname = $(this)
          .find('itemname')
          .text();
        let loot_itemnum = $(this)
          .find('itemnumber')
          .text();
        let loot_zone = $(this)
          .find('zone')
          .text();
        let loot_boss = $(this)
          .find('boss')
          .text();
        let loot_cost = $(this)
          .find('cost')
          .text();

        let new_row = `
      <tr class="loot_entry">
        <td class="row lplayer">${loot_player}</td>
        <td class="row litem"><a href="https://classic.wowhead.com/item=${loot_itemnum}" target="_blank" data-wowhead="item=${loot_itemnum}&domain=classic">${loot_itemname}</a></td>
        <td class="row lzone">${loot_zone}</td>
        <td class="row lboss">${loot_boss}</td>
        <td class="row lcost">${loot_cost}</td>
      </tr>`;

        $('#loot_table tbody').append(new_row);
      });
  },
  error: function() {
    $('#loot_table').text('Failed to load data!');
  }
});

// DKP HISTORY
$.ajax({
  url: 'https://audaxloot.github.io/xml/history.xml',
  type: 'get',
  dataType: 'xml',
  success: function(data) {
    $(data)
      .find('historyentry')
      .each(function() {
        let hist_players = $(this)
          .find('playerstring')
          .text();
        let hist_dkp = $(this)
          .find('dkp')
          .text();
        let hist_reason = $(this)
          .find('reason')
          .text();

        let new_row = `
      <tr class="history_entry">
        <td class="row hplayers">${hist_players}</td>
        <td class="row hdkp">${hist_dkp}</td>
        <td class="row hreason">${hist_reason}</td>
      </tr>`;

        $('#history_table tbody').append(new_row);
      });
  },
  error: function() {
    $('#history_table').text('Failed to load data!');
  }
});

// NAV
$('#dkp_nav').click(function() {
  $('#dkp_table').css('display', 'table');
  $('#loot_table').css('display', 'none');
  $('#history_table').css('display', 'none');
});

$('#loot_nav').click(function() {
  $('#dkp_table').css('display', 'none');
  $('#loot_table').css('display', 'table');
  $('#history_table').css('display', 'none');
});

$('#hist_nav').click(function() {
  $('#dkp_table').css('display', 'none');
  $('#loot_table').css('display', 'none');
  $('#history_table').css('display', 'table');
});

$('#logs_nav').click(function() {
  window.open(
    'https://classic.warcraftlogs.com/guild/reports-list/488268/',
    '_blank'
  );
});
