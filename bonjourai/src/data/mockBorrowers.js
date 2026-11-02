export const borrowers = [
  {
    id: "BRW-10421", name: "Ramesh Kumar", language: "Hindi", contact: "+91 98XXXX 4321", loanType: "Personal loan",
    emi: 4820, dueDate: "2026-11-05", lastCallStatus: "Completed", optedOut: false, humanFollowUp: false,
    reminders: [
      { date: "2026-10-31", outcome: "Payment date noted", callId: "CALL-88350" },
      { date: "2026-11-02", outcome: "Payment date noted", callId: "CALL-88412" },
    ],
  },
  {
    id: "BRW-10446", name: "Anita Verma", language: "Hindi", contact: "+91 97XXXX 1180", loanType: "Two-wheeler loan",
    emi: 3640, dueDate: "2026-11-04", lastCallStatus: "Completed", optedOut: false, humanFollowUp: false,
    reminders: [
      { date: "2026-10-27", outcome: "No answer", callId: "CALL-88265" },
      { date: "2026-11-02", outcome: "Payment date noted", callId: "CALL-88396" },
    ],
  },
  {
    id: "BRW-10388", name: "Lakshmi Iyer", language: "Tamil", contact: "+91 99XXXX 7706", loanType: "Gold loan",
    emi: 5210, dueDate: "2026-11-08", lastCallStatus: "Callback Requested", optedOut: false, humanFollowUp: false,
    reminders: [
      { date: "2026-10-29", outcome: "No answer", callId: "CALL-88311" },
      { date: "2026-11-02", outcome: "Callback scheduled", callId: "CALL-88390" },
    ],
  },
  {
    id: "BRW-10402", name: "Suresh Reddy", language: "Telugu", contact: "+91 90XXXX 2254", loanType: "Personal loan",
    emi: 3150, dueDate: "2026-11-07", lastCallStatus: "Completed", optedOut: false, humanFollowUp: true,
    reminders: [
      { date: "2026-10-29", outcome: "Human follow-up", callId: "CALL-88301" },
      { date: "2026-10-30", outcome: "Wrong number", callId: "CALL-88322" },
      { date: "2026-11-02", outcome: "Human follow-up", callId: "CALL-88415" },
    ],
  },
  {
    id: "BRW-10377", name: "Prakash Patil", language: "Marathi", contact: "+91 88XXXX 9032", loanType: "Business loan",
    emi: 2700, dueDate: "2026-11-12", lastCallStatus: "Completed", optedOut: true, humanFollowUp: false,
    reminders: [
      { date: "2026-10-28", outcome: "No answer", callId: "CALL-88298" },
      { date: "2026-11-02", outcome: "Opted out", callId: "CALL-88419" },
    ],
  },
  {
    id: "BRW-10433", name: "Daniel Mathew", language: "English", contact: "+91 96XXXX 6615", loanType: "Personal loan",
    emi: 6890, dueDate: "2026-11-03", lastCallStatus: "Not Answered", optedOut: false, humanFollowUp: false,
    reminders: [{ date: "2026-11-02", outcome: "No answer", callId: "CALL-88420" }],
  },
  {
    id: "BRW-10409", name: "Manjunath Gowda", language: "Kannada", contact: "+91 94XXXX 3387", loanType: "Two-wheeler loan",
    emi: 4415, dueDate: "2026-11-06", lastCallStatus: "Failed", optedOut: false, humanFollowUp: false,
    reminders: [{ date: "2026-11-02", outcome: "Connection failed", callId: "CALL-88424" }],
  },
  {
    id: "BRW-10415", name: "Subhash Das", language: "Bengali", contact: "+91 98XXXX 0457", loanType: "Consumer durable loan",
    emi: 2980, dueDate: "2026-11-10", lastCallStatus: "Not Called", optedOut: false, humanFollowUp: false,
    reminders: [],
  },
  {
    id: "BRW-10457", name: "Sanjay Gupta", language: "Hindi", contact: "+91 93XXXX 5581", loanType: "Personal loan",
    emi: 7300, dueDate: "2026-11-02", lastCallStatus: "Not Answered", optedOut: false, humanFollowUp: false,
    reminders: [{ date: "2026-11-02", outcome: "No answer", callId: "CALL-88427" }],
  },
  {
    id: "BRW-10363", name: "Murugan Pillai", language: "Tamil", contact: "+91 81XXXX 2290", loanType: "Gold loan",
    emi: 3920, dueDate: "2026-11-09", lastCallStatus: "Not Answered", optedOut: false, humanFollowUp: false,
    reminders: [],
  },
  {
    id: "BRW-10470", name: "Sneha Deshmukh", language: "Marathi", contact: "+91 77XXXX 8843", loanType: "Business loan",
    emi: 1850, dueDate: "2026-11-14", lastCallStatus: "Not Called", optedOut: false, humanFollowUp: false,
    reminders: [],
  },
  {
    id: "BRW-10482", name: "Padmavathi Rao", language: "Telugu", contact: "+91 95XXXX 4019", loanType: "Personal loan",
    emi: 2475, dueDate: "2026-11-11", lastCallStatus: "Failed", optedOut: false, humanFollowUp: false,
    reminders: [{ date: "2026-10-27", outcome: "Connection failed", callId: "CALL-88276" }],
  },
  {
    id: "BRW-10491", name: "Pooja Sharma", language: "Hindi", contact: "+91 98XXXX 6670", loanType: "Consumer durable loan",
    emi: 5530, dueDate: "2026-11-06", lastCallStatus: "Completed", optedOut: false, humanFollowUp: false,
    reminders: [{ date: "2026-11-01", outcome: "Payment date noted", callId: "CALL-88441" }],
  },
  {
    id: "BRW-10355", name: "Ritu Kapoor", language: "English", contact: "+91 99XXXX 1342", loanType: "Personal loan",
    emi: 8120, dueDate: "2026-11-15", lastCallStatus: "Not Called", optedOut: false, humanFollowUp: false,
    reminders: [],
  },
  {
    id: "BRW-10499", name: "Kavitha Raman", language: "Tamil", contact: "+91 90XXXX 7128", loanType: "Gold loan",
    emi: 2290, dueDate: "2026-11-13", lastCallStatus: "Not Called", optedOut: false, humanFollowUp: false,
    reminders: [],
  },
  {
    id: "BRW-10366", name: "Mohd. Irfan", language: "Hindi", contact: "+91 91XXXX 3309", loanType: "Two-wheeler loan",
    emi: 4010, dueDate: "2026-11-03", lastCallStatus: "Not Answered", optedOut: false, humanFollowUp: false,
    reminders: [],
  },
];
