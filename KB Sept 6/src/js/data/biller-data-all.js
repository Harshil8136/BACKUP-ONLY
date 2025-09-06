/**
 * BILLER DATA - MASTER LIST
 * ==================
 * This is the single source of truth for all biller data in the application.
 *
 * NEW DATA STRUCTURE:
 * -------------------
 * To support more complex billers, the data structure has been upgraded:
 *
 * 1. `contacts`: This is now an array of objects instead of simple ivr/csr strings.
 * Each object has a `type` (e.g., "IVR", "CSR"), a `label` (e.g., "Residential", "Business"),
 * and a `value` (the phone number). This allows for multiple, copyable numbers.
 *
 * 2. `customFields`: This is a new, optional array of objects for unique biller data.
 * Each object has a `label` and `value`. The UI can be updated to automatically
 * display these fields, making the system flexible without code rewrites.
 *
 * Adding a new biller is now as easy as copying the template at the bottom of
 * this file and filling in the details.
 */

const BILLERS = [
  // --- A-C ---
  {
    "id": 2,
    "live": true,
    "name": "Austin Energy",
    "tla": "AETX",
    "aliases": ["AETX Austin", "City of Austin"],
    "paymentTypes": ["Utility Bill", "Energy"],
    "kbLink": "https://kb.paymentus.io/display/CSR/AETX+-+Austin+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/aetx?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-375-4919" },
      { "type": "CSR", "label": "Customer Service", "value": "512-494-9400" }
    ],
    "notes": "Serves the city of Austin, Texas. Note the split payment fees.",
    "areas": ["512", "737"],
    "customFields": [
      { "label": "Account Format", "value": "10 digits" },
      { "label": "Biller Website", "value": "https://austinenergy.com/" }
    ]
  },
  {
    "id": 4,
    "live": true,
    "name": "Atlantic City Electric",
    "tla": "PHI",
    "aliases": ["ACE", "Atlantic Electric"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
    "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-209-5484" },
      { "type": "CSR", "label": "Customer Service", "value": "800-642-3780" }
    ],
    "notes": "Part of the PHI (Pepco Holdings, Inc.) group, serving southern New Jersey.",
    "areas": ["609", "856", "640"]
  },
  {
    "id": 7,
    "live": true,
    "name": "American Water",
    "tla": "AWK",
    "aliases": ["American Water Works Company"],
    "paymentTypes": ["Utilities", "Water"],
    "kbLink": "https://kb.paymentus.io/display/CSR/AWK+-+American+Water+Works+Company",
    "adLink": "https://adg-ipn1.paymentus.net/awk?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "855-748-6066" },
      { "type": "CSR", "label": "Customer Service", "value": "Varies by State - See Notes Below" }
    ],
    "notes": "National provider with state-specific contact numbers and rules.",
    "areas": [],
    "customFields": [
      { "label": "Processor", "value": "Braintree" },
      { "label": "Account Format", "value": "16-digit number (enter last 12 for inquiries)" },
      { "label": "Notifications", "value": "Real-time since Aug 2022" }
    ]
  },
  {
    "id": 3,
    "live": true,
    "name": "Baltimore Gas & Electric",
    "tla": "BGE",
    "aliases": ["BGE Maryland"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165610",
    "adLink": "https://adg-ipn1.paymentus.net/bge?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "1-833-254-9875" },
      { "type": "CSR", "label": "Customer Service", "value": "1-800-685-0123" }
    ],
    "notes": "",
    "areas": ["410", "443", "667"]
  },
  {
    "id": 23,
    "live": true,
    "name": "Constellation Energy Group",
    "tla": "CEB",
    "aliases": ["Constellation Energy"],
    "paymentTypes": ["Power", "Gas", "Utilities"],
    "kbLink": null,
    "adLink": null,
    "contacts": [
      { "type": "IVR", "label": "Power IVR", "value": "844-309-7088" },
      { "type": "IVR", "label": "Gas IVR", "value": "844-309-7092" },
      { "type": "CSR", "label": "Power (Residential)", "value": "888-900-7052" },
      { "type": "CSR", "label": "Power (Business)", "value": "866-917-8271" },
      { "type": "CSR", "label": "Gas CSR", "value": "877-677-4355" }
    ],
    "notes": "Parent company for Power and Gas utilities. Use interactive notes for service-specific details.",
    "areas": []
  },
  {
    "id": 1,
    "live": true,
    "name": "Consumers Energy",
    "tla": "CEMI",
    "aliases": ["Consumer", "CEMI Energy"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/display/CSR/CEMI+-+Consumers+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/CEMI?v2=true",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-329-9593" },
      { "type": "CSR", "label": "Customer Service", "value": "800-477-5050" }
    ],
    "notes": "Primary energy provider for Michigan.",
    "areas": ["231", "248", "517", "616", "810", "989"]   
    
  },
  {
    "id": 8,
    "live": true,
    "name": "Commonwealth Edison",
    "tla": "COMD",
    "aliases": ["ComEd"],
    "paymentTypes": ["Utilities", "Electricity"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=47000139",
    "adLink": "https://adg-ipn1.paymentus.net/COMD?v2=true",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "800-588-9477" },
      { "type": "CSR", "label": "Residential", "value": "800-334-7661" },
      { "type": "CSR", "label": "Business", "value": "877-426-6331" },
      { "type": "CSR", "label": "Spanish", "value": "800-955-8237" }
    ],
    "notes": "Major electricity provider in Illinois, part of Exelon.",
    "areas": ["312", "773", "847", "630", "815", "708"],
    "customFields": [
      { "label": "Account Format", "value": "10 digits" },
      { "label": "Biller Website", "value": "https://www.comed.com/" }
    ]
  },
  {
    "id": 12,
    "live": false,
    "name": "City of Palm Coast, FL",
    "tla": "PLMC",
    "aliases": ["Palm Coast Utility"],
    "paymentTypes": ["Utilities"],
    "kbLink": null,
    "adLink": "https://adg-ipn1.paymentus.net/plmc?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "386-986-2360" },
      { "type": "CSR", "label": "Customer Service", "value": "386-986-2360" }
    ],
    "notes": "KB Link not available for this non-live biller.",
    "areas": ["386"]
  },

  // --- D-Z ---
  {
    "id": 5,
    "live": true,
    "name": "Delmarva Power",
    "tla": "PHI",
    "aliases": ["Delmarva"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
    "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-209-5486" },
      { "type": "CSR", "label": "Customer Service", "value": "800-375-7117" }
    ],
    "notes": "Serves the Delmarva Peninsula. Part of the PHI group.",
    "areas": ["302", "410", "443"]
  },
  {
    "id": 22,
    "live": true,
    "name": "Dominion Resources Inc",
    "tla": "DNE",
    "aliases": ["Dominion", "Dominion Energy"],
    "paymentTypes": ["Utility Bill"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58163398",
    "adLink": "https://adg-ipn1.paymentus.net/dne?v2=true&lang=en",
    "contacts": [
      { "type": "CSR", "label": "VA & NC Main", "value": "866-366-4357" },
      { "type": "IVR", "label": "Gas (OH)", "value": "833-261-1469" },
      { "type": "IVR", "label": "MRP", "value": "833-268-4343" },
      { "type": "Internal", "label": "Transfer (OH)", "value": "866-313-8303" },
      { "type": "Internal", "label": "Transfer (WV)", "value": "866-313-8305" },
      { "type": "Internal", "label": "Transfer (VA/NC)", "value": "888-429-0011" }
    ],
    "notes": "Parent company for utilities in multiple states. Hope Gas in West Virginia is now TLA 'HOPE'. Use interactive notes for details.",
    "areas": []
  },
  {
    "id": 11,
    "live": false,
    "name": "Enbridge Solutions",
    "tla": "ESI",
    "aliases": ["Enbridge"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://paymentus.lightning.force.com/lightning/r/Opportunity/0067000000AINYwAAP/view",
    "adLink": null,
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-613-2531" },
      { "type": "CSR", "label": "Customer Service", "value": "877-362-7434" }
    ],
    "notes": "This biller is currently not live. Primarily serves Canada."
  },
  {
    "id": 10,
    "live": true,
    "name": "Galveston County, TX",
    "tla": "GALV",
    "aliases": ["Galveston Tax"],
    "paymentTypes": ["County Tax"],
    "kbLink": "https://kb.paymentus.io/display/CSR/GALV+-+Galveston+County%2C+TX",
    "adLink": "https://adg-ipn1.paymentus.net/galv?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-288-6894" },
      { "type": "CSR", "label": "Customer Service", "value": "877-766-2284" }
    ],
    "notes": "",
    "areas": ["409", "281"]
  },
  {
    "id": 13,
    "live": true,
    "name": "Knoxville Utilities Board",
    "tla": "KNOX",
    "aliases": ["KUB"],
    "paymentTypes": ["Utility Bill"],
    "kbLink": "https://kb.paymentus.io/display/CSR/KNOX+-+Knoxville+Utility+Board",
    "adLink": "https://adg-ipn1.paymentus.net/knox?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-819-0066" },
      { "type": "CSR", "label": "Customer Service", "value": "865-524-2911" }
    ],
    "notes": "Provides utility services to Knoxville, Tennessee.",
    "areas": ["865"]
  },
  {
    "id": 14,
    "live": true,
    "name": "MidAmerican Energy Company",
    "tla": "MEC",
    "aliases": [],
    "paymentTypes": ["Energy bill"],
    "kbLink": "https://kb.paymentus.io/display/CSR/MEC+-+MidAmerican+Energy+Company",
    "adLink": "https://adg-ipn1.paymentus.net/mec?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "877-253-0147" },
      { "type": "CSR", "label": "Residential", "value": "888-427-5632" },
      { "type": "CSR", "label": "Business", "value": "800-329-6261" }
    ],
    "notes": "Serves Iowa, Illinois, South Dakota, and Nebraska.",
    "areas": ["515", "319", "309", "605", "402"]
  },
  {
    "id": 15,
    "live": true,
    "name": "Nissan Motor Acceptance (Retail)",
    "tla": "NMAC",
    "aliases": ["Nissan Finance"],
    "paymentTypes": ["Retail Finance"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=83467694",
    "adLink": "https://adg-ipn1.paymentus.net/nmac?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-648-0173" },
      { "type": "CSR", "label": "Customer Service", "value": "800-456-6622" }
    ],
    "notes": "Handles RETAIL and RETAILNOFEE payments for Nissan."
  },
  {
    "id": 16,
    "live": true,
    "name": "Nissan Motor Acceptance (Lease)",
    "tla": "NSAN",
    "aliases": ["Nissan Leasing"],
    "paymentTypes": ["Lease Payments"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=83467694",
    "adLink": "https://adg-ipn1.paymentus.net/nsan?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-648-0173" },
      { "type": "IVR", "label": "AAIVR", "value": "866-990-0766" },
      { "type": "CSR", "label": "Customer Service", "value": "800-456-6622" }
    ],
    "notes": "Handles LEASE payments for Nissan."
  },
  {
    "id": 17,
    "live": true,
    "name": "NiSource (Columbia Gas / NIPSCO)",
    "tla": "NSRC",
    "aliases": ["NiSource", "Columbia Gas", "Nipsco"],
    "paymentTypes": ["Utility Bill"],
    "kbLink": "https://kb.paymentus.io/display/CSR/NSRC+-+NiSource",
    "adLink": "https://adg-ipn1.paymentus.net/nsrc?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "See Notes for State-Specific Numbers" }
    ],
    "notes": "Parent company for utilities in multiple states. Use the interactive notes for details."
  },
  {
    "id": 9,
    "live": true,
    "name": "PacifiCorp (Pacific Power / RMP)",
    "tla": "PAC",
    "aliases": ["Rocky Mountain Power", "Pacific Power"],
    "paymentTypes": ["Electricity"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PAC+-+PacifiCorp",
    "adLink": "https://adg-ipn1.paymentus.net/pac?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "Pacific Power", "value": "833-277-8689" },
      { "type": "IVR", "label": "Rocky Mtn Power", "value": "833-277-8690" },
      { "type": "CSR", "label": "English", "value": "888-221-7070" },
      { "type": "CSR", "label": "Spanish", "value": "888-225-2611" }
    ],
    "notes": "Operates as Pacific Power and Rocky Mountain Power.",
    "areas": ["503", "541", "360", "209", "801", "435", "307", "208"]
  },
  {
    "id": 6,
    "live": true,
    "name": "Pepco",
    "tla": "PHI",
    "aliases": ["Potomac Electric Power Company"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
    "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-209-8415" },
      { "type": "CSR", "label": "Customer Service", "value": "202-833-7500" }
    ],
    "notes": "Serves the Washington D.C. metro area. Part of the PHI group.",
    "areas": ["202", "301", "240"]
  },
  {
    "id": 18,
    "live": true,
    "name": "Puget Sound Energy",
    "tla": "PSE",
    "aliases": [],
    "paymentTypes": ["Utilities", "Energy"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PSE+-+Puget+Sound+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/pse?v2=true&lang=en",
    "contacts": [
      { "type": "CSR", "label": "Customer Service", "value": "1-888-225-5773" }
    ],
    "notes": "Serves the Puget Sound region of Washington state. Agents must transfer to CSR, not IVR.",
    "areas": ["206", "425", "253", "360"],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.pse.com/contactpse" },
      { "label": "ROTP Link", "value": "https://ipn2.paymentus.com/rotp/pse/itok=" }
    ]
  },
  {
    "id": 19,
    "live": true,
    "name": "Salt River Project",
    "tla": "SRP",
    "aliases": [],
    "paymentTypes": ["Power & Water"],
    "kbLink": "https://kb.paymentus.io/display/CSR/SRP+-+Salt+River+Project",
    "adLink": "https://adg-ipn1.paymentus.net/srp?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "855-671-9276" },
      { "type": "CSR", "label": "Power (English)", "value": "602-236-8840" },
      { "type": "CSR", "label": "Power (Spanish)", "value": "602-236-8845" }
    ],
    "notes": "Provides power and water to the Phoenix, Arizona metro area.",
    "areas": ["602", "480", "623"]
  },
  {
    "id": 20,
    "live": true,
    "name": "San Diego Gas and Electric",
    "tla": "SDG",
    "aliases": ["SDG&E"],
    "paymentTypes": ["Energy Bill"],
    "kbLink": "https://kb.paymentus.io/display/CSR/SDG+-+San+Diego+Gas+and+Electric",
    "adLink": "https://adg-ipn1.paymentus.net/sdg?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-894-1030" },
      { "type": "CSR", "label": "Customer Service", "value": "800-411-7343" }
    ],
    "notes": "Serves San Diego and southern Orange counties in California.",
    "areas": ["619", "858", "760", "949"]
  },
  {
    "id": 21,
    "live": true,
    "name": "Tarrant County, TX",
    "tla": "TGXH",
    "aliases": ["Tarrant Tax"],
    "paymentTypes": ["County Tax", "Property Tax"],
    "kbLink": "https://kb.paymentus.io/display/CSR/TGXH+-+Tarrant+County%2C+TX",
    "adLink": "https://adg-ipn1.paymentus.net/tgxh?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "888-826-5029" },
      { "type": "CSR", "label": "Customer Service", "value": "817-884-1111" }
    ],
    "notes": "Property tax collection for Tarrant County, Texas.",
    "areas": ["817", "682"],
    "customFields": [
        { "label": "Account Format", "value": "Varies" },
        { "label": "Tax Lookup", "value": "https://taxonline.tarrantcounty.com/TaxPayer/search" }
    ]
  },
  {
    "id": 24,
    "live": true,
    "name": "Duquesne Light Co.",
    "tla": "DUQL",
    "aliases": ["Duquesne Light Company"],
    "paymentTypes": ["Utilities", "Electricity"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=143477303",
    "adLink": "https://adg-ipn1.paymentus.net/duql?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "844-598-9868" },
      { 
        "type": "CSR", 
        "label": "Residential CSR", 
        "value": "888-393-7100",
        "note": "Do not transfer. Provide this number to the customer."
      },
      { 
        "type": "CSR", 
        "label": "Business CSR", 
        "value": "412-393-7300",
        "note": "Do not transfer. Provide this number to the customer."
      }
    ],
    "notes": "Electric utility company serving southwestern Pennsylvania.",
    "areas": []
  },
  {
    "id": 25,
    "live": true,
    "name": "Dallas County Tax Office",
    "tla": "DCN3",
    "aliases": ["Dallas County Property Tax"],
    "paymentTypes": ["County Tax", "Property Tax"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=184237309",
    "adLink": "https://adg-ipn1.paymentus.net/dcn3?v2=true&lang=en",
    "contacts": [
      { "type": "CSR", "label": "Tax Office", "value": "214-653-7811" },
      { "type": "CSR", "label": "General Info", "value": "214-653-7011" }
    ],
    "notes": "Handles Property Tax payments for Dallas County.",
    "areas": ["214", "469", "972"],
    "customFields": [
        { "label": "Account Format", "value": "17 characters (case-sensitive)" },
        { "label": "Tax Lookup", "value": "https://www.dallasact.com/act_webdev/dallas/index.jsp" }
    ]
  },
  {
    "id": 26,
    "live": false,
    "name": "Dallas County Treasury",
    "tla": "DCTO",
    "aliases": ["Dallas County Courts", "Dallas Police"],
    "paymentTypes": ["Treasury", "Court Fees", "Police Fees"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=184237309",
    "adLink": "https://adg-ipn1.paymentus.net/dcto?v2=true&lang=en",
    "contacts": [
      { "type": "CSR", "label": "Treasury Office", "value": "214-653-7321" }
    ],
    "notes": "Handles Treasury payments (courts, police, etc.). We DO NOT take live payments for this biller.",
    "areas": ["214", "469", "972"],
    "customFields": [
      { "label": "Account Format", "value": "Not defined" }
    ]
  },
  {
    "id": 27, // Use a new, unique ID
    "live": true,
    "name": "Hydro One (Electricity)",
    "tla": "HYD1",
    "aliases": ["Hydro One Networks"],
    "paymentTypes": ["Electricity", "Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=5768167",
    "adLink": "https://adg-ipn1.paymentus.net/hyd1?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "877-507-5093" },
      { "type": "CSR", "label": "Customer Service", "value": "888-664-9376" }
    ],
    "notes": "Handles electricity payments for Hydro One.",
    "areas": ["416", "613", "905", "705", "519", "289", "343", "647"],
    "customFields": [
      { "label": "Account Format", "value": "12 digits, starting with '200...'" }
    ]
  },
  {
    "id": 28, // Use a new, unique ID
    "live": true,
    "name": "Hydro One (Non-Electricity)",
    "tla": "HYDO",
    "aliases": ["Hydro One Invoices", "Hydro One Work Orders"],
    "paymentTypes": ["Invoice", "Work Order", "Real Estate"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=5768167",
    "adLink": "https://adg-ipn1.paymentus.net/hyd1?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-764-1083" },
      { "type": "CSR", "label": "Customer Service", "value": "905-944-3300" }
    ],
    "notes": "Handles all non-electricity payments (invoices, work orders, etc.).",
    "areas": ["416", "613", "905", "705", "519", "289", "343", "647"],
    "customFields": [
      { "label": "Account Format", "value": "Varies by payment type. See notes." }
    ]
  }
];


/*
// --- TEMPLATE FOR NEW BILLERS ---
// Copy and paste this object into the BILLERS array above to add a new biller.
{
  "id": 99, // IMPORTANT: Use a new, unique ID number!
  "live": true, // Is the biller currently live? (true/false)
  "name": "", // Full name of the biller
  "tla": "", // Three-Letter Acronym (or unique code)
  "aliases": [], // Other common names, separated by commas inside quotes
  "paymentTypes": [], // e.g., ["Utilities", "Taxes"]
  "kbLink": "", // Full URL to the Knowledge Base page
  "adLink": "", // Full URL to the Agent Dashboard
  "contacts": [
    // Add as many contact objects as needed.
    // Use "type": "IVR" for automated phone systems, "CSR" for customer service.
    // "label" is what the user will see on the button.
    { "type": "IVR", "label": "Main IVR", "value": "800-555-1234" },
    { "type": "CSR", "label": "Residential", "value": "800-555-5678" }
  ],
  "notes": "", // Brief, one-line note about the biller.
  "areas": [], // Associated area codes, e.g., ["212", "718"]
  "customFields": [
    // Optional: Add any unique data here that doesn't fit other categories.
    // The UI will be updated to display these automatically.
    { "label": "Special Permit ID", "value": "XYZ-12345" }
  ]
},
  {
    "id": 24,
    "live": true,
    "name": "Duquesne Light Co.",
    "tla": "DUQL",
    "aliases": ["Duquesne Light Company"],
    "paymentTypes": ["Utilities", "Electricity"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=143477303",
    "adLink": "https://adg-ipn1.paymentus.net/duql?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "844-598-9868" },
      { 
        "type": "CSR", 
        "label": "Residential CSR", 
        "value": "888-393-7100",
        "note": "Do not transfer. Provide this number to the customer."
      },
      { 
        "type": "CSR", 
        "label": "Business CSR", 
        "value": "412-393-7300",
        "note": "Do not transfer. Provide this number to the customer."
      }
    ],
    "notes": "Electric utility company serving southwestern Pennsylvania.",
    "areas": []
  }

*/