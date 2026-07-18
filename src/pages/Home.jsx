import '../styles/Home.css'
const Home = () => {
   return(
    <div className='home-page'>
        <h1>Welcome to the DragonBall Character Creator!</h1>
        <h3 className="home-text">Here is where you can create your own DB character before sending them off into the dragonball universe to fight</h3>
        <div className="home-images">
            <img src='src/images/main-images/db_characters.png' alt='dragonball characters' className="main-images"/>
            <img src='src/images/main-images/dragonballs.png' alt='dragonballs' className="main-images"/>
        </div>
    </div>
   )
}

export default Home;
