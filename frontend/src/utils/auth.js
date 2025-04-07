export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  
  export const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload(); 
    }, 50); 
  };
  