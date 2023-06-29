const holidays = {
  January: [{ name: "Republic Day", date: "2023-01-26" }],
  February: [{ name: "No Holiday" }],
  March: [
    { name: "Holi", date: "2023-03-08" },
    { name: "Ugadi", date: "2023-03-22" },
  ],
  April: [{ name: "Good friday", date: "2023-04-07" }],
  May: [{ name: "No Holiday" }],
  June: [{ name: "No Holiday" }],

  July: [{ name: "No Holiday" }],
  August: [
    { name: "Independence Day", date: "2023-08-15" },
    { name: "Raksha Bandhan", date: "2023-08-30" },
  ],
  September: [{ name: "Ganesh Chathurthi", date: "2023-09-19" }],
  October: [
    { name: "Gandhi Jayanthi", date: "2023-10-02" },
    { name: "Vijaya Dashami (Duserha)", date: "2023-10-24" },
  ],
  November: [{ name: "Kannada Rajyothsava", date: "2023-11-01" },
  { name: "Deepavali", date: "2023-11-13" },
  { name: "Govardhan Puja/Bhai Doo", date: "2023-11-14" }
],
December: [{name: "Christmas", date: "2023/12/25"}],

};

exports.getCalender = (req, res) => {
  res.json(holidays);
};
