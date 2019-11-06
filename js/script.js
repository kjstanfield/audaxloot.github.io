let content = `
<table id="dkptable">
<tr>
  <th class="header">Player</th>
  <th class="header">Class</th>
  <th class="header">Current</th>
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

      content = content + `
      <tr class="entry">
        <td class="player">${player}</td>
        <td class="pclass"><span class="class_text">${pclass}</span><img src="https://wow.zamimg.com/images/wow/icons/large/classicon_${pclass}.jpg"></td>
        <td class="current">${current}</td>
      </tr>
      `
    })
    content = content + `</table>`
    $("#content").append(content)
    let table = document.getElementById('dkptable')
    sorttable.makeSortable(table);
  },
  error: function() {
    $('#content').text('Failed to load data!')
  }
})
