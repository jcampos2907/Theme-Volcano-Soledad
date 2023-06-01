var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
let licencia_counter = 0

// window.addEventListener('pageshow', function(event) {
//   if (event.persisted) {
//     currentTab = 0; // Current tab is set to be the first tab (0)
//     showTab(currentTab);
//     resetCart()
//   } else {
//     // currentTab = 0; // Current tab is set to be the first tab (0)
//     // showTab(currentTab); // Display the current tab
//     // licencia_counter = 0
//     // Code to execute when page is loaded from server
//   }
// });

removeError()
addRequired()
hideEquipo()
hideLicencia()
getLists()



function hideTallas(value) {
  x = document.getElementsByClassName("tab");
  const talla_jersey = x[currentTab].querySelector('.jersey')
  const options = talla_jersey.querySelectorAll('option')
  options.forEach(option => {
    option.setAttribute('disabled', '')
    option.removeAttribute('disabled')
    if (value == "Mujer") {
      if (['XXL', 'XXXL'].includes(option.value)) {
        option.setAttribute('disabled', '')
      }
    }
  })
  try {
    $(talla_jersey).selectmenu('destroy').selectmenu()
  }
  catch (error) {
    console.error(error)
  }
}

function validateEmail() {
  var valid = true
  x = document.getElementsByClassName("tab");
  const email = x[currentTab].querySelectorAll('input[type="email"]')
  email.forEach(input => {
    const container = input.closest('p')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      if (!input.className.includes('invalid')) {
        input.classList.add('invalid')
        const msj = document.createElement("span");
        const node = document.createTextNode("Introducir un correo valido");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
      }
      valid = false;
    }
  })
  return valid
}


function hideLicencia() {
  x = document.getElementsByClassName("tab");
  const radios = x[currentTab].querySelectorAll('[name *= "properties[Tiene licencia FECOCI anual?"')
  if (!radios.length) return
  const equipo = x[currentTab].querySelector('[id*="container_licencia"]')
  const inputs = equipo.querySelectorAll('input')
  radios.forEach(radio => {
    radio.addEventListener('change', (event) => {
      if (event.target.value == "Si") {
        if (licencia_counter > 0) licencia_counter -= 1
        updateCart(44678803882264, licencia_counter)
        equipo.removeAttribute('hidden')
        inputs.forEach(input => {
          input.classList.add('required')
          input.setAttribute('required', '')
        })
      }
      else if (event.target.value == "No") {
        equipo.setAttribute('hidden', '')
        licencia_counter += 1
        updateCart(44678803882264, licencia_counter)
        inputs.forEach(input => {
          input.classList.remove('required')
          input.removeAttribute('required')
          if (input.className.includes('invalid')) input.classList.remove('invalid')
        })
      }
      addRequired()
    })
  })
}

function hideEquipo() {
  x = document.getElementsByClassName("tab");
  const radios = x[currentTab].querySelectorAll('[name *= "properties[Pertenece a algun equipo élite o master?"')
  if (!radios.length) return
  const equipo = x[currentTab].querySelector('[id*=container_equipo]')
  radios.forEach(radio => {
    radio.addEventListener('change', (event) => {
      if (event.target.value == "Si") {
        equipo.removeAttribute('hidden')
      }
      else if (event.target.value == "No") {
        equipo.setAttribute('hidden', '')
      }
    })
  })
}

function removeRequired() {
  const required = document.querySelectorAll('label.required[for*="contacto_autorizado"]');
  required.forEach(label => {
    const field = document.querySelector(`#${label.getAttribute('for').replace('-button', '')}`)
    if (!field.className.includes('required')) label.classList.remove('required')
  })
}

function addRequired() {
  const required = document.querySelectorAll(':not(label):not(p).required');
  required.forEach(field => {
    const label = document.querySelector(`[for *= ${field.id}`)
    if (field.className.includes('required') && label && !label.className.includes('required')) label.classList.add('required')
  })
}

function removeSelectErrors(option) {
  x = document.getElementsByClassName("tab");
  const select = option[0].closest('select')
  const container = select.closest('p')
  const button = container.querySelector('.ui-selectmenu-button')
  const checkbox = x[currentTab].querySelector('[id*="confirmacion_datos"]')
  if (checkbox && checkbox.checked) {
    checkbox.checked = false;
  }
  if (select.className.includes('invalid')) select.classList.remove('invalid')
  if (button.className.includes('invalid')) button.classList.remove('invalid')
  const error = container.querySelector('.emsg')
  if (error) error.remove()
}

function removeMaskErrors(input, iMask) {
  x = document.getElementsByClassName("tab");
  const checkbox = x[currentTab].querySelector('[id*="confirmacion_datos"]')
  iMask.on('accept', () => {
    const container = input.closest('p')
    if (input.className.includes('invalid')) input.classList.remove('invalid')
    const error = container.querySelector('.emsg')
    if (error) error.remove()
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
  })
}

function forceRemoveMaskErrors(input, iMask) {
  x = document.getElementsByClassName("tab");
  const checkbox = x[currentTab].querySelector('[id*="confirmacion_datos"]')
  const container = input.closest('p')
  if (input.className.includes('invalid')) input.classList.remove('invalid')
  const error = container.querySelector('.emsg')
  if (error) error.remove()
  if (checkbox && checkbox.checked) {
    checkbox.checked = false;
  }
}


function removeError() {
  x = document.getElementsByClassName("tab");
  y = x[currentTab].querySelectorAll("input");
  z = x[currentTab].querySelectorAll("select");
  const checkbox = x[currentTab].querySelector('[id*="confirmacion_datos"]')
  y.forEach(input => {
    const container = input.closest('p')
    input.addEventListener('input', event => {
      if (input.type != 'checkbox') {
        if (checkbox && checkbox.checked) {
          checkbox.checked = false;
        }
      }
      const error = container.querySelector('.emsg')
      if (error) error.remove()
      input.classList.remove('invalid')
    })
  })
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  // if (n!=0 && !validateForm()) return false;
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Seguir al Pago";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente Paso";
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.querySelectorAll(".stepper-item");
  x.forEach(item => {
    item.className = item.className.replace(" completed", '')
    item.className = item.className.replace(" active", '')
  })
  for (i = 0; i < n; i++) {
    // x[i].className = x[i].className.replace(" active", ' completed');   
    x[i].className += " completed"

  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


function indicatorNext(n) {
  if (n < currentTab) {
    // console.log(currentTab-n)
    nextPrev(-(currentTab - n))
  }
  else {
    // console.log(n-currentTab)
    nextPrev(n - currentTab)
  }

}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n >= 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    var form = document.querySelector('[id *="product-form"]');
    submitForm(form)
    return false;
  }
  // Otherwise, display the correct tab:
  hideEquipo()
  hideLicencia()
  showTab(currentTab);
  removeError()
}

function submitForm(form) {
  var formData = new FormData(form);
  for (const pair of formData.entries()) {
    if (String(pair[0]).includes("Nacionalidad")) {
      const valueJson = JSON.parse(pair[1])
      formData.set(pair[0], valueJson.code)
    }
  }
  fetch('/cart/add.js', {
    method: 'POST',
    body: formData
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (formData.get('properties[Numero de orden Woocommerce]')) {
        // console.log(`/checkout?discount=${formData.get('properties[Numero de orden Woocommerce]')}`)
        window.location.href = `/checkout?discount=${formData.get('properties[Numero de orden Woocommerce]')}`
      }
      else {
        window.location.href = '/checkout';

      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function validateCheckbox() {
  x = document.getElementsByClassName("tab");
  const checkboxes = x[currentTab].querySelectorAll('[type = "checkbox"]');
  checkboxes.forEach(field => {
    const container = field.closest('p')
    if (!field.checked) {
      if (!field.className.includes('invalid')) {
        field.classList.add('invalid')
        const msj = document.createElement("span");
        const node = document.createTextNode("Esta casilla es obligatoria");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
      }
    }
  })
}

function validateMasks() {
  var x, y, z, i, valid = true;
  x = document.getElementsByClassName("tab");
  const masks = x[currentTab].querySelectorAll(".mask");
  masks.forEach(mask => {
    let container = mask.closest('p')
    if (mask.value.includes("_") && mask.className.includes('required')) {
      valid = false;
      if (!mask.className.includes('invalid')) {
        const msj = document.createElement("span");
        const node = document.createTextNode("Este campo es obligatorio");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
        // add an "invalid" class to the field:
        mask.className += " invalid";
        // and set the current valid status to false:
      }
    }
  })
  return valid
}

function validateInvalid() {
  var x, y, z, i, valid = true;
  x = document.getElementsByClassName("tab");
  const invalids = x[currentTab].querySelectorAll(".invalid");
  if (invalids.length) valid = false
  return valid
}

function validateDates() {
  var valid = true;
  x = document.getElementsByClassName("tab");
  const dates = x[currentTab].querySelectorAll("input.fecha_nacimiento");
  dates.forEach(dateInput => {
    let container = dateInput.closest('p')
    const dateValue = new Date(dateInput.value);
    const minDate = new Date(1943, 8, 3);
    const maxDate = new Date(2005, 8, 3);
    if (dateValue >= minDate && dateValue <= maxDate) {
    } else {
      if (!dateInput.className.includes('invalid')) {
        dateInput.classList.add('invalid')
        const msj = document.createElement("span");
        const node = document.createTextNode("Fecha fuera del rango permitido");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
      }
    }
  })
}
var orders = []
function getLists() {
  const options = {
    method: 'GET',
    url: 'https://bikestation-digital.vercel.app/check-code',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  response = axios.request(options).then(function (response) {
    let { data } = response
    data.codes.forEach(v=>orders.push(v))
  })
}


function validateOrder() {
  var x, y, z, i, valid = true;
  x = document.getElementsByClassName("tab");
  const input = x[currentTab].querySelector(".preventa");
  if (!input) return valid
  let container = input.closest('p')
  if (!orders.includes(input.value)) {
    valid = false
    if (!input.className.includes('invalid')) {
      const msj = document.createElement("span");
      const node = document.createTextNode("El número de orden ingresado no es valido o ya fue ingresado");
      msj.classList.add("emsg");
      msj.appendChild(node);
      container.appendChild(msj)
      input.className += " invalid"
    }
  }
  return valid
}

function validateForm() {
  validateCheckbox()
  validateMasks()
  validateEmail()
  validateDates()
  validateOrder()
  // This function deals with validation of the form fields
  var x, y, z, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].querySelectorAll("select");
  // z = x[currentTab].getElementsByTagNme('select')
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    let container = y[i].closest('p')
    // If a field is empty...
    if (y[i].value == "" && y[i].required) {
      valid = false;
      if (!y[i].className.includes('invalid')) {
        const msj = document.createElement("span");
        const node = document.createTextNode("Este campo es obligatorio");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
      }
    }
  }
  for (let i = 0; i < z.length; i++) {
    let container = z[i].closest('p')
    const button = container.querySelector('.ui-selectmenu-button')
    if ($(z[i]).val() == null && z[i].required) {
      valid = false
      if (!z[i].className.includes('invalid')) {
        z[i].className += " invalid"
        button.className += " invalid"
        const msj = document.createElement("span");
        const node = document.createTextNode("Este campo es obligatorio");
        msj.classList.add("emsg");
        msj.appendChild(node);
        container.appendChild(msj)
      }
    }
  }
  const invalid = x[currentTab].querySelectorAll('.invalid')
  if (invalid.length) invalid[0].closest('p').scrollIntoView({ behavior: "smooth", block: 'start' })
  valid = validateInvalid()
  return valid; // return the valid status
}

function getLicencia(cedula, inputtemp) {
  x = document.getElementsByClassName("tab");
  radioNo = x[currentTab].querySelector("[type = 'radio'][name*='properties[Tiene licencia FECOCI anual?'][value='No']")
  radioSi = x[currentTab].querySelector("[type = 'radio'][name*='properties[Tiene licencia FECOCI anual?'][value='Si']")
  const licencia = document.querySelector(`input.num_licencia[idcontrol = ${inputtemp.id}]`)
  if (!licencia) return
  const licencia_error = licencia?.closest('p').querySelector('.emsg')
  const options = {
    method: 'POST',
    url: 'https://bikestation-digital.vercel.app/api/get-licencia',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { cedula }
  };
  axios.request(options).then(function (response) {
    const { data } = response.data
    if (!Object.keys(data).length) {
      radioNo.click()
      licencia.value = ''
      licencia.removeAttribute('readonly')
      getCategorias('open')
      return
    }
    if (data['UCI ID']) {
      licencia.value = data['UCI ID']
      licencia.classList.remove('invalid')
      licencia.setAttribute('readonly', '')
      licencia_error?.remove()
      radioSi.click()
    }
    else {
      radioNo.click()
    }
    if (data['Categoría'] && data['Categoría'] == "Elite") {
      getCategorias('elite')
    }
    else {
      getCategorias('open')
    }
  }).catch(function (error) {
    console.error(error);
  });
};