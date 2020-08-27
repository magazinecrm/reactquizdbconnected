import React, {Component} from 'react';
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import  Result from  "./components/Result"
import './App.css';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'




firebase.initializeApp({
  apiKey: "Ag",
  authDomain: "al-f912f.firebaseapp.com"

})



class App extends Component {
  state = {
    questionBank: [],
//    score: 0,
//    responses: 0
    };




  state= { isSignedIn: true }
  state= { mvar: true }
  state= { score: 0}
  state = {
          counter : 0
  }

        state= {responses: 0}



        getQuestions = () => {
            quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };

  playAgain = () =>
  {
    this.getQuestions();
    this.setState({
        score: 0,
        responses: 0
    });
  }



  computeAnswer = (answer,correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });

    }






    console.log("score" +this.state.score)
    this.setState({
       responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  } ;



  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         ],
         callbacks: {
          signInSuccessWithAuthResult: () => false
        }
      }
      componentDidMount = () => {

        this.getQuestions();
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })

          this.setState({ mvar: user.email })

          console.log("user",user);
          var usera = firebase.auth().currentUser;

          usera.providerData.forEach(function (profile) {
          console.log("  Email: " + profile.email);


        });


        })
        }

 render() {
    return  (
      <div> <h1 className="center">Signin to acess our Quiz app for Magazine Publishers  </h1>
      <div className="App">
                {this.state.isSignedIn ?(
            <span>
              <div> 'rox': {this.state.responses} </div>
              <div> Textsigned in </div>
                 <button onClick={() => firebase.auth().signOut()}>
                  Sign out
              </button>
          <h1> Quiz App for Magazine Publishers {this.state.mvar} </h1>
             <div>title</div>
             <div className="containerz">
      <div className="title">QuizBeed</div> </div>
    <div> {this.state.questionBank.length > 0 &&
           this.state.responses < 5 &&
   this.state.questionBank.map (
        ({question,answers,correct,questionId}) =>
       (  <QuestionBox
        question={question}
        options={answers}
        key={questionId}
        selected={answer => this.computeAnswer(answer,correct)}
        /> )
      )}
{this.state.responses === 5 ? (
<Result score={this.state.score} counter={this.state.counter}    playAgain={this.playAgain} />

    //<Result score=IsNaN({this.state.score}) ? 0:{this.state.score}     playAgain={this.playAgain} />
  //<Result score={isNan(this.state.score) ? 0: {this.state.score}})      playAgain={this.playAgain} />
) : null}
      </div>
              </span>
            ) : (
                <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
                ) }
           </div>
           </div>);
  }
}

export default App ;

                  
                                             
