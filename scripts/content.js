// Erlend Handeland, Stavanger kommune
//
// Denne nettleserutvidelsen ser på eHandels-sidene i Visma,
// finner Famac sitt aktivitetsnummer, og lager en knapp
// for å ta det videre til Famac.

// https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/
// https://developer.chrome.com/docs/extensions/mv3/getstarted/
// https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/

// finn feltet "Navn på Handlevogn"
const navnPaHandlevognFelt = document.querySelector("div.row.form-group.no-bottom-margin-xs div.col-xs-8");
// const famacAdresse = 'https://www.famacweb.no/dashboard/details/'
const famacAdresse = 'https://www.famacweb.no/activity/details/'

if (navnPaHandlevognFelt) { // dette kjøres kun hvis vi har åpen en side med dette feltet.
  const navnPaHandlevogn = navnPaHandlevognFelt.innerText
  // sjekk om navn på handlevogn inneholder FAMAC og (IMPORT ORDER)
  if (navnPaHandlevogn.includes('FAMAC') && navnPaHandlevogn.includes('(IMPORT ORDER)')) {
    // hent ut aktivitetsnummer
    const aktivitetsnummer = navnPaHandlevogn.substr(navnPaHandlevogn.indexOf('.') + 1, 7)

    // console.log(aktivitetsnummer) // for debugging

    // lag en div som knappen skal stå inni
    const divNyKnapp = document.createElement('div')
    divNyKnapp.setAttribute('id', 'Famac-button-div')

    // lag knappen
    const nyKnapp = document.createElement('a')
    nyKnapp.setAttribute('class', 'btn btn-primary btn-block')
    nyKnapp.setAttribute('id', 'Famac-button')
    nyKnapp.setAttribute('type', 'button')
    nyKnapp.setAttribute('style', 'background:#009fe3;border-color:#008fcc') // endrer farge til Famac-blå
    nyKnapp.setAttribute('href', famacAdresse + aktivitetsnummer)
    nyKnapp.setAttribute('target', '_blank')

    // lag teksten som skal stå på knappen
    const nyKnappTekst = document.createTextNode("Vis i Famac")

    // sett teksten på knappen, og knappen i div-en
    nyKnapp.appendChild(nyKnappTekst)
    divNyKnapp.appendChild(nyKnapp)

    // console.log(b_div) // for debugging

    // finn plasseringen der knappen skal stå,
    // over knappen "Fortsett til kontering."
    const knappKontering = document.querySelector("a.btn.btn-primary.btn-block")
    const divKnappKontering = knappKontering.parentNode
    const divKnappegruppe = divKnappKontering.parentNode

    // sett knappen inn i nettsiden.
    divKnappegruppe.insertBefore(divNyKnapp, divKnappKontering)
  }
}