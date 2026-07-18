import './App.css'
import { useRoutes } from 'react-router'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import CreateDBC from './pages/CreateDBC.jsx'
import DBGallery from './pages/DBCGallery.jsx'
import DBDetails from './pages/DBDetails.jsx'
import EditDBC from './pages/EditDBC.jsx'

const characterImages = {}
const imageModules = import.meta.glob('/src/images/Characters/**/*.{png,jpg,jpeg,svg}', { eager: true });
    Object.entries(imageModules).forEach(([path, module]) => {
      const parts = path.split('/')
      const raceFolder = parts.at(-2);
      let race = ""
      switch(raceFolder){
      case "Androids":
        race = "Android"
        break;
      case "Earthlings":
        race = "Earthling"
        break;
      case "FriezaClan":
        race="Frieza Clan"
        break;
      case "Saiyans":
        race="Saiyan"
        break;
      case "Majin":
        race="Majin"
        break;
      case "Namekians":
        race="Namekian"
        break;
      case "HybridSaiyan":
        race="Hybrid Saiyan"
        break;
      default:
        race="Saiyan"
        break;
      }
      if(!characterImages[race]){
        characterImages[race] = []
      }
      characterImages[race].push(path)
    })
    console.log(characterImages)


function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <NavBar />,
      children: [
        {index:true, element: <Home />},
        {path:'/create-character', element: <CreateDBC DBCimages={characterImages}/>},
        {path:'/edit-character/:id', element: <EditDBC DBCimages={characterImages}/>},
        {path:'/view-character/:id', element: <DBDetails/> },
        {path:'/db-gallery', element: <DBGallery />}
      ]
    },
  ])
  return routes
}

export default App
