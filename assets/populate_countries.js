// PopulateCountries()

// function PopulateCountries() {
//   const preferredCountryCodes = ['CR', 'US', 'CA', 'GB', 'ES', 'NI', 'GT', 'HN'];
//   fetch('https://restcountries.com/v3.1/all')
//     .then(response => response.json())
//     .then(countries => {
//       const nacionalidadSelects = document.querySelectorAll('.nacionalidad')
//         nacionalidadSelects.forEach(select=>{
//         const preferredGroup = document.createElement('optgroup');
//         preferredGroup.label = 'Países preferidos';
//         select.appendChild(preferredGroup);
//         preferredCountryCodes.forEach(countryCode => {
//           const preferredCountry = countries.find(country => country.cca2 === countryCode);
//           if (preferredCountry) {
//             const option = document.createElement('option');
//             option.value = preferredCountry.cca2;
//             option.textContent = preferredCountry.translations.spa.common || preferredCountry.name.common;
//             option.setAttribute('data-style', `background-image: url('${preferredCountry.flags.png}')`)
//             preferredGroup.appendChild(option);
//           }
//         });
//         // Create a separator option between the preferred and non-preferred countries
//         const separator = document.createElement('option');
//         separator.disabled = true;
//         separator.textContent = '---------------------------';
//         select.appendChild(separator);
        
//         // Create a group for the rest of the countries
//         const restGroup = document.createElement('optgroup');
//         restGroup.label = 'Todos los países';
//         select.appendChild(restGroup);
        
//         // Create and append options for the rest of the countries
//         countries.forEach(country => {
//           if (!preferredCountryCodes.includes(country.cca2)) {
//             const option = document.createElement('option');
//             option.value = country.cca2;
//             option.textContent = country.translations.spa.common || country.name.common;
//             option.setAttribute('data-style', `background-image: url('${country.flags.png}')`)
//             restGroup.appendChild(option);
//           }
//         });})
//       const telefonoSelects = document.querySelectorAll('select.codigo_telefono');
//       telefonoSelects.forEach(select => {
//         const preferredGroup = document.createElement('optgroup');
//         preferredGroup.label = 'Países preferidos';
//         select.appendChild(preferredGroup);        
//         preferredCountryCodes.forEach(countryCode => {
//           const preferredCountry = countries.find(country => country.cca2 === countryCode);
//           if (preferredCountry) {
//             const option = document.createElement('option');
//             if (countryCode == 'CR') option.setAttribute('selected','')
//             option.textContent = preferredCountry.translations.spa.common || preferredCountry.name.common;
//             option.setAttribute('data-style', `background-image: url('${preferredCountry.flags.png}')`)
//             const code = document.createElement('span');
//             code.textContent = preferredCountry.idd.root;
//             if(preferredCountry.idd.suffixes.length == 1)code.textContent = `${preferredCountry.idd.root}${preferredCountry.idd.suffixes}`;
//             option.value = JSON.stringify({code:code.textContent,countrycode:preferredCountry.cca2, image:preferredCountry.flags.png});
//             preferredGroup.appendChild(option);
//           }
//         });        
//         // Create a separator option between the preferred and non-preferred countries
//         const separator = document.createElement('option');
//         separator.disabled = true;
//         separator.textContent = '---------------------------';
//         select.appendChild(separator);

//         // Create a group for the rest of the countries
//         const restGroup = document.createElement('optgroup');
//         restGroup.label = 'Todos los países';
//         select.appendChild(restGroup);
//         // Create and append options for the rest of the countries
//         countries.forEach(country => {
//           if (!preferredCountryCodes.includes(country.cca2)) {
//           const option = document.createElement('option');
//           option.textContent = country.translations.spa.common || country.name.common;
//           option.setAttribute('data-style', `background-image: url('${country.flags.png}')`)
//           const code = document.createElement('span');
//           code.textContent = country.idd.root; 
//           if(country.idd.suffixes && country.idd.suffixes.length == 1)code.textContent = `${country.idd.root}${country.idd.suffixes}`;
//           option.value = JSON.stringify({code:code.textContent,countrycode:country.cca2, image:country.flags.png});
//           restGroup.appendChild(option);
//         }
//         });
//       });
//     })
//     .catch(error => {
//       console.error('Error al obtener datos de los países:', error);
//     });
// }