import React from 'react'
import styles from './LoginTemplate.module.scss';
import Button from '../../components/UI/Button/Button';

const LoginTemplate = ({userDetails={} ,handleChange,handleSubmit, userValidation,}) => {
    
    const {username,password,errors }=userDetails  


  return (
    <div>
     <div className={styles.logincontainer}>
      <form onSubmit={handleSubmit} className={styles.loginform}>
        <h2>Login</h2>
        <input
          type="text"
          name='username'
          placeholder="Username"
         value={username}
         onChange={(e) => handleChange(e.target.value, 'username')}
          className={styles.logininput}
        />
         <span className={styles.errors}>{errors?.email}</span>
        <input
          type="password"
          name='password'
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange(e.target.value, 'password')}
          className={styles.logininput}
        />
         <span className={styles.errors}>{errors?.password}</span>
        <Button type="submit" className="login-button"
        style={{ height: '50px', width: '100%' }}
        text="Submit" onclick={(e)=>handleSubmit}/>

     
      </form>
    </div>
    </div>
  )
}

export default LoginTemplate