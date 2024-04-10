import React from "react";
import { Link } from "react-router-dom";

// const About = () => {
//   return <div>AboutUs</div>;
// };

// export default About;

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }

  async componentDidMount() {
    let data = await fetch("https://api.github.com/users/Kanaka96");
    let json = await data.json();
    this.setState({ userInfo: json });
  }

  render() {
    let { userInfo } = this.state;
    return (
      <>
        <div>Name: {userInfo?.login}</div>
        <div>
          githubURL: <Link to={userInfo?.html_url}>{userInfo?.html_url}</Link>
        </div>
        <div>
          Repos: <Link>{userInfo?.public_repos}</Link>
        </div>
        <div>
          Repos URL: <Link>{userInfo?.repos_url}</Link>
        </div>
      </>
    );
  }
}
export default About;
