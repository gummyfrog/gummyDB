function type(val) {
  if(val == "offline" || val == "online") {
    return(`<${val}>${val}</${val}>`);
  }
  return(`<${typeof(val)}>${val}</${typeof(val)}>`);
}


function embed(data, key, time, desc) {

  var ret;

  var info = Object.keys(data).map((key) => {
    if(key == 'last' || key == 'desc') {
      return;
    };

    return `<span class="item">${key.replace('-', ' ')}: ${type(data[key])}</span>`
  })

  console.log(info);

  if(document.getElementById(key)) {
    // this embed already exists...
    console.log('This embed already exists...')

    console.log(document.getElementById(`${key}-content`));
    console.log(`Info: ${info}`);
    ret = document.getElementById(key).outerHTML;

    if(document.getElementById(`${key}-content`).innerHTML == info.join('\n')) {
      console.log('No change.');
    } else {
      setInterval(function() {
        document.getElementById(`${key}-content`).innerHTML = info.join('\n');
      }, 1 * 1000);
    }

  } else {

    ret = (`
      <div class="embed status" id="${key}">

      <div class="titleBar">
        <span class="titleText">${key}</span>
        <span class="infoText">⏰ ${time}</span>
      </div>

      <div class="desc">
        <span>${desc}</span>
      </div>

      <div class="embedContent" id="${key}-content">${info.join('\n')}</div>
      </div>
    `)

  }


  return ret;

};



function displayEmbed(data) {
  var keys = Object.keys(data);
  var returnHTML = '';
  for(i=0;i<keys.length;i++) {
    var key = keys[i];
    returnHTML += embed(data[key], key, data[key]['last'], data[key]['desc'])
  }
  return(returnHTML)
};





function jsonDisplay(container, data) {
  console.log(data);
  if(data) {
    container.innerHTML = displayEmbed(data);
  }
};
