class ConstantsData {
    token = localStorage.getItem('panelToken');
    remoteServer = '/api/';
  
    alertTimeout = 5000;
    alertPosition = "top-right";
    alerTypes = {
      'info': 'info',
      'success': 'success',
      'warning': 'warning',
      'danger': 'danger'
    };
    
    defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
    
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  
    setToken(token) {
      localStorage.setItem('panelToken', token);
      this.token = token;
      this.headers['Authorization'] = `Bearer ${this.token}`;
    }
  
    deleteToken() {
      localStorage.removeItem('panelToken');
      this.token = null;
      this.headers = this.defaultHeaders;
    }
  };
  
  let Constants = new ConstantsData();
  
  export default Constants;