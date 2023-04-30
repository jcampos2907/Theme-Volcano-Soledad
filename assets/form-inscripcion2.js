showModal()
getEdades()
resetCart()
let categoriaTotal = 'open'

let lastCategoria = 'open'

setGenero('Hombre')
getCategorias('open')

setRequiredAutorizacion()

function getCategorias(categoria){
  if(categoria == lastCategoria){categoriaTotal = categoria}
  else if(lastCategoria == 'open' && categoria == 'elite'){
    categoriaTotal= 'elite'
  }
  lastCategoria = categoria
  setCategoria(categoriaTotal)
}


function setCategoria(categoria) {
  const categoriaSelect = document.querySelector('#categoria')
  const options = categoriaSelect.querySelectorAll('option')
  options.forEach(option=>{
    option.setAttribute('cat_show','false')
    if(categoria == 'elite'){
      if(option.getAttribute('cat_control') == 'elite'){
        option.setAttribute('cat_show','true')
      }
    }
    else{
      if(option.getAttribute('cat_control') == 'open'){
        option.setAttribute('cat_show','true')
      } 
    }
  })
  updateCategorias()
}


function setRequiredAutorizacion() {
  const nombre_autorizado = document.querySelector('#nombre__contacto_autorizado')
  const autorizado_inputs = document.querySelectorAll('[id*="contacto_autorizado"]')
  autorizado_inputs.forEach(input=>{
    input.addEventListener('input',event=>{
      if(event.target.value != ''){
      autorizado_inputs.forEach(field=>{
        field.setAttribute('required','')
        if(!field.className.includes('required')){
          field.classList.add('required')
        }
      })
    }
    else{
      autorizado_inputs.forEach(field=>{
        field.removeAttribute('required')
        if(field.className.includes('required')){
          field.classList.remove('required')
        }
      })
    }
    addRequired()
    removeRequired()
    })
  })
}

function resetCart(){
  var updates = {
    44571020787992: 0,
    44678803882264:0,
    44864833159448:0,
    44864833126680:0,
    44864833093912:0,
  };
  console.log(updates)
    
  jQuery.post(Shopify.routes.root + 'cart/update.js', {
    updates: updates
  }).done(function(data) {
    // Success handling
  }).fail(function(error) {
    // Error handling
  });
}

function calculateAge(dob) {
  var currentDate = new Date();
  var currentYear = 2023;
  var currentMonth = 12;
  var currentDay = 31;
  var dobDate = new Date(dob);
  if(dobDate=="Invalid Date")return 0
  
  var ageInMilliseconds = currentDate.getTime() - dobDate.getTime();
  var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  var ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear);
  return ageInYears;
}

function updateCategorias(){
  const categoriaSelect = document.querySelector('#categoria')
  const options = categoriaSelect.querySelectorAll('option')
  options.forEach(option=>{
    option.setAttribute('disabled','')
    if(option.getAttribute('edad_show') == 'true' && option.getAttribute('genero_show') == 'true' && option.getAttribute('cat_show') == 'true' ) console.log(option)
    if(option.getAttribute('edad_show') == 'true' && option.getAttribute('genero_show') == 'true' && option.getAttribute('cat_show') == 'true' ) {
      option.removeAttribute('disabled')
    }
  })
  try{
    $(categoriaSelect).selectmenu('destroy').selectmenu() 
  }
  catch(error){
    console.error(error)
  }
}

function setEdad(edad) {
  const categoriaSelect = document.querySelector('#categoria')
  const options = categoriaSelect.querySelectorAll('option')
  options.forEach(option=>{
    if(option.getAttribute('min_age')<=edad && option.getAttribute('max_age')>=edad){
      option.setAttribute('edad_show','true')
    }
    else{
      option.setAttribute('edad_show','false')
    }
  })
  updateCategorias()
}

function getGenero() {
  const generoInputs = document.querySelectorAll('.genero')
  generoInputs.forEach((input,index)=>{
    $(input).selectmenu({
      change: function( event, data ) {
        setGenero(data.item.value, index)
       }
    })
  })
}

function setGenero(value) {
  const categoriaSelect = document.querySelector('#categoria')
  const options = categoriaSelect.querySelectorAll('option')
  options.forEach(option=>{
    if(option.getAttribute('genero') == value){
      option.getAttribute('genero')
      option.setAttribute('genero_show','true')
    }
    if(option.getAttribute('genero') != value){
      option.setAttribute('genero_show','false')
    }
  })
  updateCategorias()
}

let edadTotal = 0

function getEdades(){
  let ageInputs = document.querySelectorAll('.fecha_nacimiento')
  ageInputs.forEach(input=>{
    input.addEventListener('focus',event=>{
      edadTotal-=calculateAge(event.target.value)
    })
    input.addEventListener('blur',event=>{
      edadTotal += calculateAge(event.target.value)
      setEdad(edadTotal)
    })  
  })
}

function intializePhoneInputs(selectors) {
  selectors.each((i, obj)=>{
    selector = $(obj)
    selector.flagmenu({icons: { button: "ui-icon-caret-1-s" },
         change: function( event, data ) {
           updateInputMask(data.item.value, data.item.element),
           removeSelectErrors(data.item.element)
         }
       })
      .addClass( "ui-menu-icons avatar" );
    let telefonoContainer = selector[0].closest('span.phone')
    
    const phoneInput = telefonoContainer.querySelector('input');
    const phoneMask = new IMask(phoneInput, {
          mask: '+5\\06 0000-0000',
          lazy: false,
          placeholderChar: '_',
    });
    removeMaskErrors(phoneInput,phoneMask)
    function updateInputMask(value, element) {
      let telefonoContainer = element.closest('span.phone')
      let country = 'CR';
      if (value) country = JSON.parse(value).countrycode;
      const phoneInput = telefonoContainer[0].querySelector('input')
      let mask = '';
      if (country === 'US' || country === "CA") {
        mask = '+1 (000) 000-0000';
        phoneMask.updateOptions({
          mask: mask
        });
      } else if (country === 'CR') {
        mask = '+5\\06 0000-0000';
        phoneMask.updateOptions({
          mask: mask,
          immutable: true,
        });
      }else{
        getPhoneCode(value).then(format => {
          mask =`${JSON.parse(value).code.replace(/0/g, '\\0')} ${format}`
          phoneMask.updateOptions({
          mask: mask
          });
        })
      }
    }
  })
}


function showModal() {
  var modal_container = document.querySelectorAll(".modalContainer");
  modal_container.forEach(container=>{
    var modal = container.querySelector(".modal");
    var btn = container.querySelector(".modalBtn");
    var span = container.getElementsByClassName("close")[0];
    btn.onclick = function() {
    modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    
  })
  // Get the button that opens the modal
  // Get the <span> element that closes the modal
  // When the user clicks on the button, open the modal
}


function updateCart(itemId, quantity) {
    var updates = {
      44678803882264: quantity,
    };
    
    jQuery.post(Shopify.routes.root + 'cart/update.js', {
      updates: updates
    }).done(function(data) {
      // Success handling
    }).fail(function(error) {
      // Error handling
    });
}
function setIdField(value, element) {
  const parent = element.closest('div.identificacion')
  const label = parent[0].querySelector('[for *= "identificacion_"]')
  const input = parent[0].querySelector('[id *= identificacion_]');
  const maskOptions = {
    mask: '0 0000 0000',
    lazy: false,
    placeholderChar: '_',
  };
  if(value == 'CR'){
    input.removeAttribute('disabled')
    label.setAttribute('cedula','true')
    label.innerHTML = label.innerHTML.replace("Pasaporte/Identificación", "Cédula")
    maskOptions.mask = '0 0000 0000'
  }
  else{
    input.removeAttribute('disabled')
    label.setAttribute('cedula','false')
    label.innerHTML = label.innerHTML.replace("Cédula","Pasaporte/Identificación")
    maskOptions.mask = /^[a-zA-Z0-9]+$/
  }
  getNombre(maskOptions, input, label)
}

function getNombre(maskOptions, inputtemp, labeltemp) {
  const label = document.querySelector(`[for = ${inputtemp.id} `)
  const input = document.querySelector(`#${inputtemp.id}`);
  const mask = IMask(input, maskOptions);
  removeMaskErrors(input,mask)
  if(label.getAttribute('cedula') == 'false')return
  mask.on('complete', () => {
    const value = mask.value;
    getLicencia(value,inputtemp)
    fetch(`https://apis.gometa.org/cedulas/${value}`)
      .then(response => response.json())
      .then(data => {
        const nombre = document.querySelector(`input.nombre[idcontrol = ${inputtemp.id}]`)
        const apellido = document.querySelector(`input.apellido[idcontrol = ${inputtemp.id}]`)
        const segundo_apellido = document.querySelector(`input.segundo_apellido[idcontrol = ${inputtemp.id}]`)
        if(segundo_apellido){
          nombre.value = data.results[0].firstname
          apellido.value = data.results[0].lastname1
          segundo_apellido.value = data.results[0].lastname2
          nombre.setAttribute('readonly','')
          nombre.classList.remove('invalid')
          apellido.setAttribute('readonly','')
          apellido.classList.remove('invalid')
          segundo_apellido.setAttribute('readonly','')
          segundo_apellido.classList.remove('invalid') 
          const nombre_error = nombre.closest('p').querySelector('.emsg')
          const apellido_error = apellido.closest('p').querySelector('.emsg')
          const segundo_apellido_error = segundo_apellido.closest('p').querySelector('.emsg')
          nombre_error?.remove()
          apellido_error?.remove()
          segundo_apellido_error?.remove()
        }
        else{
          nombre.value = data.results[0].firstname
          apellido.value = data.results[0].lastname1 + ' ' + data.results[0].lastname2
          nombre.setAttribute('readonly','')
          apellido.classList.remove('invalid')
          apellido.setAttribute('readonly','')
          nombre.classList.remove('invalid')
          const nombre_error = nombre.closest('p').querySelector('.emsg')
          const apellido_error = apellido.closest('p').querySelector('.emsg')
          nombre_error?.remove()
          apellido_error?.remove()
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
        const container = input.closest('p')
        const msj = document.createElement("span");
        const node = document.createTextNode("Favor ingresar una cedula valida");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
        if(!input.className.includes('invalid')){
          input.className += " invalid";
        }
      });
  }); 
}

function getPhoneCode(code) {
  let value = JSON.parse(code);
  return fetch('https://unpkg.com/libphonenumber-js@1.9.6/examples.mobile.json')
    .then(response => response.json())
    .then(examples => {
      let example = libphonenumber.getExampleNumber(value.countrycode, examples);
      const format = example.nationalNumber.replace(/\d/g, '0');
      return format;
   });
}

