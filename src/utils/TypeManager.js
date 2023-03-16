const TEST_TYPE = [
  {
    id: 1,
    value: 'TEST1',
    title: '테스트1',
  },
  {
    id: 2,
    value: 'TEST2',
    title: '테스트2',
  },
];

const TypeManager = {
  getTestList: () => {
    return TEST_TYPE;
  },

  getTest: (val) => {
    const [temp] = TEST_TYPE.filter((item) => {
      const { value } = item;
      return value === val;
    });
    return temp;
  },
};

export default TypeManager;
