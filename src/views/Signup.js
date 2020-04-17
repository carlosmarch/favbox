import React, { Component } from "react";

class SignUp extends Component {
  render() {

    return (
      <div className="global signup">
        <div className="container container-s">


          <h4 className="centered mb-s">SignUp</h4>
          <div className="content">
            <form action="/user/auth" method="POST">
              <div>
                <label>Name</label>
                <input
                  name="username"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  name="email"
                  component="input"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  name="password"
                  component="input"
                  type="text"
                  placeholder=""
                />
              </div>

              <button class="button signupbtn" type="submit">Siguiente</button>


            </form>
          </div>


        </div>
      </div>
    );
  }
}

export default SignUp;
