const filters = [
    { keyword: 'Promotion', label: 'Promotions' },
    { keyword: 'Invoice', label: 'Work' },
  ];
  
  function categorizeEmail(subject) {
    for (const filter of filters) {
      if (subject.includes(filter.keyword)) {
        return filter.label;
      }
    }
    return 'Uncategorized';
  }
  
  module.exports = { categorizeEmail };
  