let edadTotal = 0

window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    console.log('Page loaded from cache');
  } else {
    console.log('Page loaded normally');
  }
});

PopulateCountries()
showModal()
// getEdades()
resetCart()

initializeDateInputs()

function initializeDateInputs(){
  const dateInputs = document.querySelectorAll('.fecha_nacimiento')
  dateInputs.forEach(input=>{
    var dateMask = IMask(input, {
      mask: Date,  // enable date mask
      pattern: 'Y-`m-`d',  // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
      // you can provide your own blocks definitions, default blocks for date mask are:
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
          placeholderChar: 'd',
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
          placeholderChar: 'm',
          
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
          placeholderChar: 'y',
          
        }
      },
      // define date -> str convertion
      format: function (date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
    
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
    
        return [year, month, day].join('-');
      },
      // define str -> date convertion
      parse: function (str) {
        var yearMonthDay = str.split('-');
        return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
      },
    
      // optional interval options
      min: new Date(1943, 8, 3),  // defaults to `1900-01-01`
      max: new Date(2005, 8, 3),  // defaults to `9999-01-01`
    
      autofix: true,  // defaults to `false`, see details
    
      // also Pattern options can be set
      lazy: false,
    
      // and other common options
      overwrite: true  // defaults to `false`
    });

    input.addEventListener('blur',event=>{
      removeMaskErrors(input,dateMask)
    })

    $(input).datepicker({
      dateFormat: "yy-mm-dd",
      dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ],
      dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
      defaultDate: '2000-09-03',
      duration: "fast",
      changeYear: true,
      firstDay: 1,
      maxDate: '2005-09-03',
      minDate: '1943-09-03',
      monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre" ],
      monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic" ],
      yearRange: "-100:-16",
      onSelect: function( event, data ) {
        forceRemoveMaskErrors(input,dateMask),
        edadTotal -= calculateAge(data.lastVal)
        edadTotal += calculateAge(event)
        setEdad(edadTotal)
        dateMask.updateValue()
      }
    });
    // dateMask.on('complete',()=>{
    //   $( input ).datepicker( "hide" );
    // })
  })
  
}

let categoriaTotal = 'open'

let lastCategoria = 'open'
let lastGenero = 'Hombre'
setGenero('Mixto')
getCategorias('open')

setRequiredAutorizacion()

function getCategorias(categoria){
  const licenciaInputs = document.querySelectorAll('.num_licencia')
  if (licenciaInputs.length == 1){
    setCategoria(categoria)
    
  }
  else{
    if(categoria == lastCategoria){categoriaTotal = categoria}
    else if(lastCategoria == 'open' && categoria == 'elite'){
      categoriaTotal= 'elite'
    }
    lastCategoria = categoria
    setCategoria(categoriaTotal)
    
  }
}

function setCategoria(categoria) {
  const categoriaSelect = document.querySelector('#categoria')
  const options = categoriaSelect.querySelectorAll('option')
  let cat_controls = []
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
    cat_controls.push(option.getAttribute('cat_control'))
  })
  if(!cat_controls.includes("true"))
  options.forEach(option=>{
    option.setAttribute('cat_show','true')
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
    45107279724824:0,
    45107279692056:0,
    45107279659288:0,
  };
  // console.log(updates)
    
  jQuery.post(Shopify.routes.root + 'cart/update.js', {
    updates: updates
  }).done(function(data) {
    // Success handling
  }).fail(function(error) {
    // Error handling
  });
}

function calculateAge(dob) {
  // let { selectedDay, selectedMonth, selectedYear}
  var referenceDate = new Date('December 31, 2023 17:59:00');
  var dobDate = new Date(dob);

  if (isNaN(dobDate.getTime())) {
    return 0;
  }

  var ageInMilliseconds = referenceDate.getTime() - dobDate.getTime();
  var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  var ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear);

  return ageInYears;
}

function updateCategorias(){
  const categoriaSelect = document.querySelector('#categoria')
  const options = categoriaSelect.querySelectorAll('option')
  options.forEach(option=>{
    option.setAttribute('disabled','')
    // if(option.getAttribute('edad_show') == 'true' && option.getAttribute('genero_show') == 'true' && option.getAttribute('cat_show') == 'true' ) console.log(option)
    if(option.getAttribute('edad_show') == 'true' && option.getAttribute('genero_show') == 'true' && option.getAttribute('cat_show') == 'true' ) {
      // console.log(option)
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
        setGenero(data.item.value, index);
        hideTallas(data.item.value, index)
       }
    })
  })
}

function setGenero(value) {
  let generoTotal = 'Mixto'
  if(document.querySelectorAll(".genero").length >1){
    if(value !== lastGenero) generoTotal = 'Mixto'
    if(value == lastGenero) generoTotal = value
    lastGenero = value
  }
  else{
    generoTotal = value
  }
  const categoriaSelect = document.querySelector('#categoria')
    const options = categoriaSelect.querySelectorAll('option')
    options.forEach(option=>{
      if(option.getAttribute('genero') == generoTotal){
        option.getAttribute('genero')
        option.setAttribute('genero_show','true')
      }
      if(option.getAttribute('genero') != generoTotal){
        option.setAttribute('genero_show','false')
      }
    })
  
  updateCategorias()
}


// function getEdades(){
//   let ageInputs = document.querySelectorAll('.fecha_nacimiento')
//   ageInputs.forEach(input=>{
//     input.addEventListener('focus',event=>{
//       edadTotal-=calculateAge(event.target.value)
//     })
//     input.addEventListener('input',event=>{
//       edadTotal += calculateAge(event.target.value)
//       setEdad(edadTotal)
//       // console.log(event.target.value)
//     })  
//   })
// }

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
      let code = "+506"
      if (value) {
        country = JSON.parse(value).countrycode;
        code = JSON.parse(value).code;
      }
      const phoneInput = telefonoContainer[0].querySelector('input')
      let mask = '';
      if (code == '+1') {
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
        getPhoneExample(value).then(format => {
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


function initializeIdInputs(selectors) {
  selectors.each((i, obj)=>{
    selector = $(obj)
      selector.iconselectmenu({icons: { button: "ui-icon-caret-1-s" },
       change: function( event, data ) {
         updateInputMask(data.item.value, data.item.element),
         removeSelectErrors(data.item.element)
       }
     })
      .iconselectmenu( "menuWidget" )
      .addClass( "ui-menu-icons avatar" );
    let idContainer = selector[0].closest('div.identificacion')
    const idInput = idContainer.querySelector('input');
    const idLabel = idContainer.querySelector('label[cedula]');
    const idMask = new IMask(idInput, {
          mask: '0 0000 0000',
          lazy: false,
          placeholderChar: '_',
    });
    idMask.on('accept',()=>{
      if(idLabel.getAttribute('cedula') == 'true') return
      const value = idMask.value;
      getLicencia(value,idInput)
    })
    
    idMask.on('complete', () => {
      if(idLabel.getAttribute('cedula') == 'false') return
      const value = idMask.value;
      getLicencia(value,idInput)
      fetch(`https://apis.gometa.org/cedulas/${value}`)
        .then(response => response.json())
        .then(data => {
          let id_fields = document.querySelectorAll('input.identificacion_corredor')
          if(id_fields.length ==2){
            if(id_fields[0].value == id_fields[1].value){
              const container = idInput.closest('p')
              const msj = document.createElement("span");
              const node = document.createTextNode("Número de cédula ya asociado a otra inscripción");
              msj.classList.add("emsg");
              msj.appendChild(node);
              container.appendChild(msj)
              if(!idInput.className.includes('invalid')){
                idInput.className += " invalid";
              }
              return
            }
          }
          const nombre = document.querySelector(`input.nombre[idcontrol = ${idInput.id}]`)
          const apellido = document.querySelector(`input.apellido[idcontrol = ${idInput.id}]`)
          const segundo_apellido = document.querySelector(`input.segundo_apellido[idcontrol = ${idInput.id}]`)
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
          const container = idInput.closest('p')
          const msj = document.createElement("span");
          const node = document.createTextNode("Favor ingresar una cedula valida");
          msj.classList.add("emsg");
          msj.appendChild(node);
          container.appendChild(msj)
          if(!idInput.className.includes('invalid')){
            idInput.className += " invalid";
          }
        });
    })
    removeMaskErrors(idInput,idMask)
    function updateInputMask(value, element) {
      let idContainer = element.closest('div.identificacion')
      let country = 'CR';
      if (value) country = JSON.parse(value).countrycode;
      const idInput = idContainer[0].querySelector('input')
      const idLabel = idContainer[0].querySelector('label[cedula]')
      idInput.removeAttribute('disabled')
      let mask = '';
      if (country == 'CR') {
        idLabel.setAttribute('cedula','true')
        idLabel.innerHTML = idLabel.innerHTML.replace("Pasaporte/Identificación", "Cédula")
        mask = '0 0000 0000';
        idMask.updateOptions({
          mask: mask,
          lazy: false,
          placeholderChar: '_',
        });
      }else{
        idLabel.setAttribute('cedula','false')
        idLabel.innerHTML = idLabel.innerHTML.replace( "Cédula","Pasaporte/Identificación")
        mask = /^[a-zA-Z0-9]+$/;
        idMask.updateOptions({
          mask: mask,
          // prepare: (value, masked) => {
          //   value = '';
          //   masked._value = '';
          // },
        });
      }
    }
  })
}

// function getNombre(maskOptions, inputtemp, labeltemp) {
//   const label = document.querySelector(`[for = ${inputtemp.id} `)
//   const input = document.querySelector(`#${inputtemp.id}`);
//   if(label.getAttribute('cedula') == 'false'){
//     console.log(input)
//     input.addEventListener('blur',(e)=>{
//       console.log(e.target.value)
//       const value = e.target.value
//       getLicencia(value,inputtemp)    
//     })
//     return
//   }
//   mask.on('complete', () => {
//     const value = mask.value;
//     getLicencia(value,inputtemp)
//     fetch(`https://apis.gometa.org/cedulas/${value}`)
//       .then(response => response.json())
//       .then(data => {
//         const nombre = document.querySelector(`input.nombre[idcontrol = ${inputtemp.id}]`)
//         const apellido = document.querySelector(`input.apellido[idcontrol = ${inputtemp.id}]`)
//         const segundo_apellido = document.querySelector(`input.segundo_apellido[idcontrol = ${inputtemp.id}]`)
//         if(segundo_apellido){
//           nombre.value = data.results[0].firstname
//           apellido.value = data.results[0].lastname1
//           segundo_apellido.value = data.results[0].lastname2
//           nombre.setAttribute('readonly','')
//           nombre.classList.remove('invalid')
//           apellido.setAttribute('readonly','')
//           apellido.classList.remove('invalid')
//           segundo_apellido.setAttribute('readonly','')
//           segundo_apellido.classList.remove('invalid') 
//           const nombre_error = nombre.closest('p').querySelector('.emsg')
//           const apellido_error = apellido.closest('p').querySelector('.emsg')
//           const segundo_apellido_error = segundo_apellido.closest('p').querySelector('.emsg')
//           nombre_error?.remove()
//           apellido_error?.remove()
//           segundo_apellido_error?.remove()
//         }
//         else{
//           nombre.value = data.results[0].firstname
//           apellido.value = data.results[0].lastname1 + ' ' + data.results[0].lastname2
//           nombre.setAttribute('readonly','')
//           apellido.classList.remove('invalid')
//           apellido.setAttribute('readonly','')
//           nombre.classList.remove('invalid')
//           const nombre_error = nombre.closest('p').querySelector('.emsg')
//           const apellido_error = apellido.closest('p').querySelector('.emsg')
//           nombre_error?.remove()
//           apellido_error?.remove()
//         }
//       })
//       .catch(error => {
//         console.error('Error al obtener datos del usuario:', error);
//         const container = input.closest('p')
//         const msj = document.createElement("span");
//         const node = document.createTextNode("Favor ingresar una cedula valida");
//         msj.classList.add("emsg");
//         msj.appendChild(node);
//         container.appendChild(msj)
//         if(!input.className.includes('invalid')){
//           input.className += " invalid";
//         }
//       });
//   }); 
// }

function getPhoneExample(code) {
  let value = JSON.parse(code);
  return fetch('https://unpkg.com/libphonenumber-js@1.9.6/examples.mobile.json')
    .then(response => response.json())
    .then(examples => {
      let example = libphonenumber.getExampleNumber(value.countrycode, examples);
      const format = example.nationalNumber.replace(/\d/g, '0');
      return format;
   });
}


function getPhoneCode(code, fallback) {
  return fetch('https://unpkg.com/libphonenumber-js@1.9.6/examples.mobile.json')
    .then(response => response.json())
    .then(examples => {
      let example = libphonenumber.getExampleNumber(code, examples);
      if(!example) return ''
      let phoneCode = example.number.replace(example.nationalNumber,'')
      // let phoneCode = example?.countryCallingCode
      return phoneCode
   });
}

function PopulateCountries() {
  const preferredCountryCodes = ['CR', 'US', 'CA', 'GB', 'ES', 'NI', 'GT', 'HN'];
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      const nacionalidadSelects = document.querySelectorAll('.nacionalidad')
        nacionalidadSelects.forEach(select=>{
        const preferredGroup = document.createElement('optgroup');
        preferredGroup.label = 'Países preferidos';
        select.appendChild(preferredGroup);
        preferredCountryCodes.forEach(countryCode => {
          const preferredCountry = countries.find(country => country.cca2 === countryCode);
          if (preferredCountry) {
            const option = document.createElement('option');
            // option.value = preferredCountry.cca2;
            option.value = JSON.stringify({code:preferredCountry.cioc || preferredCountry.cca2,countrycode:preferredCountry.cca2});
            option.textContent = preferredCountry.translations.spa.common || preferredCountry.name.common;
            option.setAttribute('data-style', `background-image: url('${preferredCountry.flags.png}')`)
            preferredGroup.appendChild(option);
          }
        });
        // Create a separator option between the preferred and non-preferred countries
        const separator = document.createElement('option');
        separator.disabled = true;
        separator.textContent = '---------------------------';
        select.appendChild(separator);
        
        // Create a group for the rest of the countries
        const restGroup = document.createElement('optgroup');
        restGroup.label = 'Todos los países';
        select.appendChild(restGroup);
        
        // Create and append options for the rest of the countries
        countries.forEach(country => {
          if (!preferredCountryCodes.includes(country.cca2)) {
            const option = document.createElement('option');
            // option.value = country.cca2;
            option.value = JSON.stringify({code:country.cioc || country.cca2,countrycode:country.cca2});
            option.textContent = country.translations.spa.common || country.name.common;
            option.setAttribute('data-style', `background-image: url('${country.flags.png}')`)
            restGroup.appendChild(option);
          }
        });})
      const telefonoSelects = document.querySelectorAll('select.codigo_telefono');
      telefonoSelects.forEach(select => {
        const preferredGroup = document.createElement('optgroup');
        preferredGroup.label = 'Países preferidos';
        select.appendChild(preferredGroup);        
        preferredCountryCodes.forEach(countryCode => {
          const preferredCountry = countries.find(country => country.cca2 === countryCode);
          if (preferredCountry) {
            const option = document.createElement('option');
            if (countryCode == 'CR') option.setAttribute('selected','')
            option.textContent = preferredCountry.translations.spa.common || preferredCountry.name.common;
            option.setAttribute('data-style', `background-image: url('${preferredCountry.flags.png}')`)
            const code = document.createElement('span');
            getPhoneCode(preferredCountry.cca2).then(phoneCode=>{
              code.textContent = phoneCode
              option.value = JSON.stringify({code:code.textContent,countrycode:preferredCountry.cca2, image:preferredCountry.flags.png});
              preferredGroup.appendChild(option);
            })
            // code.textContent = preferredCountry.idd.root;
            // if(preferredCountry.idd.suffixes.length == 1)code.textContent = `${preferredCountry.idd.root}${preferredCountry.idd.suffixes}`;
          }
        });        
        // Create a separator option between the preferred and non-preferred countries
        const separator = document.createElement('option');
        separator.disabled = true;
        separator.textContent = '---------------------------';
        select.appendChild(separator);

        // Create a group for the rest of the countries
        const restGroup = document.createElement('optgroup');
        restGroup.label = 'Todos los países';
        select.appendChild(restGroup);
        // Create and append options for the rest of the countries
        countries.forEach(country => {
          if (!preferredCountryCodes.includes(country.cca2)) {
          const option = document.createElement('option');
          option.textContent = country.translations.spa.common || country.name.common;
          option.setAttribute('data-style', `background-image: url('${country.flags.png}')`)
          const code = document.createElement('span');
          getPhoneCode(country.cca2).then(phoneCode=>{
            code.textContent = phoneCode
            option.value = JSON.stringify({code:code.textContent,countrycode:country.cca2, image:country.flags.png});
            restGroup.appendChild(option);
          })
          // code.textContent = country.idd.root; 
          // if(country.idd.suffixes && country.idd.suffixes.length == 1)code.textContent = `${country.idd.root}${country.idd.suffixes}`;
        }
        });
      });
    })
    .catch(error => {
      console.error('Error al obtener datos de los países:', error);
    });
}