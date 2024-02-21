const rules = {
  REPEAT: (value, rname, { data: formData }) => {
    if (value === formData[rname]) {
      return {
        result: true,
        errMsg: ''
      };
    } else {
      return {
        result: false,
        errMsg: '%s不一致'
      };
    }
  }
};

export default rules;
