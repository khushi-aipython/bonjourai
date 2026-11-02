export const callScripts = [
  {
    id: "promise-to-pay",
    label: "Promise to pay (Hindi to English)",
    borrowerId: "BRW-10421",
    steps: [
      { speaker: "ai", language: "Hindi", text: "Namaste, main BonjourAI hoon, ek automated AI assistant. Main aapki EMI reminder ke liye call kar raha hoon. Kya main Ramesh ji se baat kar raha hoon?", state: "Greeting and AI disclosure", intent: "Identity verification", action: "Disclosed AI assistant", event: { tone: "info", text: "AI disclosure delivered" } },
      { speaker: "borrower", language: "Hindi", text: "Haan, main Ramesh bol raha hoon. Boliye.", state: "Identity confirmed", intent: "EMI reminder", action: "Shared EMI details", event: { tone: "success", text: "Borrower identity confirmed" } },
      { speaker: "ai", language: "Hindi", text: "Aapki EMI Rs 4,820 ki due date 5 November hai. Kya aap is date tak payment kar payenge?", action: "Asked for payment date" },
      { speaker: "borrower", language: "Hindi", text: "Thoda mushkil hai. 10 tareekh tak ho jayega.", intent: "Payment date requested", action: "Captured requested date", event: { tone: "info", text: "Requested payment date: 10 November" } },
      { speaker: "borrower", language: "English", text: "Can you please continue in English? It is easier for me.", intent: "Language preference", action: "Switched conversation to English", event: { tone: "warning", text: "Language changed from Hindi to English" } },
      { speaker: "ai", language: "English", text: "Of course. Your EMI of Rs 4,820 is due on 5 November. I have noted a promise to pay on 10 November. Is that correct?", state: "Promise confirmation", intent: "Promise to pay", action: "Confirmed promise date" },
      { speaker: "borrower", language: "English", text: "Yes, that is correct.", action: "Promise recorded", event: { tone: "success", text: "Promise to pay recorded for 10 November" } },
      { speaker: "ai", language: "English", text: "Thank you, Ramesh ji. A confirmation message will be sent to you. Have a good day.", state: "Call closing", action: "Closed call", event: { tone: "success", text: "Call completed" } },
    ],
  },
  {
    id: "callback-request",
    label: "Callback request (Tamil)",
    borrowerId: "BRW-10388",
    steps: [
      { speaker: "ai", language: "Tamil", text: "Vanakkam, naan BonjourAI. Naan oru automated AI assistant. Lakshmi avargal pesuvathu sari thaane?", state: "Greeting and AI disclosure", intent: "Identity verification", action: "Disclosed AI assistant", event: { tone: "info", text: "AI disclosure delivered" } },
      { speaker: "borrower", language: "Tamil", text: "Aamaa, sollunga. Naan konjam busy-aa irukken.", state: "Identity confirmed", intent: "Borrower busy", action: "Offered callback option", event: { tone: "success", text: "Borrower identity confirmed" } },
      { speaker: "ai", language: "Tamil", text: "Purindhu kollagiren. Evvalavu neram kazhithu call pannalam?", state: "Callback scheduling", intent: "Callback request", action: "Asked preferred callback time" },
      { speaker: "borrower", language: "Tamil", text: "Evening 6 manikku call pannunga.", action: "Captured callback time: 6 PM", event: { tone: "warning", text: "Callback requested for 18:00" } },
      { speaker: "ai", language: "Tamil", text: "Sari. 6 PM ku call pannuvom. EMI due date 8 November. Nanri, vanakkam.", state: "Call closing", action: "Callback scheduled", event: { tone: "success", text: "Call completed" } },
    ],
  },
  {
    id: "human-escalation",
    label: "Dispute and escalation (Telugu to English)",
    borrowerId: "BRW-10402",
    steps: [
      { speaker: "ai", language: "Telugu", text: "Namaskaram, nenu BonjourAI ni. Nenu oka automated AI assistant ni. Meeru Suresh garu aa?", state: "Greeting and AI disclosure", intent: "Identity verification", action: "Disclosed AI assistant", event: { tone: "info", text: "AI disclosure delivered" } },
      { speaker: "borrower", language: "Telugu", text: "Avunu, nene. EMI gurinchi cheppandi.", state: "Identity confirmed", intent: "EMI inquiry", action: "Shared EMI details", event: { tone: "success", text: "Borrower identity confirmed" } },
      { speaker: "ai", language: "Telugu", text: "Mee EMI Rs 3,150 ki 7 November due undi. Payment ela cheyali anukuntunnaru?", state: "EMI reminder", intent: "Payment method", action: "Asked about payment plan" },
      { speaker: "borrower", language: "English", text: "I think there was a wrong deduction last month. I want to talk to a person about it.", state: "Dispute raised", intent: "Dispute", action: "Detected dispute request", escalation: "Requested", event: { tone: "danger", text: "Dispute detected. Human follow-up requested" } },
      { speaker: "ai", language: "English", text: "I understand. I am an automated AI assistant, so I will pass this to a member of our team. They will contact you shortly.", state: "Escalation handoff", action: "Created human follow-up ticket", escalation: "Assigned", event: { tone: "warning", text: "Human follow-up ticket created" } },
      { speaker: "borrower", language: "English", text: "Okay, thank you.", state: "Call closing", action: "Call ended by borrower", event: { tone: "success", text: "Call completed" } },
    ],
  },
  {
    id: "opt-out",
    label: "Opt-out request (Marathi)",
    borrowerId: "BRW-10377",
    steps: [
      { speaker: "ai", language: "Marathi", text: "Namaskar, mi BonjourAI. Mi ek automated AI assistant aahe. Tumhi Prakash bolat aahat ka?", state: "Greeting and AI disclosure", intent: "Identity verification", action: "Disclosed AI assistant", event: { tone: "info", text: "AI disclosure delivered" } },
      { speaker: "borrower", language: "Marathi", text: "Ho, bola.", state: "Identity confirmed", intent: "EMI reminder", action: "Shared EMI details", event: { tone: "success", text: "Borrower identity confirmed" } },
      { speaker: "ai", language: "Marathi", text: "Tumcha loan EMI Rs 2,700 chya hafta 12 November la due aahe.", state: "EMI reminder", intent: "Payment reminder", action: "Shared due date and amount" },
      { speaker: "borrower", language: "Marathi", text: "Mala ya call cha tras hotoy. Please mala parat call karu naka.", state: "Opt-out requested", intent: "Opt-out request", action: "Recorded opt-out", optedOut: true, event: { tone: "danger", text: "Borrower requested to stop reminder calls" } },
      { speaker: "ai", language: "Marathi", text: "Samajle. Tumhala parat call kela jail nahi. Dhanyavad, shubh diwas.", state: "Call closing", action: "Opt-out confirmed", event: { tone: "success", text: "Call completed" } },
    ],
  },
];
