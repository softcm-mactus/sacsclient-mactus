import React from 'react'
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  handleClick=()=>{
    this.setState({
      hasError:false
    })    
    this.props.history.push("/Dashboard");
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error)
    ///logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI        
      return (
        <div className="text-center" style={{top:"50"}}>
          <h1>Something went wrong.....</h1>          
          <button onClick={this.handleClick} className="btn btn-success"> Click here to go back </button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default withRouter (ErrorBoundary); 