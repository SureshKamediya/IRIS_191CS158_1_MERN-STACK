import './App.css';
import Header from './Header';
import SwipeButtons from './SwipeButtons';
import TinderCards from './TinderCards';

function App() {
  return (
    // npm i -g heroku
    // npm i -g firebase-tools
    // firebase login
    // firebase init
    //Bem class naming convention last command heroku logs --tail
    <div className="app">  
      <Header />
      <TinderCards />
      <SwipeButtons />
      {/* Header */}
      {/* Tinder Cards */}
      {/* Swipe buttons */}
    </div>
  );
}

export default App;
